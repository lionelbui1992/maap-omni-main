'use client';

import React, { useEffect, useState } from 'react';
import throttledWidthObserver from '../../../app/lib/observers/throttled-width-observer';
import {
    FreeMode,
    Keyboard,
    Mousewheel,
    Navigation,
    Scrollbar,
} from 'swiper/modules';
import { Swiper } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import 'swiper/css';
import './style.css';

interface ScrollBarSwiperProps {
    children: any;
    className: string;
    slidePerViewInMobile?: number;
    slidePerViewInDesktop?: number;
    spaceBetweenDesktop?: number;
    spaceBetweenMobile?: number;
    swiperIconNextClassName?: string;
    swiperIconPrevClassName?: string;
    hasScrollbar?: boolean;
    direction?: 'horizontal' | 'vertical';
}

export const ScrollBarSwiper = ({
    children,
    className,
    slidePerViewInMobile,
    slidePerViewInDesktop,
    spaceBetweenDesktop,
    spaceBetweenMobile,
    swiperIconNextClassName,
    swiperIconPrevClassName,
    hasScrollbar = true,
    direction = 'horizontal',
}: ScrollBarSwiperProps) => {
    const clientWidth =
        typeof document !== 'undefined' ? document.body.clientWidth : 1280;
    const [windowSize, setWindowSize] = useState<number>(clientWidth);

    useEffect(() => {
        if ((document as any) === 'undefined') return;
        const observer = throttledWidthObserver(
            document.body,
            setWindowSize,
            100
        );
        observer.observe(document.body);
        return () => observer.unobserve(document.body);
    }, []);

    return (
        <>
            <div className="swiperContainer">
                <Swiper
                    direction={direction}
                    navigation={{
                        nextEl: `.${swiperIconNextClassName}`,
                        prevEl: `.${swiperIconPrevClassName}`,
                        disabledClass: 'swiper-icon-disabled',
                    }}
                    freeMode={true}
                    scrollbar={hasScrollbar}
                    mousewheel={{ forceToAxis: true }}
                    keyboard={true}
                    modules={[
                        Navigation,
                        Scrollbar,
                        FreeMode,
                        Keyboard,
                        Mousewheel,
                    ]}
                    className={`${className} scrollbar-swiper`}
                    slidesOffsetAfter={windowSize > 991 ? 72 : 24}
                    slidesOffsetBefore={windowSize > 991 ? 72 : 24}
                    breakpoints={{
                        320: {
                            slidesPerView: slidePerViewInMobile
                                ? slidePerViewInMobile
                                : 1.12,
                            spaceBetween: spaceBetweenMobile,
                        },
                        768: {
                            slidesPerView: slidePerViewInMobile
                                ? slidePerViewInMobile
                                : 2.1,
                            spaceBetween: spaceBetweenMobile,
                        },
                        1024: {
                            slidesPerView: slidePerViewInDesktop
                                ? slidePerViewInDesktop
                                : 2.9,
                            spaceBetween: spaceBetweenDesktop,
                        },
                    }}
                >
                    {children}
                </Swiper>
            </div>
            <style jsx global>
                {`
                    .swiperContainer .swiper {
                        z-index: 0;
                    }

                    .productSKU .swiper-slide {
                        flex-shrink: unset;
                    }

                    .productSKU {
                        width: 80%;
                        margin: auto;
                    }

                    .swiperContainer {
                        padding-top: 48px;
                    }

                    .scrollbar-swiper .swiper-wrapper {
                        padding-bottom: 48px;
                    }

                    .lookbookDrawer .swiperContainer {
                        padding-top: 24px;
                    }

                    .lookbookDrawer .swiperContainer {
                        padding-bottom: 24px;
                    }

                    .lookbookDrawer .scrollbar-swiper .swiper-wrapper {
                        padding-bottom: 0;
                    }

                    .${swiperIconPrevClassName} {
                        padding: var(--spacing-size-three)
                            var(--spacing-size-four) !important;
                    }

                    .${swiperIconPrevClassName}:hover {
                        background-color: var(--color-brand-cement);
                        border-radius: var(--border-radius-lg);
                    }

                    .${swiperIconNextClassName} {
                        padding: var(--spacing-size-three)
                            var(--spacing-size-four) !important;
                    }

                    .${swiperIconNextClassName}:hover {
                        background-color: var(--color-brand-cement);
                        border-radius: var(--border-radius-lg);
                    }

                    @media screen and (max-width: 991px) {
                        .productSKU {
                            width: 100%;
                        }

                        .swiperContainer {
                            padding-top: 32px;
                        }

                        .overlayContent .swiperContainer {
                            padding-top: 16px;
                        }
                    }

                    @media screen and (max-width: 767px) {
                        .productSKU .swiper-slide {
                            flex-shrink: 0;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default ScrollBarSwiper;
