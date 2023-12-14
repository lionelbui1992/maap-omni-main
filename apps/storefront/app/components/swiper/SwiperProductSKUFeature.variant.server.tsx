import { SwiperItem, SwiperProps } from './type';
import SwiperProductSKUFeatureVariant from '../../components/swiper/SwiperProductSKUFeature.variant';
import fetchProduct from '../../lib/shopify/methods/fetch-product';
import mapProductEdgeToProductCard from '../../lib/shopify/methods/map-product-edge-to-product-card';
import { ProductCardProps } from 'mmds';

const SwiperProductSKUFeatureVariantServer = async ({ block }: SwiperProps) => {
    const { items } = block;
    const productHandles = items?.map((item: SwiperItem) => {
        return item.sku;
    });

    const mappedProductPromise = (
        handle: string
    ): Promise<ProductCardProps> => {
        return new Promise(async (resolve, reject) => {
            const product = await fetchProduct(handle);
            if (!product) {
                reject([]);
                return null;
            }
            const mappedProduct: ProductCardProps = mapProductEdgeToProductCard(
                {
                    node: product,
                    cursor: '',
                }
            );
            resolve(mappedProduct);
        });
    };

    const products: ProductCardProps[] = await Promise.all(
        productHandles.map((handle: string) => mappedProductPromise(handle))
    );

    if (!products) return null;
    return <SwiperProductSKUFeatureVariant products={products} block={block} />;
};

export default SwiperProductSKUFeatureVariantServer;
