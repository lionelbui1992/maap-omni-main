import React from 'react';
import PropTypes from 'prop-types';
import { formatGTMName } from '../utils/gtm';
import Image from '../PrismicComponents/Image';
import Button from '../PrismicComponents/Button';
import { brandBlack } from 'config/styles/colours';
import { formatPrismicText } from '../utils/prismic';
import { breakpointMedium } from 'config/styles/breakpoints';

const AdvancedHeroBlock = ({ block, items }) => {
    const {
        desktop_image1,
        mobile_image1,
        desktop_image2,
        mobile_image2,
        feature_text,
        intro_text,
        sub_text,
        content_background_colour,
        image_link1,
        image_link_type1,
        image_link2,
        image_link_type2,
        gtm_identifier,
        alignment,
        content_position,
        content_width,
        content_top_position,
        content_left_position,
        mobile_padding_top,
        mobile_padding_bottom,
        padding_top,
        padding_bottom,
        desktop_side_padding,
        mobile_side_padding,
    } = block;

    const intro = formatPrismicText(intro_text);
    const feature = formatPrismicText(feature_text);
    const sub = formatPrismicText(sub_text);
    const showText = intro_text || feature_text || sub_text;
    const backgroundColorStyle = { backgroundColor: content_background_colour };
    const hasImage = desktop_image1.url || mobile_image1.url;

    return (
        <div className={`advanced_hero_block outer_container ${alignment}`}>
            {mobile_image1.url ? (
                <div className="mobile_image_container">
                    <Image
                        image_alt_text={mobile_image1.alt}
                        gtm_identifier={formatGTMName(gtm_identifier)}
                        src={mobile_image1.url}
                        link_type={image_link_type1}
                        link={image_link1}
                        width="100%"
                    />
                </div>
            ) : null}
            {desktop_image1.url ? (
                <div className="desktop_image_container">
                    <Image
                        image_alt_text={desktop_image1.alt}
                        gtm_identifier={formatGTMName(gtm_identifier)}
                        src={desktop_image1.url}
                        link_type={image_link_type1}
                        link={image_link1}
                        width="100%"
                    />
                </div>
            ) : null}
            {mobile_image2.url ? (
                <div className="mobile_image_container">
                    <Image
                        image_alt_text={mobile_image2.alt}
                        gtm_identifier={formatGTMName(gtm_identifier)}
                        src={mobile_image2.url}
                        link_type={image_link_type2}
                        link={image_link2}
                        width="100%"
                    />
                </div>
            ) : null}
            {desktop_image2.url ? (
                <div className="desktop_image_container">
                    <Image
                        image_alt_text={desktop_image2.alt}
                        gtm_identifier={formatGTMName(gtm_identifier)}
                        src={desktop_image2.url}
                        link_type={image_link_type2}
                        link={image_link2}
                        width="100%"
                    />
                </div>
            ) : null}
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
                            {intro && <div className="intro_text">{intro}</div>}
                            {feature && (
                                <div className="feature_text">{feature}</div>
                            )}
                            {sub && <div className="sub_text">{sub}</div>}
                            {items && (
                                <div
                                    className={`advanced_hero_block__buttons advanced_hero_block__buttons--${alignment.toLowerCase()}`}
                                >
                                    {items.map((button, index) => {
                                        if (!button.button_text[0]) {
                                            return '';
                                        }
                                        return (
                                            <Button
                                                className="advanced_hero_block__button"
                                                link_type={
                                                    button.button_link_type
                                                }
                                                key={`button_${index}`}
                                                type={button.button_type}
                                                colour={button.button_colour}
                                                link={
                                                    button.button_link
                                                        ? button.button_link
                                                        : ''
                                                }
                                                text={
                                                    button.button_text[0].text
                                                }
                                                textColour={
                                                    button.button_text_colour
                                                }
                                                linkTitle={
                                                    button.button_link_title
                                                }
                                                gtm_identifier={
                                                    button.gtm_identifier
                                                }
                                                gtm_value={button.gtm_value}
                                                font_weight={
                                                    button.button_text_font_weight
                                                }
                                                desktop_font_size={
                                                    button.button_text_font_size
                                                }
                                                mobile_font_size={
                                                    button.button_text_mobile_font_size
                                                }
                                                button_underline={
                                                    button.button_underline
                                                }
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style jsx>
                {`
                    img {
                        width: 100%;
                    }
                    .advanced_hero_block {
                        display: flex;
                        align-items: ${content_position};
                        justify-content: ${content_position};
                        min-height: 100px;
                        position: relative;
                        margin: 0 auto;
                        padding-top: ${padding_top || 0}px;
                        padding-bottom: ${padding_bottom || 0}px;
                        padding-left: ${desktop_side_padding || 0}px;
                        padding-right: ${desktop_side_padding || 0}px;
                    }
                    .advanced_hero_block__buttons {
                        display: flex;
                        justify-content: space-evenly;
                    }
                    .mobile_image_container {
                        display: none;
                    }
                    .desktop_image_container {
                        display: block;
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
                        margin: 0 auto;
                        font-size: ${block.intro_text_font_size || 0}px;
                        font-weight: ${block.intro_text_font_weight ||
                            'normal'};
                        color: ${block.text_colour || brandBlack};
                        font-family: ${block.intro_text_font_family ||
                            'acumin-pro, sans-serif'};
                    }
                    .feature_text {
                        margin: 0;
                        font-size: ${block.feature_text_font_size || 0}px;
                        font-weight: ${block.feature_text_font_weight ||
                            'normal'};
                        font-family: ${block.font_family_feature_text ||
                            'acumin-pro, sans-serif'};
                        color: ${block.feature_text_colour || brandBlack};
                        position: relative;
                        right: ${block.feature_right_position || 0}%;
                    }
                    .sub_text {
                        margin: 10px 0 25px 0;
                        font-weight: ${block.sub_text_font_weight || 'normal'};
                        font-size: ${block.sub_text_font_size || 0}px;
                        color: ${block.sub_text_colour || brandBlack};
                        font-family: ${block.font_family_sub_text ||
                            'acumin-pro, sans-serif'};
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
                        top: ${content_top_position}%;
                        left: ${content_left_position}%;
                    }
                    .text_only {
                        position: initial;
                    }
                    .advanced_hero_block__buttons {
                        width: 300px;
                        margin: 0 auto;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .intro_text,
                        .feature_text,
                        .sub_text {
                            width: 100%;
                            max-width: 100%;
                        }
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .advanced_hero_block {
                            padding-top: ${mobile_padding_top || 0}px;
                            padding-bottom: ${mobile_padding_bottom || 0}px;
                            padding-left: ${mobile_side_padding || 0}px;
                            padding-right: ${mobile_side_padding || 0}px;
                        }
                        .contentWrapper {
                            position: absolute;
                            top: ${content_top_position || 0}%;
                            width: 300px;
                            padding: 0 !important;
                        }
                        .intro_text {
                            font-size: ${block.intro_text_mobile_font_size}px;
                        }
                        .feature_text {
                            font-size: ${block.feature_text_mobile_font_size}px;
                            right: 0;
                        }
                        .sub_text {
                            font-size: ${block.sub_text_mobile_font_size}px;
                        }
                        .mobile_image_container {
                            display: block;
                            width: 100%;
                            height: calc(100vw * 0.8);
                            min-height: 450px;
                            overflow: hidden;
                        }
                        .desktop_image_container {
                            display: none;
                        }
                        .inner_text_container {
                            max-width: 100%;
                            word-break: break-word;
                        }
                    }
                    @media (min-width: ${breakpointMedium}) {
                        .advanced_hero_block {
                            padding-top: ${mobile_padding_top || 0}px;
                            padding-bottom: ${mobile_padding_bottom || 0}px;
                            padding-left: ${mobile_side_padding || 0}px;
                            padding-right: ${mobile_side_padding || 0}px;
                        }
                        .contentWrapper {
                            position: absolute;
                            top: ${content_top_position || 0}%;
                            width: 900px;
                        }
                        .outer_container.Center {
                            align-items: center;
                        }
                        .outer_container.Left {
                            align-items: flex-start;
                        }
                        .outer_container.Right {
                            align-items: flex-end;
                        }
                        .Yes .outer_container {
                            max-width: 100%;
                        }
                        .inner_text_container {
                            max-width: ${content_width || 100}%;
                            margin: 0 auto;
                        }
                    }
                `}
            </style>
        </div>
    );
};

AdvancedHeroBlock.propTypes = {
    block: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
};

export default AdvancedHeroBlock;
