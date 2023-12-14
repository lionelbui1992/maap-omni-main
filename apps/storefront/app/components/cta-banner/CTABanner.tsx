import { Suspense } from 'react';
import { CTABannerProps } from './types';
import CTABannerSingle from './CTABannerSingle.variant';
import CTABannerSplit from './CTABannerSplit.variant';

const CTABanner = ({ block }: CTABannerProps) => {
    const { variant } = block;

    let Variant = CTABannerSingle;
    switch (variant) {
        default:
        case 'single':
            Variant = CTABannerSingle;
            break;
        case 'split':
            Variant = CTABannerSplit;
            break;
    }

    return (
        <Suspense fallback={<div>Loading CTA Banner...</div>}>
            <Variant block={block} />
        </Suspense>
    );
};

export default CTABanner;
