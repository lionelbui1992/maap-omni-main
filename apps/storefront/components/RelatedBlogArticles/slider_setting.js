import React from 'react';
import {
    NextArrow,
    NextArrowMobile,
    PrevArrow,
    PrevArrowMobile,
} from '@containers/Prismic/ProductCarousel/arrows';

export const settings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    centerMode: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    className: 'slider',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
        {
            breakpoint: 1370,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                centerMode: false,
            },
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                centerMode: false,
            },
        },
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                centerMode: false,
            },
        },
        {
            breakpoint: 510,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: '0%',
                nextArrow: <NextArrowMobile />,
                prevArrow: <PrevArrowMobile />,
            },
        },
    ],
};
