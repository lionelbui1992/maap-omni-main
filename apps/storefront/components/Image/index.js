import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const Image = ({ src, hoverSrc, className, alt, overrideFormat, onClick }) => {
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);

    const [inView] = useInView({
        triggerOnce: true,
        rootMargin: '0px',
        threshold: [0.5],
    });

    const onHover = () => {
        setHovered(true);
        setActive(true);
    };

    const onLeave = () => setActive(false);

    return (
        inView && (
            <div
                className={className}
                onClick={onClick}
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
            >
                <img
                    placeholder={src}
                    src={src}
                    srcSet={`${src} 1000w, ${src} 2000w`}
                    alt={alt}
                    loading="lazy"
                />
                {hoverSrc && hovered && (
                    <img
                        placeholder={hoverSrc}
                        src={hoverSrc}
                        srcSet={`${hoverSrc} 1000w, ${hoverSrc} 2000w`}
                        alt={alt}
                        loading="lazy"
                        className={`hover${active ? ' active' : ''}`}
                    />
                )}
                <style jsx>
                    {`
                        div {
                            position: relative;
                        }
                        img {
                            display: block;
                            width: 100%;
                        }
                        img.hover {
                            position: absolute;
                            top: 0;
                            opacity: 0;
                            transition: opacity 0.25s ease;
                        }
                        img.hover.active {
                            opacity: 1;
                        }
                    `}
                </style>
            </div>
        )
    );
};

export default Image;
