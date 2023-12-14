import React, { FC, useEffect } from 'react';
import { useSwiper } from 'swiper/react';

type SwiperSlidesProps = {
    productImages: [
        src: string,
        alt: string,
        device: string,
        section: string,
        slot: string,
        usage: string,
        variant: string,
        variant_slot: string
    ];
};

const SwiperSlidesReset: FC<SwiperSlidesProps> = ({ productImages }) => {
    const swiper = useSwiper();

    useEffect(() => {
        swiper.update();
        swiper.slideTo(0);
    }, [productImages]);

    return null;
};

export default SwiperSlidesReset;
