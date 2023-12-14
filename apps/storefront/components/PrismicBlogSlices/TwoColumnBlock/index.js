import React from 'react';
import filter from 'ramda/src/filter';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import { brandBlack } from 'config/styles/colours';
import Image from 'containers/Prismic/PrismicComponents/Image';
import { breakpointMedium } from 'config/styles/breakpoints';
import {
    isInLeftColumn,
    isInRightColumn,
    isInRowOne,
    isInRowTwo,
} from 'containers/Prismic/utils/ramda';
import SSRLink from '@containers/Prismic/PrismicComponents/SSRLink';
import css from 'styled-jsx/css';
import { LinkableWrapper } from 'helpers/linkableWrapper';

const Item = ({ item }) => {
    const {
        desktop_image,
        mobile_image,
        image_link,
        image_link_type,
        image_link_title,
        gtm_identifier,
        display_content,
        content_title,
        content_title_font_size,
        content_title_font_weight,
        content_title_mobile_font_size,
        content_title_colour,
        font_family_content_title,
        content,
        content_font_size,
        content_mobile_font_size,
        content_font_weight,
        font_family_content,
        content_font_colour,
        content_title2,
        content_title2_font_size,
        content_title2_font_weight,
        content_title2_mobile_font_size,
        font_family_content_title2,
        content2,
        content2_font_size,
        content2_mobile_font_size,
        content2_font_weight,
        font_family_content2,
        content_width,
        content_alignment,
        context_text_alignment,
        mobile_content_width,
        content_top_bottom_padding,
        mobile_content_top_bottom_padding,
        content_left_padding,
        content_right_padding,
        image_padding,
        call_to_action,
        call_to_action_link,
        external_tab,
        analytics_event_description,
    } = item;
    const displayContent = display_content === 'Yes';
    const applyLinkToWholeTileCondition = !!call_to_action_link;

    const linkStyles = css.resolve`
        a {
            font-size: ${content_font_size || 20}px;
            font-weight: ${content_font_weight || 200};
            color: ${content_font_colour ? content_font_colour : brandBlack};
            white-space: nowrap;
            line-height: 1.5em;
            display: inline-flex;
            text-underline-offset: 4px;
            text-decoration-thickness: 1px;
        }
        @media (max-width: ${breakpointMedium}) {
            a {
                font-size: ${content_mobile_font_size || 15}px;
            }
        }
    `;

    const linkableWrapper = css.resolve`
        a {
            display: block;
            color: ${content_font_colour || brandBlack};
        }
    `;

    return (
        <>
            <div>
                <LinkableWrapper
                    applyLink={applyLinkToWholeTileCondition}
                    linkUrl={call_to_action_link}
                    className={linkableWrapper.className}
                    externalTab={external_tab}
                >
                    <div className="column_tiles">
                        {desktop_image && desktop_image?.url && (
                            <div className="desktop_image">
                                <Image
                                    src={desktop_image.url}
                                    image_alt_text={desktop_image.alt}
                                    link={image_link}
                                    link_type={image_link_type}
                                    link_title={image_link_title}
                                    gtm_identifier={gtm_identifier}
                                />
                            </div>
                        )}
                        {mobile_image && mobile_image?.url && (
                            <div className="mobile_image">
                                <Image
                                    src={mobile_image.url}
                                    image_alt_text={mobile_image.alt}
                                    link={image_link}
                                    link_type={image_link_type}
                                    link_title={image_link_title}
                                    gtm_identifier={gtm_identifier}
                                />
                            </div>
                        )}
                        {displayContent ? (
                            <div className={`content ${content_alignment}`}>
                                <div className="content_container">
                                    {content_title.length && content_title ? (
                                        <div className="content_title">
                                            {RichText.render(content_title)}
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    {content.length && content ? (
                                        <div className="content_description">
                                            {RichText.render(content)}
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    {content_title2.length && content_title2 ? (
                                        <div className="content_title2">
                                            {RichText.render(content_title2)}
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    {content2.length && content2 ? (
                                        <div className="content_description2">
                                            {RichText.render(content2)}
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    <SSRLink
                                        linkType={'collections' || 'products'}
                                        linkUrl={call_to_action_link}
                                        className={linkStyles.className}
                                        gtm_identifier={
                                            analytics_event_description
                                        }
                                        title={call_to_action}
                                        externalTab={external_tab}
                                    >
                                        {call_to_action}
                                    </SSRLink>
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </LinkableWrapper>
            </div>
            {linkStyles.styles}
            {linkableWrapper.styles}
            <style jsx global>
                {`
                    .content_container a {
                        color: inherit;
                        text-decoration: underline;
                    }
                    .column_tiles > .desktop_image > img {
                        width: 100%;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .column_tiles > .mobile_image > img {
                            width: 100%;
                        }
                    }
                `}
            </style>
            <style jsx>
                {`
                    .desktop_image {
                        display: block;
                    }
                    .mobile_image {
                        display: none;
                    }
                    .content_title {
                        font-size: ${content_title_font_size || 0}px;
                        font-weight: ${content_title_font_weight || 'normal'};
                        color: ${content_title_colour || brandBlack};
                        font-family: ${font_family_content_title ||
                        'acumin-pro, sans-serif'};
                    }
                    .content_description {
                        font-size: ${content_font_size || 0}px;
                        font-weight: ${content_font_weight || 'normal'};
                        color: ${content_font_colour || brandBlack};
                        font-family: ${font_family_content ||
                        'acumin-pro, sans-serif'};
                    }
                    .content_title2 {
                        font-size: ${content_title2_font_size || 0}px;
                        color: ${content_title_colour || brandBlack};
                        font-weight: ${content_title2_font_weight || 'normal'};
                        font-family: ${font_family_content_title2 ||
                        'acumin-pro, sans-serif'};
                    }
                    .content_description2 {
                        font-size: ${content2_font_size || 0}px;
                        color: ${content_font_colour || brandBlack};
                        font-weight: ${content2_font_weight || 'normal'};
                        font-family: ${font_family_content2 ||
                        'acumin-pro, sans-serif'};
                    }
                    .content {
                        ${content_width ? `width: ${content_width}%;` : ''};
                        display: flex;
                        flex-direction: column;
                        margin: 0 auto;
                        vertical-align: middle;
                        padding-top: ${content_top_bottom_padding || 0}px;
                        padding-bottom: ${content_top_bottom_padding || 0}px;
                        padding-right: ${content_right_padding || 0}px;
                        padding-left: ${content_left_padding || 0}px;
                        box-sizing: border-box;
                    }
                    .content_container {
                        text-align: ${context_text_alignment || 'left'};
                    }
                    p {
                        font-size: inherit;
                        line-height: inherit;
                        color: inherit;
                        font-weight: inherit;
                        word-break: break-word;
                    }
                    .content.Left {
                        text-align: left;
                        align-items: flex-end;
                    }
                    .content.Right {
                        text-align: right;
                        align-items: flex-start;
                    }
                    .content.Center {
                        text-align: center;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .desktop_image {
                            display: none;
                        }
                        .mobile_image {
                            display: block;
                            padding: ${image_padding || 0}px;
                        }
                        .content_title {
                            font-size: ${content_title_mobile_font_size || 0}px;
                        }
                        .content_description {
                            font-size: ${content_mobile_font_size || 0}px;
                        }
                        .content_title2 {
                            font-size: ${content_title2_mobile_font_size ||
                            0}px;
                        }
                        .content_description2 {
                            font-size: ${content2_mobile_font_size || 0}px;
                        }
                        .content {
                            ${mobile_content_width
                                ? `width: ${mobile_content_width}%;`
                                : ''};
                            padding: ${mobile_content_top_bottom_padding || 0}px
                                0;
                        }
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .column_tiles
                        > .content
                        > .content_container
                        > .content_title
                        > p {
                        margin: 0;
                    }
                    .column_tiles
                        > .content
                        > .content_container
                        > .content_title2
                        > p {
                        margin: 0;
                    }
                    .column_tiles
                        > .content
                        > .content_container
                        .content_description
                        > p {
                        margin: 0 0 10px 0 !important;
                        line-height: 1.2em;
                    }
                    .column_tiles
                        > .content
                        > .content_container
                        .content_description2
                        > p {
                        margin: 0 0 10px 0 !important;
                        line-height: 1.2em;
                    }
                `}
            </style>
        </>
    );
};

const RenderItems = ({ items, block }) =>
    items.map((item, key) => {
        return <Item key={key} item={item} block={block} />;
    });

const RenderDesktopColumn = ({ items, block }) => {
    const rowOneBlocks = filter(isInRowOne, items);
    const rowTwoBlocks = filter(isInRowTwo, items);
    return (
        <>
            {rowOneBlocks ? (
                <div className="row one">
                    <RenderItems items={rowOneBlocks} block={block} />
                </div>
            ) : (
                ''
            )}
            {rowTwoBlocks.length > 0 ? (
                <div className="row two">
                    <RenderItems items={rowTwoBlocks} block={block} />
                </div>
            ) : (
                ''
            )}
        </>
    );
};

const TwoColumnBlock = ({ block, items }) => {
    const leftColumnBlocks = filter(isInLeftColumn, items);
    const rightColumnBlocks = filter(isInRightColumn, items);
    const {
        padding_top,
        padding_bottom,
        mobile_top_padding,
        mobile_bottom_padding,
        left_column_width,
        right_column_width,
        reverse_content_order_on_mobile,
    } = block;

    return (
        <>
            <div className="two_column_block">
                <div className="left_column_block">
                    <RenderDesktopColumn
                        items={leftColumnBlocks}
                        block={block}
                    />
                </div>
                <div className="right_column_block">
                    <RenderDesktopColumn
                        items={rightColumnBlocks}
                        block={block}
                    />
                </div>
            </div>
            <style jsx>
                {`
                    .two_column_block {
                        display: flex;
                        padding-top: ${padding_top || 0}px;
                        padding-bottom: ${padding_bottom || 0}px;
                    }
                    .left_column_block {
                        ${left_column_width
                            ? `flex: 1 0 ${left_column_width}%;`
                            : ''};
                        margin: auto;
                        width: 60%;
                    }
                    .right_column_block {
                        ${right_column_width
                            ? `flex: 1 0 ${right_column_width}%;`
                            : ''};
                        margin: auto;
                        width: 60%;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .two_column_block {
                            padding-top: ${mobile_top_padding || 0}px;
                            padding-bottom: ${mobile_bottom_padding || 0}px;
                            flex-direction: ${reverse_content_order_on_mobile ||
                            'column'};
                        }
                        .left_column_block {
                            width: 100%;
                        }
                        .right_column_block {
                            width: 100%;
                        }
                    }
                `}
            </style>
        </>
    );
};

TwoColumnBlock.propTypes = {
    block: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
};

Item.propTypes = {
    item: PropTypes.object.isRequired,
};

export default TwoColumnBlock;
