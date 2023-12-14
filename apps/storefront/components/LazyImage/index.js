import React from 'react';
import { useInView } from 'react-intersection-observer';

const LazyImage = ({ width, height, src, alt, display, ...rest }) => {
    const [inView] = useInView({
        triggerOnce: true,
        rootMargin: '0px',
        threshold: [0.5],
    });

    return inView ? (
        <>
            <img {...rest} src={src} alt={alt} loading="lazy" />
            <style jsx>
                {`
                    img {
                        ${display ? `display: ${display}` : 'display: block;'};
                        ${width ? `width: ${width}` : ''};
                        ${height ? `height: ${height}` : ''};
                    }
                `}
            </style>
        </>
    ) : null;
};

export default LazyImage;
