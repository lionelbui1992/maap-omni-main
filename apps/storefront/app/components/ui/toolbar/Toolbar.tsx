import React, { useState, useEffect } from 'react';
import cn from 'clsx';
import s from './Toolbar.module.css';
import { useIntersectionObserver } from '../../../lib/hooks/use-intersection-observer';

interface ToolbarProps {
    children: React.ReactNode;
    shouldStick: boolean;
    position: 'top' | 'bottom';
}

const Toolbar = ({
    children,
    shouldStick = true,
    position = 'top',
}: ToolbarProps) => {
    const [isSticking, setIsSticking] = useState(false);
    const [ref, entry] = useIntersectionObserver({
        threshold: 0,
    });

    useEffect(() => {
        if (shouldStick && entry) {
            setIsSticking(!entry.isIntersecting);
        }
    }, [entry, shouldStick]);

    const classes = cn(s.root, {
        [s.sticky]: shouldStick,
        [s.top]: position === 'top' && shouldStick,
        [s.bottom]: position === 'bottom' && shouldStick,
        [s.isSticking]: isSticking,
    });

    return (
        <>
            <div ref={ref} className={s.sentinel} />
            <div className={cn(s.root, classes)}>{children}</div>
        </>
    );
};

export default Toolbar;
