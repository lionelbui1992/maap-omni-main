import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import {
    breakpointMedium,
    breakpointSmall,
    breakpointExtraSmall,
    breakpointLarge,
} from 'config/styles/breakpoints';
import { brandWhite } from 'config/styles/colours';
import SSRLink from '../PrismicComponents/SSRLink';
import { LinkableWrapper } from 'helpers/linkableWrapper';

const MonumentItem = ({ block, items }) => {
    const {
        layout,
        heading,
        body_text,
        font_family,
        font_colour,
        variant_type,
        content_size,
        heading_type,
        heading_tag,
        mobile_image,
        desktop_image,
        background_colour,
    } = block;

    const splitCharacter = '^';
    const contentSplitPattern = new RegExp(/\^/i, 'ig');
    const headingMode =
        heading?.indexOf(splitCharacter) === -1 ? 'automatic' : 'manual';
    const contentMode =
        body_text?.indexOf(splitCharacter) === -1 ? 'automatic' : 'manual';
    const formattedHeading = heading?.replace(contentSplitPattern, '\n');
    const formattedBodyText = body_text?.replace(contentSplitPattern, '\n');
    const formattedLayoutName = layout?.replace(/\s+/g, '-').toLowerCase();
    const hasImages = !!desktop_image?.url && mobile_image?.url;
    const formattedFontFamily = font_family?.replace(/\s+/g, '-').split('_')[0];
    const fontWeightFromFamily = font_family
        ?.replace(/\s+/g, '-')
        .split('_')[1];
    const fontWeight = fontWeightFromFamily ? fontWeightFromFamily : 'Light';
    const variantOrderType = (variantType) =>
        variantType?.toLowerCase().replace(/ /g, '_');
    const repeatableCTA = items.map((item) => item);
    const firstCTALink = repeatableCTA?.[0]?.call_to_action_link;
    const applyLinkToWholeTileCondition = !!(
        firstCTALink && repeatableCTA?.length <= 1
    );
    const firstCTAExternalTab = repeatableCTA?.[0]?.external_tab;

    const spanLinkStyles = css.resolve`
        span {
            ${fontWeight === 'Light' ? `font-weight: 300` : ''};
            ${fontWeight === 'Medium' ? `font-weight: 500` : ''};
            ${fontWeight === 'Black' ? `font-weight: 800` : ''};
            color: ${font_colour ? font_colour : brandWhite};
            white-space: nowrap;
            line-height: 1.5em;
            display: inline-flex;
            text-underline-offset: 4px;
            text-decoration-thickness: 1px;
            text-decoration: underline;
            cursor: pointer;
        }
    `;

    const linkStyles = css.resolve`
        a {
            ${fontWeight === 'Light' ? `font-weight: 300` : ''};
            ${fontWeight === 'Medium' ? `font-weight: 500` : ''};
            ${fontWeight === 'Black' ? `font-weight: 800` : ''};
            color: ${font_colour ? font_colour : brandWhite};
            white-space: nowrap;
            line-height: 1.5em;
            display: inline-flex;
            text-underline-offset: 4px;
            text-decoration-thickness: 1px;
        }
    `;

    const linkableWrapper = css.resolve`
        a {
            display: block;
        }
    `;

    const getHeadingTag = (heading_type, heading_tag) => {
        if (heading_type && heading_tag) {
            return 'h1';
        }

        if (!heading_type && heading_tag) {
            return 'h2';
        }

        return 'div';
    };

    const HeadingTag = getHeadingTag(heading_type, heading_tag);

    return (
        <>
            <div
                className={`monumentBlock_element ${variantOrderType(
                    variant_type
                )}`}
            >
                <LinkableWrapper
                    applyLink={applyLinkToWholeTileCondition}
                    linkUrl={firstCTALink}
                    className={linkableWrapper.className}
                    externalTab={firstCTAExternalTab}
                >
                    {desktop_image?.url && (
                        <div className="desktop_only ">
                            <Image
                                src={desktop_image.url}
                                alt={
                                    desktop_image?.alt ? desktop_image?.alt : ''
                                }
                                height={desktop_image.dimensions.height}
                                width={desktop_image.dimensions.width}
                                sizes="100vw"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                    )}
                    {mobile_image?.url && (
                        <div className="mobile_only ">
                            <Image
                                src={mobile_image?.url}
                                alt={mobile_image?.alt ? mobile_image?.alt : ''}
                                height={mobile_image.dimensions.height}
                                width={mobile_image.dimensions.width}
                                sizes="100vw"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                    )}
                    <div
                        className={`${
                            hasImages ? 'overlay_content' : 'content_container'
                        } contentSize${content_size} ${formattedLayoutName} ${formattedFontFamily}`}
                    >
                        <div className="content">
                            {heading && (
                                <HeadingTag className="heading">
                                    {formattedHeading}
                                </HeadingTag>
                            )}
                            {formattedBodyText && (
                                <div className="body_text">
                                    {formattedBodyText}
                                </div>
                            )}
                            {items.map((item, index) => {
                                if (
                                    item?.call_to_action &&
                                    !item?.is_anchor_button
                                ) {
                                    return (
                                        item?.call_to_action && (
                                            <SSRLink
                                                asSpan={
                                                    applyLinkToWholeTileCondition
                                                        ? true
                                                        : false
                                                }
                                                linkType={
                                                    'collections' || 'products'
                                                }
                                                linkUrl={
                                                    item?.call_to_action_link
                                                }
                                                className={
                                                    applyLinkToWholeTileCondition
                                                        ? spanLinkStyles.className
                                                        : linkStyles.className
                                                }
                                                gtm_identifier={
                                                    item?.analytics_event_description
                                                }
                                                title={item?.call_to_action}
                                                key={index}
                                                externalTab={item?.external_tab}
                                            >
                                                {item?.call_to_action}
                                            </SSRLink>
                                        )
                                    );
                                }
                                if (
                                    item?.call_to_action &&
                                    item?.is_anchor_button
                                ) {
                                    return (
                                        item?.call_to_action && (
                                            <LinkableWrapper
                                                applyLink={
                                                    !applyLinkToWholeTileCondition
                                                }
                                                linkUrl={
                                                    item?.call_to_action_link
                                                }
                                                className={linkStyles.className}
                                                externalTab={
                                                    firstCTAExternalTab
                                                }
                                            >
                                                {item?.call_to_action}
                                            </LinkableWrapper>
                                        )
                                    );
                                }
                            })}
                        </div>
                    </div>
                </LinkableWrapper>
            </div>
            {linkStyles.styles}
            {spanLinkStyles.styles}
            <style jsx>
                {`
                    .hide_for_all {
                        display: none;
                    }
                    .monumentBlock_element {
                        flex: 1;
                        position: relative;
                        ${background_colour
                            ? `background-color: ${background_colour}`
                            : ''};
                        font-size: 16px; /* Reset the base font-size */
                    }

                    .overlay_content {
                        display: flex;
                        position: absolute;
                        height: 100%;
                        width: 100%;
                        top: 0;
                        box-sizing: border-box;
                    }

                    .content_container {
                        display: flex;
                        height: 100%;
                        width: 100%;
                        box-sizing: border-box;
                        ${background_colour
                            ? `background-color: ${background_colour}`
                            : ''};
                    }

                    .content {
                        color: ${font_colour ? font_colour : brandWhite};
                        word-break: normal;
                    }

                    .heading {
                        font-weight: bold;
                        margin: 0 auto;
                        line-height: 1em;
                        ${headingMode === 'manual'
                            ? `white-space: pre-wrap`
                            : ''}
                    }

                    // Defines the layout positioning
                    .left-top {
                        align-items: flex-start;
                        padding: 55px;
                    }
                    .left-bottom {
                        align-items: flex-end;
                        padding: 55px;
                    }
                    .left-middle {
                        align-items: center;
                        padding: 55px;
                    }
                    .center {
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        padding: 55px;
                    }

                    /* Acumin Font Sizes for Mobile */
                    .contentSizeSmall.Acumin-Pro .heading {
                        font-size: 2.8125em;
                        ${fontWeight === 'Light' ? `font-weight: 300` : ''};
                        ${fontWeight === 'Medium' ? `font-weight: 500` : ''};
                        ${fontWeight === 'Black' ? `font-weight: 800` : ''};
                    }

                    .contentSizeMedium.Acumin-Pro .heading {
                        font-size: 3.4375em;
                        ${fontWeight === 'Light' ? `font-weight: 300` : ''};
                        ${fontWeight === 'Medium' ? `font-weight: 500` : ''};
                        ${fontWeight === 'Black' ? `font-weight: 800` : ''};
                    }

                    .contentSizeLarge.Acumin-Pro .heading {
                        font-size: 3.75em;
                        ${fontWeight === 'Light' ? `font-weight: 300` : ''};
                        ${fontWeight === 'Medium' ? `font-weight: 500` : ''};
                        ${fontWeight === 'Black' ? `font-weight: 800` : ''};
                    }

                    .contentSizeSmall.Acumin-Pro .body_text {
                        font-size: 0.9375em;
                        ${fontWeight === 'Light' ? `font-weight: 300` : ''};
                        ${fontWeight === 'Medium' ? `font-weight: 500` : ''};
                        ${fontWeight === 'Black' ? `font-weight: 800` : ''};
                    }

                    .contentSizeMedium.Acumin-Pro .body_text {
                        font-size: 1.125em;
                        ${fontWeight === 'Light' ? `font-weight: 300` : ''};
                        ${fontWeight === 'Medium' ? `font-weight: 500` : ''};
                        ${fontWeight === 'Black' ? `font-weight: 800` : ''};
                    }

                    .contentSizeLarge.Acumin-Pro .body_text {
                        font-size: 1.375em;
                        ${fontWeight === 'Light' ? `font-weight: 300` : ''};
                        ${fontWeight === 'Medium' ? `font-weight: 500` : ''};
                        ${fontWeight === 'Black' ? `font-weight: 800` : ''};
                    }

                    .contentSizeExtra.left-top,
                    .left-middle,
                    .left-bottom,
                    .center {
                        padding: 30px 16px;
                    }

                    .contentSizeExtra .body_text {
                        font-size: 1em;
                        line-height: 28px;
                        font-weight: 300;
                        // white-space: initial;
                        white-space: pre-wrap;
                    }

                    @media (min-width: 1260px) {
                        .contentSizeExtra.left-top,
                        .left-middle,
                        .left-bottom,
                        .center {
                            padding: 48px;
                        }

                        .contentSizeExtra .body_text {
                            font-size: 1.25em;
                            line-height: 28px;
                            font-weight: 300;
                            white-space: pre-wrap;
                        }

                        /* Acumin Font Sizes for Desktop */
                        .contentSizeSmall.Acumin-Pro .heading {
                            font-size: 4.7em;
                            ${fontWeight === 'Light' ? `font-weight: 300` : ''};
                            ${fontWeight === 'Medium'
                                ? `font-weight: 500`
                                : ''};
                            ${fontWeight === 'Black' ? `font-weight: 800` : ''};
                        }

                        .contentSizeMedium.Acumin-Pro .heading {
                            font-size: 5.625em;
                            ${fontWeight === 'Light' ? `font-weight: 300` : ''};
                            ${fontWeight === 'Medium'
                                ? `font-weight: 500`
                                : ''};
                            ${fontWeight === 'Black' ? `font-weight: 800` : ''};
                        }

                        .contentSizeLarge.Acumin-Pro .heading {
                            font-size: 6.875em;
                            ${fontWeight === 'Light' ? `font-weight: 300` : ''};
                            ${fontWeight === 'Medium'
                                ? `font-weight: 500`
                                : ''};
                            ${fontWeight === 'Black' ? `font-weight: 800` : ''};
                        }

                        .contentSizeSmall.Acumin-Pro .body_text {
                            font-size: 1.125em;
                            ${fontWeight === 'Light' ? `font-weight: 300` : ''};
                            ${fontWeight === 'Medium'
                                ? `font-weight: 500`
                                : ''};
                            ${fontWeight === 'Black' ? `font-weight: 800` : ''};
                        }

                        .contentSizeMedium.Acumin-Pro .body_text {
                            font-size: 1.375em;
                            ${fontWeight === 'Light' ? `font-weight: 300` : ''};
                            ${fontWeight === 'Medium'
                                ? `font-weight: 500`
                                : ''};
                            ${fontWeight === 'Black' ? `font-weight: 800` : ''};
                        }

                        .contentSizeLarge.Acumin-Pro .body_text {
                            font-size: 1.625em;
                            ${fontWeight === 'Light' ? `font-weight: 300` : ''};
                            ${fontWeight === 'Medium'
                                ? `font-weight: 500`
                                : ''};
                            ${fontWeight === 'Black' ? `font-weight: 800` : ''};
                        }
                    }

                    /* Monument Font sizes for mobile */
                    .contentSizeExtra.MonumentExtended-Black .heading,
                    .contentSizeExtra.MonumentExtended-Regular .heading {
                        font-size: 1em;
                        line-height: 1.4em;
                        padding-bottom: 20px;
                    }

                    .contentSizeSmall.MonumentExtended-Black .heading,
                    .contentSizeSmall.MonumentExtended-Regular .heading {
                        font-size: 1.875em;
                    }

                    .contentSizeMedium.MonumentExtended-Black .heading,
                    .contentSizeMedium.MonumentExtended-Regular .heading {
                        font-size: 2.5em;
                    }

                    .contentSizeLarge.MonumentExtended-Black .heading,
                    .contentSizeLarge.MonumentExtended-Regular .heading {
                        font-size: 3.125em;
                    }

                    .contentSizeSmall.MonumentExtended-Black .body_text,
                    .contentSizeSmall.MonumentExtended-Regular .body_text {
                        font-size: 0.95em;
                    }

                    .contentSizeMedium.MonumentExtended-Black .body_text,
                    .contentSizeMedium.MonumentExtended-Regular .body_text {
                        font-size: 1.125em;
                    }

                    .contentSizeLarge.MonumentExtended-Black .body_text,
                    .contentSizeLarge.MonumentExtended-Regular .body_text {
                        font-size: 1.375em;
                    }

                    @media (min-width: 1260px) {
                        /* Monument Font sizes for desktop */
                        .contentSizeExtra.MonumentExtended-Black .heading,
                        .contentSizeExtra.MonumentExtended-Regular .heading {
                            font-size: 1em;
                            padding-bottom: 20px;
                        }

                        .contentSizeSmall.MonumentExtended-Black .heading,
                        .contentSizeSmall.MonumentExtended-Regular .heading {
                            font-size: 2.625em;
                        }

                        .contentSizeMedium.MonumentExtended-Black .heading,
                        .contentSizeMedium.MonumentExtended-Regular .heading {
                            font-size: 3.625em;
                        }

                        .contentSizeLarge.MonumentExtended-Black .heading,
                        .contentSizeLarge.MonumentExtended-Regular .heading {
                            font-size: 5.625em;
                        }

                        .contentSizeSmall.MonumentExtended-Black .body_text,
                        .contentSizeSmall.MonumentExtended-Regular .body_text {
                            font-size: 1.125em;
                        }

                        .contentSizeMedium.MonumentExtended-Black .body_text,
                        .contentSizeMedium.MonumentExtended-Regular .body_text {
                            font-size: 1.375em;
                        }

                        .contentSizeLarge.MonumentExtended-Black .body_text,
                        .contentSizeLarge.MonumentExtended-Regular .body_text {
                            font-size: 1.625em;
                        }
                    }

                    .heading {
                        font-weight: 600;
                        ${font_family
                            ? `font-family: ${formattedFontFamily}, sans-serif;`
                            : ''}
                    }

                    .body_text {
                        font-weight: 300;
                        ${contentMode === 'manual'
                            ? `white-space: pre-wrap`
                            : ''}
                    }

                    .contentSizeSmall .content .heading {
                        margin-bottom: 2px;
                        ${formattedFontFamily === 'Acumin-Pro'
                            ? `margin-bottom: 10px;`
                            : 'margin-bottom: 8px;'}
                    }
                    .contentSizeSmall .content .body_text {
                        line-height: 1.5em;
                        margin: 8px 0;
                    }
                    .contentSizeMedium .content .heading {
                        ${formattedFontFamily === 'Acumin-Pro'
                            ? `margin-bottom: 10px;`
                            : 'margin-bottom: 8px;'}
                    }
                    .contentSizeMedium .content .body_text {
                        line-height: 1.5em;
                        margin: 8px 0;
                    }
                    .contentSizeLarge .content .heading {
                        ${formattedFontFamily === 'Acumin-Pro'
                            ? `margin-bottom: 10px;`
                            : 'margin-bottom: 8px;'}
                    }
                    .contentSizeLarge .content .body_text {
                        line-height: 1.5em;
                        margin: 8px 0;
                    }

                    @media (min-width: ${breakpointMedium}) {
                        .mobile_only {
                            display: none;
                        }
                        .desktop_only {
                            width: 100%;
                            display: block;
                        }
                    }

                    @media (max-width: ${breakpointMedium}) {
                        .mobile_only {
                            width: 100%;
                            display: block;
                        }
                        .desktop_only {
                            display: none;
                        }
                        .left-top {
                            padding: 35px;
                        }
                        .left-bottom {
                            padding: 35px;
                        }
                        .left-middle {
                            padding: 35px;
                        }
                        .center {
                            padding: 35px;
                        }
                    }

                    @media (max-width: ${breakpointSmall}) {
                        .body_text {
                            line-height: 1.6em;
                        }
                        .heading {
                            font-weight: 600;
                        }
                    }

                    @media (max-width: ${breakpointExtraSmall}) {
                        .left-top,
                        .left-middle,
                        .left-bottom {
                            padding-left: 20px;
                        }
                        .contentSizeLarge.MonumentExtended-Black .heading,
                        .contentSizeLarge.MonumentExtended-Regular .heading {
                            font-size: 2.5em;
                        }
                        .contentSizeMedium.MonumentExtended-Black .heading,
                        .contentSizeMedium.MonumentExtended-Regular .heading {
                            font-size: 2.1em;
                        }
                        .contentSizeLarge.Acumin-Pro .heading {
                            font-size: 3em;
                        }
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .heading > p {
                        margin: 0;
                    }

                    .content_container.center a,
                    .content_container.center span {
                        padding: 5px 15px 5px 15px;
                        justify-content: center;
                    }

                    .overlay_content.center a,
                    .overlay_content.center span {
                        padding: 5px 15px 5px 15px;
                        justify-content: center;
                    }

                    .content_container .left-top,
                    .left-middle,
                    .left-bottom a,
                    .left-bottom span {
                        padding: 5px 30px 5px 0;
                    }

                    /* Monument Font sizes for mobile */
                    .contentSizeLarge.MonumentExtended-Black a,
                    .contentSizeLarge.MonumentExtended-Black span,
                    .contentSizeLarge.MonumentExtended-Regular a,
                    .contentSizeLarge.MonumentExtended-Regular span {
                        font-size: 1.375em;
                    }
                    .contentSizeMedium.MonumentExtended-Black a,
                    .contentSizeMedium.MonumentExtended-Black span,
                    .contentSizeMedium.MonumentExtended-Regular a,
                    .contentSizeMedium.MonumentExtended-Regular span {
                        font-size: 1.125em;
                    }
                    .contentSizeSmall.MonumentExtended-Black a,
                    .contentSizeSmall.MonumentExtended-Black span,
                    .contentSizeSmall.MonumentExtended-Regular a,
                    .contentSizeSmall.MonumentExtended-Regular span {
                        font-size: 0.95em;
                    }

                    /* Acumin Font Sizes for Mobile */
                    .contentSizeSmall.Acumin-Pro a,
                    .contentSizeSmall.Acumin-Pro span {
                        font-size: 0.9375em;
                    }
                    .contentSizeMedium.Acumin-Pro a,
                    .contentSizeMedium.Acumin-Pro span {
                        font-size: 1.125em;
                    }
                    .contentSizeLarge.Acumin-Pro a,
                    .contentSizeLarge.Acumin-Pro span {
                        font-size: 1.375em;
                    }
                    .contentSizeExtra a,
                    .contentSizeExtra span {
                        font-family: acumin-pro, sans-serif;
                        font-size: 20px;
                        font-weight: 300;
                        letter-spacing: 0;
                        line-height: 26px;
                        padding-top: 20px;
                        text-underline-offset: 4px;
                        text-decoration-thickness: 1px;
                    }

                    @media (min-width: ${breakpointMedium}) {
                        /* Monument Font sizes for desktop */
                        .contentSizeLarge.MonumentExtended-Black a,
                        .contentSizeLarge.MonumentExtended-Black span,
                        .contentSizeLarge.MonumentExtended-Regular a,
                        .contentSizeLarge.MonumentExtended-Regular span {
                            font-size: 1.625em;
                        }
                        .contentSizeMedium.MonumentExtended-Black a,
                        .contentSizeMedium.MonumentExtended-Black span,
                        .contentSizeMedium.MonumentExtended-Regular a,
                        .contentSizeMedium.MonumentExtended-Regular span {
                            font-size: 1.375em;
                        }
                        .contentSizeSmall.MonumentExtended-Black a,
                        .contentSizeSmall.MonumentExtended-Black span,
                        .contentSizeSmall.MonumentExtended-Regular a,
                        .contentSizeSmall.MonumentExtended-Regular span {
                            font-size: 1.125em;
                        }

                        /* Acumin Font Sizes for Desktop */
                        .contentSizeSmall.Acumin-Pro a,
                        .contentSizeSmall.Acumin-Pro span {
                            font-size: 1.125em;
                        }
                        .contentSizeMedium.Acumin-Pro a,
                        .contentSizeMedium.Acumin-Pro span {
                            font-size: 1.375em;
                        }
                        .contentSizeLarge.Acumin-Pro a,
                        .contentSizeLarge.Acumin-Pro span {
                            font-size: 1.625em;
                        }
                        .contentSizeExtra a,
                        .contentSizeExtra span {
                            font-family: acumin-pro, sans-serif;
                            font-size: 20px;
                            font-weight: 300;
                            letter-spacing: 0;
                            line-height: 26px;
                            padding-top: 20px;
                            text-underline-offset: 4px;
                            text-decoration-thickness: 1px;
                        }
                    }
                `}
            </style>
        </>
    );
};

