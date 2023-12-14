'use client';

import React, { useEffect } from 'react';
import { NavIconName } from '../../tokens/icons/types';
import PatternPillCluster, {
    PillClusterPillInput,
} from '../../patterns/pill-cluster/PatternPillCluster';
import { Icon } from '../../tokens/icons';
import Skeleton from '../skeleton';
import cn from 'clsx';
import s from './NavItem.module.css';
import { Button } from '../button';

type NavItemVariantType = 'l1' | 'l2';

export type NavItemProps = {
    variant?: NavItemVariantType;
    label: string;
    icon?: NavIconName;
    count?: number;
    countResolver?: (handle: string) => Promise<number>;
    hrefLink?: string;
    cluster?: PillClusterPillInput[];
    open?: boolean;
    onSelect?: () => void;
    openCluster?: null | string;
    className?: string;
    type?: 'base' | 'footer';
};

export const NavItem = ({
    variant,
    label,
    icon,
    count,
    countResolver,
    hrefLink,
    cluster,
    open,
    onSelect,
    openCluster,
    className,
    type = 'base',
}: NavItemProps) => {
    const [resolvedCount, setResolvedCount] = React.useState<number | null>(
        null
    );
    const rootClasses: string = cn(
        s.root,
        'mmds-title-four',
        {
            [s.footerRoot]: type === 'footer',
            [s.inactive]: openCluster !== null && !open,
            [s.active]: open,
        },
        className
    );

    const subItemsContainerClasses: string = cn(s.subItemsContainer, {
        open: open,
    });

    const superscriptClasses: string = cn(
        s.superscript,
        'mmds-copy-three-detail'
    );

    useEffect(() => {
        if (countResolver && hrefLink) {
            const handle: string | undefined = hrefLink.split('/').pop();
            if (!handle) return;

            countResolver(handle).then((count: number) => {
                setResolvedCount(count);
            });
        }
    }, [countResolver]);

    return (
        <div className={rootClasses} onClick={onSelect}>
            <div className={s.label}>
                {label}
                {!!icon && (
                    <div className={cn(s.icon, { [s.active]: open })}>
                        <Icon icon={icon} />
                    </div>
                )}
                {!icon && countResolver && !count && (
                    <Skeleton width="20px" height="15px" />
                )}
                {!icon && (count || resolvedCount) && (
                    <div className={superscriptClasses}>
                        {count || resolvedCount}
                    </div>
                )}
            </div>
            {type === 'base' ? (
                <div className={subItemsContainerClasses}>
                    {open && cluster && (
                        <PatternPillCluster cluster={cluster} />
                    )}
                </div>
            ) : (
                <div className={subItemsContainerClasses}>
                    {open && cluster && (
                        <div>
                            {cluster.map((item) => {
                                return (
                                    <div
                                        className={cn('mmds-component-one')}
                                        key={item.label}
                                    >
                                        {item.label === 'Email Us' ||
                                        item.label.match('Phone') ? (
                                            <Button
                                                label={item.label}
                                                variant="quite"
                                                theme="light"
                                                icon="circle"
                                                padding="zeroInline"
                                                hrefLink={item.hrefLink}
                                            />
                                        ) : (
                                            <Button
                                                label={item.label}
                                                variant="quite"
                                                theme="light"
                                                padding="zeroInline"
                                                hrefLink={item.hrefLink}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NavItem;
