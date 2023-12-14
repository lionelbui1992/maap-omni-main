import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import PlaceHolder from '../PLACEHODER-IMAGE_640x800.jpg';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import shopifyCdnImageLoader from '@lib/shopify-cdn-image-loader';

const FALLBACK_IMAGE_WIDTH = 1000;
const FALLBACK_IMAGE_HEIGHT = 1250;

const ProductImageSwiper = ({ images }) => {
    const productImages = images?.map((image, index) => {
        if (!image?.[0]?.src) return null;
        const width = image?.[0]?.width || FALLBACK_IMAGE_WIDTH;
        const height = image?.[0]?.height || FALLBACK_IMAGE_HEIGHT;
        const priority = index === 0;

        return (
            <div style={{ width: '100%' }}>
                <Image
                    loader={shopifyCdnImageLoader}
                    src={image?.[0]?.src}
                    key={image?.[0]?.src}
                    alt={image?.[0]?.alt}
                    width={width}
                    height={height}
                    sizes="(max-width: 991px) 100vw"
                    placeholder={'blur'}
                    blurDataURL={PlaceHolder.blurDataURL}
                    quality={80}
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                    }}
                />
            </div>
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
                {productImages &&
                    productImages?.map((productImage, key) => {
                        if (!productImage) return null;
                        return (
                            <SwiperSlide key={key}>{productImage}</SwiperSlide>
                        );
                    })}
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
