import React, { useContext } from 'react';
import { withRouter } from 'next/router';
import { useShop } from '@lib/providers/ShopProvider';
import ProductCard from '../ProductCard';
import parse from 'fast-json-parse';

const ShopifyProductCard = ({
    product,
    category,
    unwrapped = false,
    nostoProductCardAttributes,
}) => {
    if (!product) return null;
    const { currencyCode } = useShop();

    const defaultVariant = product?.variants?.edges[0].node;

    const compareAtPrice =
        defaultVariant.compare_at_price > 0 &&
        defaultVariant.compare_at_price !== defaultVariant.price
            ? defaultVariant.compare_at_price
            : null;

    let siblings = [];

    if (product.metafields) {
        const metafield = product.metafields
            .filter((metafield) => !!metafield)
            .find(
                (metafield) =>
                    metafield.namespace === 'related_products' &&
                    metafield.key === 'siblings'
            );

        if (metafield) {
            const parseResult = parse(metafield.value);

            if (parseResult.err) {
                console.log('unable to parse json', parseResult.err.message);
            } else {
                siblings = parseResult.value;
            }
        }
    }

    const firstImage = defaultVariant?.image?.transformedSrc;
    const altImage = product?.images?.edges[0]?.node?.transformedSrc;

    return (
        <ProductCard
            id={product.id}
            handle={product.handle}
            title={product.title}
            productImageUrl={firstImage}
            hoverImageUrl={altImage}
            price={defaultVariant?.priceV2?.amount}
            compareAtPrice={
                defaultVariant?.compareAtPriceV2?.amount ||
                nostoProductCardAttributes?.list_price
            }
            sku={defaultVariant.sku}
            variantTitle={defaultVariant.title}
            tags={product.tags}
            unwrapped={unwrapped}
            currencyCode={currencyCode}
            siblings={siblings}
            category={category}
            nostoProductCardAttributes={nostoProductCardAttributes}
        />
    );
};

export default withRouter(ShopifyProductCard);
