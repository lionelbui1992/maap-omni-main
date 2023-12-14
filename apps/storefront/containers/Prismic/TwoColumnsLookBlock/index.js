import React from 'react';
import Button from '../PrismicComponents/Button';
import Image from '../PrismicComponents/Image';
import { fontStyles, contentAlignStyles, blockSpacing } from '../utils/styles';
import { RichText } from 'prismic-reactjs';
import { styles } from './styles';

const Content = ({
    content,
    content_font_family,
    content_font_size,
    content_mobile_font_size,
    content_font_colour,
    content_alignment,
    content_title,
    content_title_font_family,
    content_title_font_size,
    content_title_mobile_font_size,
    content_title_colour,
    button_text,
    button_link_title,
    button_type,
    buttonLink,
    button_link_type,
    button_text_colour,
    button_colour,
    gtm_identifier,
    button_position,
    isMobile,
    button_text_font_weight,
    button_text_font_size,
    button_text_mobile_font_size,
    button_underline,
}) => {
    if (!content_title && !content && !button_text) {
        return null;
    }

    const contentFontSize =
        isMobile && content_mobile_font_size
            ? content_mobile_font_size
            : content_font_size;
    const contentTitleFontSize =
        isMobile && content_title_mobile_font_size
            ? content_title_mobile_font_size
            : content_title_font_size;

    return (
        <>
            <div
                className="content"
                style={contentAlignStyles(content_alignment)}
            >
                {button_position !== 'End of the content' ? (
                    <Button
                        text={button_text}
                        type={button_type}
                        link={buttonLink}
                        textColour={button_text_colour}
                        colour={button_colour}
                        gtmIdentifier={gtm_identifier}
                        linkTitle={button_link_title}
                        link_type={button_link_type}
                        font_weight={button_text_font_weight}
                        desktop_font_size={button_text_font_size}
                        mobile_font_size={button_text_mobile_font_size}
                        button_underline={button_underline}
                    />
                ) : null}
                {content_title ? (
                    <div
                        className="content_title_container"
                        style={fontStyles(
                            content_title_font_family,
                            contentTitleFontSize,
                            content_title_colour
                        )}
                    >
                        {RichText.render(content_title)}
                    </div>
                ) : null}
                {content ? (
                    <div
                        className="content_container"
                        style={fontStyles(
                            content_font_family,
                            contentFontSize,
                            content_font_colour
                        )}
                    >
                        {RichText.render(content)}
                    </div>
                ) : null}
                {button_position === 'End of the content' ? (
                    <Button
                        text={button_text}
                        type={button_type}
                        link={buttonLink}
                        textColour={button_text_colour}
                        colour={button_colour}
                        gtmIdentifier={gtm_identifier}
                        linkTitle={button_link_title}
                        link_type={button_link_type}
                        font_weight={button_text_font_weight}
                        desktop_font_size={button_text_font_size}
                        mobile_font_size={button_text_mobile_font_size}
                        button_underline={button_underline}
                    />
                ) : null}
            </div>
            <style jsx>{styles}</style>
        </>
    );
};

const Item = ({ item, isMobile, index, block }) => {
    const {
        first_item,
        width,
        desktop_image,
        mobile_image,
        button_link,
    } = item;

    const image =
        isMobile && mobile_image.url ? mobile_image.url : desktop_image.url;
    const buttonLink = button_link;
    const classNames = `column ${index === 0 ? 'right_column' : 'left_column'}`;
    const sapcingInBetweenForMobile = block.mobile_space_in_between_blocks
        ? block.mobile_space_in_between_blocks
        : '25';

    return (
        <>
            <div
                className={classNames}
                style={{
                    width: width ? `${width}%` : '47%',
                    paddingBottom: `${
                        isMobile && sapcingInBetweenForMobile && index === 0
                            ? sapcingInBetweenForMobile
                            : 0
                    }px`,
                }}
            >
                {first_item === 'Image' ? (
                    <Image
                        src={image}
                        image_alt_text={image.alt}
                        link={item.image_link}
                        link_title={item.image_link_title}
                        link_type={item.image_link_type}
                        gtm_identifier={item.gtm_identifier}
                    />
                ) : (
                    <Content
                        buttonLink={buttonLink}
                        isMobile={isMobile}
                        {...item}
                    />
                )}
                {first_item !== 'Image' ? (
                    <Image
                        src={image}
                        image_alt_text={image.alt}
                        link={item.image_link}
                        link_title={item.image_link_title}
                        link_type={item.image_link_type}
                        gtm_identifier={item.gtm_identifier}
                    />
                ) : (
                    <Content
                        buttonLink={buttonLink}
                        isMobile={isMobile}
                        {...item}
                    />
                )}
            </div>
            <style jsx>{styles}</style>
        </>
    );
};

const TwoColumnsLookBlock = ({ isMobile, block, items }) => {
    const isFullWidth = block.full_width === 'Yes';
    const maxWidth = block.max_width ? block.max_width : 1024;
    if (items.length !== 2) {
        return null;
    }

    let orderedItems = [items[1], items[0]];
    if (
        isMobile &&
        !isNaN(items[1].sort_order_in_mobile) &&
        !isNaN(items[0].sort_order_in_mobile) &&
        items[0].sort_order_in_mobile < items[1].sort_order_in_mobile
    ) {
        orderedItems = [items[0], items[1]];
    }

    const OrderedItemList = orderedItems.map((item, key) => {
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

    return (
        <>
            <div className="two_columns_look_block">
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
                    {OrderedItemList}
                </div>
            </div>
            <style jsx>{styles}</style>
        </>
    );
};

export default TwoColumnsLookBlock;
