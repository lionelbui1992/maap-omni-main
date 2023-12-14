import React from 'react';
import { ProductCountViewProps } from '../types';
import cn from 'clsx';
import s from '../FilteringToolbar.module.css';

export function ProductCountView({
    count,
}: ProductCountViewProps): JSX.Element {
    return (
        <>
            <output
                className={cn(s.count, 'mmds-component-one-detail')}
                aria-live="polite"
            >
                {count !== 1 ? `${count} Products` : `${count} Product`}
            </output>
        </>
    );
}
