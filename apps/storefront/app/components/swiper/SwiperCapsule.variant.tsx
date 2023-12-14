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

const SwiperCapsuleVariant = ({ block }: SwiperProps) => {
    const { context, items } = block;
    const itemsCheckForArrowVisibility = items.length > 3;

    return (
        <div className={s.swiperRoot}>
            <div className={s.contextContainer}>
                <div className={s.context}>{context}</div>
                {itemsCheckForArrowVisibility && (
                    <div className={s.iconContainer}>
                        <div className="swiper-button swiper-icon-prev-4">
                            <Left />
                        </div>
                        <div className="swiper-button swiper-icon-next-4">
                            <Right />
                        </div>
                    </div>
                )}
            </div>
            <ScrollBarSwiper
                className="swiper4"
                swiperIconNextClassName="swiper-icon-next-4"
                swiperIconPrevClassName="swiper-icon-prev-4"
                spaceBetweenDesktop={12}
                spaceBetweenMobile={8}
                slidePerViewInMobile={1.2}
                slidePerViewInDesktop={3.1}
            >
                {items.map((item: SwiperItem, index) => {
                    const { desktopImage, mobileImage, CTASet } = item;
                    const identifier = `swiper_capsule_variant_${slugify(
                        context
                    )}_${index}`;
                    const applyLinkToWholeImageCondition = !!CTASet?.[0]?.link;
                    const link = CTASet?.[0]?.link;

                    return (
                        <SwiperSlide key={index} data-testid={identifier}>
                            <LinkManager
                                applyLink={applyLinkToWholeImageCondition}
                                href={link}
                                className={s.linkableWrapper}
                                title={context}
                            >
                                <div className={s.overlayOnImage} />
                                <StaticImage
                                    desktopImage={desktopImage}
                                    mobileImage={mobileImage}
                                    fullWidth={true}
                                />
                            </LinkManager>
                            <div className={s.capsuleButton}>
                                {CTASet?.map((item: CTAItem, index) => {
                                    return (
                                        item.link && (
                                            <Button
                                                variant={item.variant}
                                                label={item.label}
                                                icon={item.icon}
                                                hrefLink={item.link}
                                                key={index}
                                            />
                                        )
                                    );
                                })}
                            </div>
                        </SwiperSlide>
                    );
                })}
            </ScrollBarSwiper>
        </div>
    );
};

export default SwiperCapsuleVariant;
