import React from 'react';
import { breakpointMedium } from 'config/styles/breakpoints';
import Image from '../../PrismicComponents/Image';
import Button from '../../PrismicComponents/Button';
import { RichText } from 'prismic-reactjs';
import PropTypes from 'prop-types';
import { styles } from '../styles';

const TopRightContentBlock = ({ block, isMobile, isTablet }) => {
    const {
        desktop_image1,
        mobile_image1,
        button_link_title1,
        button_link1,
        button_link_type1,
        button_text_colour1,
        button_colour1,
        button_type1,
        gtm_identifer1,
        gtm_value1,
        button_text_font_size1,
        button_text_mobile_font_size1,
        button_text_font_weight1,
        collection_title1,
        collection_description1,
        image_link1,
        image_link_type1,
        collection_title1_font_size,
        collection_title1_mobile_font_size,
        collection_title1_font_weight,
        collection_title1_font_family,
        collection_description1_font_size,
        collection_description1_mobile_font_size,
        collection_description1_font_weight,
        collection_description1_font_family,
        top_right_content_alignment,
        content_bottom_position_top_right_block,
        content_left_position_top_right_block,
        content_right_position_top_right_block,
        content_top_position_top_right_block,
        button_underline,
    } = block;

    const topImage =
        isMobile || isTablet ? mobile_image1.url : desktop_image1.url;
    const topImageAlt =
        isMobile || isTablet ? mobile_image1.alt : desktop_image1.alt;
    const topImageCollectionTitle = collection_title1;
    const topImageDescription = RichText.render(collection_description1);

    return (
        <>
            {!topImage ? null : (
                <div className="top_right_content_block">
                    <Image
                        src={topImage}
                        link={image_link1}
                        link_type={image_link_type1}
                        link_title={topImageAlt}
                        image_alt_text={topImageAlt}
                        className="content_block__image"
                    />
                    <div className="top_right_content_block__content_container">
                        <Button
                            link_type={button_link_type1}
                            link={button_link1}
                            linkTitle={button_link_title1}
                            text={button_link_title1}
                            textColour={button_text_colour1}
                            type={button_type1}
                            colour={button_colour1}
                            font_weight={button_text_font_weight1}
                            desktop_font_size={button_text_font_size1}
                            mobile_font_size={button_text_mobile_font_size1}
                            gtm_identifier={gtm_identifer1}
                            gtm_value={gtm_value1}
                            className="top_right_content_block__button_link_title"
                            button_underline={button_underline}
                        />
                        <h3 className="top_right_content_block__title">
                            {topImageCollectionTitle}
                        </h3>
                        <div className="top_right_content_block__description">
                            {topImageDescription}
                        </div>
                    </div>
                </div>
            )}
            <style jsx>{styles}</style>
            <style jsx>
                {`
                    .top_right_content_block {
                        position: relative;
                        text-align: ${top_right_content_alignment || 'left'};
                    }
                    .top_right_content_block__content_container {
                        position: absolute;
                        bottom: ${content_bottom_position_top_right_block}px;
                        left: ${content_left_position_top_right_block}px;
                        right: ${content_right_position_top_right_block}px;
                        top: ${content_top_position_top_right_block}px;
                        color: white;
                        padding: 0 20px;
                    }
                    .top_right_content_block__title {
                        font-size: ${collection_title1_font_size || 0}px;
                        font-weight: ${collection_title1_font_weight ||
                            'normal'};
                        font-family: ${collection_title1_font_family ||
                            'acumin-pro, sans-serif'};
                        margin: 0;
                        line-height: 1;
                        padding-top: 10px;
                        padding-bottom: 60px;
                    }
                    .top_right_content_block__description {
                        font-size: ${collection_description1_font_size || 0}px;
                        font-weight: ${collection_description1_font_weight ||
                            'normal'};
                        font-family: ${collection_description1_font_family ||
                            'acumin-pro, sans-serif'};
                        line-height: 1;
                    }
                    .content_block__image {
                        width: 100%;
                        display: block;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .top_right_content_block__title {
                            font-size: ${collection_title1_mobile_font_size ||
                                0}px;
                        }
                        .top_right_content_block__description {
                            font-size: ${collection_description1_mobile_font_size ||
                                0}px;
                        }
                    }
                `}
            </style>
        </>
    );
};

TopRightContentBlock.propTypes = {
    block: PropTypes.object.isRequired,
};

export default TopRightContentBlock;
