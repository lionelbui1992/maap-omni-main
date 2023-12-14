'use client';

import {
    StaticImageItem,
    SwiperProductFlatlaySingleCollectionVariantProps,
} from './type';
import { SwiperSlide } from 'swiper/react';
import ScrollBarSwiper from '../../components/scrollbar-swiper';
import { Button, CTAItem, Left, Right, slugify, StaticImage } from 'mmds';
import s from './Swiper.module.css';

const SwiperProductFlatlayCollection = ({
    block,
    products,
}: SwiperProductFlatlaySingleCollectionVariantProps) => {
    const { context, title, description, CTASet } = block;

    const productLength = products?.length || 0;

    return (
        <div className={`${s.swiperRoot} ${s.greyBg}`}>
            <div className={s.contextContainer}>
                <div className={s.context}>{context}</div>
                {productLength > 3 && (
                    <div className={s.iconContainer}>
                        <div className="swiper-button swiper-icon-prev-6">
                            <Left />
                        </div>
                        <div className="swiper-button swiper-icon-next-6">
                            <Right />
                        </div>
                    </div>
                )}
            </div>
            {title && <div className={s.productFlatLayTitle}>{title}</div>}
            <ScrollBarSwiper
                className="swiper6"
                slidePerViewInMobile={2.9}
                slidePerViewInDesktop={9.4}
                spaceBetweenDesktop={0}
                spaceBetweenMobile={0}
                swiperIconNextClassName="swiper-icon-next-6"
                swiperIconPrevClassName="swiper-icon-prev-6"
            >
                {products?.map((item: StaticImageItem, index: number) => {
                    const identifier = `swiper_product_flat_lay_title_variant_${slugify(
                        context
                    )}`;
                    return (
                        <SwiperSlide key={index} data-testid={identifier}>
                            <a href={item.link}>
                                <StaticImage
                                    desktopImage={item.desktopImage}
                                    mobileImage={item.mobileImage}
                                    altDescription={title}
                                    fullWidth={true}
                                />
                            </a>
                        </SwiperSlide>
                    );
                })}
            </ScrollBarSwiper>
            {description && (
                <div className={s.productFlatLayContent}>
                    <div className={s.productFlatLayDescription}>
                        {description}
                    </div>
                    <div className={s.productFlatLayButtons}>
                        {CTASet?.map((item: CTAItem, index) => {
                            return (
                                item.link && (
                                    <Button
                                        variant={item.variant}
                                        label={item.label}
                                        hrefLink={item.link}
                                        icon={item.icon}
                                        key={index}
                                    />
                                )
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SwiperProductFlatlayCollection;
