import React, { createContext, useContext, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import listeners from 'listeners/listeners';

const debug = process.env.NEXT_PUBLIC_EVENTS_PROVIDER_DEBUG === 'true';

const infoLog = (message) => {
    console.log(
        '%c%s',
        'color: black; background: pink; font-weight: 600; padding: 2px 10px;',
        message
    );
};

const Context = createContext(null);

const handleClick = (e) => {
    if (e.target.dataset.analyticsName) {
        infoLog(
            `Click event fired with data ${e.target.dataset.analyticsName}`
        );
    }
};

const initGlobalClickHandler = () => {
    window.addEventListener('click', handleClick, false);
};

const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : () => {};

function EventsProvider({ children }) {
    useIsomorphicLayoutEffect(() => {
        if (debug) {
            infoLog('Listeners will be loaded');
        }

        listeners(debug).then(() => {
            window.dispatchEvent(new Event('tracking_listeners_registered'));
        });

        window.addEventListener('tracking_listeners_registered', () => {
            if (window) window.eventInitialised = true;
            infoLog('Listeners have been loaded');
        });

        // initGlobalClickHandler();
    }, []);

    const event = (name, detail) => {
        if (typeof window !== 'undefined') {
            if (window.eventInitialised) {
                window.dispatchEvent(new CustomEvent(name, { detail }));
            } else {
                window.addEventListener('tracking_listeners_registered', () =>
                    window.dispatchEvent(new CustomEvent(name, { detail }))
                );
            }
        }
    };

    const provides = {
        event,
    };

    return (
        <Context.Provider value={{ ...provides }}>{children}</Context.Provider>
    );
}

EventsProvider.propTypes = {
    children: PropTypes.any.isRequired,
};

const useEvent = () => useContext(Context);

export { EventsProvider, useEvent };
