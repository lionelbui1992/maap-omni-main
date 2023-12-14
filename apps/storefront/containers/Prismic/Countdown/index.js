import React from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import PropTypes from 'prop-types';
import {
    breakpointMedium,
    breakpointSmall,
    breakpointExtraSmall,
    breakpointLarge,
} from 'config/styles/breakpoints';
import { brandWhite } from 'config/styles/colours';
import SSRLink from '../PrismicComponents/SSRLink';
import css from 'styled-jsx/css';

const LinkableWrapper = ({
    applyLink = false,
    linkUrl,
    className,
    children,
}) => {
    return applyLink ? (
        <SSRLink
            linkType={'collections' || 'products'}
            linkUrl={linkUrl}
            className={className}
            styles={{ textDecoration: `none` }}
        >
            {children}
        </SSRLink>
    ) : (
        children
    );
};

const PostCountdownCTA = ({ items, fontWeight, font_colour }) => {
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

    return items.map((item, index) => {
        return (
            <>
                {item?.call_to_action && (
                    <SSRLink
                        linkType={'collections' || 'products'}
                        linkUrl={item?.call_to_action_link}
                        className={linkStyles.className}
                        gtm_identifier={item?.analytics_event_description}
                        title={item?.call_to_action}
                        key={index}
                    >
                        <span>{item?.call_to_action}</span>
                    </SSRLink>
                )}
                {linkStyles.styles}
            </>
        );
    });
};

