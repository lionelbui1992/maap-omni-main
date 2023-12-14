import {
    PosterSlice,
    PosterSliceFeatureItem,
    PosterSliceFeaturePrimary,
    PosterSliceFeaturesAltItem,
    PosterSliceFeaturesAltPrimary,
    PosterSliceFeaturesItem,
    PosterSliceFeaturesPrimary,
    PosterSliceFeatureStackItem,
    PosterSliceFeatureStackPrimary,
    PosterSliceFeatureStackVideoItem,
    PosterSliceFeatureStackVideoPrimary,
    PosterSliceOneUpItem,
    PosterSliceTwoUpItem,
} from '../../../prismicio-types';
import Poster from './Poster';
import {
    ButtonPlacement,
    PosterItem,
    PostersBlock,
    PosterVariant,
    TitlePosition,
} from './types';
import { FilledLinkToMediaField } from '@prismicio/types';

interface PostersProps {
    slice: PosterSlice;
}

const withPrismic = ({ slice }: PostersProps) => {
    let theVariant = slice.variation as PosterVariant;
    if (!slice.variation) {
        return null;
    }
    const mapping: PostersBlock = {
        variant: theVariant,
        items: [],
    };

    if (theVariant === 'feature') {
        const newItem = slice.primary as PosterSliceFeaturePrimary;
        mapping.items = [
            {
                desktopImage: newItem.desktop_image?.url,
                mobileImage: newItem.mobile_image?.url,
                productTitle: newItem.product_title,
                content: newItem.description,
                backgroundColor: newItem.background_colour,
                textThemeDesktop: newItem.text_theme_desktop,
                textThemeMobile: newItem.text_theme_mobile,
                CTASet: slice.items.map((item: any) => {
                    const newItem = item as PosterSliceFeatureItem;
                    return {
                        variant: newItem.button_variant?.toLowerCase(),
                        label: newItem.button_label,
                        hrefLink: newItem.button_link,
                        icon: newItem?.button_icon?.toLowerCase(),
                    };
                }),
            } as PosterItem,
        ];
    } else if (theVariant === 'featureStack') {
        const newItem = slice.primary as PosterSliceFeatureStackPrimary;
        mapping.items = [
            {
                productTitle: newItem.product_title,
                textThemeDesktop: newItem.text_theme_desktop,
                textThemeMobile: newItem.text_theme_mobile,
                CTASet: [
                    {
                        variant: newItem.button_1_variant?.toLowerCase(),
                        label: newItem.button_1_label,
                        hrefLink: newItem.button_1_link,
                        icon: newItem.button_1_icon?.toLowerCase(),
                    },
                    {
                        variant: newItem.button_2_variant?.toLowerCase(),
                        label: newItem.button_2_label,
                        hrefLink: newItem.button_2_link,
                        icon: newItem.button_2_icon?.toLowerCase(),
                    },
                    {
                        variant: newItem.button_3_variant?.toLowerCase(),
                        label: newItem.button_3_label,
                        hrefLink: newItem.button_3_link,
                        icon: newItem.button_3_icon?.toLowerCase(),
                    },
                ],
                featureStack: slice.items.map((item) => {
                    const newItem = item as PosterSliceFeatureStackItem;
                    return {
                        productThumbnail: newItem.thumbnail?.url,
                        productImage: {
                            desktopImage: newItem.desktop_image?.url,
                            mobileImage: newItem.mobile_image?.url,
                        },
                        description: newItem.description,
                        backgroundColor: newItem.background_colour,
                    };
                }),
            } as PosterItem,
        ];
    } else if (theVariant === 'featureStackVideo') {
        const newItem = slice.primary as PosterSliceFeatureStackVideoPrimary;
        mapping.items = [
            {
                backgroundColor: newItem.background_colour,
                desktopVideoURL: (
                    newItem.video_desktop_link as FilledLinkToMediaField
                )?.url,
                mobileVideoURL: (
                    newItem.video_mobile_link as FilledLinkToMediaField
                )?.url,
                productTitle: newItem.product_title,
                variantImage: newItem.variant_dekstop_image?.url,
                variantTitle: newItem.variant_title,
                content: newItem.description,
                textThemeDesktop: newItem.text_theme_desktop,
                textThemeMobile: newItem.text_theme_mobile,
                CTASet: slice.items.map((item) => {
                    const newItem = item as PosterSliceFeatureStackVideoItem;
                    return {
                        variant: newItem.button_variant?.toLowerCase(),
                        label: newItem.button_label,
                        hrefLink: newItem.button_link,
                        icon: newItem?.button_icon?.toLowerCase(),
                    };
                }),
            } as PosterItem,
        ];
    } else if (theVariant === 'features') {
        const newItem = slice.primary as PosterSliceFeaturesPrimary;

        mapping.items = [
            {
                context: newItem.context,
                title: newItem.title,
                content: newItem.description,
                titlePosition:
                    newItem.title_position?.toLowerCase() as TitlePosition,
                desktopImageLeft: newItem.desktop_image_left?.url,
                mobileImageLeft: newItem.mobile_image_left?.url,
                desktopImageRight: newItem.desktop_image_right?.url,
                mobileImageRight: newItem.mobile_image_right?.url,
                backgroundColorLeft: newItem.background_colour_left,
                backgroundColorRight: newItem.background_colour_right,
                textThemeDesktop: newItem.text_theme_desktop,
                textThemeMobile: newItem.text_theme_mobile,
                CTASet: slice.items.map((item) => {
                    const newItem = item as PosterSliceFeaturesItem;
                    return {
                        variant: newItem.button_variant?.toLowerCase(),
                        label: newItem.button_label,
                        hrefLink: newItem.button_link,
                        icon: newItem?.button_icon?.toLowerCase(),
                    };
                }),
            } as PosterItem,
        ];
    } else if (theVariant === 'featuresAlt') {
        const newItem = slice.primary as PosterSliceFeaturesAltPrimary;
        mapping.items = [
            {
                context: newItem.context,
                desktopImageLeft: newItem.desktop_image_left?.url,
                mobileImageLeft: newItem.mobile_image_left?.url,
                desktopImageRight: newItem.desktop_image_right?.url,
                mobileImageRight: newItem.mobile_image_right?.url,
                backgroundColorLeft: newItem.background_colour_left,
                backgroundColorRight: newItem.background_colour_right,
                textThemeDesktop: newItem.text_theme_desktop,
                textThemeMobile: newItem.text_theme_mobile,
                buttonPlacementImageSide: slice.items.map((item) => {
                    const newItem = item as PosterSliceFeaturesAltItem;
                    return {
                        buttonPlacement:
                            newItem.button_placement?.toLowerCase() as ButtonPlacement,
                        CTASet: [
                            {
                                variant: newItem.button_variant?.toLowerCase(),
                                label: newItem.button_label,
                                hrefLink: newItem.button_link,
                                icon: newItem?.button_icon?.toLowerCase(),
                            },
                        ],
                    };
                }),
            } as PosterItem,
        ];
    } else {
        mapping.items = slice.items.map((item) => {
            const newItem = item as PosterSliceTwoUpItem | PosterSliceOneUpItem;
            return {
                posterPosition: newItem?.poster_position,
                desktopImage: newItem.desktop_image?.url,
                mobileImage: newItem.mobile_image?.url,
                title: newItem.title,
                textThemeDesktop: newItem.text_theme_desktop,
                textThemeMobile: newItem.text_theme_mobile,
                CTASet: [
                    {
                        variant: newItem?.button_variant?.toLowerCase(),
                        label: newItem.button_label,
                        hrefLink: newItem.button_link,
                        icon: newItem?.button_icon?.toLowerCase(),
                    },
                ],
            } as PosterItem;
        });
    }

    return <Poster block={mapping} />;
};

export default withPrismic;
