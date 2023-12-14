import { CTAItem, ProductCardProps } from 'mmds';
import { ShopifyProduct } from '@app/lib/shopify/types/Product';

export type SwiperProps = {
    block: SwiperBlock;
};

export type SwiperProductFlatlaySingleCollectionVariantProps = SwiperProps & {
    products?: StaticImageItem[];
};

export type SwiperProductFlatlayTabbedCollectionsVariantProps = SwiperProps & {
    collections: any[];
};

export type ProductSkuFeatureSwiperProps = SwiperProps & {
    products: ProductCardProps[];
};

export type SwiperVariant =
    | 'capsule'
    | 'product_shopify'
    | 'collection'
    | 'product_feature'
    | 'product_sku_feature'
    | 'product_flatlay_single_collection'
    | 'product_flatlay_tabbed_collections'
    | 'pdp_gallery';

export type StaticImageItem = {
    desktopImage: string;
    mobileImage: string;
    link: string;
};

export type SwiperItem = {
    productCard?: ProductCardProps[];
    productImage?: StaticImageItem[];
    collectionHandle?: string;
    desktopImage?: string;
    mobileImage?: string;
    description?: string;
    CTASet?: CTAItem[];
    overlayContext?: string;
    overlayTitle?: string;
    overlayCTASet?: CTAItem[];
    sku?: string;
};

export type SwiperBlock = {
    variant: SwiperVariant;
    items: SwiperItem[];
    collectionHandle?: string;
    productCard?: ProductCardProps[];
    productImage?: StaticImageItem[];
    context: string;
    title?: string;
    description?: string;
    CTASet?: CTAItem[];
};

// Shopify Type: WIP
export type ShopifyProductCollection = {
    collection: string;
    edges: ShopifyProduct;
};

export type ShopifyProductItemEdge = {
    node: ShopifyProduct;
};
