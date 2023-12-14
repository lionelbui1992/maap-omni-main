import React, { lazy, Suspense } from 'react';
import { PosterProps } from './types';

const PosterOneUpVariant = lazy(() => import('./PosterOneUp.variant'));
const PosterTwoUpVariant = lazy(() => import('./PosterTwoUp.variant'));
const PosterFeatureVariant = lazy(() => import('./PosterFeature.variant'));
const PosterFeatureStackVariant = lazy(
    () => import('./PosterFeatureStack.variant')
);
const PosterFeatureStackVideoVariant = lazy(
    () => import('./PosterFeatureStackVideo.variant')
);
const PosterFeaturesVariant = lazy(() => import('./PosterFeatures.variant'));
const PosterFeaturesAltVariant = lazy(
    () => import('./PosterFeaturesAlt.variant')
);
const Poster = ({ block }: PosterProps) => {
    const { variant } = block;
    let Variant = PosterFeatureStackVariant;
    switch (variant) {
        case 'featureStack':
            Variant = PosterFeatureStackVariant;
            break;
        case 'featureStackVideo':
            Variant = PosterFeatureStackVideoVariant;
            break;
        case 'feature':
            Variant = PosterFeatureVariant;
            break;
        case 'features':
            Variant = PosterFeaturesVariant;
            break;
        case 'featuresAlt':
            Variant = PosterFeaturesAltVariant;
            break;
        case 'twoUp':
            Variant = PosterTwoUpVariant;
            break;
        case 'oneUp':
            Variant = PosterOneUpVariant;
            break;
    }

    return (
        <Suspense fallback={<div>Loading Poster...</div>}>
            <Variant block={block} />
        </Suspense>
    );
};

export default Poster;
