// @ts-nocheck
import React, { useCallback, useMemo } from 'react';
import Context from './context';
import { Options, ReturnUseTracker, TrackerData } from './types';
import useTrackerImpl from './useTrackerImpl';

export default function useTracker(
    trackingData?: TrackerData,
    options?: Options
): ReturnUseTracker {
    const contextValue = useTrackerImpl(trackingData, options);

    const Track = useCallback(
        ({ children }) => (
            <Context.Provider value={contextValue}>{children}</Context.Provider>
        ),
        [contextValue]
    );

    return useMemo(
        () => ({
            Track,
            getTrackerData: contextValue.tracking.getTrackerData,
            getSessionData: contextValue.tracking.getSessionData,
            trackEvent: contextValue.tracking.dispatch,
        }),
        [contextValue, Track]
    );
}
