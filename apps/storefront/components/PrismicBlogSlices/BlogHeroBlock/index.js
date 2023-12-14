import React from 'react';
import PropTypes from 'prop-types';
import {
    breakpointMedium,
    breakpointLarge,
    breakpointExtraLarge,
    breakpointSmall,
} from 'config/styles/breakpoints';
import { formatGTMName } from 'containers/Prismic/utils/gtm';
import Image from 'containers/Prismic/PrismicComponents/Image';
import Button from 'containers/Prismic/PrismicComponents/Button';
import { formatPrismicText } from 'containers/Prismic/utils/prismic';

const BlogAdvancedHeroBlock = ({ block, items }) => {
    const {
        desktop_image,
        mobile_image,
        feature_text,
        intro_text,
        sub_text,
        content_background_colour,
        image_link,
        image_link_type,
        image_link_title,
        gtm_identifier,
        alignment,
        content_position,
        content_width,
        mobile_content_width,
        mobile_padding_top,
        mobile_padding_bottom,
        padding_top,
        padding_bottom,
        desktop_side_padding,
        mobile_side_padding,
        feature_text_top_and_bottom_padding,
        mobile_intro_text_colour,
        mobile_feature_text_colour,
        mobile_sub_text_colour,
        mobile_content_padding,
    } = block;

    const intro = formatPrismicText(intro_text);
    const feature = formatPrismicText(feature_text);
    const sub = formatPrismicText(sub_text);
    const showText = intro_text || feature_text || sub_text;
    const backgroundColorStyle = { backgroundColor: content_background_colour };
    const hasImage = desktop_image.url || mobile_image.url;
    const buttons = items && (
        <div
            className={`blog_advanced_hero_block__buttons blog_advanced_hero_block__buttons--${alignment.toLowerCase()}`}
        >
            {items.map((button, index) => {
                if (!button.button_text[0]) {
                    return '';
                }
                return (
                    <Button
                        className="blog_advanced_hero_block__button"
                        link_type={button.button_link_type}
                        key={`button_${index}`}
                        type={button.button_type}
                        colour={button.button_colour}
                        link={button.button_link ? button.button_link : ''}
                        text={button.button_text[0].text}
                        textColour={button.button_text_colour}
                        linkTitle={button.button_link_title}
                        gtm_identifier={button.gtm_identifier}
                        gtm_value={button.gtm_value}
                        font_weight={button.button_text_font_weight}
                        desktop_font_size={button.button_text_font_size}
                        mobile_font_size={button.button_text_mobile_font_size}
                        button_underline={button.button_underline}
                    />
                );
            })}
        </div>
    );

    return (
        <>
            <div
                className={`blog_advanced_hero_block outer_container ${alignment}`}
            >
                {desktop_image && desktop_image?.url ? (
                    <div className="desktop_image_container">
                        <Image
                            image_alt_text={desktop_image.alt}
                            gtm_identifier={formatGTMName(gtm_identifier)}
                            src={desktop_image.url}
                            link_type={image_link_type}
                            link={image_link}
                            link_title={image_link_title}
                            width="100%"
                        />
                        {showText && (
                            <div
                                className={`text_container flex ${content_position} ${
                                    !hasImage ? 'text_only' : ''
                                }`}
                            >
                                <div
                                    className="contentWrapper"
                                    style={backgroundColorStyle}
                                >
                                    <div className="inner_text_container">
                                        {intro && (
                                            <div className="intro_text">
                                                {intro}
                                            </div>
                                        )}
                                        {feature && (
                                            <h1 className="feature_text">
                                                {feature}
                                            </h1>
                                        )}
                                        {sub && (
                                            <div className="sub_text">
                                                {sub}
                                            </div>
                                        )}
                                        {buttons}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : null}

                {mobile_image.url ? (
                    <div className="mobile_image_container">
                        <Image
                            image_alt_text={mobile_image.alt}
                            gtm_identifier={formatGTMName(gtm_identifier)}
                            src={mobile_image.url}
                            link_type={image_link_type}
                            link_title={image_link_title}
                            link={image_link}
                            width="100%"
                        />
                        {showText && (
                            <div
                                className={`mobile_text_container flex ${content_position} ${
                                    !hasImage ? 'text_only' : ''
                                }`}
                            >
                                <div
                                    className="mobile_content_wrapper"
                                    style={backgroundColorStyle}
                                >
                                    <div className="mobile_inner_text_container">
                                        {intro && (
                                            <div className="intro_text">
                                                {intro}
                                            </div>
                                        )}
                                        {feature && (
                                            <div className="feature_text">
                                                {feature}
                                            </div>
                                        )}
                                        {sub && (
                                            <div className="sub_text">
                                                {sub}
                                            </div>
                                        )}
                                        {buttons}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : null}
            </div>
            <style jsx>
                {`
                    img {
                        width: 100%;
                    }
                    .blog_advanced_hero_block {
                        display: flex;
                        align-items: ${content_position};
                        justify-content: ${content_position};
                        min-height: 100px;
                        margin: 0 auto;
                        padding: ${padding_top || 0}px
                            ${desktop_side_padding || 0}px
                            ${padding_bottom || 0}px
                            ${desktop_side_padding || 0}px;
                    }
                    .blog_advanced_hero_block__buttons {
                        display: flex;
                        justify-content: space-evenly;
                    }
                    .mobile_image_container {
                        display: none;
                    }
                    .desktop_image_container {
                        display: block;
                        width: 100%;
                        position: relative;
                    }
                    .outer_container--no_cap {
                        max-width: 100% !important;
                    }
                    .outer_container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: relative;
                    }
                    .intro_text {
                        font-size: ${block.intro_text_font_size || 0}px;
                        font-weight: ${block.intro_text_font_weight ||
                            'normal'};
                        color: ${block.text_colour || 'rgb(0,0,0)'};
                        font-family: ${block.font_family_intro_text ||
                            'acumin-pro, sans-serif'};
                    }
                    .feature_text {
                        margin: 0;
                        padding: ${feature_text_top_and_bottom_padding || 0}px 0;
                        font-size: ${block.feature_text_font_size || 0}px;
                        font-weight: ${block.feature_text_font_weight ||
                            'normal'};
                        font-family: ${block.font_family_feature_text ||
                            'acumin-pro, sans-serif'};
                        color: ${block.feature_text_colour || 'rgb(0,0,0)'};
                    }
                    .sub_text {
                        font-weight: ${block.sub_text_font_weight || 'normal'};
                        font-size: ${block.sub_text_font_size || 0}px;
                        font-family: ${block.font_family_sub_text ||
                            'acumin-pro, sans-serif'};
                        color: ${block.sub_text_colour || 'rgb(0,0,0)'};
                    }
                    .advanced_hero_image {
                        width: 100%;
                        display: block;
                    }
                    .text_container {
                        display: flex;
                        justify-content: ${content_position.toLowerCase()};
                        text-align: ${content_position.toLowerCase()};
                        position: absolute;
                        z-index: 2;
                        bottom: 10%;
                        left: 3%;
                    }
                    .text_only {
                        position: initial;
                    }
                    .inner_text_container {
                        max-width: ${content_width || 100}%;
                        word-break: break-word;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .blog_advanced_hero_block {
                            padding: ${mobile_padding_top || 0}px
                                ${mobile_side_padding || 0}px
                                ${mobile_padding_bottom || 0}px
                                ${mobile_side_padding || 0}px;
                        }
                        .mobile_content_wrapper {
                            padding: 0 !important;
                        }
                        .mobile_inner_text_container {
                            color: black;
                            display: flex;
                            flex-direction: column;
                            padding: ${mobile_content_padding || 0}px 0;
                        }
                        .mobile_text_container {
                            display: flex;
                            justify-content: ${content_position.toLowerCase()};
                            text-align: ${content_position.toLowerCase()};
                            width: ${mobile_content_width || 100}%;
                            margin: 0 auto;
                        }
                        .intro_text {
                            font-size: ${block.intro_text_mobile_font_size}px;
                            color: ${mobile_intro_text_colour || 'rgb(0,0,0)'};
                        }
                        .feature_text {
                            font-size: ${block.feature_text_mobile_font_size}px;
                            color: ${mobile_feature_text_colour ||
                                'rgb(0,0,0)'};
                            right: 0;
                        }
                        .sub_text {
                            font-size: ${block.sub_text_mobile_font_size}px;
                            color: ${mobile_sub_text_colour || 'rgb(0,0,0)'};
                        }
                        .mobile_image_container {
                            display: block;
                            width: 100%;
                            position: relative;
                        }
                        .desktop_image_container {
                            display: none;
                        }
                        .inner_text_container {
                            max-width: ${content_width || 100}%;
                            margin: 0 auto;
                        }
                    }
                `}
            </style>
        </>
    );
};

BlogAdvancedHeroBlock.propTypes = {
    block: PropTypes.object.isRequired,
    items: PropTypes.array,
};

export default BlogAdvancedHeroBlock;