const CountdownItem = ({ block, items }) => {
    const {
        layout,
        heading,
        sub_heading,
        sub_text,
        font_family,
        font_colour,
        variant_type,
        content_size,
        mobile_image,
        desktop_image,
        background_colour,
        countdown_timer,
    } = block;

    const splitCharacter = '^';
    const contentSplitPattern = new RegExp(/\^/i, 'ig');
    const headingMode =
        heading?.indexOf(splitCharacter) === -1 ? 'automatic' : 'manual';
    const contentMode =
        sub_text?.indexOf(splitCharacter) === -1 ? 'automatic' : 'manual';
    const formattedHeading = heading?.replace(contentSplitPattern, '\n');
    const formattedSubHeading = sub_heading?.replace(contentSplitPattern, '\n');
    const formattedSubText = sub_text?.replace(contentSplitPattern, '\n');
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

    const linkableWrapper = css.resolve`
        a {
            display: block;
        }
    `;

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return (
                <PostCountdownCTA
                    items={items}
                    fontWeight={font_colour}
                    font_colour={font_colour}
                />
            );
        } else {
            return (
                <div className="countdown">
                    <div className="countdown_container">
                        <span className="countdown_time">{zeroPad(days)}</span>
                        <span className="countdown_time_text">DAYS</span>
                    </div>
                    <span className="colon">:</span>
                    <div className="countdown_container">
                        <span className="countdown_time">{zeroPad(hours)}</span>
                        <span className="countdown_time_text">HOURS</span>
                    </div>
                    <span className="colon">:</span>
                    <div className="countdown_container">
                        <span className="countdown_time">
                            {zeroPad(minutes)}
                        </span>
                        <span className="countdown_time_text">MINS</span>
                    </div>
                    <span className="colon">:</span>
                    <div className="countdown_container">
                        <span className="countdown_time">
                            {zeroPad(seconds)}
                        </span>
                        <span className="countdown_time_text">SECS</span>
                    </div>
                </div>
            );
        }
    };

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
                >
                    {desktop_image?.url && (
                        <img
                            src={desktop_image.url}
                            alt={
                                desktop_image?.alt
                                    ? desktop_image?.alt
                                    : ""
                            }
                            className="desktop_only"
                        />
                    )}
                    {mobile_image?.url && (
                        <img
                            src={mobile_image?.url}
                            alt={
                                mobile_image?.alt ? mobile_image?.alt : ""
                            }
                            className="mobile_only"
                        />
                    )}
                    <div
                        className={`${
                            hasImages ? 'overlay_content' : 'content_container'
                        } contentSize${content_size} ${formattedLayoutName} ${formattedFontFamily}`}
                    >
                        <div className="content">
                            {formattedHeading && (
                                <div className="body_text">
                                    {formattedHeading}
                                </div>
                            )}
                            {formattedSubHeading && (
                                <div className="heading">
                                    {formattedSubHeading}
                                </div>
                            )}
                            {formattedSubText && (
                                <div className="body_text sub_text">
                                    {formattedSubText}
                                </div>
                            )}
                            {countdown_timer && (
                                <div className="countdown_timer">
                                    <Countdown
                                        date={countdown_timer}
                                        renderer={renderer}
                                    />
                                </div>
                            )}
                            {!countdown_timer && (
                                <div className="CTA">
                                    <PostCountdownCTA
                                        items={items}
                                        fontWeight={font_colour}
                                        font_colour={font_colour}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </LinkableWrapper>
            </div>
            <style jsx global>
                {`
                    .countdown {
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                    }
                    .countdown_container {
                        display: flex;
                        flex-direction: column;
                        flex: 1;
                    }
                    .countdown_time {
                        font-size: 4em;
                        padding: 0 20px;
                        font-family: acumin-pro, sans-serif;
                    }
                    .countdown_time_text {
                        font-size: 0.9em;
                        font-weight: 400;
                        font-family: acumin-pro, sans-serif;
                        margin-top: -13px;
                    }
                    .colon {
                        padding-top: 15px;
                        font-size: 3em;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .countdown_time {
                            font-size: 2.5em;
                            padding: 0 10px;
                        }
                        .countdown_time_text {
                            margin-top: -6px;
                            padding-top: 0;
                        }
                        .colon {
                            font-size: 2em;
                            padding-top: 8px;
                        }
                    }
                    .countdown_timer {
                        width: 70%;
                        margin: auto !important;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .countdown_timer {
                            width: 100%;
                        }
                    }
                `}
            </style>
            <style jsx>
                {`
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

                    @media (min-width: 1260px) {
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
                            : ''};
                    }

                    .body_text {
                        font-weight: 400;
                        ${contentMode === 'manual'
                            ? `white-space: pre-wrap`
                            : ''};
                        line-height: 1.2em !important;
                    }

                    .contentSizeSmall .content h2,
                    .contentSizeSmall .content h1 {
                        margin-bottom: 2px;
                        ${formattedFontFamily === 'Acumin-Pro'
                            ? `margin-bottom: 10px;`
                            : 'margin-bottom: 8px;'}
                    }
                    .contentSizeSmall .content div {
                        margin: 15px 0 10px 0;
                    }
                    .contentSizeMedium .content h2,
                    .contentSizeMedium .content h1 {
                        ${formattedFontFamily === 'Acumin-Pro'
                            ? `margin-bottom: 10px;`
                            : 'margin-bottom: 8px;'}
                    }
                    .contentSizeMedium .content div {
                        margin: 15px 0 10px 0;
                    }
                    .contentSizeMedium .content .body_text {
                        margin: 20px;
                    }
                    .contentSizeMedium .content .sub_text {
                        margin-top: 30px;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .contentSizeMedium .content .sub_text {
                            margin-top: 35px;
                        }
                    }
                    .contentSizeLarge .content h2,
                    .contentSizeLarge .content h1 {
                        ${formattedFontFamily === 'Acumin-Pro'
                            ? `margin-bottom: 10px;`
                            : 'margin-bottom: 8px;'}
                    }
                    .contentSizeLarge .content div {
                        margin: 15px 0 8px 0;
                    }

                    .CTA {
                        padding-top: 30px;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .CTA {
                            padding-top: 15px;
                        }
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

                    .content_container.center a {
                        padding: 5px 15px 5px 15px;
                        justify-content: center;
                    }
                    .content_container.left-top,
                    .left-middle,
                    .left-bottom a {
                        padding: 5px 30px 5px 0;
                    }

                    /* Monument Font sizes for mobile */
                    .contentSizeLarge.MonumentExtended-Black a,
                    .contentSizeLarge.MonumentExtended-Regular a {
                        font-size: 1.375em;
                    }
                    .contentSizeMedium.MonumentExtended-Black a,
                    .contentSizeMedium.MonumentExtended-Regular a {
                        font-size: 1.125em;
                    }
                    .contentSizeSmall.MonumentExtended-Black a,
                    .contentSizeSmall.MonumentExtended-Regular a {
                        font-size: 0.95em;
                    }

                    /* Acumin Font Sizes for Mobile */
                    .contentSizeSmall.Acumin-Pro a {
                        font-size: 0.9375em;
                    }
                    .contentSizeMedium.Acumin-Pro a {
                        font-size: 1.125em;
                    }
                    .contentSizeLarge.Acumin-Pro a {
                        font-size: 1.375em;
                    }

                    @media (min-width: ${breakpointMedium}) {
                        /* Monument Font sizes for desktop */
                        .contentSizeLarge.MonumentExtended-Black a,
                        .contentSizeLarge.MonumentExtended-Regular a {
                            font-size: 1.625em;
                        }
                        .contentSizeMedium.MonumentExtended-Black a,
                        .contentSizeMedium.MonumentExtended-Regular a {
                            font-size: 1.375em;
                        }
                        .contentSizeSmall.MonumentExtended-Black a,
                        .contentSizeSmall.MonumentExtended-Regular a {
                            font-size: 1.125em;
                        }

                        /* Acumin Font Sizes for Desktop */
                        .contentSizeSmall.Acumin-Pro a {
                            font-size: 1.125em;
                        }
                        .contentSizeMedium.Acumin-Pro a {
                            font-size: 1.375em;
                        }
                        .contentSizeLarge.Acumin-Pro a {
                            font-size: 1.625em;
                        }
                    }
                `}
            </style>
        </>
    );
};

const CountdownBlock = ({ block, items }) => {
    if (!block || !items) return null;

    const fillRow = block?.fill_entire_row ? '1' : '2';

    return (
        <>
            <div className="monumentBlock" data-siblings-count={fillRow}>
                <CountdownItem
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

CountdownBlock.propTypes = {
    block: PropTypes.object,
};

CountdownItem.propTypes = {
    block: PropTypes.object.isRequired,
};

export default CountdownBlock;
