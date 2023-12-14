import { useIsomorphicLayoutEffect } from '@lib/useIsomorphicLayoutEffect';
import * as React from 'react';
import useDeepCompareMemo from './useDeepCompareMemo';

function useEventListener(
    element: Document | HTMLElement | Window | null | undefined,
    eventType: string,
    listener: (this: typeof element, evt: Event) => void,
    options?: boolean | AddEventListenerOptions | undefined
): void {
    const listenerRef = React.useRef(listener);
    listenerRef.current = listener;

    const memorizedOptions = useDeepCompareMemo(() => options, [options]);

    useIsomorphicLayoutEffect(() => {
        const el = element === undefined ? window : element;

        if (!el) return;

        // to avoid keep updating listener in DOM
        const wrappedListener: typeof listenerRef.current = (evt) =>
            listenerRef.current.call(el, evt);

        el.addEventListener(eventType, wrappedListener, memorizedOptions);

        return () => {
            el.removeEventListener(
                eventType,
                wrappedListener,
                memorizedOptions
            );
        };
    }, [element, eventType, memorizedOptions]);
}

export default useEventListener;