const MonumentBlock = ({ block, items }) => {
    if (!block || !items) return null;

    const fillRow = block?.fill_entire_row ? '1' : '2';

    return (
        <>
            <div className="monumentBlock" data-siblings-count={fillRow}>
                <MonumentItem
                    block={block}
                    items={items}
                    siblingsCount={fillRow}
                />
            </div>
            <style jsx global>
                {`
                    [data-siblings-count='1'] .content {
                        width: 40%;
                    }
                    [data-siblings-count='2'] .content {
                        width: 80%;
                    }
                    [data-siblings-count='1'] {
                        flex: 1 0 100%;
                    }
                    [data-siblings-count='2'] {
                        display: flex;
                        flex-direction: row;
                        width: 50%;
                    }
                    @media (max-width: ${breakpointLarge}) {
                        [data-siblings-count='1'] .content {
                            width: 70%;
                        }
                        [data-siblings-count='2'] .content {
                            width: 80%;
                        }
                    }
                    @media (max-width: ${breakpointSmall}) {
                        [data-siblings-count='1'] .content {
                            width: 100%;
                        }
                        [data-siblings-count='2'] .content {
                            width: 100%;
                        }
                        [data-siblings-count='2'] {
                            flex: 1 0 100%;
                        }
                    }
                    @media (max-width: ${breakpointMedium}) {
                        [data-siblings-count='2'] {
                            flex: 1 0 100%;
                        }
                    }
                `}
            </style>
            <style jsx>
                {`
                    .monumentBlock {
                        display: flex;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .monumentBlock {
                            flex-direction: column;
                        }
                    }
                `}
            </style>
        </>
    );
};

MonumentBlock.propTypes = {
    block: PropTypes.object,
};

MonumentItem.propTypes = {
    block: PropTypes.object.isRequired,
};

export default MonumentBlock;
