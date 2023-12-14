import React from 'react';
import { breakpointMedium, breakpointLarge } from 'config/styles/breakpoints';
import ProductDesktopImages from 'components/ProductDesktopImages';
import ProductDetails from 'containers/Product/ProductDetails';
import ProductImageSwiper from 'containers/Product/ProductImageSwiper';
import { productImagesByPath } from '@lib/productImageUtils';
import Head from 'containers/Head';

const Header = ({
    product,
    imagery,
    url,
    isMobile,
    isTablet,
    seoValues,
    selectedVariant,
    structuredVariants,
    onSelectVariant,
}) => {
    const mobileHeroImages = [
        productImagesByPath(imagery, 'pdp.hero.01.mobile'),
        productImagesByPath(imagery, 'pdp.hero.02.mobile'),
    ];

    const ogImage =
        mobileHeroImages && mobileHeroImages.length
            ? mobileHeroImages?.[0]?.[0]?.src
            : null;

    const productImages = [
        productImagesByPath(imagery, 'pdp.hero.01.desktop'),
        productImagesByPath(imagery, 'pdp.additional.images.01.desktop'),
        productImagesByPath(imagery, 'pdp.specs.03.desktop'),
        productImagesByPath(imagery, 'pdp.additional.images.02.desktop'),
        productImagesByPath(imagery, 'pdp.specs.01.desktop.variant.02'),
        productImagesByPath(imagery, 'pdp.specs.02.desktop'),
    ];

    return (
        <>
            <section>
                <Head
                    title={seoValues.title}
                    description={seoValues.description}
                    ogImage={ogImage}
                    url={url}
                    canonicalUrl={`/products/${product.handle}`}
                />
                {productImages && (
                    <div className="mobileImages">
                        <ProductImageSwiper images={productImages} />
                    </div>
                )}
                <div className="column desktopImages float-left-lg">
                    <div className="imageContainer">
                        {productImages && (
                            <ProductDesktopImages images={productImages} />
                        )}
                    </div>
                </div>
                <div className="column productDetails">
                    <ProductDetails
                        product={product}
                        structuredVariants={structuredVariants}
                        selectedVariant={selectedVariant}
                        onSelectVariant={onSelectVariant}
                        isMobile={isMobile}
                        isTablet={isTablet}
                    />
                </div>
            </section>
            <style jsx>
                {`
                    section {
                        display: flex;
                        background-color: rgba(247, 247, 247, 1);
                    }

                    .column {
                        display: flex;
                        justify-content: space-around;
                    }

                    .desktopImages {
                        width: 60%;
                    }

                    .imageContainer {
                        display: flex;
                        flex: 1;
                        flex-direction: column;
                        max-width: 1280px;
                        background-color: rgba(247, 247, 247, 1);
                    }

                    @media (min-width: ${breakpointMedium}) {
                        .productDetails {
                            display: block;
                            top: 55px;
                            position: sticky;
                            height: min-content;
                            width: 40%;
                            background-color: rgba(247, 247, 247, 1);
                            margin: 0 auto;
                        }
                    }

                    @media (max-width: ${breakpointMedium}) {
                        .column {
                            flex: 1;
                        }

                        section {
                            flex-direction: column;
                        }

                        .desktopImages {
                            display: none;
                        }

                        .mobileImages {
                            display: block;
                        }
                    }

                    @media (min-width: ${breakpointMedium}) {
                        .mobileImages {
                            display: none;
                        }
                    }

                    @media (min-width: ${breakpointLarge}) {
                        .float-left-lg {
                            justify-content: flex-start;
                        }
                        .imageContainer {
                            max-width: 1280px;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default Header;
