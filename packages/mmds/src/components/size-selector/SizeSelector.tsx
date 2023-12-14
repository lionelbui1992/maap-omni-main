'use client';

import React, {
    ButtonHTMLAttributes,
    forwardRef,
    JSXElementConstructor,
    useRef,
} from 'react';
import cn from 'clsx';
import s from './SizeSelector.module.css';

export type SizeState =
    | 'default'
    | 'selected'
    | 'outOfStock'
    | 'outOfStockSelected';

export interface SizeSelectorProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    state: SizeState;
    loading?: boolean;
    disabled?: boolean;
    Component?: string | JSXElementConstructor<any>;
    type?: 'submit' | 'reset' | 'button';
    active?: boolean;
    className?: string;
    hrefLink?: string;
    label?: string;
}

export const SizeSelector: React.FC<SizeSelectorProps> = forwardRef(
    (props, buttonRef) => {
        const {
            state = 'default',
            children,
            loading = false,
            disabled = false,
            Component = 'button',
            active,
            className,
            hrefLink,
            label,
            ...rest
        } = props;

        const ref = useRef<typeof Component>(null);
        const rootClassName = cn(
            s.root,
            {
                [s.default]: state === 'default',
                [s.selected]: state === 'selected',
                [s.outOfStock]: state === 'outOfStock',
                [s.outOfStockSelected]: state === 'outOfStockSelected',
                [s.loading]: loading,
                [s.disabled]: disabled,
            },
            className
        );

        return (
            <>
                {hrefLink ? (
                    <a href={hrefLink} className={s.buttonLink}>
                        <Component
                            aria-pressed={active}
                            data-variant={state}
                            disabled={disabled}
                            className={rootClassName}
                            {...rest}
                        >
                            {label}
                        </Component>
                    </a>
                ) : (
                    <Component
                        aria-pressed={active}
                        data-variant={state}
                        disabled={disabled}
                        className={rootClassName}
                        {...rest}
                    >
                        {label}
                    </Component>
                )}
            </>
        );
    }
);

SizeSelector.displayName = 'SizeSelector';
export default SizeSelector;
