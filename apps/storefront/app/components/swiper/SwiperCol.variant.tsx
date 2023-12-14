'use client';
import { SwiperItem, SwiperProps } from './type';
import { SwiperSlide } from 'swiper/react';
import ScrollBarSwiper from '../../components/scrollbar-swiper';
import {
    Button,
    CTAItem,
    Left,
    LinkManager,
    Right,
    slugify,
    StaticImage,
} from 'mmds';
import s from './Swiper.module.css';

const SwiperColVariant = ({ block }: SwiperProps) => {
    const { context, items } = block;
    const itemsCheckForArrowVisibility = items.length > 3;

    return (
        <div className={s.swiperRoot}>
            <div className={s.contextContainer}>
                <div className={s.context}>{context}</div>
                {itemsCheckForArrowVisibility && (
                    <div className={s.iconContainer}>
                        <div className="swiper-button swiper-icon-prev-3">
                            <Left />
                        </div>
                        <div className="swiper-button swiper-icon-next-3">
                            <Right />
                        </div>
                    </div>
                )}
            </div>
            <ScrollBarSwiper
                className="swiper3"
                swiperIconNextClassName="swiper-icon-next-3"
                swiperIconPrevClassName="swiper-icon-prev-3"
                slidePerViewInDesktop={3.1}
                spaceBetweenDesktop={12}
                spaceBetweenMobile={8}
                slidePerViewInMobile={1.2}
            >
                {items.map((item: SwiperItem, index) => {
                    const {
                        desktopImage,
                        mobileImage,
                        overlayTitle,
                        overlayCTASet,
                        overlayContext,
                    } = item;
                    const identifier = `collection_swiper_${slugify(context)}`;
                    const applyLinkToWholeImageCondition =
                        !!overlayCTASet?.[0]?.link;
                    const link = overlayCTASet?.[0]?.link;

                    return (
                        <SwiperSlide key={index} data-testid={identifier}>
                            <LinkManager
                                applyLink={applyLinkToWholeImageCondition}
                                href={link}
                                className={s.linkableWrapper}
                                title={`Go to page ${context}`}
                            >
                                <div className={s.swiperColContainer}>
                                    <div className={s.overlayOnImage} />
                                    <StaticImage
                                        desktopImage={desktopImage}
                                        mobileImage={mobileImage}
                                        fullWidth={true}
                                    />
                                    <div className={s.swiperColContent}>
                                        <div className={s.overlayContext}>
                                            {overlayContext}
                                        </div>
                                        <div className={s.overlayTitle}>
                                            {overlayTitle}
                                        </div>
                                        <div className={s.overlayButton}>
                                            {overlayCTASet?.map(
                                                (item: CTAItem, index) => {
                                                    return (
                                                        item.link && (
                                                            <span key={index}>
                                                                <Button
                                                                    variant={
                                                                        item.variant
                                                                    }
                                                                    label={
                                                                        item.label
                                                                    }
                                                                    icon={
                                                                        item.icon
                                                                    }
                                                                    className={
                                                                        s.linkableWrapperButton
                                                                    }
                                                                />
                                                            </span>
                                                        )
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </LinkManager>
                        </SwiperSlide>
                    );
                })}
            </ScrollBarSwiper>
        </div>
    );
};

export default SwiperColVariant;
