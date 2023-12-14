import React from 'react';
import { breakpointSmall } from 'config/styles/breakpoints';
import { RichText } from 'prismic-reactjs';
import PropTypes from 'prop-types';
import { styles } from '../styles';

const BottomLeftContentBlock = ({ items }) => {
    const bulletContent = items.map((item, index) => {
        const {
            bullet_description_font_size,
            bullet_description_mobile_font_size,
            bullet_content_alignment,
            bullet_description_font_weight,
            bullet_image_icon,
            bullet_description,
            bullet_image_icon_alt,
            bullet_description_font_family,
        } = item;
        return (
            <div key={index} className="bulletContent">
                <div>
                    {!bullet_image_icon.url ? null : (
                        <img
                            src={bullet_image_icon.url}
                            alt={bullet_image_icon_alt}
                        />
                    )}
                    <div className="bulletContent__description">
                        {RichText.render(bullet_description)}
                    </div>
                </div>
                <style jsx>{styles}</style>
                <style jsx>
                    {`
                        .bulletContent {
                            display: flex;
                            flex-direction: column;
                            flex: 1 1 45%;
                            padding: 50px 10px;
                            justify-content: ${bullet_content_alignment ||
                                'center'};
                        }
                        img {
                            width: 70px;
                            height: 70px;
                            margin: 0 auto;
                            text-align: ${bullet_content_alignment || 'center'};
                        }
                        .bulletContent__description {
                            font-size: ${bullet_description_font_size || 0}px;
                            line-height: 1;
                            padding-top: 10px;
                            font-weight: ${bullet_description_font_weight ||
                                'normal'};
                            text-align: ${bullet_content_alignment || 'center'};
                            font-family: ${bullet_description_font_family ||
                                'acumin-pro, sans-serif'};
                        }
                        @media (max-width: ${breakpointSmall}) {
                            .bulletContent {
                                width: 100%;
                                flex: 1 1 22%;
                                padding: 0 0 50px 0;
                            }
                            .bulletContent__description {
                                width: 100%;
                                font-size: ${bullet_description_mobile_font_size ||
                                    0}px;
                            }
                        }
                    `}
                </style>
            </div>
        );
    });

    return <>{bulletContent}</>;
};

BottomLeftContentBlock.propTypes = {
    items: PropTypes.array.isRequired,
};

export default BottomLeftContentBlock;
