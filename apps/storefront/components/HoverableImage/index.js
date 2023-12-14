import React, { useState } from 'react';

const HoverableImage = ({ src, hoverSrc, className, alt, overrideFormat, onClick }) => {
    let imageUrl = src;
    let hoverUrl = hoverSrc;

    if (overrideFormat) {
        imageUrl = imageUrl + '&format=' + overrideFormat;
        hoverUrl = hoverUrl + '&format=' + overrideFormat;
    }
    const [imgSrc, setImgSrc] = useState(imageUrl);

    return (
        <>
            <img
                placeholder={src}
                src={imgSrc}
                srcSet={`${imgSrc} 1000w, ${imgSrc} 2000w`}
                onMouseEnter={() => {
                    hoverSrc ? setImgSrc(hoverUrl) : '';
                }}
                onMouseOut={() => {
                    hoverSrc ? setImgSrc(imageUrl) : '';
                }}
                onClick={onClick}
                alt={alt}
                className={className}
            />
        </>
    );
};

export default HoverableImage;
