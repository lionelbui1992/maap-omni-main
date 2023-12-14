'use client';

import React, {
    ButtonHTMLAttributes,
    forwardRef,
    JSXElementConstructor,
    useRef,
} from 'react';
import cn from 'clsx';
import { IconName } from '../../tokens/icons/types';
import { Icon } from '../../tokens/icons';
import s from './Pinger.module.css';

export type PingerVariant = 'base' | 'ghost' | 'secondary' | 'alt' | 'active';

export interface PingerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: PingerVariant;
    loading?: boolean;
    disabled?: boolean;
    Component?: string | JSXElementConstructor<any>;
    type?: 'submit' | 'reset' | 'button';
    active?: boolean;
    inactive?: boolean;
    radiusSize?: 'small' | 'medium' | 'large';
    className?: string;
    hrefLink?: string;
    icon?: IconName;
    label: string;
}

export const Pinger: React.FC<PingerProps> = forwardRef((props, buttonRef) => {
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
        ...rest
    } = props;

    // TODO: move to lib
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    const ref = useRef<typeof Component>(null);
    const rootClassName = cn(
        s.root,
        {
            [s.rootNortheast]: icon === 'northeast',
            [s.loading]: loading,
            [s.active]: active && !disabled && !inactive,
            [s.inactive]: inactive && !disabled,
            [s.disabled]: disabled,
            [s[variant]]: !disabled && !inactive,
            [s[`disabled${capitalize(variant)}`]]: disabled,
            [s[`inactive${capitalize(variant)}`]]: inactive,
            [s.radiusSmall]: radiusSize === 'small',
            [s.radiusMedium]: radiusSize === 'medium',
            [s.radiusLarge]: radiusSize === 'large',
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
                    {...rest}
                >
                    {label}
                    {icon && <Icon className={s.icon} icon={icon} />}
                </Component>
            )}
        </>
    );
});

Pinger.displayName = 'Pinger';
export default Pinger;
