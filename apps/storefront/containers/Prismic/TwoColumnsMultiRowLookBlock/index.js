import React from 'react';
import { blockSpacing } from '../utils/styles';
import filter from 'ramda/src/filter';
import {
    isInLeftColumn,
    isInRightColumn,
    isInRowOne,
    isInRowTwo,
    sortBlocksForMobile,
} from '../utils/ramda';
import Content from '../PrismicComponents/Content';
import Image from '../PrismicComponents/Image';
import { breakpointMedium } from 'config/styles/breakpoints';
import { styles } from './styles';

const Item = ({ item, isMobile, block }) => {
    const {
        width,
        desktop_image,
        mobile_image,
        button_link,
        display_content,
        display_content_over_image,
        image_link,
        image_link_type,
        image_link_title,
        gtm_identifier,
        tile_left_and_right_padding,
        tile_top_padding,
    } = item;

    const image = isMobile && mobile_image.url ? mobile_image : desktop_image;
    const buttonLink = button_link;
    const imageLink = image_link;
    const sapcingInBetweenForMobile = block.mobile_space_in_between_blocks
        ? block.mobile_space_in_between_blocks
        : '0';
    const sapcingInBetweenForDesktop = block.desktop_space_in_between_blocks
        ? block.desktop_space_in_between_blocks
        : '0';

    const displayContent = display_content === 'Yes';
    const displayContentOverImage = display_content_over_image === 'Yes';
    const classNames = displayContentOverImage ? 'tile over' : 'tile below';

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
            <div className={classNames}>
                <Image
                    src={image.url}
                    image_alt_text={image.alt}
                    link={imageLink}
                    link_type={image_link_type}
                    link_title={image_link_title}
                    gtm_identifier={gtm_identifier}
                />
                {displayContent ? (
                    <Content buttons={buttons} isMobile={isMobile} {...item} />
                ) : (
                    ''
                )}
            </div>
            <style jsx>{styles}</style>
            <style jsx>
                {`
                    div {
                        width: ${width ? `${width}%` : '100%'};
                        padding-left: ${`${tile_left_and_right_padding}px` ||
                        0};
                        padding-right: ${`${tile_left_and_right_padding}px` ||
                        0};
                    }
                    @media (max-width: ${breakpointMedium}) {
                        div {
                            padding: 0;
                        }
                    }
                `}
            </style>
        </>
    );
};

const RenderItems = ({ items, isMobile, block }) =>
    items.map((item, key) => {
        item = { ...item, width: isMobile ? 100 : item.width_within_row };
        return (
            <Item
                key={key}
                item={item}
                isMobile={isMobile}
                index={key}
                block={block}
            />
        );
    });

const RenderDesktopColumn = ({ items, isMobile, block }) => {
    const rowOneBlocks = filter(isInRowOne, items);
    const rowTwoBlocks = filter(isInRowTwo, items);
    return (
        <>
            {rowOneBlocks ? (
                <div className="row one">
                    <RenderItems
                        items={rowOneBlocks}
                        isMobile={isMobile}
                        block={block}
                    />
                </div>
            ) : (
                ''
            )}
            {rowTwoBlocks.length > 0 ? (
                <div className="row two">
                    <RenderItems
                        items={rowTwoBlocks}
                        isMobile={isMobile}
                        block={block}
                    />
                </div>
            ) : (
                ''
            )}
            <style jsx>{styles}</style>
        </>
    );
};

const TwoColumnsMultiRowLookBlock = ({ isMobile, block, items }) => {
    const isFullWidth = block.full_width === 'Yes';
    const maxWidth = block.max_width ? block.max_width : 1024;

    const leftColumnBlocks = filter(isInLeftColumn, items);
    const rightColumnBlocks = filter(isInRightColumn, items);
    const orderedItemsForMobile = sortBlocksForMobile(items);

    return (
        <div className="two_columns_multi_row_look_block">
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
                {isMobile ? (
                    <RenderItems
                        items={orderedItemsForMobile}
                        isMobile={isMobile}
                        block={block}
                    />
                ) : (
                    <>
                        <div
                            className="column left_column"
                            style={
                                `${block.left_column_width}%`
                                    ? {
                                          flex: `1 0 ${block.left_column_width}%`,
                                      }
                                    : null
                            }
                        >
                            <RenderDesktopColumn
                                items={leftColumnBlocks}
                                isMobile={isMobile}
                                block={block}
                            />
                        </div>
                        <div
                            className="column right_column"
                            style={
                                `${block.right_column_width}%`
                                    ? {
                                          flex: `1 0 ${block.right_column_width}%`,
                                      }
                                    : null
                            }
                        >
                            <RenderDesktopColumn
                                items={rightColumnBlocks}
                                isMobile={isMobile}
                                block={block}
                            />
                        </div>
                        <style jsx>{styles}</style>
                        <style jsx>
                            {`
                                .left_column {
                                    vertical-align: center;
                                    width: 60%;
                                    margin: auto;
                                }
                                .right_column {
                                    vertical-align: center;
                                    width: 60%;
                                    margin: auto;
                                }
                            `}
                        </style>
                    </>
                )}
            </div>
        </div>
    );
};

export default TwoColumnsMultiRowLookBlock;
