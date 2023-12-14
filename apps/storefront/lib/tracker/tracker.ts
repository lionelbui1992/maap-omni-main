import { Options, TrackerData } from './types';
import withTrackerComponent from './withTrackerComponent';

const tracker = (trackingInfo: TrackerData, options: Options) => props =>
    withTrackerComponent(trackingInfo, options)(props);

export default tracker;
