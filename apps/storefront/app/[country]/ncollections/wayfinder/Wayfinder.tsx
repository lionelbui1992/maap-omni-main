'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { WayfinderProps } from './types';
import { Breadcrumb, NavItem, PatternPillCluster, PingerVariant } from 'mmds';
import {
    ContentStructure,
    ContentStructureNavItem,
    useContentStructure,
    inferGenderFromUrl,
} from '../../../lib/content-structure';
import s from './Wayfinder.module.css';
import cn from 'clsx';

const Wayfinder = ({
    contentStructure,
    activeItem,
    totalProductCount,
    variant = 'default',
}: WayfinderProps) => {
    const router = useRouter();
    const { getPathsForNode } = useContentStructure(contentStructure);
    const [baseNode, setBaseNode] = useState<ContentStructureNavItem | null>(
        null
    );
    const [basePath, setBasePath] = useState<ContentStructure | null>(null);
    const [selectedPath, setSelectedPath] = useState<ContentStructure | null>(
        null
    );
    const [items, setItems] = useState<ContentStructure>([]);

    useEffect(() => {
        const path = getPathsForNode(activeItem);
        setSelectedPath(path);
        setBasePath(path); // TODO move to var.
        setBaseNode(path[path.length - 1]);
    }, [activeItem]);

    useEffect(() => {
        if (!baseNode) return;

        if (baseNode.children) {
            let items = baseNode.children;
            if (baseNode?.hrefLink) {
                baseNode.gender = inferGenderFromUrl(baseNode.hrefLink);
            }

            // Try the next tier up to get siblings.
            if (!items.length && basePath) {
                const tierUp = basePath[basePath.length - 2];
                items = tierUp?.children || items;
            }

            // Replace current item label with ALL is present.
            items = items.map((item) => {
                if (item.label === baseNode.label) {
                    return {
                        ...item,
                        label: 'All',
                    };
                }
                return item;
            });

            setItems(items);
        }
    }, [baseNode]);

    if (!selectedPath) return null;

    let previousTier: null | ContentStructureNavItem = null;
    if (selectedPath.length > 1) {
        previousTier = selectedPath[selectedPath.length - 2];
    }

    const reset = () => {
        setBaseNode(null);
        setSelectedPath(null);
        setItems(contentStructure);
    };

    const handleBack = () => {
        if (previousTier) {
            setBaseNode(previousTier);
        } else {
            reset();
        }
    };

    const pillCluster = items.map((item, index) => {
        if (index === 0) {
            return {
                label: item.label, // TODO: Add count to label
                onClick: handleBack,
                componentType: 'pinger' as 'pinger',
                pingerVariant: 'ghost' as PingerVariant,
                inactive: true,
            };
        }

        return {
            label: item.label,
            onClick: () => setBaseNode(item),
            active: item.label === activeItem?.label,
            componentType: 'pinger' as 'pinger',
            pingerVariant: 'alt' as PingerVariant,
        };
    });

    if (variant === 'pill') {
        return <PatternPillCluster cluster={pillCluster} nowrap />;
    }

    return (
        <div>
            {selectedPath && (
                <Breadcrumb
                    path={selectedPath}
                    totalProductCount={totalProductCount}
                />
            )}
            {baseNode && (
                <div className={s.wayfinderRoot}>
                    <div className={s.wayfinderItems}>
                        <div
                            className={cn(
                                s.wayfinderItem,
                                baseNode?.label === previousTier?.label
                                    ? s.wayfinderSelectedItem
                                    : s.wayfinderUnSelectedItem
                            )}
                        >
                            {baseNode.label} : All.
                        </div>
                        {items.map((item, index) => {
                            if (item.label === 'All') return null;
                            if (!item.hrefLink) return null;
                            return (
                                <NavItem
                                    label={item.label}
                                    count={item.count}
                                    className={s.wayfinderItem}
                                    onSelect={() =>
                                        router.push(item.hrefLink as string)
                                    }
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wayfinder;
