import React from 'react';
import PropTypes from 'prop-types';
import { formatPrismicText } from '../utils/prismic';
import Image from '../PrismicComponents/Image';
import Button from '../PrismicComponents/Button';
import { breakpointSmall } from 'config/styles/breakpoints';

const TitleDescriptionImageBlock = ({ block, isMobile, isTablet }) => {
    const {
        collection_title,
        collection_description,
        collection_background_color,
        collection_title_font_size,
        collection_title_mobile_font_size,
        collection_title_font_weight,
        collection_title_font_family,
        collection_desc_font_size,
        collection_desc_mobile_font_size,
        collection_desc_font_weight,
        collection_description_font_family,
        collection_side_padding,
        collection_top_padding,
        collection_bottom_padding,
        desktop_image,
        mobile_image,
        image_link_type,
        image_link,
        gtm_identifier,
        button_text,
        button_type,
        button_link,
        button_link_type,
        button_text_font_size,
        button_text_mobile_font_size,
        button_text_font_weight,
        button_colour,
        button_text_colour,
        button_underline,
    } = block;

    const description = formatPrismicText(collection_description);
    const title = formatPrismicText(collection_title);
    const image = isMobile || isTablet ? mobile_image?.url : desktop_image?.url;
    const alt = isMobile || isTablet ? mobile_image?.alt : desktop_image?.alt;
    const backgroundColorStyle = {
        backgroundColor: collection_background_color,
    };

    return (
        <>
            <div className="title_description_image__container">
                <div
                    className="title_description__container"
                    style={backgroundColorStyle}
                >
                    <h3>{title}</h3>
                    <section>
                        <p>{description}</p>
                        <Button
                            text={button_text}
                            type={button_type}
                            link={button_link}
                            textColour={button_text_colour}
                            colour={button_colour}
                            gtmIdentifier={gtm_identifier}
                            link_type={button_link_type}
                            font_weight={button_text_font_weight}
                            desktop_font_size={button_text_font_size}
                            mobile_font_size={button_text_mobile_font_size}
                            className="title_description__button"
                            button_underline={button_underline}
                        />
                    </section>
                </div>
                {!image ? null : (
                    <Image
                        src={image}
                        link_type={image_link_type}
                        link={image_link}
                        image_alt_text={alt}
                        gtm_identifier={gtm_identifier}
                    />
                )}
            </div>
            <style jsx>
                {`
                    .title_description__container {
                        display: flex;
                        padding: ${collection_top_padding}px
                            ${collection_side_padding}px
                            ${collection_bottom_padding}px
                            ${collection_side_padding}px;
                    }
                    section {
                        display: flex;
                        flex-direction: column;
                        flex: 1 50%;
                    }
                    h3 {
                        font-size: ${collection_title_font_size || 0}px;
                        font-weight: ${collection_title_font_weight ||
                            'normal'};
                        flex: 1 50%;
                        margin: 0;
                        font-family: ${collection_title_font_family ||
                            'acumin-pro, sans-serif'};
                    }
                    p {
                        margin: 0;
                        font-size: ${collection_desc_font_size || 0}px;
                        font-weight: ${collection_desc_font_weight || 'normal'};
                        font-family: ${collection_description_font_family ||
                            'acumin-pro, sans-serif'};
                    }
                    img {
                        width: 100%;
                        display: block;
                    }
                    @media (max-width: ${breakpointSmall}) {
                        .title_description__container {
                            flex-direction: column;
                        }
                        h3 {
                            font-size: ${collection_title_mobile_font_size ||
                                0}px;
                            padding-bottom: 10px;
                        }
                        p {
                            font-size: ${collection_desc_mobile_font_size ||
                                0}px;
                        }
                    }
                `}
            </style>
        </>
    );
};

TitleDescriptionImageBlock.propTypes = {
    block: PropTypes.object.isRequired,
    isMobile: PropTypes.bool,
    isTablet: PropTypes.bool,
};

export default TitleDescriptionImageBlock;
