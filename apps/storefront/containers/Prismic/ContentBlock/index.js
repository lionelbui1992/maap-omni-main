import React from 'react';
import PropTypes from 'prop-types';
import { formatPrismicText } from '../utils/prismic';
import { fontStyles, blockSpacing, contentAlignStyles } from '../utils/styles';
import Button from '../PrismicComponents/Button';
import brandConfig from 'config/brandConfig';
import css from 'styled-jsx/css';
import cssStyles from './styles';

const ContentBlock = ({ isMobile, block, items }) => {
    const {
        content_width,
        alignment,
        feature_text,
        intro_text,
        sub_text,
        full_width,
        content_top_position,
        content_left_position,
        content_background_colour,
    } = block;

    const intro = formatPrismicText(intro_text);
    const feature = formatPrismicText(feature_text);
    const sub = formatPrismicText(sub_text);
    const introTextFontSize =
        isMobile && block.intro_text_mobile_font_size
            ? block.intro_text_mobile_font_size
            : block.intro_text_font_size;
    const subTextFontSize =
        isMobile && block.sub_text_mobile_font_size
            ? block.sub_text_mobile_font_size
            : block.sub_text_font_size;
    const featureTextFontSize =
        isMobile && block.feature_text_mobile_font_size
            ? block.feature_text_mobile_font_size
            : block.feature_text_font_size;
    const fullWidth = full_width === 'Yes';
    const showText = intro_text || feature_text || sub_text;

    const styleBlockIntroText = css`
        @media (max-width: ${brandConfig.breakPoints.mobileDeviceWidth}) {
            .intro_text {
                font-size: ${block.intro_text_mobile_font_size};
            }
        }
        @media (min-width: ${brandConfig.breakPoints.desktop}) {
            .intro_text {
                font-size: ${block.intro_text_font_size};
            }
        }
    `;

    if (!showText) {
        return null;
    }

    const styles = {
        width: !isMobile && content_width ? `${content_width}%` : '100%',
        position: 'relative',
        ...contentAlignStyles(alignment),
    };

    if (content_top_position && !isMobile) {
        styles.top = `${content_top_position}%`;
    }

    // if (content_bottom_position && !isMobile) {
    //     styles.bottom = `${content_bottom_position}%`;
    // }

    if (content_top_position && !isMobile) {
        styles.left = `${content_left_position}%`;
    }

    const backgroundColorStyle = { backgroundColor: content_background_colour };

    const textContainer = (
        <div className="text_container flex" style={styles}>
            <div className="contentWrapper" style={backgroundColorStyle}>
                <div className="inner_text_container">
                    {intro && (
                        <div
                            className="intro_text"
                            style={fontStyles(
                                block.font_family_intro_text,
                                introTextFontSize,
                                block.text_colour
                            )}
                        >
                            {intro}
                        </div>
                    )}
                    {feature && (
                        <div
                            className="feature_text"
                            style={fontStyles(
                                block.font_family_feature_text,
                                featureTextFontSize,
                                block.feature_text_colour
                            )}
                        >
                            {feature}
                        </div>
                    )}
                    {sub && (
                        <div
                            className="sub_text"
                            style={fontStyles(
                                block.font_family_sub_text,
                                subTextFontSize,
                                block.sub_text_colour
                            )}
                        >
                            {sub}
                        </div>
                    )}
                </div>
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
                                    key={`button_${index}`}
                                    type={button.button_type}
                                    colour={button.button_colour}
                                    link={
                                        button.button_link
                                            ? button.button_link
                                            : ''
                                    }
                                    text={button.button_text[0].text}
                                    textColour={button.button_text_colour}
                                    linkTitle={button.button_link_title}
                                    gtm_identifier={button.gtm_identifier}
                                    gtm_value={button.gtm_value}
                                    font_weight={button.button_text_font_weight}
                                    desktop_font_size={
                                        button.button_text_font_size
                                    }
                                    mobile_font_size={
                                        button.button_text_mobile_font_size
                                    }
                                    button_underline={button.button_underline}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
            <style jsx>{styleBlockIntroText}</style>
            <style jsx>{cssStyles}</style>
        </div>
    );

    /* Harcoded default to support existing content */
    const paddingTop = block.padding_top ? block.padding_top : 0;
    const paddingBottom = block.padding_bottom ? block.padding_bottom : 0;
    const paddingTopMobile = block.mobile_padding_top
        ? block.mobile_padding_top
        : 0;
    const paddingBottomMobile = block.mobile_padding_bottom
        ? block.mobile_padding_bottom
        : 0;

    const blockSpacingStyles = blockSpacing(
        fullWidth,
        isMobile,
        block.max_width,
        paddingTop,
        paddingBottom,
        paddingTopMobile,
        paddingBottomMobile
    );

    return (
        <>
            <div className="content_block">
                <div
                    className={`outer_container flex ${alignment}`}
                    style={blockSpacingStyles}
                >
                    {textContainer}
                </div>
            </div>
            <style jsx>{cssStyles}</style>
        </>
    );
};

ContentBlock.propTypes = {
    block: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
};

export default ContentBlock;
