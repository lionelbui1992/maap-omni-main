'use client';

import { SwiperSlide } from 'swiper/react';
import ScrollBarSwiper from '../../components/scrollbar-swiper';
import { Left, ProductCard, ProductCardProps, Right, slugify } from 'mmds';
import s from './Swiper.module.css';

const SwiperProductShopifyVariant = ({ products, context }) => {
    return (
        <div className={s.swiperRoot}>
            <div className={s.contextContainer}>
                <div className={s.context}>{context}</div>
                {products.length > 3 && (
                    <div className={s.iconContainer}>
                        <div className="swiper-button swiper-icon-prev-5">
                            <Left />
                        </div>
                        <div className="swiper-button swiper-icon-next-5">
                            <Right />
                        </div>
                    </div>
                )}
            </div>
            <ScrollBarSwiper
                className="swiper5"
                slidePerViewInMobile={1.99}
                slidePerViewInDesktop={4.35}
                spaceBetweenDesktop={12}
                spaceBetweenMobile={8}
                swiperIconNextClassName="swiper-icon-next-5"
                swiperIconPrevClassName="swiper-icon-prev-5"
            >
                {products?.map((product: ProductCardProps, index: number) => {
                    const identifier = `product_swiper_${slugify(context)}`;
                    return (
                        <SwiperSlide key={index} data-testid={identifier}>
                            <ProductCard
                                variant={product.variant}
                                product={product.product}
                                coloursCount={product.coloursCount}
                                label={product.label}
                                saved={product.saved}
                                backgroundColour={product.backgroundColour}
                            />
                        </SwiperSlide>
                    );
                })}
            </ScrollBarSwiper>
        </div>
    );
};

export default SwiperProductShopifyVariant;
