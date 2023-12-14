import React from 'react';
import { ProductEdge } from 'shopify-storefront-api-typings';
import { SwiperItem, SwiperProps } from './type';
import SwiperProductFlatlayTabbedCollectionsVariant from './SwiperProductFlatlayTabbedCollections.variant';
import fetchCollection from '../../lib/shopify/methods/fetch-collection';
import mapProductEdgeToStaticImage from '../../lib/shopify/methods/map-product-edge-to-static-image';

const SwiperProductFlatlayTabbedCollectionsVariantServer = async ({
    block,
}: SwiperProps) => {
    const { items } = block;
    const collectionHandles = items?.map((item: SwiperItem) => {
        return item.collectionHandle;
    });

    if (!collectionHandles.length) {
        console.log(
            'Cant render Tabbed Flatlay Collection Swiper without a collection handle(s).'
        );
        return null;
    }

    const mappedProductsPromise = (handle: string) => {
        return new Promise(async (resolve, reject) => {
            const collectionResponse = await fetchCollection(handle, 10);
            if (!collectionResponse) {
                reject([]);
                return null;
            }
            resolve({
                handle,
                products: collectionResponse.products.edges.map(
                    (edge: ProductEdge) => mapProductEdgeToStaticImage(edge)
                ),
            });
        });
    };

    const collections = await Promise.all(
        collectionHandles.map((handle: string) => mappedProductsPromise(handle))
    );

    return (
        <SwiperProductFlatlayTabbedCollectionsVariant
            collections={collections}
            block={block}
        />
    );
};

export default SwiperProductFlatlayTabbedCollectionsVariantServer;
