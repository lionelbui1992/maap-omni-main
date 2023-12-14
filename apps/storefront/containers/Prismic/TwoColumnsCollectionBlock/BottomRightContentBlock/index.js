import React from 'react';
import { breakpointMedium } from 'config/styles/breakpoints';
import Image from '../../PrismicComponents/Image';
import Button from '../../PrismicComponents/Button';
import { RichText } from 'prismic-reactjs';
import PropTypes from 'prop-types';
import { styles } from '../styles';

const BottomRightContentBlock = ({ block, isMobile, isTablet }) => {
    const {
        desktop_image2,
        mobile_image2,
        button_link_title2,
        button_link2,
        button_link_type2,
        button_colour2,
        button_text_colour2,
        button_text_font_size2,
        button_text_font_weight2,
        button_text_mobile_font_size2,
        gtm_identifer2,
        gtm_value2,
        button_type2,
        image_link2,
        image_link_type2,
        collection_title2,
        collection_description2,
        collection_title2_font_size,
        collection_title2_mobile_font_size,
        collection_title2_font_weight,
        collection_title2_font_family,
        collection_description2_font_size,
        collection_description2_mobile_font_size,
        collection_description2_font_weight,
        collection_description2_font_family,
        bottom_right_content_alignment,
        content_bottom_position_bottom_right_block,
        content_left_position_bottom_right_block,
        content_right_position_bottom_right_block,
        content_top_position_bottom_right_block,
        button_underline,
    } = block;
    const bottomImage =
        isMobile || isTablet ? mobile_image2.url : desktop_image2.url;
    const bottomImageAlt =
        isMobile || isTablet ? mobile_image2.alt : desktop_image2.alt;
    const bottomImageCollectionTitle = collection_title2;
    const bottomImageDescription = RichText.render(collection_description2);

    return (
        <>
            {!bottomImage ? null : (
                <div className="bottom_right_content_block">
                    <Image
                        src={bottomImage}
                        link={image_link2}
                        link_type={image_link_type2}
                        link_title={bottomImageAlt}
                        image_alt_text={bottomImageAlt}
                        className="content_block__image"
                    />
                    <div className="bottom_right_content_block__content_container">
                        <Button
                            link_type={button_link_type2}
                            link={button_link2}
                            linkTitle={button_link_title2}
                            text={button_link_title2}
                            textColour={button_text_colour2}
                            type={button_type2}
                            colour={button_colour2}
                            font_weight={button_text_font_weight2}
                            desktop_font_size={button_text_font_size2}
                            mobile_font_size={button_text_mobile_font_size2}
                            gtm_identifier={gtm_identifer2}
                            gtm_value={gtm_value2}
                            className="bottom_right_content_block__button_link_title"
                            button_underline={button_underline}
                        />
                        <h3 className="bottom_right_content_block__title">
                            {bottomImageCollectionTitle}
                        </h3>
                        <div className="bottom_right_content_block__description">
                            {bottomImageDescription}
                        </div>
                    </div>
                </div>
            )}
            <style jsx>{styles}</style>
            <style jsx>
                {`
                    .bottom_left_content_block {
                        display: flex;
                        justify-content: space-around;
                        flex-wrap: wrap;
                        margin: 0 auto;
                    }
                    .bottom_right_content_block {
                        position: relative;
                        text-align: ${bottom_right_content_alignment || 'left'};
                    }
                    .bottom_right_content_block__content_container {
                        position: absolute;
                        bottom: ${content_bottom_position_bottom_right_block}px;
                        left: ${content_left_position_bottom_right_block}px;
                        right: ${content_right_position_bottom_right_block}px;
                        top: ${content_top_position_bottom_right_block}px;
                        color: white;
                        padding: 0 20px;
                    }
                    .bottom_right_content_block__title {
                        font-size: ${collection_title2_font_size || 0}px;
                        font-weight: ${collection_title2_font_weight ||
                            'normal'};
                        font-family: ${collection_title2_font_family ||
                            'acumin-pro, sans-serif'};
                        margin: 0;
                        line-height: 1;
                        padding-top: 10px;
                        padding-bottom: 60px;
                    }
                    .bottom_right_content_block__description {
                        font-size: ${collection_description2_font_size || 0}px;
                        font-weight: ${collection_description2_font_weight ||
                            'normal'};
                        font-family: ${collection_description2_font_family ||
                            'acumin-pro, sans-serif'};
                        line-height: 1;
                    }
                    .content_block__image {
                        width: 100%;
                        display: block;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .bottom_right_content_block__title {
                            font-size: ${collection_title2_mobile_font_size ||
                                0}px;
                        }
                        .bottom_right_content_block__description {
                            font-size: ${collection_description2_mobile_font_size ||
                                0}px;
                        }
                    }
                `}
            </style>
        </>
    );
};

BottomRightContentBlock.propTypes = {
    block: PropTypes.object.isRequired,
};

export default BottomRightContentBlock;
