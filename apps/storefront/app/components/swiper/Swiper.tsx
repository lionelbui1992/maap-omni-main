import { ExoticComponent, lazy, Suspense } from 'react';
import { SwiperProps } from './type';

const SwiperProductFeaturesVariant = lazy(
    () => import('./SwiperProductFeatures.variant')
);
const SwiperColVariant = lazy(() => import('./SwiperCol.variant'));
const SwiperCapsuleVariant = lazy(() => import('./SwiperCapsule.variant'));
const SwiperProductShopifyVariantServer = lazy(
    () => import('./SwiperProductShopify.variant.server')
);
const SwiperProductFlatlaySingleCollectionVariantServer = lazy(
    () => import('./SwiperProductFlatlaySingleCollection.variant.server')
);
const SwiperProductFlatlayTabbedCollectionsVariantServer = lazy(
    () => import('./SwiperProductFlatlayTabbedCollections.variant.server')
);
const SwiperProductSKUFeatureVariantServer = lazy(
    () => import('./SwiperProductSKUFeature.variant.server')
);
const SwiperPDPGalleryVariant = lazy(
    () => import('./SwiperPDPGallery.variant')
);

const Swiper = ({ block }: SwiperProps) => {
    const { variant } = block;

    let Variant: ExoticComponent<any> = SwiperProductFeaturesVariant;
    switch (variant) {
        case 'product_feature':
            Variant = SwiperProductFeaturesVariant;
            break;
        case 'collection':
            Variant = SwiperColVariant;
            break;
        case 'capsule':
            Variant = SwiperCapsuleVariant;
            break;
        case 'product_flatlay_tabbed_collections':
            Variant = SwiperProductFlatlayTabbedCollectionsVariantServer;
            break;
        case 'product_sku_feature':
            Variant = SwiperProductSKUFeatureVariantServer;
            break;
        case 'product_flatlay_single_collection':
            Variant = SwiperProductFlatlaySingleCollectionVariantServer;
            break;
        case 'product_shopify':
            Variant = SwiperProductShopifyVariantServer;
            break;
        case 'pdp_gallery':
            Variant = SwiperPDPGalleryVariant;
            break;
    }

    return (
        <Suspense fallback={<div>Loading Swiper...</div>}>
            <Variant block={block} />
        </Suspense>
    );
};

export default Swiper;
