import Billboard from './Billboard';
import {
    BillboardBlock,
    BillboardSliceCarouselItemKeyType,
    BillboardVariant,
    ContentPositionVariant,
    SizeVariant,
} from './types';
import {
    BillboardSlice,
    BillboardSliceCarouselItem,
    BillboardSliceStaticItem,
} from '../../../prismicio-types';
import { CTAIcon, CTAVariant } from 'mmds';

interface BillboardPrismicProps {
    slice: BillboardSlice;
}

const transformBillboardVariant = (billboard: string) => {
    return billboard.toLowerCase();
};

const transformContentPositionVariant = (contentPos: string | null) => {
    return contentPos
        ? (contentPos
              .toLowerCase()
              .split(' ')
              .map((s, index) => {
                  return index > 0
                      ? s.charAt(0).toUpperCase() + s.substring(1)
                      : s;
              })
              .join('') as ContentPositionVariant)
        : undefined;
};

const transformSizeVariant = (size: string | null) => {
    return size ? (size.toLowerCase() as SizeVariant) : undefined;
};

const transformCTAVariant = (ctaItemType: string) => {
    return ctaItemType?.toLowerCase() as CTAVariant;
};

const transformCTAIcon = (ctaItemType: string) => {
    return ctaItemType?.toLowerCase() as CTAIcon;
};

export const withPrismic = ({ slice }: BillboardPrismicProps) => {
    // @ts-ignore
    // To check if it for cta_static or static
    const withCta: boolean = !!slice?.items?.[0]?.button_label;

    if (!slice.variation) {
        return null;
    }
    let updateVariant: string = transformBillboardVariant(slice.variation);

    if (updateVariant === 'carousel') {
        updateVariant = 'cta_carousel';
    } else {
        updateVariant = withCta ? 'cta_static' : updateVariant;
    }

    const mapping: BillboardBlock = {
        variant: updateVariant as BillboardVariant,
        items: [],
    };
    if (['static', 'cta_static'].includes(updateVariant)) {
        mapping.items.push({
            title: slice.primary.title as string,
            titleSize: transformSizeVariant(
                slice.primary.title_size
            ) as SizeVariant,
            subTitle: slice.primary.sub_title as string,
            subTitleSize: transformSizeVariant(
                slice.primary.sub_title_size
            ) as SizeVariant,

            desktopImage: (slice.primary.desktop_image as any)?.url,
            mobileImage: (slice.primary.mobile_image as any)?.url,
            contentPosition: transformContentPositionVariant(
                slice.primary.content_position
            ),
            containImage: slice.primary.contain_around_image,

            ctaSet: slice.items.map((item: any) => {
                const newItem = item as BillboardSliceStaticItem;
                return {
                    variant: transformCTAVariant(newItem.button_variant),
                    label: newItem.button_label as string,
                    hrefLink: newItem.button_link as string,
                    icon: newItem.button_icon?.toLowerCase() as CTAIcon,
                };
            }),
        });
    } else {
        mapping.items = slice.items.map((item: any) => {
            const newItem = item as BillboardSliceCarouselItem;
            const ctaSet = [1, 2, 3].map((index) => {
                const variantKey =
                    `button_${index}_variant` as BillboardSliceCarouselItemKeyType;
                const labelKey =
                    `button_${index}_label` as BillboardSliceCarouselItemKeyType;
                const linkKey =
                    `button_${index}_link` as BillboardSliceCarouselItemKeyType;
                const iconKey =
                    `button_${index}_icon` as BillboardSliceCarouselItemKeyType;
                return {
                    variant: transformCTAVariant(newItem[variantKey] as string),
                    label: newItem[labelKey] as string,
                    hrefLink: newItem[linkKey] as string,
                    icon: transformCTAIcon(newItem[iconKey] as CTAIcon),
                };
            });
            return {
                title: newItem.title as string,
                titleSize: transformSizeVariant(
                    newItem.title_size
                ) as SizeVariant,
                subTitle: newItem.subtitle as string,
                subTitleSize: transformSizeVariant(
                    newItem.subtitle_size
                ) as SizeVariant,

                desktopImage: (newItem.desktop_image as any)?.url,
                mobileImage: (newItem.mobile_image as any)?.url,
                contentPosition: transformContentPositionVariant(
                    newItem.content_position
                ),
                ctaSet,
            };
        });
    }

    return <Billboard block={mapping} />;
};

export default withPrismic;
