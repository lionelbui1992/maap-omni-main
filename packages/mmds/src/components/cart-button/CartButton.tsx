'use client';

import React, {
    ButtonHTMLAttributes,
    forwardRef,
    JSXElementConstructor,
    useRef,
} from 'react';
import cn from 'clsx';
import s from './CartButton.module.css';

export type State =
    | 'default'
    | 'selected'
    | 'alternative'
    | 'soldOut'
    | 'added';

export interface CartButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    state: State;
    loading?: boolean;
    disabled?: boolean;
    Component?: string | JSXElementConstructor<any>;
    type?: 'submit' | 'reset' | 'button';
    active?: boolean;
    className?: string;
    hrefLink?: string;
    label: string;
}

export const CartButton: React.FC<CartButtonProps> = forwardRef(
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
                [s.alternative]: state === 'alternative',
                [s.soldOut]: state === 'soldOut',
                [s.added]: state === 'added',
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

CartButton.displayName = 'CartButton';
export default CartButton;
