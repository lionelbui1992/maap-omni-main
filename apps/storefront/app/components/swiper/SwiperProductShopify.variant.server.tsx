import { Suspense } from 'react';
import { ProductEdge } from 'shopify-storefront-api-typings';
import { SwiperProps } from './type';
import mapProductEdgeToProductCard from '../../lib/shopify/methods/map-product-edge-to-product-card';
import SwiperProductShopifyVariant from './SwiperProductShopify.variant';
import fetchCollection from '../../lib/shopify/methods/fetch-collection';
import { ProductCardProps } from 'mmds';

const SwiperProductShopifyVariantServer = async ({ block }: SwiperProps) => {
    const { context, collectionHandle } = block;
    if (!collectionHandle) {
        console.log(
            'Cant render a Collection Swiper without a collection handle.'
        );
        return null;
    }
    const collectionResponse = await fetchCollection(collectionHandle, 5);
    if (!collectionResponse) {
        return null;
    }
    const products: ProductCardProps[] = collectionResponse.products.edges?.map(
        (edge: ProductEdge) => {
            return mapProductEdgeToProductCard(edge);
        }
    );
    if (!products) return null;
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SwiperProductShopifyVariant
                products={products}
                context={context}
            />
        </Suspense>
    );
};

export default SwiperProductShopifyVariantServer;
