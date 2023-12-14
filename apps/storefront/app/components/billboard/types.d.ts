import { BillboardSliceCarouselItem } from '../../../prismicio-types';
import { CTASet } from 'mmds';

export type BillboardProps = {
    block: BillboardBlock;
};

export type BillboardVariant = 'static' | 'cta_static' | 'cta_carousel';
export type SizeVariant = 'small' | 'medium' | 'large';
export type IconVariant = 'globe' | 'discover' | 'northeast' | 'right' | 'left';
export type ContentPositionVariant = 'bottomLeft' | 'center';

export type BillboardSliceCarouselItemKeyType =
    keyof BillboardSliceCarouselItem;

type Created = {
    variant: BillboardVariant;
    items: BillboardBlockItem[];
};
export type BillboardBlock = Created;

export type BillboardBlockItem = {
    title: string;
    titleSize?: SizeVariant;
    subTitle?: string;
    subTitleSize?: SizeVariant;
    desktopImage: string;
    mobileImage: string;
    contentPosition?: ContentPositionVariant;
    ctaSet?: CTASet;
    containImage?: boolean;
};
