'use client';

import { SwiperItem, SwiperProps } from './type';
import ScrollBarSwiper from '../../components/scrollbar-swiper';
import { SwiperSlide } from 'swiper/react';
import { Left, Right, slugify, StaticImage } from 'mmds';
import s from './Swiper.module.css';

const SwiperProductFeaturesVariant = ({ block }: SwiperProps) => {
    const { context, items } = block;
    const itemsCheckForArrowVisibility = items.length > 3;

    return (
        <div className={s.swiperRoot}>
            <div className={s.contextContainer}>
                <div className={s.context}>{context}</div>
                {itemsCheckForArrowVisibility && (
                    <div className={s.iconContainer}>
                        <div className="swiper-button swiper-icon-prev-1">
                            <Left />
                        </div>
                        <div className="swiper-button swiper-icon-next-1">
                            <Right />
                        </div>
                    </div>
                )}
            </div>
            <ScrollBarSwiper
                className="swiper1"
                swiperIconNextClassName="swiper-icon-next-1"
                swiperIconPrevClassName="swiper-icon-prev-1"
                spaceBetweenDesktop={12}
                spaceBetweenMobile={8}
                slidePerViewInMobile={1.2}
                slidePerViewInDesktop={3.1}
            >
                {items.map((item: SwiperItem, index) => {
                    const identifier = `product_feature_swiper_${slugify(
                        context
                    )}`;
                    return (
                        <SwiperSlide key={index} data-testid={identifier}>
                            <StaticImage
                                desktopImage={item.desktopImage}
                                mobileImage={item.mobileImage}
                                fullWidth={true}
                            />
                            <div className={s.description}>
                                {item.description}
                            </div>
                        </SwiperSlide>
                    );
                })}
            </ScrollBarSwiper>
        </div>
    );
};

export default SwiperProductFeaturesVariant;
