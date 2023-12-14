import { CTASet } from 'mmds';

export type Image = {
    desktopImage: string;
    mobileImage: string;
};

export type FeatureStackItem = {
    productThumbnail: string;
    productImage: Image;
    description: string;
    backgroundColor: string;
};

export type TitlePosition = 'top' | 'bottom';
export type ButtonPlacement = 'left' | 'right';

export type ButtonControl = {
    buttonPlacement?: ButtonPlacement;
    CTASet?: CTASet;
};

export type PosterItem = {
    posterPosition?: string;
    backgroundColor?: string;
    title?: string;
    content?: string;
    context?: string;
    desktopImage?: string;
    mobileImage?: string;
    desktopVideoURL?: string;
    mobileVideoURL?: string;
    variantImage?: string;
    variantTitle?: string;
    productTitle?: string;
    featureStack?: FeatureStackItem[];
    CTASet?: CTASet;
    titlePosition?: TitlePosition;
    backgroundColorLeft?: string;
    desktopImageLeft?: string;
    mobileImageLeft?: string;
    backgroundColorRight?: string;
    desktopImageRight?: string;
    mobileImageRight?: string;
    buttonPlacementImageSide?: ButtonControl[];
    textThemeDesktop?: boolean;
    textThemeMobile?: boolean;
};

export type PosterVariant =
    | 'oneUp'
    | 'twoUp'
    | 'feature'
    | 'featureStack'
    | 'featureStackVideo'
    | 'features'
    | 'featuresAlt';

export type PostersBlock = {
    variant: PosterVariant;
    items: PosterItem[];
};

export type PosterProps = {
    block: PostersBlock;
};
