import React from 'react';
import { Pinger, PingerProps, PingerVariant } from '../../components/pinger';
import { ButtonVariant, Button, ButtonProps } from '../../components/button';
import cn from 'clsx';
import s from './PatternPillCluster.module.css';

export type PillClusterPillInput = Pick<
    ButtonProps & PingerProps,
    'label' | 'hrefLink' | 'icon' | 'disabled' | 'onClick'
> & {
    active?: boolean;
    inactive?: boolean;
    componentType?: 'button' | 'pinger';
    buttonVariant?: ButtonVariant;
    pingerVariant?: PingerVariant;
};

type PillCusterProps = {
    cluster: PillClusterPillInput[];
    nowrap?: boolean;
};

export const PatternPillCluster = ({ cluster, nowrap }: PillCusterProps) => {
    const rootClassName = cn(s.root, {
        [s.noWrap]: nowrap,
    });
    return (
        <div className={rootClassName}>
            {cluster.map((pill, key) => {
                const {
                    label,
                    hrefLink,
                    icon,
                    active,
                    disabled,
                    inactive,
                    onClick,
                    componentType = 'button',
                    buttonVariant,
                    pingerVariant,
                } = pill;

                const effectiveButtonVariant =
                    buttonVariant || (active ? 'active' : 'secondary');

                const effectivePingerVariant =
                    pingerVariant || (active ? 'active' : 'alt');

                return componentType === 'pinger' ? (
                    <Pinger
                        variant={effectivePingerVariant}
                        radiusSize="large"
                        hrefLink={hrefLink}
                        label={label}
                        icon={icon}
                        disabled={disabled}
                        inactive={inactive}
                        onClick={onClick}
                        key={key}
                    />
                ) : (
                    <Button
                        variant={effectiveButtonVariant}
                        radiusSize="large"
                        hrefLink={hrefLink}
                        label={label}
                        icon={icon}
                        disabled={disabled}
                        inactive={inactive}
                        onClick={onClick}
                        key={key}
                    />
                );
            })}
        </div>
    );
};

export default PatternPillCluster;
