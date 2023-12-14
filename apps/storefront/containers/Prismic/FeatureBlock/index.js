import React from 'react';
import { blockSpacing } from '../utils/styles';
import { sortBlocksForMobile } from '../utils/ramda';
import config from 'config/brandConfig';
import Content from '../PrismicComponents/Content';
import Image from '../PrismicComponents/Image';
import PropTypes from 'prop-types';
import { styles } from './styles';

const Item = ({
    item,
    isMobile,
    block,
    sumOfWithInMobile,
    sumOfWithInDesktop,
}) => {
    const {
        desktop_image,
        mobile_image,
        button_link,
        width_in_mobile,
        width_in_desktop,
        display_content,
        display_content_over_image,
        image_link,
        image_link_type,
        image_link_title,
        gtm_identifier,
        tile_background_colour,
    } = item;

    const image = isMobile && mobile_image.url ? mobile_image : desktop_image;
    const buttonLink = button_link;
    const imageLink = image_link;
    const spacingInBetweenForMobile = block.mobile_space_in_between_blocks
        ? block.mobile_space_in_between_blocks
        : '0';
    const spacingInBetweenForDesktop = block.desktop_space_in_between_blocks
        ? block.desktop_space_in_between_blocks
        : '0';
    const spacingInBetween = isMobile
        ? spacingInBetweenForMobile
        : spacingInBetweenForDesktop;
    const displayContent = display_content === 'Yes';
    const classNames =
        display_content_over_image === 'Yes'
            ? 'featureBlock over'
            : 'featureBlock below';
    const width = isMobile ? width_in_mobile : width_in_desktop;
    const totalWidth = isMobile ? sumOfWithInMobile : sumOfWithInDesktop;

    const buttons = [
        {
            button_text: item.button_text,
            button_type: item.button_type,
            buttonLink,
            button_link_title: item.button_link_title,
            button_text_colour: item.button_text_colour,
            button_colour: item.button_colour,
            button_gtm_identifier: item.button_gtm_identifier,
            button_link_type: item.button_link_type,
            button_text_font_size: item.button_text_font_size,
            button_text_mobile_font_size: item.button_text_mobile_font_size,
            button_text_font_weight: item.button_text_font_weight,
            button_underline: item.button_underline,
        },
    ];

    return (
        <>
            <div
                className={classNames}
                style={{
                    width: width ? `${width}%` : '50%',
                    marginTop: `${totalWidth > 100 ? spacingInBetween : 0}px`,
                    backgroundColor: tile_background_colour,
                }}
            >
                {image && (
                    <div className="feature_block__image_container">
                        <Image
                            src={image.url}
                            image_alt_text={image.alt}
                            link={imageLink}
                            link_type={image_link_type}
                            link_title={image_link_title}
                            gtm_identifier={gtm_identifier}
                        />
                    </div>
                )}
                {displayContent ? (
                    <Content buttons={buttons} isMobile={isMobile} {...item} />
                ) : (
                    ''
                )}
            </div>
            <style jsx>{styles}</style>
        </>
    );
};

const FeatureBlock = ({ isMobile, block, items }) => {
    const isFullWidth = block.full_width === 'Yes';
    const maxWidth = block.max_width ? block.max_width : 1024;
    const orderedItemsForMobile = sortBlocksForMobile(items);

    const featureBlock = isMobile ? orderedItemsForMobile : items;
    let sumOfWithInMobile = 0;
    let sumOfWithInDesktop = 0;

    return (
        <>
            <div className="feature_block">
                <div
                    className="container"
                    style={blockSpacing(
                        isFullWidth,
                        isMobile,
                        maxWidth,
                        block.padding_top,
                        block.padding_bottom,
                        block.mobile_padding_top,
                        block.mobile_padding_bottom
                    )}
                >
                    {featureBlock.map((item, key) => {
                        sumOfWithInMobile += item.width_in_mobile;
                        sumOfWithInDesktop += item.width_in_desktop;
                        return (
                            <Item
                                key={key}
                                item={item}
                                isMobile={isMobile}
                                block={block}
                                sumOfWithInMobile={sumOfWithInMobile}
                                sumOfWithInDesktop={sumOfWithInDesktop}
                            />
                        );
                    })}
                </div>
            </div>
            <style jsx>{styles}</style>
            <style jsx>
                {`
                    .container {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        margin: 0 auto;
                        padding-left: ${block.desktop_side_padding || 0}px;
                        padding-right: ${block.desktop_side_padding || 0}px;
                    }
                    @media (max-width: ${config.breakPoints.mobile
                            .maxDeviceWidth}px) {
                        .container {
                            flex-wrap: wrap;
                            padding-left: ${block.mobile_side_padding || 0}px;
                            padding-right: ${block.mobile_side_padding || 0}px;
                        }
                    }
                `}
            </style>
        </>
    );
};

FeatureBlock.propTypes = {
    block: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
};

Item.propTypes = {
    block: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
};

export default FeatureBlock;
