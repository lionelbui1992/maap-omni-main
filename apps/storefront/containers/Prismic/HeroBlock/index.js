import React from 'react';
import PropTypes from 'prop-types';
import { formatPrismicText } from '../utils/prismic';
import { blockSpacing } from '../utils/styles';
import SSRLink from 'helpers/SSRLink';
import Button from '../PrismicComponents/Button';
import styles from './styles';

const HeroBlock = ({ isMobile, block }) => {
    const {
        alignment,
        button_text,
        button_link_title,
        button_type,
        desktop_image,
        display_live_text,
        feature_text,
        gtm_identifier,
        gtm_value,
        intro_text,
        mobile_image,
        link_url,
        link_url_type,
        sub_text,
        text_colour = '#ffffff',
        button_text_colour = '#ffffff',
        button_colour = '#ffffff',
        button_link,
        button_link_type,
        button_gtm_identifier,
        button_text_font_size,
        button_text_mobile_font_size,
        button_text_font_weight,
        button_underline,
    } = block;

    const link = link_url;
    const buttonLink = button_link;
    const image = isMobile ? mobile_image.url : desktop_image.url;
    const showText = display_live_text === 'Yes';
    const intro = formatPrismicText(intro_text);
    const feature = formatPrismicText(feature_text);
    const sub = formatPrismicText(sub_text);
    const isFullWidth = block.full_width === 'Yes';

    const buttons = [
        {
            button_text,
            button_type,
            buttonLink,
            button_link_title,
            button_text_colour,
            button_colour,
            button_gtm_identifier,
            button_link_type,
            button_text_font_size,
            button_text_mobile_font_size,
            button_text_font_weight,
            button_underline,
        },
    ];

    const textContainer = (
        <>
            <div
                className={`text_container flex ${alignment}`}
                style={{ color: text_colour }}
            >
                {intro && <div className="intro_text">{intro}</div>}
                {feature && <div className="feature_text">{feature}</div>}
                {sub && <div className="sub_text">{sub}</div>}
                {buttons.map((button, key) => (
                    <Button
                        key={key}
                        text={button.button_text}
                        type={button.button_type}
                        link={button.buttonLink}
                        linkTitle={button.button_link_title}
                        textColour={button.button_text_colour}
                        colour={button.button_colour}
                        gtm_identifier={button.button_gtm_identifier}
                        link_type={button.button_link_type}
                        font_weight={button_text_font_weight}
                        desktop_font_size={button_text_font_size}
                        mobile_font_size={button_text_mobile_font_size}
                        button_underline={button_underline}
                    />
                ))}
            </div>
            <style jsx>{styles}</style>
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

    return (
        <>
            <div className="hero_block">
                {!button_link ? (
                    <SSRLink
                        linkType={link_url_type}
                        linkUrl={link}
                        title={button_link_title || ''}
                        gtm_identifier={gtm_identifier}
                        gtm_value={gtm_value}
                        style={blockSpacing(
                            isFullWidth,
                            isMobile,
                            block.max_width,
                            paddingTop,
                            paddingBottom,
                            paddingTopMobile,
                            paddingBottomMobile
                        )}
                    >
                        <div className={`outer_container flex ${alignment}`}>
                            <img
                                className="hero_image"
                                src={image}
                                alt="hero"
                            />
                            {showText && textContainer}
                        </div>
                    </SSRLink>
                ) : (
                    <div className={`outer_container flex ${alignment}`}>
                        <img className="hero_image" src={image} alt="hero" />
                        {showText && textContainer}
                    </div>
                )}
            </div>
            <style jsx>{styles}</style>
        </>
    );
};

HeroBlock.propTypes = {
    block: PropTypes.object.isRequired,
};

export default HeroBlock;
