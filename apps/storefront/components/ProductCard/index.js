import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import { useEvent } from '@lib/providers/EventsProvider';
import { breakpointMedium, breakpointSmall } from 'config/styles/breakpoints';
import { brandBlack } from 'config/styles/colours';
import Pricing from 'components/Pricing';
import ProductBadges from 'components/ProductBadges';
import ProductCardSiblings from 'components/ProductCardSiblings';
import PlaceHolder from './PLACEHODER-IMAGE_1280x1800.jpg';
import { getCountrySpecificUrl } from 'helpers/linkHelper';
import Link from 'next/link';
import shopifyCdnImageLoader from '@lib/shopify-cdn-image-loader';

const ProductCard = ({
    id,
    handle,
    title,
    price,
    sku,
    compareAtPrice,
    tags,
    currencyCode,
    siblings,
    productImageUrl,
    hoverImageUrl,
    category,
    variantTitle,
    position,
    nostoProductCardAttributes,
}) => {
    if (!handle || !price) {
        return null;
    }

    const [hovered, setHovered] = useState(false);
    const { event } = useEvent();

    let mainProductImage = productImageUrl;
    let hoverProductImage = hoverImageUrl;

    if (!mainProductImage) {
        mainProductImage =
            '/images/placeholders/PLACEHOLDER-IMAGE_1280x1800.jpg';
    }

    if (!hoverProductImage) {
        hoverProductImage =
            '/images/placeholders/PLACEHOLDER-IMAGE_1280x1800.jpg';
    }

    const eventDetails = {
        id,
        sku,
        title,
        category,
        price,
        productCurrency: currencyCode,
        variant: variantTitle,
        position,
        handle,
    };

    useEffect(() => {
        event('ProductImpression', eventDetails);
    }, [sku]);

    const onClick = () => {
        event('ClickProductCard', eventDetails);

        if (nostoProductCardAttributes?.isNostoProductCard === true) {
            typeof window !== 'undefined' &&
                typeof nostojs === 'function' &&
                nostojs((api) => {
                    api.defaultSession()
                        .viewProduct(id.split('/').slice(-1)[0]) // id of product currently being viewed
                        .setRef(
                            id.split('/').slice(-1)[0],
                            nostoProductCardAttributes.result_id
                        ) // id of product and slot that resulted in the product view
                        .setPlacements([nostoProductCardAttributes.result_id]) // placements to request content for on the product page
                        .load()
                        .then((data) => {
                            // console.log(data);
                        });
                });
        }
    };

    const productImageStyles = css.resolve`
        div {
            cursor: pointer;
            -webkit-overflow-scrolling: touch;
        }
        img {
            width: 100%;
            cursor: pointer;
            -webkit-overflow-scrolling: touch;
        }
    `;

    const pricingStyles = css.resolve`
        div {
            font-size: 0.9em;
            font-weight: 500;
        }
    `;

    const nowSale =
        compareAtPrice &&
        price &&
        parseFloat(compareAtPrice) > parseFloat(price)
            ? 'Now'
            : '';

    return (
        <>
            <article
                className="product_card"
                onMouseOut={() => setHovered(false)}
                onMouseOver={() => setHovered(true)}
            >
                <div className="imageContainer">
                    <Link
                        id={`product_${handle}`}
                        href={getCountrySpecificUrl(`/products/${handle}`)}
                        legacyBehavior
                    >
                        <a onClick={onClick} className="product_card__link">
                            <div className="badges">
                                {tags && <ProductBadges tags={tags} />}
                            </div>
                            <div
                                className={`imageAlt${
                                    !hovered ? ' active' : ''
                                }`}
                            >
                                <Image
                                    loader={shopifyCdnImageLoader}
                                    className={`${productImageStyles.className}`}
                                    src={mainProductImage}
                                    alt={title}
                                    width={354}
                                    height={500}
                                    placeholder="blur"
                                    blurDataURL={PlaceHolder.blurDataURL}
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    quality={70}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                    }}
                                />
                            </div>
                            <div
                                className={`imageAlt${
                                    hovered ? ' active' : ''
                                }`}
                            >
                                <Image
                                    loader={shopifyCdnImageLoader}
                                    className={`${productImageStyles.className} smallOnly`}
                                    src={hoverProductImage}
                                    alt={title}
                                    width={354}
                                    height={500}
                                    placeholder="blur"
                                    blurDataURL={PlaceHolder.blurDataURL}
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    quality={65}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                    }}
                                />
                            </div>
                        </a>
                    </Link>
                    <div className="siblings smallOnly">
                        <ProductCardSiblings
                            siblings={siblings}
                            selectedProductHandle={handle}
                            keyIndex={`${title}--SwatchColor-SmallScreen`}
                        />
                    </div>
                    <div className="productDetails largeOnly">
                        <div className="productMeta">
                            <Link
                                id={`product_${handle}`}
                                href={getCountrySpecificUrl(
                                    `/products/${handle}`
                                )}
                                legacyBehavior
                            >
                                <a
                                    onClick={onClick}
                                    className="product_card__link"
                                >
                                    <div className="product_card__title">
                                        {title}
                                    </div>
                                    <span className="badge red">
                                        {nowSale}{' '}
                                    </span>
                                    <Pricing
                                        className={pricingStyles.className}
                                        previousPrice={compareAtPrice}
                                        currentPrice={price}
                                    />
                                </a>
                            </Link>
                        </div>
                        {siblings && (
                            <div className="siblings largeOnly">
                                <ProductCardSiblings
                                    siblings={siblings}
                                    selectedProductHandle={handle}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="productDetails smallOnly">
                    <div className="productMeta">
                        <Link
                            id={`product_${handle}`}
                            href={getCountrySpecificUrl(`/products/${handle}`)}
                            legacyBehavior
                        >
                            <a className="product_card__link" onClick={onClick}>
                                <div className="product_card__title">
                                    {title}
                                </div>
                                <span className="badge red">{nowSale}</span>
                                <Pricing
                                    className={pricingStyles.className}
                                    previousPrice={compareAtPrice}
                                    currentPrice={price}
                                />
                            </a>
                        </Link>
                    </div>
                </div>
            </article>
            {productImageStyles.styles}
            {pricingStyles.styles}
            <style jsx>
                {`
                    .product_card {
                        flex-direction: column;
                        padding: 0;
                        position: relative;
                        display: flex;
                        flex: 1;
                    }
                    .product_card__link {
                        text-decoration: none;
                        color: ${brandBlack};
                        flex: 1;
                    }
                    .badges {
                        position: absolute;
                        top: 0;
                        padding: 15px 25px;
                        z-index: 1;
                    }
                    .red {
                        color: red;
                    }
                    .blue {
                        color: blue;
                    }
                    .productDetails {
                        width: 100%;
                        bottom: 0;
                        display: flex;
                        cursor: pointer;
                        justify-content: space-between;
                        box-sizing: border-box;
                    }
                    .productMeta {
                        flex: 6;
                    }

                    .siblings {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        justify-content: flex-end;
                        flex: 4;
                        bottom: 15px;
                    }
                    .imageAlt {
                        visibility: hidden;
                        opacity: 0;
                        height: 0;
                        transition: opacity 0.3s ease-in;
                    }
                    .imageAlt.active {
                        visibility: visible;
                        height: initial;
                        opacity: 1;
                    }
                    @media only screen and (min-width: ${breakpointMedium}) {
                        .productDetails {
                            position: absolute;
                            padding: 20px 25px;
                        }
                        .largeOnly {
                            display: flex;
                        }
                        .smallOnly {
                            display: none;
                        }
                    }
                    @media only screen and (max-width: ${breakpointMedium}) {
                        .largeOnly {
                            display: none;
                        }
                        .smallOnly {
                            display: flex;
                        }
                        .productMeta {
                            flex: 1 0 100%;
                            order: 2;
                            padding: 10px 15px 15px 20px;
                            background-color: rgb(237, 237, 237);
                        }
                        .siblings {
                            order: 1;
                            margin: 0 20px;
                            flex: 1 0 100%;
                            justify-content: flex-start;
                            position: absolute;
                            bottom: 12px;
                        }
                        .productDetails {
                            flex-direction: column;
                            padding: 0;
                        }
                        .imageContainer {
                            position: relative;
                        }
                    }
                    @media only screen and (min-width: ${breakpointSmall}) {
                    }
                    @media only screen and (max-width: ${breakpointSmall}) {
                        .siblings {
                            bottom: 8px;
                        }
                    }
                    @media only screen and (min-width: ${breakpointMedium}) {
                        .product_card__colour {
                            width: 40%;
                            justify-content: flex-end;
                        }
                    }
                    .product_card__title {
                        padding: 5px 0 3px 0;
                        line-height: 1.3em;
                    }
                    .product_card__hidden {
                        display: none;
                    }
                    .product_card__colour {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                    }
                    .product_card__swatch_container {
                        display: flex;
                        justify-content: center;
                        padding: 5px;
                    }
                    .product_card__swatch {
                        border-radius: 20px;
                        width: 20px;
                        height: 20px;
                    }
                `}
            </style>
        </>
    );
};

ProductCard.propTypes = {
    id: PropTypes.any,
    handle: PropTypes.string,
    title: PropTypes.string,
    productImageUrl: PropTypes.string,
    hoverImageUrl: PropTypes.string,
    price: PropTypes.any,
    compareAtPrice: PropTypes.any,
    tags: PropTypes.array,
    currencyCode: PropTypes.string,
    siblings: PropTypes.array,
    category: PropTypes.string,
    sku: PropTypes.string,
};

ProductCard.defaultProps = {
    id: null,
    handle: null,
    title: null,
    hoverImageUrl: null,
    compareAtPrice: null,
    productImageUrl: null,
    price: null,
    tags: null,
    currencyCode: null,
    siblings: null,
    category: null,
    sku: null,
};

export default ProductCard;
