import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import config from 'config/brandConfig';
import { breakpointMedium } from 'config/styles/breakpoints';
import Video from 'containers/Prismic/PrismicComponents/Video';

const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
};

const VideoBlock = ({ block }) => {
    const [width] = useWindowSize();
    const [layout, setLayout] = useState('small');
    const videoLinkType = block.video_link_type ? block.video_link_type : null;
    const videoLink = block.video_link ? block.video_link : null;
    const { video = { url: '' }, mobile_video = { url: '' } } = block;
    const breakpointAsInteger = (string) => parseInt(string.replace('px', ''));

    useLayoutEffect(() => {
        if (width >= breakpointAsInteger(breakpointMedium)) {
            setLayout('medium');
        }
    }, [width > 0]);

    return (
        <div className="video">
            <div className="container videoContainer">
                <div className="desktopOnly">
                    <Video
                        src={video.url}
                        controls={block.show_video_controls === 'Yes'}
                        muted={block.mute_video === 'Yes'}
                        loop={block.play_video_in_loop === 'Yes'}
                        autoplay={
                            block.autoplay_video === 'Yes' &&
                            layout === 'medium'
                        }
                        link_type={videoLinkType}
                        link={videoLink}
                    />
                </div>
                <div className="mobileOnly">
                    <Video
                        src={mobile_video.url || video.url}
                        controls={block.show_video_controls === 'Yes'}
                        muted={block.mute_video === 'Yes'}
                        loop={block.play_video_in_loop === 'Yes'}
                        link_type={videoLinkType}
                        link={videoLink}
                        autoplay={
                            block.autoplay_video === 'Yes' && layout === 'small'
                        }
                    />
                </div>
            </div>
            <style jsx>
                {`
                    .video {
                        display: flex;
                        margin: 0 auto;
                        min-height: 100px;
                        width: ${block.video_width || '100'}%;
                    }
                    .container {
                        padding-top: 50px;
                        padding-bottom: 50px;
                        display: flex;
                        flex: 1;
                    }
                    .videoContainer {
                        padding-top: ${block.padding_top || 0}px;
                        padding-bottom: ${block.padding_bottom || 0}px;
                    }
                    .desktopOnly {
                        display: initial;
                    }
                    .mobileOnly {
                        display: none;
                    }
                    .content {
                        position: relative;
                        left: 0;
                        right: 0;
                        top: 0;
                    }
                    @media (min-width: ${config.breakPoints.tablet
                            .maxDeviceWidth}px) {
                        .video {
                            padding-left: ${block.desktop_side_padding || 0}px;
                            padding-right: ${block.desktop_side_padding || 0}px;
                        }
                    }
                    @media (max-width: ${config.breakPoints.mobile
                            .maxDeviceWidth}px) {
                        .videoContainer {
                            padding-top: ${block.mobile_padding_top || 0}px;
                            padding-bottom: ${block.mobile_padding_bottom ||
                            0}px;
                        }
                        .desktopOnly {
                            display: none;
                        }
                        .mobileOnly {
                            display: initial;
                        }
                        .video {
                            display: flex;
                            flex-wrap: wrap;
                            width: 100%;
                        }
                        .container {
                            display: flex;
                            flex: 1 0 100%;
                        }
                    }
                `}
            </style>
        </div>
    );
};

VideoBlock.propTypes = {
    block: PropTypes.object.isRequired,
};

export default VideoBlock;
