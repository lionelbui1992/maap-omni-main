import React from 'react';
import { formatPrismicText } from '../../utils/prismic';
import { breakpointMedium } from 'config/styles/breakpoints';
import PropTypes from 'prop-types';
import { styles } from '../styles';

const TopLeftContentBlock = ({ block }) => {
    const {
        collection_title,
        collection_description,
        logo_icon,
        collection_title_font_size,
        collection_title_font_weight,
        collection_title_font_family,
        collection_description_font_size,
        collection_description_font_weight,
        collection_description_font_family,
        collection_title_mobile_font_size,
        collection_description_mobile_font_size,
    } = block;

    const collectionTitle = formatPrismicText(collection_title);
    const collectionDescription = formatPrismicText(collection_description);

    return (
        <>
            <div className="top_left_content_block__title_and_image">
                <h2>{collectionTitle}</h2>
                {!logo_icon.url ? null : (
                    <img
                        src={logo_icon.url}
                        alt={logo_icon.alt}
                        className="top_left_content_block__logo_icon"
                    />
                )}
            </div>
            <div className="top_left_content_block__description">
                {collectionDescription}
            </div>
            <style jsx>{styles}</style>
            <style jsx>
                {`
                    .top_left_content_block__title_and_image {
                        display: flex;
                        justify-content: center;
                    }
                    .top_left_content_block__logo_icon {
                        width: 85px;
                        padding-left: 10px;
                        padding-bottom: 6px;
                    }
                    h2 {
                        font-size: ${collection_title_font_size || 0}px;
                        font-weight: ${collection_title_font_weight ||
                            'normal'};
                        font-family: ${collection_title_font_family ||
                            'acumin-pro, sans-serif'};
                        text-align: center;
                    }
                    .top_left_content_block__description {
                        font-size: ${collection_description_font_size || 0}px;
                        font-weight: ${collection_description_font_weight ||
                            'normal'};
                        font-family: ${collection_description_font_family ||
                            'acumin-pro, sans-serif'};
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .top_left_content_block__title_and_image {
                            display: flex;
                            justify-content: center;
                        }
                        .top_left_content_block__logo_icon {
                            width: 85px;
                            padding: 0 0 0 10px;
                        }
                        h2 {
                            font-size: ${collection_title_mobile_font_size ||
                                0}px;
                            text-align: center;
                        }
                        .top_left_content_block__description {
                            font-size: ${collection_description_mobile_font_size ||
                                0}px;
                        }
                    }
                `}
            </style>
        </>
    );
};

TopLeftContentBlock.propTypes = {
    block: PropTypes.object.isRequired,
};

export default TopLeftContentBlock;
