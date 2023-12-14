// @ts-nocheck
import hoistNonReactStatics from 'hoist-non-react-statics';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import Context from './context';
import { Options, TrackerData } from './types';
import useTrackerImpl from './useTrackerImpl';

export default function withTrackerComponent<T>(
    trackingData: TrackerData,
    options: Options
) {
    let forwardRef = false || options.forwardRef;
    return (WrappedComponent: React.ComponentType<T>) => {
        const displayName =
            WrappedComponent.displayName ||
            WrappedComponent.name ||
            'Component';

        function WithTracker({ prevforwardRef, ...props }) {
            const latestProps = useRef(props);
            useEffect(() => {
                // keep the latest props in a mutable ref object to avoid creating
                latestProps.current = props;
            });

            const trackingDataFn = useCallback(() => trackingData, []);

            const contextValue = useTrackerImpl(trackingDataFn(), options);

            const trackingProp = useMemo(
                () => ({
                    trackEvent: contextValue.tracking.dispatch,
                    getTrackerData: contextValue.tracking.getTrackerData,
                }),
                [contextValue]
            );

            const propsToBePassed = useMemo(
                () => (forwardRef ? { ...props, ref: prevforwardRef } : props),
                [props, prevforwardRef]
            );

            return (
                <Context.Provider value={contextValue}>
                    {React.createElement(WrappedComponent, {
                        ...(propsToBePassed as T),
                        tracking: trackingProp,
                    })}
                </Context.Provider>
            );
        }

        if (forwardRef) {
            const forwarded = React.forwardRef<HTMLDivElement, T>(
                (props, ref) =>
                    React.createElement(WithTracker, {
                        ...props,
                        prevforwardRef: ref,
                    })
            );
            hoistNonReactStatics(forwarded, WrappedComponent);
            return forwarded;
        }
        WithTracker.propTypes = {
            prevforwardRef: PropTypes.oneOfType([
                PropTypes.func,
                PropTypes.shape({ current: PropTypes.any }),
            ]),
        };
        WithTracker.defaultProps = { prevforwardRef: undefined };
        WithTracker.displayName = `withTrackerComponent(${displayName})`;
        hoistNonReactStatics(WithTracker, WrappedComponent);
        return WithTracker;
    };
}
