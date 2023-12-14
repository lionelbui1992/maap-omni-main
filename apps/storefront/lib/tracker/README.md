# Tracker

# How to use

With React High-Order-Component

```jsx
// Your component
const YourComponent = ({ tracking }) => {
    const { trackEvent, getTrackerData, getSessionData } = tracking;

    return (
        <Button onClick={event => trackEvent({ event: 'button', data: event })}>
            Track me
        </Button>
    );
};

const TrackedComponent = tracker({
    // tracker key
    app: 'component-name',

    // If you want to save your event in sessionStorage
    session: true,

    // Callback
    dispatch: payload => {
        const scopeKey = payload.event;
        const appKey = payload.app;
    },
});

export default TrackedComponent(YourComponent);
```

With ReactHooks

```jsx
// Your component
const YourComponent = () => {
    const { Track, trackEvent, getTrackerData, getSessionData } = useTracker(
        {
            // tracker key
            app: 'component-name',
        },
        {
            // If you want to save your event in sessionStorage
            session: true,
            // Callback
            dispatch: payload => {
                const scopeKey = payload.event;
                const appKey = payload.app;
            },
        }
    );

    return (
        <Track>
            <Button
                onClick={event => trackEvent({ event: 'button', data: event })}
            >
                Track me
            </Button>
        </Track>
    );
};

export default YourComponent;
```
