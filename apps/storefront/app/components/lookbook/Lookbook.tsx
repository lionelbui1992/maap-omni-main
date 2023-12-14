'use client';

import React, { useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { LookbookOverlayProps } from '../lookbook/type';
import ScrollBarSwiper from '../../../app/components/scrollbar-swiper';
import { Left, Right, slugify, StaticImage, ToggleButton } from 'mmds';
import LookbookDrawer from './LookbookDrawer';
import s from './Lookbook.module.css';

const Lookbook = ({ block }: LookbookOverlayProps) => {
    const [lookbookContext, setLookbookContext] = useState('Woman');
    const { context, items } = block;
    const itemsCheckForArrowVisibility = items?.length > 3;

    const handleToggle = (newContext: string) => {
        setLookbookContext(newContext);
    };

    if (!items.length) return null;

    const getInitialValue = (value: string) => {
        //if prismic defaulting fails set to 'Woman'
        return value == null ? 'Woman' : value;
    };

    return (
        <div className={s.swiperRoot}>
            <div className={s.contextContainer}>
                <div className={s.context}>
                    {context}
                    <ToggleButton
                        toggleContext={lookbookContext}
                        handleContext1={() => handleToggle('Woman')}
                        handleContext2={() => handleToggle('Man')}
                        context1={'Woman'}
                        context2={'Man'}
                    />
                </div>

                {itemsCheckForArrowVisibility && (
                    <div className={s.iconContainer}>
                        <div className="swiper-button swiper-icon-prev-10">
                            <Left />
                        </div>
                        <div className="swiper-button swiper-icon-next-10">
                            <Right />
                        </div>
                    </div>
                )}
            </div>
            <ScrollBarSwiper
                className="swiper2"
                swiperIconNextClassName="swiper-icon-next-10"
                swiperIconPrevClassName="swiper-icon-prev-10"
                spaceBetweenDesktop={12}
                spaceBetweenMobile={8}
                slidePerViewInMobile={1.2}
                slidePerViewInDesktop={3.1}
            >
                {items.map((item, index) => (
                    <div key={index} className="lookbook">
                        {item?.lookbook?.map((look, lookIndex) => {
                            const contextValue = getInitialValue(
                                look.lookbookContext
                            );
                            if (contextValue === lookbookContext) {
                                const identifier = `lookbook_swiper_${slugify(
                                    look.heading
                                )}_${look.heading}`;

                                // handles variable required here cuz it loops through the look and
                                // renders man/woman handles depends on the toggle.

                                const handles = [
                                    look.productHandle1,
                                    look.productHandle2,
                                    look.productHandle3,
                                    look.productHandle4,
                                ].filter(Boolean);

                                return (
                                    <SwiperSlide
                                        key={`${look.heading}-${lookIndex}`}
                                        data-textid={identifier}
                                    >
                                        <LookbookDrawer
                                            look={look}
                                            handles={handles}
                                        >
                                            <StaticImage
                                                desktopImage={look.desktopImage}
                                                mobileImage={look.mobileImage}
                                                desktopHeight="100%"
                                                desktopWidth="1200px"
                                                altDescription={look.heading}
                                            />
                                        </LookbookDrawer>
                                        <div className={s.lookBookDescription}>
                                            <div>{look.heading}</div>
                                            <div>
                                                {look.productTitle1}{' '}
                                                <span
                                                    className={s.variantTitle}
                                                >
                                                    {look.variantTitle1}
                                                </span>
                                            </div>
                                            <div>
                                                {look.productTitle2}{' '}
                                                <span
                                                    className={s.variantTitle}
                                                >
                                                    {look.variantTitle2}
                                                </span>
                                            </div>
                                            <div>
                                                {look.productTitle3}{' '}
                                                <span
                                                    className={s.variantTitle}
                                                >
                                                    {look.variantTitle3}
                                                </span>
                                            </div>
                                            <div>
                                                {look.productTitle4}{' '}
                                                <span
                                                    className={s.variantTitle}
                                                >
                                                    {look.variantTitle4}
                                                </span>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                ))}
            </ScrollBarSwiper>
        </div>
    );
};

export default Lookbook;
