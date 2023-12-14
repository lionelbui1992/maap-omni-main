'use client';

import React, {
    ButtonHTMLAttributes,
    forwardRef,
    JSXElementConstructor,
} from 'react';
import { IconName } from '../../tokens/icons/types';
import { Icon } from '../../tokens/icons';
import cn from 'clsx';
import s from './Button.module.css';
import { capitalize } from '../../utilities';

export type ButtonVariant =
    | 'base'
    | 'ghost'
    | 'secondary'
    | 'text'
    | 'quite'
    | 'quite_alt'
    | 'link_alt'
    | 'collection'
    | 'discover'
    | 'checkout'
    | 'buy'
    | 'active';

export type ButtonRadiusSize = 'small' | 'medium' | 'large' | 'none';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    loading?: boolean;
    disabled?: boolean;
    Component?: string | JSXElementConstructor<any>;
    type?: 'submit' | 'reset' | 'button';
    active?: boolean;
    inactive?: boolean;
    radiusSize?: ButtonRadiusSize;
    className?: string;
    hrefLink?: string;
    icon?: IconName;
    label?: string;
    textVariantPadding?: boolean;
    padding?: 'zeroInline' | 'zero';
    onClick?: () => void;
    theme?: 'light' | 'dark';
}

export const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
    const {
        variant = 'base',
        children,
        loading = false,
        disabled = false,
        Component = 'button',
        radiusSize = 'large',
        active,
        inactive = false,
        className,
        hrefLink,
        label,
        icon,
        padding,
        textVariantPadding = true,
        onClick,
        theme = 'dark',
        ...rest
    } = props;

    const rootClassName = cn(
        s.root,
        {
            [s.rootNortheast]: icon === 'northeast',
            [s.rootAlt]: variant === 'quite_alt' || variant === 'link_alt',
            [s.loading]: loading,
            // [s.active]: active && !disabled && !inactive,
            [s.inactive]: inactive && !disabled,
            [s.disabled]: disabled,
            [s[variant]]: !disabled && !inactive,
            [s[`disabled${capitalize(variant)}`]]: disabled,
            [s[`inactive${capitalize(variant)}`]]: inactive,
            [s[`active${capitalize(variant)}`]]:
                active && !disabled && !inactive,
            [s[`light${capitalize(variant)}`]]: theme === 'light',
            [s.radiusSmall]: radiusSize === 'small',
            [s.radiusMedium]: radiusSize === 'medium',
            [s.radiusLarge]: radiusSize === 'large',
            [s.radiusNone]: radiusSize === 'none',
            [s.paddingZeroInline]: padding === 'zeroInline',
            [s.paddingZero]: padding === 'zero',
            [s.textVariantSpacing]: variant === 'text' && !textVariantPadding,
        },
        className
    );

    return (
        <>
            {hrefLink ? (
                <a href={hrefLink} className={s.buttonLink}>
                    <Component
                        aria-pressed={active}
                        data-variant={variant}
                        disabled={disabled}
                        className={rootClassName}
                        onClick={onClick}
                        {...rest}
                    >
                        {label}
                        {icon && <Icon className={s.icon} icon={icon} />}
                    </Component>
                </a>
            ) : (
                <Component
                    aria-pressed={active}
                    data-variant={variant}
                    disabled={disabled}
                    className={rootClassName}
                    onClick={onClick}
                    {...rest}
                >
                    {label}
                    {icon && <Icon className={s.icon} icon={icon} />}
                </Component>
            )}
        </>
    );
});

Button.displayName = 'Button';
export default Button;
