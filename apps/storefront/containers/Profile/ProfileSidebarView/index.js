import useWindowMessage from '@lib/hooks/useWindowMessage';
import { useProfile } from '@lib/providers/ProfileProvider';
import { addToDataLayer, toEvent, tracker } from '@lib/tracker';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from './styles';

const trackUtils = { addToDataLayer, toEvent };

const ProfileSidebarView = (props) => {
    const { trackEvent } = props?.tracking;
    const { active } = props;
    const portalFrameRef = useRef(null);
    const { portalUrl } = useProfile();
    const [frameLoaded, setFrameLoaded] = useState(false);
    const [openedOnce, setOpenedOnce] = useState(false);

    useEffect(() => {
        // If the sidebar has been opened once, show the iFrame
        // and don't unload it if the sidebar closes, because
        // it will need to reload every time and that looks terrible.
        if (!openedOnce && active) {
            setOpenedOnce(true);
        }
    }, [active]);

    useWindowMessage({
        customer: (event) => {
            trackEvent({
                event: 'customer',
                data: event.data,
            });
        },
        login: () => {
            trackEvent({
                event: 'login',
                data: 'login',
            });
        },
        getUrl: (data) => {
            trackEvent({
                event: 'getUrl',
                data,
            });
            portalFrameRef.current.contentWindow.postMessage(
                {
                    url: window.location.href,
                    action: data.action,
                },
                '*'
            );
        },
    });

    return (
        <>
            <div
                className={`profile-sidebar-view${
                    active ? ' profile-sidebar-view--active' : ''
                }`}
            >
                {openedOnce && (
                    <div className="profile__wrapper">
                        {!frameLoaded && <p>&nbsp; One moment...</p>}
                        <iframe
                            id="pp_iframe"
                            ref={portalFrameRef}
                            src={portalUrl}
                            onLoad={() => setFrameLoaded(true)}
                            className="profile-sidebar-view__embed"
                        />
                    </div>
                )}
            </div>
            <style jsx>{styles}</style>
        </>
    );
};

const ProfileSidebar = tracker(
    { app: 'ProfileSidebar' },
    {
        session: true,
        dispatch: (payload) => {
            switch (payload.event) {
                case 'customer':
                    trackUtils.addToDataLayer(payload?.app, payload);

                    const parsedEvent = trackUtils.toEvent(payload.data);
                    if (typeof window !== 'undefined') {
                        if (window._learnq) {
                            if (!_learnq.isIdentified()) {
                                const identify = parsedEvent;
                                _learnq.push(['identify', identify]);
                            }
                        }

                        if (typeof window?.nostojs === 'function') {
                            window?.nostojs((api) => {
                                api.defaultSession().setCustomer({
                                    email: parsedEvent['$email'],
                                    first_name: parsedEvent['$first_name'],
                                    last_name: parsedEvent['$last_name'],
                                });
                            });
                        }
                    }

                    return;
                default:
                    return;
            }
        },
    }
)(ProfileSidebarView);

export default React.memo(ProfileSidebar);
