import { StaticImageItem, SwiperProps } from './type';
import { ProductEdge } from 'shopify-storefront-api-typings';
import mapProductEdgeToStaticImage from '../../lib/shopify/methods/map-product-edge-to-static-image';
import SwiperProductFlatlayCollection from './SwiperProductFlatlayCollection';
import fetchCollection from '../../lib/shopify/methods/fetch-collection';

const SwiperProductFlatlaySingleCollectionVariantServer = async ({
    block,
}: SwiperProps) => {
    const { collectionHandle } = block;

    if (!collectionHandle) {
        console.log(
            'Cant render Collection Flatlay Swiper without a collection handle.'
        );
        return null;
    }
    const collectionResponse = await fetchCollection(collectionHandle, 10);
    if (!collectionResponse) {
        return null;
    }
    const products: StaticImageItem[] = collectionResponse.products.edges?.map(
        (edge: ProductEdge) => {
            return mapProductEdgeToStaticImage(edge);
        }
    );

    if (!products) return null;

    return <SwiperProductFlatlayCollection products={products} block={block} />;
};

export default SwiperProductFlatlaySingleCollectionVariantServer;
