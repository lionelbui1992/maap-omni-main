import React from 'react';
import PropTypes from 'prop-types';
import { formatGTMName } from '../utils/gtm';
import { formatPrismicText } from '../utils/prismic';
import { fontStyles, blockSpacing } from '../utils/styles';
import Button from '../PrismicComponents/Button';
import cssStyles from './styles';

const CollectionHeroBlock = ({ isMobile, isTablet, block, items }) => {
    const {
        content_width,
        alignment,
        desktop_image,
        feature_text,
        gtm_identifier,
        intro_text,
        mobile_image,
        sub_text,
        full_width,
        content_top_position,
        content_left_position,
        content_background_colour,
        collection_title,
        collection_description,
    } = block;

    const image = isMobile || isTablet ? mobile_image.url : desktop_image.url;
    const alt = isMobile || isTablet ? mobile_image.alt : desktop_image.alt;
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

    const styles = {
        width: !isMobile && content_width ? `${content_width}%` : '100%',
    };

    if (content_top_position && !isMobile) {
        styles.top = `${content_top_position}%`;
    }

    if (content_left_position && !isMobile) {
        styles.left = `${content_left_position}%`;
    }

    const backgroundColorStyle = { backgroundColor: content_background_colour };

    const textContainer = (
        <>
            <div className={`text_container flex ${alignment}`} style={styles}>
                <div className="contentWrapper" style={backgroundColorStyle}>
                    <div className="inner_text_container">
                        {intro && (
                            <div
                                className="intro_text"
                                style={fontStyles(
                                    block.intro_text_font_family,
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
                                    block.feature_text_font_family,
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
                                    block.sub_text_font_family,
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
                            className={`collection_hero_block__buttons collection_hero_block__buttons--${alignment.toLowerCase()}`}
                        >
                            {items.map((button, index) => {
                                if (!button.button_text[0]) {
                                    return null;
                                }

                                return (
                                    <Button
                                        className="collection_hero_block__button"
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
                                        link_type={button.link_type}
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
            <style jsx>{cssStyles}</style>
        </>
    );

    /* Harcoded default to support existing content */
    const paddingTop = block.padding_top ? block.padding_top : 0;
    const paddingBottom = block.padding_bottom ? block.padding_bottom : 40;
    const paddingTopMobile = block.mobile_padding_top
        ? block.mobile_padding_top
        : 0;
    const paddingBottomMobile = block.mobile_padding_bottom
        ? block.mobile_padding_bottom
        : 40;

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
            <div className="collection_hero_block">
                <div
                    className={`outer_container flex ${alignment}`}
                    style={blockSpacingStyles}
                >
                    <img
                        className="collection_hero_image"
                        id={formatGTMName(gtm_identifier)}
                        src={image}
                        alt={alt}
                    />
                    {showText && textContainer}
                </div>
                <header className="collection_header">
                    <h1 className="collection_header__title heading--light mobile_text">
                        {collection_title}
                    </h1>
                    <div className="collection_header__description">
                        <p className="body_regular_2 mobile_text">
                            {collection_description}
                        </p>
                    </div>
                </header>
            </div>
            <style jsx>{cssStyles}</style>
        </>
    );
};

CollectionHeroBlock.propTypes = {
    block: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
};

export default CollectionHeroBlock;
