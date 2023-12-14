import React, { useState } from 'react';
import { withRouter } from 'next/router';
import { breakpointSmall } from 'config/styles/breakpoints';
import Pricing from 'components/Pricing';
import ProductRating from 'components/ProductRating';
import { getShortDescription } from '@containers/Product/helpers';

const ProductSummary = ({ variant, product }) => {
    if (!product) return null;

    const [readMore, setReadMore] = useState(false);

    const comparedPrice = variant?.compareAtPriceV2?.amount || 0.0;
    const price = parseFloat(variant?.priceV2?.amount);
    const compareAtPrice =
        parseFloat(comparedPrice) > 0 && parseFloat(comparedPrice) !== price
            ? parseFloat(comparedPrice)
            : null;

    const shortDescription = getShortDescription(product);

    // const shortDescription = (() => {
    //     const metafield = product?.metafields?.edges?.find(
    //         (edge) =>
    //             edge.node.namespace === 'product' &&
    //             edge.node.key === 'short_description'
    //     );
    //
    //     return metafield ? metafield?.node.value : '';
    // })();

    const nowSale =
        compareAtPrice && price && compareAtPrice > price ? 'Now' : '';
    const readLess = shortDescription.split('</br>')[1];
    const linkText = readMore ? '< Read Less' : 'Read More >';
    const dots = !readMore ? '...' : '';

    const variantSkus = product?.variants?.edges
        .map((edge) => edge.node.sku)
        .filter(Boolean);

    return (
        <div className="product_summary">
            <h1 className="product_summary__title heading_style__primary">
                {product.title ? product.title : null}
            </h1>
            {shortDescription && (
                <p>
                    {shortDescription.split('</br>')[0]}
                    {dots}
                    {readMore && readLess}
                    <a
                        className="product_summary__expand_link"
                        onClick={() => {
                            setReadMore(!readMore);
                        }}
                    >
                        {linkText}
                    </a>
                </p>
            )}
            <div className="product__price_and_currency_container">
                <div className="product_summary__pricing">
                    <span className="product_summary__pricing_label">
                        {nowSale}{' '}
                    </span>
                    <Pricing
                        currentPrice={price}
                        previousPrice={compareAtPrice}
                    />
                </div>
                {!!variantSkus && (
                    <ProductRating
                        key={`ratings-widget-${product.id}`}
                        variantSkus={variantSkus}
                        productID={product.id}
                    />
                )}
            </div>
            <style jsx global>
                {`
                    .product_summary > p {
                        margin: 0;
                        font-size: 1.23em;
                    }
                `}
            </style>
            <style jsx>
                {`
                    .product_summary {
                        display: flex;
                        flex-direction: column;
                        margin: 0;
                        padding-bottom: 10px;
                    }
                    .product_summary__title {
                        padding-bottom: 15px;
                    }
                    .product_summary__expand_link {
                        text-decoration: underline;
                        text-underline-position: under;
                        text-decoration-thickness: 1px;
                        text-underline-offset: -2px;
                        text-align: left;
                        padding: 5px 0 10px 10px;
                        cursor: pointer;
                    }
                    .product__price_and_currency_container {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        padding-top: 15px;
                    }
                    .pricing-product_payment_price {
                        padding: 0 5px;
                    }
                    .product__currency {
                        padding: 2px 5px 0 0;
                        color: rgb(66, 66, 66);
                    }
                    .product__payment_images {
                        display: flex;
                        padding: 3px 3.2px 0 3.2px;
                    }
                    .product_payment_image_container {
                        display: flex;
                        flex-direction: row;
                    }
                    .product__payment {
                        display: flex;
                        padding-top: 15px;
                        padding-bottom: 12px;
                    }
                    .product__payment_image {
                        padding: 12px 0 10px 4px;
                    }
                    @media (max-width: ${breakpointSmall}) {
                        .product_payment_image_container {
                            flex-wrap: wrap;
                        }
                        .product__payment_image {
                            padding: 0;
                        }
                    }
                    .product_summary__rating {
                        font-size: 1.2em;
                        letter-spacing: 0.1em;
                    }
                `}
            </style>
        </div>
    );
};

export default ProductSummary;
