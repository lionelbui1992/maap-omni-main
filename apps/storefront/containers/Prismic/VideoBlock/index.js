import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Video from '../PrismicComponents/Video';
import Content from '../PrismicComponents/Content';
import { breakpointMedium } from 'config/styles/breakpoints';
import { styles } from './styles';

const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : () => {};

const useWindowSize = () => {
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

const VideoBlock = ({ shop, block }) => {
    const [width] = useWindowSize();
    const [layout, setLayout] = useState('small');
    const displayContent = block.display_content_block === 'Yes';
    const videoLinkType = block.video_link_type ? block.video_link_type : null;
    const videoLink = block.video_link ? block.video_link : null;
    const {
        button_link,
        video = { url: '' },
        desktop_video = { url: '' },
        mobile_video = { url: '' },
    } = block;
    const buttonLink = button_link;

    const breakpointAsInteger = string => parseInt(string.replace('px', ''));

    useLayoutEffect(() => {
        if (width >= breakpointAsInteger(breakpointMedium)) {
            setLayout('medium');
        }
    }, [width > 0]);

    const buttons = [
        {
            button_text: block.button_text,
            button_type: block.button_type,
            buttonLink,
            button_link_title: block.button_link_title,
            button_text_colour: block.button_text_colour,
            button_colour: block.button_colour,
            button_gtm_identifier: block.button_gtm_identifier,
            button_underline: block.button_underline,
            button_text_font_size: block.button_text_font_size,
            button_text_mobile_font_size: block.button_text_mobile_font_size,
        },
    ];

    return (
        <>
            {block?.position?.includes('Tile') ||
            block?.position?.includes('Full Width') ? (
                <div className="productShopifyVideo">
                    <div className="desktopOnly">
                        <Video
                            src={video?.url || desktop_video?.url}
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
                                block.autoplay_video === 'Yes' &&
                                layout === 'small'
                            }
                        />
                    </div>
                </div>
            ) : (
                <div className="video">
                    <div className="container shopifyVideoContainer">
                        <div className="desktopOnly">
                            <Video
                                src={video?.url || desktop_video?.url}
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
                                    block.autoplay_video === 'Yes' &&
                                    layout === 'small'
                                }
                            />
                        </div>
                        {displayContent && (
                            <div className="container">
                                <Content
                                    buttons={buttons}
                                    videoLink={block.video_link}
                                    videoLinkType={block.video_link_type}
                                    shop={shop}
                                    {...block}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
            <style jsx>{styles}</style>
            <style jsx>
                {`
                    .video {
                        width: ${block.video_width || '100'}%;
                    }
                    .shopifyVideoContainer {
                        padding-top: ${block.padding_top || 0}px;
                        padding-bottom: ${block.padding_bottom || 0}px;
                    }
                    .desktopOnly {
                        display: initial;
                        ${!displayContent ? 'width: 100%' : ''}
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
                    @media (min-width: ${breakpointMedium}) {
                        .video {
                            padding-left: ${block.desktop_side_padding || 0}px;
                            padding-right: ${block.desktop_side_padding || 0}px;
                        }
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .shopifyVideoContainer {
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
        </>
    );
};

VideoBlock.propTypes = {
    block: PropTypes.object.isRequired,
};

export default VideoBlock;
