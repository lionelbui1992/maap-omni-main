// @ts-nocheck
import { useCallback, useEffect, useRef, useState } from 'react';

const postMessage = (data, target, origin = '*') =>
    target.postMessage(data, origin);

function useWindowMessage<TKey, TValue>(
    dispatcherFns: Record<keyof TKey, (context: TValue) => void>
) {
    const [history, setHistory] = useState([]);
    const [origin, setOrigin] = useState();
    const [source, setSource] = useState();

    const originRef = useRef();
    const sourceRef = useRef();

    originRef.current = origin;
    sourceRef.current = source;

    const sendToParent = (data) => {
        const { opener } = window;
        if (!opener) throw new Error('Parent window has closed');
        postMessage(data, opener);
    };

    const onWatchEventHandler = useCallback(
        (event) => {
            const getMatchEventKey = () => {
                if (typeof event?.data === 'string') {
                    return event?.data;
                }
                if (
                    typeof event?.data === 'object' &&
                    Object.hasOwn(event?.data, 'message')
                ) {
                    return data?.message;
                }
            };

            const getWatchKey = () => Object.keys(dispatcherFns);

            const { origin, source, data } = event;

            if (getWatchKey().includes(getMatchEventKey())) {
                setSource(source);
                setOrigin(origin);
                setHistory((old) => [...old, data]);
                if (getMatchEventKey() in dispatcherFns) {
                    const fn = dispatcherFns[getMatchEventKey()];
                    fn(data as TValue);
                }
            }
        },
        [dispatcherFns, setSource, setOrigin]
    );

    useEffect(() => {
        window.addEventListener('message', onWatchEventHandler);
        return () => window.removeEventListener('message', onWatchEventHandler);
    }, [dispatcherFns, source, origin, onWatchEventHandler]);

    return { history, sendToParent };
}

export default useWindowMessage;
