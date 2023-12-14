import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard';
import { useShop } from '@lib/providers/ShopProvider';
import parse from 'fast-json-parse';

const AlgoliaProductHit = ({
    hit,
    unwrapped = true,
    collectionHandle,
    position,
}) => {
    const { currencyCode } = useShop();

    const siblingsString = hit?.meta?.related_products?.siblings;
    let siblingsObject = null;

    if (siblingsString) {
        const parseResult = parse(siblingsString);

        if (parseResult.err) {
            console.log('unable to parse json', parseResult.err.message);
        } else {
            siblingsObject = parseResult.value;
        }
    }

    return (
        <>
            <ProductCard
                handle={hit.handle}
                title={hit.title}
                variantTitle={hit.title}
                id={hit.id}
                productImageUrl={hit.image}
                hoverImageUrl={hit.product_image}
                price={hit.price}
                compareAtPrice={
                    hit.compare_at_price > 0 &&
                    hit.compare_at_price !== hit.price
                        ? hit.compare_at_price
                        : null
                }
                sku={hit.sku}
                tags={hit.tags}
                unwrapped={unwrapped}
                currencyCode={currencyCode}
                siblings={siblingsObject}
                altImage={hit.product_image}
                category={`Collection ${collectionHandle}`}
                position={position}
            />
        </>
    );
};

AlgoliaProductHit.propTypes = {
    hit: PropTypes.object,
    unwrapped: PropTypes.bool,
};

export default AlgoliaProductHit;
