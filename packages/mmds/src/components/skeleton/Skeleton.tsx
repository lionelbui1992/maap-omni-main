import React from 'react';
import cn from 'clsx';
import s from './Skeleton.module.css';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    backgroundColor?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
    className,
    width,
    height,
    borderRadius,
    backgroundColor,
    ...props
}) => {
    return (
        <div
            style={{ width, height, borderRadius, backgroundColor }}
            className={cn(s.root, s.pulse, className)}
            {...props}
        />
    );
};

export default Skeleton;
