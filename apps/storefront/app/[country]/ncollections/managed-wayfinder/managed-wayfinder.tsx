import React from 'react';
import { ManagedWayfinderProps } from './managed-wayfinder.d';
import {
    ContentStructure,
    inferGenderFromHandle,
} from '@app/lib/content-structure';
import Wayfinder from '../wayfinder';
import { getContentStructure } from '@app/lib/content-structure/cached-shopify-content-structure';

export default async ({
    handle,
    totalProductCount,
    shopifyClientSettings,
}: ManagedWayfinderProps) => {
    const contentStructure: ContentStructure | null = await getContentStructure(
        shopifyClientSettings
    );

    if (!contentStructure) throw new Error('Content structure is missing');

    if (!handle) return null;

    const gender = inferGenderFromHandle(handle as string);
    const activeItem = {
        hrefLink: `/collections/${handle}`,
        gender: gender,
    };

    return (
        <Wayfinder
            contentStructure={contentStructure}
            activeItem={activeItem}
            totalProductCount={totalProductCount}
        />
    );
};
