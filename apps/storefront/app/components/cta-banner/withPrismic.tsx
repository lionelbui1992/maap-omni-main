import React from 'react';
import CTABanner from './CTABanner';
import { CTABannerBlock, CTABannerVariant, TitleSizeVariant } from './types';
import { CtaBannerSlice } from 'prismicio-types';
import { CTAIcon } from 'mmds';

interface CtaBannerPrismicProps {
    slice: CtaBannerSlice;
}

const transformTitleSizeVariant = (titleSize: string | null) => {
    return titleSize
        ? (titleSize.toLowerCase() as TitleSizeVariant)
        : undefined;
};

const withPrismic = ({ slice }: CtaBannerPrismicProps) => {
    let theVariant = slice.variation as CTABannerVariant;
    const mapping: CTABannerBlock = {
        variant: theVariant,
        items: [],
    };

    if (theVariant === 'single') {
        mapping.items.push({
            title: slice.primary.title as string,
            titleSize: transformTitleSizeVariant(slice.primary.title_size),
            icon: slice.primary.title_icon?.toLowerCase() as CTAIcon,
            link: slice.primary?.link as string,
            desktopImage: (slice.primary.desktop_image as any).url,
            mobileImage: (slice.primary.mobile_image as any).url,
        });
    } else {
        mapping.items = slice.items.map((item) => {
            return {
                title: item.title as string,
                titleSize: transformTitleSizeVariant(item.title_size),
                icon: item.title_icon?.toLowerCase() as CTAIcon,
                link: item.link as string,
                desktopImage: (item.desktop_image as any).url,
                mobileImage: (item.mobile_image as any).url,
            };
        });
    }
    return <CTABanner block={mapping} />;
};

export default withPrismic;
