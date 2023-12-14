// @ts-nocheck
import useSessionStorage from '@lib/hooks/useSessionStorage';
import merge from 'deepmerge';
import { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import Context from './context';
import { Options, ReturnUseTrackerImplementation, TrackerData } from './types';
import { isBoolean, isFunction } from './utils';

export default function useTrackerImpl(
    trackingData: TrackerData,
    options: Options
): ReturnUseTrackerImplementation {
    const { tracking } = useContext(Context);
    const latestData = useRef(trackingData);
    const latestOptions = useRef<Options>(options);
    const [sessionData, setSession] = useSessionStorage(
        latestData?.current?.app
    );

    useEffect(() => {
        // store the latest data & options in a mutable ref to prevent
        // dependencies from changing when the consumer passes in non-memoized objects
        latestData.current = trackingData;
        latestOptions.current = options;
    });

    const {
        dispatch,
        dispatchOnMount = false,
        process,
        session,
    } = useMemo(() => latestOptions.current || {}, []) as Options;

    const getProcessFn = useCallback(
        () => tracking && tracking.process,
        [tracking]
    );

    const getOwnTrackerData = useCallback(() => latestData.current || {}, []);

    const getTrackerDataFn = useCallback(() => {
        const contextGetTrackerData =
            (tracking && tracking.getTrackerData) || getOwnTrackerData;

        return () =>
            contextGetTrackerData === getOwnTrackerData
                ? getOwnTrackerData()
                : merge(
                      isFunction(contextGetTrackerData)(),
                      getOwnTrackerData()
                  );
    }, [getOwnTrackerData, tracking]);

    const getTrackerDispatcher = useCallback(() => {
        const contextDispatch = (tracking && tracking.dispatch) || dispatch;
        return (data) => {
            const payload = merge(getOwnTrackerData(), data || {});
            if (session === true) {
                setSession(payload.event, payload);
            }
            return isFunction(contextDispatch)(payload);
        };
    }, [getOwnTrackerData, tracking, dispatch, session]);

    const trackEvent = useCallback(
        (data = {}) => {
            getTrackerDispatcher()(data);
        },
        [getTrackerDispatcher]
    );

    useEffect(() => {
        const contextProcess = getProcessFn();
        const getTrackerData = getTrackerDataFn();

        if (contextProcess && process) {
            console.error(
                'options.process should be defined once on a top-level component'
            );
        }

        if (
            typeof contextProcess === 'function' &&
            typeof dispatchOnMount === 'function'
        ) {
            const result = dispatchOnMount(getTrackerData());
            if (typeof result === 'object' && result !== null) {
                trackEvent(
                    merge(
                        isFunction(contextProcess)(getOwnTrackerData()) || {},
                        result
                    )
                );
            }
        } else if (typeof contextProcess === 'function') {
            const processed = isFunction(contextProcess)(getOwnTrackerData());
            if (processed || isBoolean(dispatchOnMount) === true) {
                trackEvent(processed);
            }
        } else if (typeof dispatchOnMount === 'function') {
            const result = dispatchOnMount(getTrackerData());
            if (typeof result === 'object' && result !== null) {
                trackEvent(result);
            }
        } else if (isBoolean(dispatchOnMount) === true) {
            trackEvent({});
        }
    }, [
        getOwnTrackerData,
        getProcessFn,
        getTrackerDataFn,
        trackEvent,
        dispatchOnMount,
        process,
    ]);

    return useMemo(
        () => ({
            tracking: {
                dispatch: getTrackerDispatcher(),
                getTrackerData: getTrackerDataFn(),
                getSessionData: () => sessionData,
                process: getProcessFn() || process,
            },
        }),
        [getTrackerDispatcher, getTrackerDataFn, getProcessFn, process]
    );
}
