import React from 'react';
import SSRLink from 'helpers/SSRLink';

const Video = ({ controls, autoplay, muted, loop, src, link_type, link }) => {
    const videoMarkUp = (
        <>
            <video
                controls={controls}
                autoPlay={autoplay}
                muted={muted}
                playsInline
                width="100%"
                height="auto"
                loop={loop}
                preload="auto"
            >
                <source src={src} type="video/mp4" />
            </video>
            <style jsx>
                {`
                    video {
                        display: block;
                    }
                `}
            </style>
        </>
    );

    if (link && link.length) {
        return (
            <SSRLink linkType={link_type} linkUrl={link}>
                {videoMarkUp}
            </SSRLink>
        );
    }

    return videoMarkUp;
};

export default Video;
