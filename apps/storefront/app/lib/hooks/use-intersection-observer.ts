import React, { useState, useRef, useCallback } from 'react';

export interface UseIntersectionObserverOptions
    extends IntersectionObserverInit {
    threshold?: number | number[];
    root?: Element | null;
    rootMargin?: string;
}

export function useIntersectionObserver(
    options: UseIntersectionObserverOptions = {}
): [React.RefCallback<Element>, IntersectionObserverEntry | null] {
    const { threshold = 1, root = null, rootMargin = '0px' } = options;

    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

    const previousObserver = useRef<IntersectionObserver | null>(null);

    const customRef: React.RefCallback<Element> = useCallback(
        (node) => {
            if (previousObserver.current) {
                previousObserver.current.disconnect();
            }

            if (node) {
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        setEntry(entry);
                    },
                    { threshold, root, rootMargin }
                );

                observer.observe(node);
                previousObserver.current = observer;
            }
        },
        [threshold, root, rootMargin]
    );

    return [customRef, entry];
}
