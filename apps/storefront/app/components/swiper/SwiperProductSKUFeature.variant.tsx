'use client';

import { ProductSkuFeatureSwiperProps } from './type';
import { SwiperSlide } from 'swiper/react';
import ScrollBarSwiper from '../../components/scrollbar-swiper';
import { Left, ProductCard, ProductCardProps, Right, slugify } from 'mmds';
import s from './Swiper.module.css';

const SwiperProductSKUFeatureVariant = ({
    block,
    products,
}: ProductSkuFeatureSwiperProps) => {
    const { context, title } = block;
    if (!products) return null;
    return (
        <div className={s.swiperRoot}>
            <div className={s.contextContainer}>
                <div className={s.context}>{context}</div>
                {products?.length > 3 && (
                    <div className={s.iconContainer}>
                        <div className="swiper-button swiper-icon-prev-8">
                            <Left />
                        </div>
                        <div className="swiper-button swiper-icon-next-8">
                            <Right />
                        </div>
                    </div>
                )}
            </div>
            {title && <div className={s.productFlatLayTitle}>{title}</div>}
            <div className="productSKU">
                <div className={s.productSKUDesktop}>
                    {products?.map((product: ProductCardProps, index) => {
                        return (
                            <SwiperSlide
                                className={s.productSKUCard}
                                key={index}
                            >
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
                </div>
                <div className={s.productSKUMobile}>
                    <ScrollBarSwiper
                        className="swiper8"
                        slidePerViewInMobile={1.3}
                        spaceBetweenMobile={24}
                        spaceBetweenDesktop={12}
                        swiperIconNextClassName="swiper-icon-next-8"
                        swiperIconPrevClassName="swiper-icon-prev-8"
                    >
                        {products?.map((item: ProductCardProps, index) => {
                            const identifier = `swiper_product_SKU_feature_variant_${slugify(
                                context
                            )}`;
                            return (
                                <SwiperSlide
                                    key={index}
                                    data-testid={identifier}
                                >
                                    <ProductCard
                                        variant={item.variant}
                                        product={item.product}
                                        coloursCount={item.coloursCount}
                                        label={item.label}
                                        saved={item.saved}
                                        backgroundColour={item.backgroundColour}
                                    />
                                </SwiperSlide>
                            );
                        })}
                    </ScrollBarSwiper>
                </div>
            </div>
            {products?.length > 3 && (
                <ScrollBarSwiper
                    key="swiper_product_SKU_feature_variant"
                    className="swiper8"
                    slidePerViewInMobile={1.86}
                    slidePerViewInDesktop={4.2}
                    swiperIconNextClassName="swiper-icon-next-8"
                    swiperIconPrevClassName="swiper-icon-prev-8"
                >
                    {products?.map((product: ProductCardProps, index) => {
                        const identifier = `swiper_product_SKU_feature_variant_${slugify(
                            context
                        )}`;
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
            )}
        </div>
    );
};

export default SwiperProductSKUFeatureVariant;
