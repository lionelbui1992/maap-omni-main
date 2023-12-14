'use client';

import React, { useEffect } from 'react';
import s from './Swiper.module.css';
import { SwiperItem, SwiperProps } from './type';
import { StaticImage } from 'mmds';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel, Scrollbar } from 'swiper/modules';
import cn from 'clsx';
import useUI from '../ui/state';
import { useIntersectionObserver } from '../../lib/hooks/use-intersection-observer';

interface RenderSwiperProps {
    direction: 'vertical' | 'horizontal';
    items: SwiperItem[];
}

const RenderSwiper = ({ direction, items }: RenderSwiperProps) => {
    'use client';

    const [setRef, entry] = useIntersectionObserver({
        threshold: 0.5,
        rootMargin: '0px 0px 0px 0px', // Adjust this if you want to trigger a bit before or after the ref is reached
    });
    const setIntersection = useUI((state) => state.setIntersection);

    useEffect(() => {
        setIntersection(entry?.isIntersecting ?? false);
    }, [entry, setIntersection]);

    return (
        <>
            <Swiper
                direction={direction}
                modules={[Scrollbar, Mousewheel, FreeMode]}
                className={cn(s.pdpGallery, 'swiper-pdp-gallery')}
                scrollbar={true}
                mousewheel={{ forceToAxis: false }}
                slidesPerView="auto"
                spaceBetween={0}
            >
                {items.map((item: SwiperItem, index) => (
                    <SwiperSlide key={index}>
                        <StaticImage
                            desktopImage={item.desktopImage}
                            mobileImage={item.mobileImage}
                            fullWidth={true}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div ref={setRef} />
        </>
    );
};

const SwiperPDPGalleryVariant = ({ block }: SwiperProps) => {
    const { items } = block;

    return (
        <>
            {/* Mobile Variant */}
            <div className={cn(s.mobileSwiper, 'hidden-on-desktop')}>
                <RenderSwiper direction="horizontal" items={items} />
            </div>

            {/* Desktop Variant */}
            <div className={cn(s.desktopSwiper, 'hidden-on-mobile')}>
                <RenderSwiper direction="vertical" items={items} />
            </div>
        </>
    );
};

export default SwiperPDPGalleryVariant;
