import React from 'react';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import { breakpointMedium } from 'config/styles/breakpoints';
import { brandBlack } from 'config/styles/colours';
import Image from 'containers/Prismic/PrismicComponents/Image';
import Button from 'containers/Prismic/PrismicComponents/Button';

const TilesItem = ({ item, block }) => {
    const {
        desktop_image,
        mobile_image,
        button_link,
        width_in_mobile,
        width_in_desktop,
        display_content,
        image_link,
        image_link_type,
        image_link_title,
        gtm_identifier,
        tile_background_colour,
        content_title,
        content,
        content_alignment,
        content_title_font_size,
        content_title_font_weight,
        content_title_colour,
        content_font_size,
        content_font_weight,
        content_font_colour,
        font_family_content_title,
        font_family_content,
        content_width,
        context_text_alignment,
        content_top_position,
        content_position_left,
        content_top_position_mobile,
        content_left_position_mobile,
        content_bottom_position,
        content_bottom_position_mobile,
        content_width_mobile,
        sort_order_in_mobile,
    } = item;
    const {
        desktop_space_in_between_blocks,
        mobile_space_in_between_blocks,
    } = block;
    const buttonLink = button_link;
    const imageLink = image_link;
    const displayContent = display_content === 'Yes';
    const hasMobileImage = mobile_image && mobile_image?.url;
    const hasDesktopImage = desktop_image && desktop_image?.url;

    const buttons = (
        <Button
            text={item.button_text}
            type={item.button_type}
            link={buttonLink}
            link_type={item.button_link_type}
            linkTitle={item.button_link_title}
            textColour={item.button_text_colour}
            colour={item.button_colour}
            gtm_identifier={item.button_gtm_identifier}
            desktop_font_size={item.button_text_font_size}
            mobile_font_size={item.button_text_mobile_font_size}
            font_weight={item.button_text_font_weight}
            button_underline={item.button_underline}
            transform_x_axis={item.transform_x_axis}
        />
    );

    return (
        <div
            className={`blog_tiles_container mobilePosition_${sort_order_in_mobile}`}
        >
            <div className="desktop_tile">
                {hasDesktopImage && (
                    <Image
                        src={desktop_image.url}
                        desktop_image_alt_text={desktop_image.alt}
                        link={imageLink}
                        link_type={image_link_type}
                        link_title={image_link_title}
                        gtm_identifier={gtm_identifier}
                    />
                )}
                {displayContent ? (
                    <div className={`blog_content ${content_alignment}`}>
                        <div className="content_container">
                            {!content_title.length ? null : (
                                <div className="content_title">
                                    {RichText.render(content_title)}
                                </div>
                            )}
                            {!content.length ? null : (
                                <div className="content_description">
                                    {RichText.render(content)}
                                </div>
                            )}
                            {!buttons ? null : buttons}
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>

            <div className="mobile_tile">
                {hasMobileImage && (
                    <Image
                        src={mobile_image.url}
                        image_alt_text={mobile_image.alt}
                        link={image_link}
                        link_type={image_link_type}
                        link_title={image_link_title}
                        gtm_identifier={gtm_identifier}
                    />
                )}
                {displayContent ? (
                    <div className={`blog_content ${content_alignment}`}>
                        <div className="content_container">
                            {!content_title.length ? null : (
                                <div className="content_title">
                                    {RichText.render(content_title)}
                                </div>
                            )}
                            {!content.length ? null : (
                                <div className="content_description">
                                    {RichText.render(content)}
                                </div>
                            )}
                            {!buttons ? null : buttons}
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>

            <style jsx global>
                {`
                    .blog_tiles_container > .desktop_image > img {
                        width: 100%;
                    }
                    .content_container a {
                        color: inherit;
                        text-decoration: underline;
                    }
                    .blog_tiles_container
                        > .blog_content
                        > .content_container
                        > .content_title
                        > p {
                        margin: 0;
                        line-height: 1.2em;
                    }

                    @media (max-width: ${breakpointMedium}) {
                        .blog_tiles_container > .mobile_image > img {
                            width: 100%;
                        }
                        .container .mobilePosition_1 {
                            order: 1;
                        }
                        .container .mobilePosition_2 {
                            order: 2;
                        }
                        .container .mobilePosition_3 {
                            order: 3;
                        }
                        .container .mobilePosition_4 {
                            order: 4;
                        }
                        .container .mobilePosition_5 {
                            order: 5;
                        }
                        .container .mobilePosition_6 {
                            order: 6;
                        }
                    }
                `}
            </style>
            <style jsx>
                {`
                    .blog_tiles_container {
                        position: relative;
                        line-height: 0;
                        width: ${width_in_desktop}%;
                        ${tile_background_colour
                            ? `background-color: ${tile_background_colour}`
                            : ''};
                        padding: ${desktop_space_in_between_blocks || 0}px;
                    }
                    .content_title {
                        font-size: ${content_title_font_size || 0}px;
                        font-weight: ${content_title_font_weight || 'normal'};
                        color: ${content_title_colour || brandBlack};
                        font-family: ${font_family_content_title ||
                            'acumin-pro, sans-serif'};
                        padding-bottom: 15px;
                        line-height: 1.2em;
                    }
                    .content_description {
                        font-size: ${content_font_size || 0}px;
                        font-weight: ${content_font_weight || 'normal'};
                        color: ${content_font_colour || brandBlack};
                        font-family: ${font_family_content ||
                            'acumin-pro, sans-serif'};
                        line-height: 1.2em;
                        padding-bottom: 5px;
                    }
                    .blog_content {
                        position: ${hasDesktopImage ? `absolute` : `initial`};
                        ${content_width ? `width: ${content_width}%;` : ''};
                        ${content_top_position
                            ? `top: ${content_top_position}%`
                            : ''};
                        ${content_bottom_position
                            ? `bottom: ${content_bottom_position}%;`
                            : ''};
                        ${content_position_left
                            ? `left: ${content_position_left}%;`
                            : ''};
                        ${!hasDesktopImage
                            ? `padding-top: ${content_top_position}%;`
                            : ''};
                        ${!hasDesktopImage
                            ? `padding-left: ${content_position_left}%;`
                            : ''};
                        ${!hasDesktopImage ? `padding-bottom: 45px;` : ''};
                        color: ${content_font_colour || brandBlack};
                        line-height: 2.4em;
                    }
                    .content_container {
                        text-align: ${context_text_alignment || 'left'};
                    }
                    .blog_content.Left {
                        text-align: left;
                        align-items: flex-end;
                    }
                    .blog_content.Right {
                        text-align: right;
                        align-items: flex-start;
                    }
                    .blog_content.Center {
                        text-align: center;
                    }
                    .desktop_tile {
                        display: block;
                    }
                    .mobile_tile {
                        display: none;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .blog_tiles_container {
                            width: ${width_in_mobile}%;
                            padding: ${mobile_space_in_between_blocks || 0}px;
                        }
                        .blog_content {
                            position: ${hasMobileImage
                                ? `absolute`
                                : `initial`};
                            ${content_width_mobile
                                ? `width: ${content_width_mobile}%;`
                                : ''};
                            ${content_bottom_position_mobile
                                ? `bottom: ${content_bottom_position_mobile}%`
                                : ''};
                            ${content_left_position_mobile
                                ? `left: ${content_left_position_mobile}%`
                                : ''};
                            ${content_top_position_mobile
                                ? `top: ${content_top_position_mobile}%`
                                : ''};
                            ${!hasMobileImage
                                ? `padding-top: ${content_top_position_mobile}%;`
                                : ''};
                            ${!hasMobileImage
                                ? `padding-left: ${content_left_position_mobile}%;`
                                : ''};
                            ${!hasMobileImage ? `padding-bottom: 45px;` : ''};
                        }
                        .desktop_tile {
                            display: none;
                        }
                        .mobile_tile {
                            display: block;
                        }
                    }
                `}
            </style>
        </div>
    );
};

const BlogTiles = ({ block, items }) => {
    let sumOfWithInMobile = 0;
    let sumOfWithInDesktop = 0;
    const {
        mobile_padding_top,
        mobile_padding_bottom,
        padding_top,
        padding_bottom,
        desktop_side_padding,
    } = block;

    const tilesJsx = items.map((item, key) => {
        sumOfWithInMobile += item.width_in_mobile;
        sumOfWithInDesktop += item.width_in_desktop;

        return (
            <TilesItem
                key={`tile_${key}`}
                item={item}
                block={block}
                sumOfWithInMobile={sumOfWithInMobile}
                sumOfWithInDesktop={sumOfWithInDesktop}
            />
        );
    });

    return (
        <div className="blog_tiles">
            <div className="container">{tilesJsx}</div>
            <style jsx>
                {`
                    .blog_tiles {
                        display: flex;
                    }
                    .container {
                        width: 100%;
                        display: flex;
                        padding: ${padding_top || 0}px
                            ${desktop_side_padding || 0}px
                            ${padding_bottom || 0}px
                            ${desktop_side_padding || 0}px;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .container {
                            padding: ${mobile_padding_top || 0}px 0
                                ${mobile_padding_bottom || 0}px 0;
                            flex-wrap: wrap;
                        }
                    }
                `}
            </style>
        </div>
    );
};

BlogTiles.propTypes = {
    block: PropTypes.object.isRequired,
    items: PropTypes.array,
};

TilesItem.propTypes = {
    block: PropTypes.object.isRequired,
    item: PropTypes.object,
};

export default BlogTiles;
