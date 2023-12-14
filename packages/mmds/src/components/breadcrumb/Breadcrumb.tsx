import React from 'react';
import cn from 'clsx';
import s from './Breadcrumb.module.css';

export interface BreadcrumbItem {
    title: string;
    url: string | undefined | null;
}

export type BreadcrumbNode = {
    label: string;
    hrefLink?: string;
};

export interface BreadcrumbProps {
    path: BreadcrumbNode[];
    totalProductCount?: number;
}

export const Breadcrumb = ({ path, totalProductCount }: BreadcrumbProps) => {
    return (
        <div className={s.breadcrumbsRoot}>
            {path.map((node, index) => {
                return (
                    <div
                        key={index}
                        className={cn(
                            s.breadcrumbsItem,
                            'mmds-copy-three-detail'
                        )}
                    >
                        <a href={node.hrefLink || '/'}>{node.label}</a>
                    </div>
                );
            })}

            {totalProductCount && (
                <div className={cn(s.productCount, 'mmds-copy-three-detail')}>
                    {totalProductCount} products
                </div>
            )}
        </div>
    );
};

export default Breadcrumb;
