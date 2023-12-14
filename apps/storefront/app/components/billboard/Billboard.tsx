import React, { lazy, Suspense } from 'react';
import { BillboardProps } from './types';

const BillboardStaticVariant = lazy(() => import('./BillboardStatic.variant'));
const BillboardCarouselVariant = lazy(
    () => import('./BillboardCarousel.variant')
);

const Billboard = ({ block }: BillboardProps) => {
    const { variant } = block;
    let Variant = BillboardStaticVariant;

    switch (variant) {
        case 'cta_carousel':
            Variant = BillboardCarouselVariant;
            break;
        case 'cta_static':
        default:
            Variant = BillboardStaticVariant;
            break;
    }

    return (
        <Suspense fallback={<div>Loading Billboard...</div>}>
            <Variant block={block} />
        </Suspense>
    );
};

export default Billboard;
