'use client';

import React, { useLayoutEffect, useState } from 'react';
import s from './video.module.css';

interface VideoProps {
    controls?: boolean;
    autoplay?: boolean;
    muted?: boolean;
    loop?: boolean;
    desktopVideoUrl?: any;
    mobileVideoUrl?: any;
    link?: string;
}
export const breakpointMedium = '991px';
const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : () => {};

const useWindowReSize = () => {
    const [size, setSize] = useState([0, 0]);

    useIsomorphicLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener('resize', updateSize);

        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return size;
};

export const Video = ({
    desktopVideoUrl,
    mobileVideoUrl,
    controls,
    autoplay,
    muted,
    loop,
    link,
}: VideoProps) => {
    const [width] = useWindowReSize();
    const [videoLayout, setVideoLayout] = useState('small');
    const breakpointAsInteger = (string: string) =>
        parseInt(string.replace('px', ''));

    useIsomorphicLayoutEffect(() => {
        if (width >= breakpointAsInteger(breakpointMedium)) {
            setVideoLayout('medium');
        }
    }, [width > 0]);

    const videoMarkUp = (
        <div>
            <div className={s.desktopVideo}>
                <video
                    controls={controls}
                    autoPlay={autoplay && videoLayout === 'medium'}
                    muted={muted}
                    playsInline
                    width="100%"
                    height="auto"
                    loop={loop}
                    preload="auto"
                    className={s.video}
                >
                    <source src={desktopVideoUrl} type="video/mp4" />
                </video>
            </div>
            <div className={s.mobileVideo}>
                <video
                    controls={controls}
                    autoPlay={autoplay && videoLayout === 'small'}
                    muted={muted}
                    playsInline
                    width="100%"
                    height="auto"
                    loop={loop}
                    preload="auto"
                    className={s.video}
                >
                    <source src={mobileVideoUrl} type="video/mp4" />
                </video>
            </div>
        </div>
    );

    if (link && link.length) {
        return <a href={link}>{videoMarkUp}</a>;
    }

    return videoMarkUp;
};

Video.displayName = 'Video';
export default Video;
