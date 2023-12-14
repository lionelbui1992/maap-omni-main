import React from 'react';
import PropTypes from 'prop-types';
import { formatPrismicText } from '../utils/prismic';
import { breakpointMedium } from 'config/styles/breakpoints';
import { brandWhite } from 'config/styles/colours';
import Button from '../PrismicComponents/Button';

const YouTubeVideoBlock = ({ block }) => {
    const {
        youtube_url,
        desktop_video,
        desktop_padding,
        mobile_padding,
        video_title,
        button_link,
        display_content_block,
        button_text,
        button_type,
        button_link_title,
        button_text_colour,
        button_colour,
        button_gtm_identifier,
        button_link_type,
        button_text_font_size,
        button_text_mobile_font_size,
        button_text_font_weight,
        button_underline,
        content_title,
        content_title_colour,
        font_family_content_title,
        content_title_font_size,
        content_title_mobile_font_size,
        content_title_font_weight,
        content,
        content_colour,
        font_family_content,
        content_font_size,
        content_mobile_font_size,
        content_font_weight,
        content_top_position,
        content_left_position,
        content_right_position,
        content_top_mobile_position,
        content_left_mobile_position,
        content_right_mobile_position,
        content_alignment,
        content_width,
        content_width_mobile,
    } = block;
    const displayContent = display_content_block === 'Yes';

    return (
        <>
            {block?.position?.includes('Tile') ? (
                <section>
                    <div className="youTubeBlock_tile">
                        <iframe
                            title={
                                formatPrismicText(video_title) ||
                                formatPrismicText(content_title)
                            }
                            type="text/html"
                            src={youtube_url?.url || desktop_video?.url}
                            frameBorder="0"
                            allowFullScreen
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            className="iframe"
                        />
                    </div>
                </section>
            ) : (
                <section>
                    <div className="youTubeBlock">
                        <iframe
                            title={
                                formatPrismicText(video_title) ||
                                formatPrismicText(content_title)
                            }
                            type="text/html"
                            src={youtube_url?.url || desktop_video?.url}
                            frameBorder="0"
                            allowFullScreen
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            className="iframe"
                        />
                    </div>
                    {displayContent && (
                        <article className={`${content_alignment}`}>
                            <div className="contentWrapper">
                                <div className="contentTitle">
                                    {formatPrismicText(content_title)}
                                </div>
                                <div className="content">
                                    {formatPrismicText(content)}
                                </div>
                                <Button
                                    link_type={button_link_type}
                                    type={button_type}
                                    colour={button_colour}
                                    link={button_link || ''}
                                    text={button_text}
                                    textColour={button_text_colour}
                                    linkTitle={button_link_title}
                                    gtm_identifier={button_gtm_identifier}
                                    font_weight={button_text_font_weight}
                                    desktop_font_size={button_text_font_size}
                                    mobile_font_size={
                                        button_text_mobile_font_size
                                    }
                                    button_underline={button_underline}
                                    className="youTubeButton"
                                />
                            </div>
                        </article>
                    )}
                </section>
            )}
            <style jsx>
                {`
                    section {
                        position: relative;
                    }
                    .contentWrapper {
                        width: ${content_width || 100}%;
                        display: flex;
                        flex-direction: column;
                        ${content_alignment
                            ? `text-align: ${content_alignment};`
                            : 'left'};
                        ${content_alignment
                            ? `justify-content: ${content_alignment};`
                            : ''};
                    }
                    article {
                        display: flex;
                        flex-direction: column;
                        ${content_alignment
                            ? `text-align: ${content_alignment};`
                            : 'left'};
                        ${content_alignment
                            ? `justify-content: ${content_alignment};`
                            : ''};
                        position: absolute;
                        ${content_top_position
                            ? `top: ${content_top_position}px;`
                            : ''};
                        ${content_left_position
                            ? `left: ${content_left_position}px;`
                            : ''};
                        ${content_right_position
                            ? `right: ${content_right_position}px;`
                            : ''};
                    }
                    article.left {
                        text-align: left;
                        align-items: flex-start;
                    }
                    article.right {
                        text-align: right;
                        align-items: flex-end;
                    }
                    article.center {
                        text-align: center;
                    }
                    .youTubeBlock {
                        display: flex;
                        width: 100%;
                        height: calc(100vw * 9 / 16);
                        min-height: 0;
                        overflow: hidden;
                    }
                    .youTubeBlock_tile {
                        display: flex;
                        width: 100%;
                        height: calc(100vw * 8 / 16);
                        min-height: 0;
                        overflow: hidden;
                    }
                    .iframe {
                        flex: 1 1 auto;
                        margin: ${desktop_padding || 0}px;
                    }
                    .contentTitle {
                        font-size: ${content_title_font_size}px;
                        font-weight: ${content_title_font_weight || '100'};
                        color: ${content_title_colour || `${brandWhite}`};
                        font-family: ${font_family_content_title ||
                            'acumin-pro, sans-serif'};
                        padding-bottom: 10px;
                    }
                    .content {
                        font-size: ${content_font_size}px;
                        font-weight: ${content_font_weight || '100'};
                        color: ${content_colour || `${brandWhite}`};
                        font-family: ${font_family_content ||
                            'acumin-pro, sans-serif'};
                        padding-bottom: 10px;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .contentWrapper {
                            width: ${content_width_mobile || 100}%;
                        }
                        .youTubeBlock_tile {
                            height: calc(100vw * 8 / 8);
                        }
                        article {
                            ${content_top_mobile_position
                                ? `top: ${content_top_mobile_position}px;`
                                : ''};
                            ${content_left_mobile_position
                                ? `left: ${content_left_mobile_position}px;`
                                : ''};
                            ${content_right_mobile_position
                                ? `right: ${content_right_mobile_position}px;`
                                : ''};
                        }
                        .contentTitle {
                            font-size: ${content_title_mobile_font_size || 0}px;
                        }
                        .content {
                            font-size: ${content_mobile_font_size || 0}px;
                        }
                    }
                `}
            </style>
        </>
    );
};

YouTubeVideoBlock.propTypes = {
    block: PropTypes.object.isRequired,
};

export default YouTubeVideoBlock;
