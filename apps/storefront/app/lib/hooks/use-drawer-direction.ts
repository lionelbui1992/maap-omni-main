import { useState, useEffect } from 'react';
import throttledWidthObserver from '../observers/throttled-width-observer';
import { Side } from '@app/components/ui/drawer/Drawer';

const useDrawerDirection = (
    mobileDirection: Side = 'bottom',
    desktopDirection: Side = 'right',
    breakpoint = 992,
    defaultWidth = 1280
) => {
    const clientWidth =
        typeof document !== 'undefined'
            ? document.body.clientWidth
            : defaultWidth;
    const [windowSize, setWindowSize] = useState<number>(clientWidth);

    useEffect(() => {
        if (typeof document === 'undefined') return;
        const observer = throttledWidthObserver(
            document.body,
            setWindowSize,
            100
        );
        observer.observe(document.body);
        return () => observer.disconnect();
    }, []);

    const direction =
        windowSize < breakpoint ? mobileDirection : desktopDirection;

    return direction;
};

export default useDrawerDirection;
