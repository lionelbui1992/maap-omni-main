import React from 'react';
import ProductImageSwiper from '@containers/Bundler/ProductImageSwiper';
import { useBundler } from '@containers/Bundler/Provider/BundlerProvider';
import { breakpointMedium } from 'config/styles/breakpoints';
import BundlerLoader from '@containers/Bundler/BundlerLoader';

const BundlerProductImageCarousel = () => {
    const { isFetching, selectedProduct } = useBundler();

    if (isFetching) {
        return <BundlerLoader numberOfImages={1} width={1280} height={1600} />;
    }

    if (!selectedProduct)
        return <BundlerLoader numberOfImages={1} width={1280} height={1600} />;

    const selectedProductImages = selectedProduct?.images?.edges;

    return (
        <>
            <div className="bundler-product-carousel-image">
                <div className="bundler-product-carousel-image__desktop">
                    <ProductImageSwiper productImages={selectedProductImages} />
                </div>
            </div>
            <style jsx>
                {`
                    .bundler-product-carousel-image {
                        display: flex;
                        flex: 1;
                        width: 30%;
                        align-items: baseline;
                    }
                    .bundler-product-carousel-image__desktop {
                        display: flex;
                        flex: 1;
                        width: 30%;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .bundler-product-carousel-image {
                            width: auto;
                        }
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .bundler-product-carousel-image__desktop .swiper {
                        z-index: 0;
                    }
                    .bundler-product-carousel-image__desktop
                        .swiper-button-next:after,
                    .bundler-product-carousel-image__desktop
                        .swiper-button-prev:after {
                        display: inherit;
                        font-size: 12px !important;
                    }
                    .bundler-product-carousel-image__desktop
                        .swiper-button-next,
                    .bundler-product-carousel-image__desktop
                        .swiper-button-prev {
                        top: 96.5% !important;
                        color: black;
                        z-index: 11 !important;
                    }
                    .bundler-product-carousel-image__desktop
                        .swiper-button-prev,
                    .swiper-rtl .swiper-button-next {
                        left: 88% !important;
                    }
                    .bundler-product-carousel-image__desktop
                        .swiper-horizontal
                        > .swiper-pagination-bullets,
                    .swiper-pagination-bullets.swiper-pagination-horizontal,
                    .swiper-pagination-custom,
                    .swiper-pagination-fraction {
                        bottom: 14px !important;
                    }
                    @media (max-width: 1440px) {
                        .bundler-product-carousel-image__desktop
                            .swiper-horizontal
                            > .swiper-pagination-bullets,
                        .swiper-pagination-bullets.swiper-pagination-horizontal,
                        .swiper-pagination-custom,
                        .swiper-pagination-fraction {
                            bottom: 10px !important;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default BundlerProductImageCarousel;
