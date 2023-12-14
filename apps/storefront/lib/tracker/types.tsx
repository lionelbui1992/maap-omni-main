export interface TrackerData extends Record<any, any> {
    app?: string;
    event?: string;
}

export interface Options {
    /**
     * which is a function to use instead of the default dispatch behavior. See the section on custom
     */
    dispatch: (context: TrackerData) => void;
    /**
     * when set to true, dispatches the tracking data when the component mounts to the DOM. When provided as a function will be called in a useEffect on the component's initial render with all of the tracking context data as the only argument.
     */
    dispatchOnMount?: (context: TrackerData) => void | boolean;
    /**
     * which is a function that can be defined once on some top-level component, used for selectively dispatching tracking events based on each component's tracking data.
     */
    process?: (ownTrackerData: TrackerData) => void;
    /**
     * when set to true, adding a ref to the wrapped component will actually return the instance of the underlying component (Default is false)
     */
    forwardRef?: () => void;
    /**
     * Data stored in sessionStorage is specific to the protocol of the page. In particular, data stored by a script on a site accessed with HTTP (e.g., http://example.com) is put in a different sessionStorage object from the same site accessed with HTTPS (e.g., https://example.com).
     */
    session: boolean;
}

export interface ReturnUseTracker {
    Track: ({ children }: any) => JSX.Element;
    getTrackerData: () => TrackerData;
    getSessionData: () => Record<string, any>;
    trackEvent: (data: any) => any;
}

export interface ReturnUseTrackerImplementation {
    tracking: {
        dispatch: (data: TrackerData) => any;
        getTrackerData: () => TrackerData;
        getSessionData: () => Record<string, any>;
        process: (ownTrackerData: TrackerData) => void;
    };
}
