import React from 'react';
import s from './StaticImage.module.css';

interface StaticImageProps {
    desktopImage?: string;
    mobileImage?: string;
    altDescription?: string;
    desktopWidth?: string;
    desktopHeight?: string;
    mobileWidth?: string;
    mobileHeight?: string;
    fullWidth?: boolean;
}

export const StaticImage = ({
    desktopImage,
    mobileImage,
    altDescription,
    desktopWidth,
    desktopHeight,
    mobileWidth,
    mobileHeight,
    fullWidth,
}: StaticImageProps) => {
    return (
        <>
            {desktopImage && (
                <div className={s.desktopImage}>
                    <img
                        src={desktopImage}
                        alt={`Image for ${altDescription}`}
                        height={desktopHeight}
                        width={desktopWidth}
                        className={fullWidth ? s.fullWidth : s.root}
                    />
                </div>
            )}
            {mobileImage && (
                <div className={s.mobileImage}>
                    <img
                        src={mobileImage}
                        alt={`Image for ${altDescription}`}
                        height={mobileHeight}
                        width={mobileWidth}
                        className={fullWidth ? s.fullWidth : s.root}
                    />
                </div>
            )}
        </>
    );
};

export default StaticImage;
