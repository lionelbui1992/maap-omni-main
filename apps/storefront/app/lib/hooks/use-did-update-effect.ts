import { useEffect, useRef } from 'react';

export function useDidUpdateEffect(func, inputs: any[]) {
    const isMountingRef = useRef(false);

    useEffect(() => {
        isMountingRef.current = true;
    }, []);

    useEffect(() => {
        if (!isMountingRef.current) {
            return func();
        } else {
            isMountingRef.current = false;
        }
    }, inputs);
}
