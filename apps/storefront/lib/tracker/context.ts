// @ts-nocheck
import React from 'react';
import { ReturnUseTrackerImplementation } from './types';

export default React.createContext<ReturnUseTrackerImplementation>({
    tracking: {
        dispatch: null,
        getTrackerData: null,
        getSessionData: null,
        process: null,
    },
});
