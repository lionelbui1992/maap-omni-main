import React from 'react';
import { PosterItem, PosterProps } from './types';
import PosterFeatureStackVariantItem from './PosterFeatureStack__Item';

const PosterFeatureStackVariant = ({ block }: PosterProps) => {
    const { items } = block;

    return (
        <>
            {items.map((item: PosterItem) => {
                return (
                    <PosterFeatureStackVariantItem
                        item={item}
                        key={item.productTitle}
                    />
                );
            })}
        </>
    );
};

export default PosterFeatureStackVariant;
