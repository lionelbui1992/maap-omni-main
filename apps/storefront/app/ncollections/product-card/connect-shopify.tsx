import React from 'react';
import { ProductCardProduct, PhotoVariant } from 'mmds';
import { Product } from 'shopify-storefront-api-typings';
import mapProductEdgeToProductCard from '@app/lib/shopify/methods/map-product-edge-to-product-card';

type ConnectedProductCardProps = {
    product: ProductCardProduct;
};

export default function connectShopify<P>(
    ProductCard: React.ComponentType<P & ConnectedProductCardProps>
) {
    const ConnectedProductCard = ({
        product,
        photoVariant,
        ...rest
    }: {
        product: Product;
        photoVariant?: PhotoVariant;
    }) => {
        const mappedProduct = mapProductEdgeToProductCard({
            node: product,
            cursor: '',
        });

        return (
            <ProductCard
                {...mappedProduct}
                photoVariant={photoVariant}
                {...(rest as P)}
            />
        );
    };

    ConnectedProductCard.displayName = `connectedProductCard`;

    return ConnectedProductCard;
}
