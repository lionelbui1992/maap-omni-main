import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { productImagesByPath, reformatImageSet } from '@lib/productImageUtils';
import SwiperSlidesReset from '@containers/Bundler/ProductImageSwiper/SwiperSlides';
import PlaceHolder from './PLACEHODER-IMAGE_1280x1800.jpg';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ProductImageSwiper = ({ productImages }) => {
    productImages = reformatImageSet(productImages);
    const productImagesExtract = [
        productImagesByPath(productImages, 'pdp.hero.01.desktop'),
        productImagesByPath(productImages, 'pdp.additional.images.01.desktop'),
        productImagesByPath(productImages, 'pdp.specs.03.desktop'),
        productImagesByPath(productImages, 'pdp.additional.images.02.desktop'),
        productImagesByPath(productImages, 'pdp.specs.01.desktop.variant.02'),
        productImagesByPath(productImages, 'pdp.specs.02.desktop'),
    ];

    const swiperImageComponents = productImagesExtract?.map((image, index) => {
        if (!image?.[0]?.src) return null;
        return (
            <Image
                key={index}
                src={image?.[0]?.src}
                width={1280}
                height={1600}
                placeholder={'blur'}
                blurDataURL={PlaceHolder.blurDataURL}
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                }}
                alt="product-swiper-image"
            />
        );
    });

    return (
        <>
            <Swiper
                pagination={{
                    type: 'fraction',
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper mobileSwiper"
            >
                {swiperImageComponents.map((imageElement, key) => {
                    if (!imageElement) return null;
                    return <SwiperSlide key={key}>{imageElement}</SwiperSlide>;
                })}
                <SwiperSlidesReset productImages={productImages} />
            </Swiper>
            <style jsx global>
                {`
                    .mobileSwiper .swiper {
                        width: 100%;
                        height: 100%;
                        z-index: 0;
                        background-color: rgb(224, 228, 227);
                    }
                    .swiper-slide {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .swiper-slide img {
                        display: block;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                    .swiper-pagination {
                        text-align: left;
                        padding-left: 16px;
                    }
                    .mobileSwiper .swiper-button-next:after,
                    .mobileSwiper .swiper-button-prev:after {
                        display: none;
                    }
                `}
            </style>
        </>
    );
};

export default ProductImageSwiper;
