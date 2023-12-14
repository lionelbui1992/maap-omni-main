'use client';

import {
    PatternCTASet,
    PatternTitleSubtitle,
    slugify,
    StaticImage,
} from 'mmds';
import { BillboardBlockItem, BillboardProps } from './types';
import cn from 'clsx';
import s from './Billboard.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';

const BillboardCarouselVariant = ({ block }: BillboardProps) => {
    const { items } = block;
    return (
        <>
            <Swiper
                pagination={{
                    type: 'bullets',
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mobile_billboard_swiper swiper_billboard"
            >
                <div className={s.root}>
                    {items.map((item: BillboardBlockItem, index: number) => {
                        const {
                            desktopImage,
                            mobileImage,
                            contentPosition,
                            title,
                            subTitle,
                            ctaSet: CTASet,
                            titleSize,
                            subTitleSize,
                        } = item;
                        const contentLayoutClassname = cn({
                            [s.center]: contentPosition === 'center',
                            [s.left]: contentPosition === 'bottomLeft',
                        });
                        const buttonContentLayout = cn({
                            [s.buttonCenter]: contentPosition === 'center',
                            [s.buttonBottomLeft]:
                                contentPosition === 'bottomLeft',
                        });
                        const identifier = `bb_carousel_${slugify(
                            title
                        )}_${index}`;
                        return (
                            <SwiperSlide key={index} data-testid={identifier}>
                                <div
                                    className={s.billboardRoot}
                                    key={identifier}
                                    data-testid={identifier}
                                >
                                    <StaticImage
                                        desktopImage={desktopImage}
                                        mobileImage={mobileImage}
                                        altDescription={title}
                                        fullWidth={true}
                                    />
                                    {title && (
                                        <div
                                            className={`${s.overlayContent} ${contentLayoutClassname}`}
                                        >
                                            <div
                                                className={`${s.content} ${contentLayoutClassname}`}
                                            >
                                                <div className={s.description}>
                                                    <PatternTitleSubtitle
                                                        title={title}
                                                        titleSize={titleSize}
                                                        subTitle={subTitle}
                                                        subTitleSize={
                                                            subTitleSize
                                                        }
                                                    />
                                                </div>
                                                {item.ctaSet && (
                                                    <div
                                                        className={
                                                            buttonContentLayout
                                                        }
                                                    >
                                                        <PatternCTASet
                                                            set={item.ctaSet}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </div>
            </Swiper>
            <style jsx global>
                {`
                    .mobile_billboard_swiper .swiper_billboard {
                        width: 100%;
                        height: 100%;
                        z-index: 0;
                        background-color: rgb(224, 228, 227);
                    }

                    .swiper-slide .desktopImage {
                        display: block;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .swiper-pagination-bullet-active {
                        background: #ffffff !important;
                    }

                    .swiper-pagination-bullet {
                        background: unset;
                        opacity: unset;
                    }

                    .swiper-pagination-clickable .swiper-pagination-bullet {
                        cursor: pointer;
                        border: 1px solid #ffffff;
                    }

                    .mobile_billboard_swiper .swiper-button-next:after,
                    .mobile_billboard_swiper .swiper-button-prev:after {
                        display: none;
                    }

                    .swiper-pagination-fraction,
                    .swiper-pagination-custom,
                    .swiper-horizontal > .swiper-pagination-bullets,
                    .swiper-pagination-bullets.swiper-pagination-horizontal {
                        bottom: var(--swiper-pagination-bottom, 20px);
                    }

                    @media screen and (max-width: 767px) {
                        .swiper-pagination-fraction,
                        .swiper-pagination-custom,
                        .swiper-horizontal > .swiper-pagination-bullets,
                        .swiper-pagination-bullets.swiper-pagination-horizontal {
                            bottom: var(--swiper-pagination-bottom, 10px);
                        }
                    }
                `}
            </style>
        </>
    );
};

export default BillboardCarouselVariant;
