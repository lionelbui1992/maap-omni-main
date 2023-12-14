import React from 'react';
import Next from '@images/small_icon/ArrowRight.svg';
import Prev from '@images/small_icon/ArrowLeft.svg';

export const NextArrow = props => {
    const { currentSlide, slideCount, onClick, ...arrowProps } = props;
    return (
        <div onClick={onClick} {...arrowProps}>
            <img className="arrow" src={Next.src} alt="NextArrow" />
        </div>
    );
};

export const PrevArrow = props => {
    const { currentSlide, slideCount, onClick, ...arrowProps } = props;
    return (
        <div onClick={onClick} {...arrowProps}>
            <img className="arrow" src={Prev.src} alt="PrevArrow" />
        </div>
    );
};

export const PrevArrowMobile = props => {
    const { currentSlide, slideCount, onClick, ...arrowProps } = props;
    return (
        <div onClick={onClick} {...arrowProps}>
            <img className="arrow" src={Prev.src} alt="PrevArrowMobile" />
        </div>
    );
};

export const NextArrowMobile = props => {
    const { currentSlide, slideCount, onClick, ...arrowProps } = props;
    return (
        <div onClick={onClick} {...arrowProps}>
            <img className="arrow" src={Next.src} alt="NextArrowMobile" />
        </div>
    );
};
