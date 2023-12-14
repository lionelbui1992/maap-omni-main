import React from 'react';
import PropTypes from 'prop-types';
import Image from '../PrismicComponents/Image';
import Content from '../PrismicComponents/Content';
import { sortBlocksForMobile } from '../utils/ramda';
import { formatPrismicText } from 'containers/Prismic/utils/prismic';
import {
    breakpointExtraLarge,
    breakpointSmall,
    breakpointLarge,
    breakpointMedium,
} from 'config/styles/breakpoints';
import Video from '../PrismicComponents/Video';
import { styles } from './styles';

const Item = ({ item, isMobile, block }) => {
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
        youtube_url,
        youtube_title,
        shopify_video,
        tile_image_height,
    } = item;
    const { desktop_space_in_between_blocks, mobile_space_in_between_blocks } =
        block;
    const image = isMobile && mobile_image.url ? mobile_image : desktop_image;
    const buttonLink = button_link;
    const imageLink = image_link;
    const displayContent = display_content === 'Yes';
    const classNames =
        display_content_over_image === 'Yes' ? 'tile over' : 'tile below';
    const buttons = [
        {
            button_text: item.button_text,
            button_type: item.button_type,
            buttonLink,
            button_position: item.button_position,
            button_link_title: item.button_link_title,
            button_text_colour: item.button_text_colour,
            button_colour: item.button_colour,
            button_gtm_identifier: item.button_gtm_identifier,
            button_link_type: item.button_link_type,
            button_text_font_size: item.button_text_font_size,
            button_text_mobile_font_size: item.button_text_mobile_font_size,
            button_text_font_weight: item.button_text_font_weight,
            button_transform_x_axis: item.transform_x_axis,
            button_underline: item.button_underline,
        },
    ];

    return (
        <div className={classNames}>
            {image && image?.url && (
                <Image
                    src={image.url}
                    image_alt_text={image.alt}
                    link={imageLink}
                    link_type={image_link_type}
                    link_title={image_link_title}
                    gtm_identifier={gtm_identifier}
                    tile_image_height={tile_image_height}
                />
            )}
            {youtube_url && youtube_url?.url && (
                <section>
                    <iframe
                        title={formatPrismicText(youtube_title)}
                        src={youtube_url.url}
                        type="text/html"
                        frameBorder="0"
                        allow="accelerometer;
                        autoplay;
                        clipboard-write;
                        encrypted-media;
                        gyroscope;
                        picture-in-picture"
                        allowFullScreen
                    />
                </section>
            )}
            {shopify_video && shopify_video?.url && (
                <section>
                    <div className="shopify_video">
                        <Video
                            src={shopify_video?.url}
                            autoplay
                            loop
                            muted
                            link={imageLink}
                            link_type={image_link_type}
                        />
                    </div>
                </section>
            )}
            {displayContent ? (
                <Content buttons={buttons} isMobile={isMobile} {...item} />
            ) : (
                ''
            )}
            <style jsx global>
                {styles}
            </style>
            <style jsx global>
                {`
                    .shopify_video > video {
                        height: calc(100vw * 9 / 18);
                    }
                    @media (max-width: ${breakpointExtraLarge}) {
                        .shopify_video > video {
                            height: 100%;
                        }
                    }
                    @media (max-width: ${breakpointSmall}) {
                        .shopify_video > video {
                            height: auto;
                        }
                    }
                `}
            </style>
            <style jsx>
                {`
                    div {
                        ${width_in_desktop
                            ? `width: ${width_in_desktop}%`
                            : ''};
                        ${tile_background_colour
                            ? `background-color: ${tile_background_colour}`
                            : ''};
                        padding: ${desktop_space_in_between_blocks || 0}px;
                    }
                    section {
                        display: flex;
                        width: 100%;
                        height: calc(100vw * 9 / 18);
                        min-height: 0;
                        overflow: hidden;
                    }
                    iframe,
                    .shopify_video {
                        flex: 1 1 auto;
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        ${tile_background_colour
                            ? `background-color: ${tile_background_colour}`
                            : ''};
                    }
                    @media (max-width: ${breakpointMedium}) {
                        div {
                            ${width_in_mobile
                                ? `width: ${width_in_mobile}%`
                                : ''};
                            padding: ${mobile_space_in_between_blocks || 0}px;
                        }
                        section {
                            min-height: auto;
                        }
                    }
                    @media (max-width: ${breakpointSmall}) {
                        section {
                            min-height: calc(100vw * 18 / 18);
                        }
                    }
                    @media only screen and (min-device-width: 768px) and (max-device-width: ${breakpointMedium}) {
                        section {
                            min-height: calc(100vw * 18 / 18);
                        }
                    }
                    @media only screen and (min-device-width: 1024px) and (max-device-width: ${breakpointLarge}) {
                        section {
                            min-height: auto;
                        }
                    }
                `}
            </style>
        </div>
    );
};

const Tiles = ({ isMobile, block, items }) => {
    const orderedItemsForMobile = sortBlocksForMobile(items);
    const tiles = isMobile ? orderedItemsForMobile : items;
    let sumOfWithInMobile = 0;
    let sumOfWithInDesktop = 0;
    const {
        mobile_padding_top,
        mobile_padding_bottom,
        padding_top,
        padding_bottom,
        desktop_side_padding,
    } = block;
    const tilesJsx = tiles.map((item, key) => {
        sumOfWithInMobile += item.width_in_mobile;
        sumOfWithInDesktop += item.width_in_desktop;

        return (
            <>
                <Item
                    key={`tile_${key}`}
                    item={item}
                    block={block}
                    isMobile={isMobile}
                    sumOfWithInMobile={sumOfWithInMobile}
                    sumOfWithInDesktop={sumOfWithInDesktop}
                />
                <style jsx>{styles}</style>
            </>
        );
    });

    return (
        <div className="tiles">
            <div className="container">{tilesJsx}</div>
            <style jsx>{styles}</style>
            <style jsx>
                {`
                    .container {
                        padding: ${padding_top || 0}px
                            ${desktop_side_padding || 0}px
                            ${padding_bottom || 0}px
                            ${desktop_side_padding || 0}px;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .container {
                            padding: ${mobile_padding_top || 0}px 0px
                                ${mobile_padding_bottom || 0}px 0px;
                        }
                    }
                `}
            </style>
        </div>
    );
};

Tiles.propTypes = {
    block: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
};

Item.propTypes = {
    block: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
};

export default Tiles;
