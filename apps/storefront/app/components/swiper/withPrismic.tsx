import {
    SwiperSlice,
    SwiperSliceCapsuleItem,
    SwiperSliceCollectionItem,
    SwiperSliceProductFeatureItem,
    SwiperSliceProductFlatlaySingleCollectionItem,
} from '../../../prismicio-types';
import { SwiperBlock, SwiperItem, SwiperVariant } from './type';
import Swiper from './Swiper';
import { CTAIcon, CTAVariant } from 'mmds';

interface SwiperProps {
    slice: SwiperSlice;
}

const withPrismic = ({ slice }: SwiperProps) => {
    let theVariant = slice.variation as SwiperVariant;
    if (!slice.variation) {
        return null;
    }

    // @ts-ignore
    const { collection_handle, title, description } = slice.primary;

    const mapping: SwiperBlock = {
        context: slice.primary.context as string,
        variant: theVariant,
        collectionHandle: collection_handle as string,
        title: title as string,
        description: description as string,
        CTASet: [],
        items: [],
    };

    if (theVariant === 'product_feature') {
        mapping.items = slice.items.map((item: SwiperItem | any) => {
            const newItem = item as SwiperSliceProductFeatureItem;
            return {
                desktopImage: (newItem.desktop_image as any)?.url,
                mobileImage: (newItem.mobile_image as any)?.url,
                description: newItem.description as string,
            } as SwiperItem;
        });
    } else if (theVariant === 'capsule') {
        mapping.items = slice.items.map((item: SwiperItem | any) => {
            const newItem = item as SwiperSliceCapsuleItem;
            return {
                desktopImage: (newItem.desktop_image as any)?.url,
                mobileImage: (newItem.mobile_image as any)?.url,
                CTASet: [
                    {
                        variant:
                            newItem?.button_variant?.toLowerCase() as CTAVariant,
                        label: newItem?.button_label as string,
                        link: newItem?.link as string,
                        icon: newItem?.button_icon?.toLowerCase() as CTAIcon,
                    },
                ],
            } as SwiperItem;
        });
    } else if (theVariant === 'collection') {
        mapping.items = slice.items.map((item: SwiperItem | any) => {
            const newItem = item as SwiperSliceCollectionItem;
            return {
                desktopImage: (newItem.desktop_image as any).url,
                mobileImage: (newItem.mobile_image as any).url,
                overlayContext: newItem.context as string,
                overlayTitle: newItem.title as string,
                overlayCTASet: [
                    {
                        variant:
                            newItem.button_variant?.toLowerCase() as CTAVariant,
                        label: newItem.button_label as string,
                        link: newItem.link as string,
                        icon: newItem.button_icon?.toLowerCase() as CTAIcon,
                    },
                ],
            };
        });
    } else if (theVariant === 'product_flatlay_single_collection') {
        mapping.CTASet = slice.items.map((item: any) => {
            const newItem =
                item as SwiperSliceProductFlatlaySingleCollectionItem;
            return {
                variant: newItem.button_variant?.toLowerCase() as CTAVariant,
                label: newItem.button_label as string,
                link: newItem.button_link as string,
                icon: newItem.button_icon?.toLowerCase() as CTAIcon,
            };
        });
    } else if (theVariant === 'product_flatlay_tabbed_collections') {
        mapping.items = slice.items.map((item: any) => {
            return {
                collectionHandle: item.collection_handle as string,
                description: item.description as string,
                CTASet: [
                    {
                        variant:
                            item.button_1_variant?.toLowerCase() as CTAVariant,
                        label: item.button_1_label as string,
                        link: item.button_1_link as string,
                        icon: item.button_1_icon?.toLowerCase() as CTAIcon,
                    },
                    {
                        variant:
                            item.button_2_variant?.toLowerCase() as CTAVariant,
                        label: item.button_2_label as string,
                        link: item.button_2_link as string,
                        icon: item.button_2_icon?.toLowerCase() as CTAIcon,
                    },
                    {
                        variant:
                            item.button_3_variant?.toLowerCase() as CTAVariant,
                        label: item.button_3_label as string,
                        link: item.button_3_link as string,
                        icon: item.button_3_icon?.toLowerCase() as CTAIcon,
                    },
                ],
            };
        });
    } else if (theVariant === 'product_sku_feature') {
        mapping.items = slice.items.map((item: any) => {
            return {
                sku: item.sku as string,
            };
        });
    }

    return <Swiper block={mapping} />;
};

export default withPrismic;
