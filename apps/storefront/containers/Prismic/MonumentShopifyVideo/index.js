import React, { useLayoutEffect, useState } from 'react';
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
import Video from '../PrismicComponents/Video';

const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : () => {};

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

const useWindowReSize = () => {
    const [size, setSize] = useState([0, 0]);

    useIsomorphicLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener('resize', updateSize);

        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return size;
};

const MonumentShopifyVideoItem = ({ block, items }) => {
    const [width] = useWindowReSize();
    const [videoLayout, setVideoLayout] = useState('small');
    const {
        layout,
        heading,
        body_text,
        font_family,
        font_colour,
        variant_type,
        content_size,
        background_colour,
        video_title,
        heading_type,
        heading_tag,
        desktop_video_url,
        mobile_video_url,
        show_video_controls,
        mute_video,
        autoplay_video,
        play_video_in_loop,
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
    const hasVideo = !!desktop_video_url?.url && mobile_video_url?.url;
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

    const linkStyles = css.resolve`
        a {
            ${fontWeight === 'Light' ? `font-weight: 300` : ''};
            ${fontWeight === 'Medium' ? `font-weight: 500` : ''};
            ${fontWeight === 'Black' ? `font-weight: 800` : ''};
            color: ${font_colour ? font_colour : brandWhite};
            white-space: nowrap;
            line-height: 1.5em;
            display: inline-flex;
            padding: 5px 30px 5px 0;
            text-underline-offset: 4px;
            text-decoration-thickness: 1px;
        }
    `;

    const linkableWrapper = css.resolve`
        a {
            display: block;
        }
    `;

    const breakpointAsInteger = (string) => parseInt(string.replace('px', ''));

    useIsomorphicLayoutEffect(() => {
        if (width >= breakpointAsInteger(breakpointMedium)) {
            setVideoLayout('medium');
        }
    }, [width > 0]);

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
                className={`monumentShopifyVideo_element ${variantOrderType(
                    variant_type
                )}`}
            >
                <div className="desktopOnly">
                    <Video
                        src={desktop_video_url?.url}
                        controls={show_video_controls === 'Yes'}
                        muted={mute_video === 'Yes'}
                        loop={play_video_in_loop === 'Yes'}
                        autoplay={
                            autoplay_video === 'Yes' && videoLayout === 'medium'
                        }
                    />
                </div>
                <div className="mobileOnly">
                    <Video
                        src={mobile_video_url?.url}
                        controls={show_video_controls === 'Yes'}
                        muted={mute_video === 'Yes'}
                        loop={play_video_in_loop === 'Yes'}
                        autoplay={
                            autoplay_video === 'Yes' && videoLayout === 'small'
                        }
                    />
                </div>
                <div
                    className={`${
                        firstCTALink
                            ? 'overlay_content'
                            : 'overlay_content--click-through'
                    } contentSize${content_size} ${formattedLayoutName} ${formattedFontFamily}`}
                >
                    <div className="content">
                        {heading && (
                            <HeadingTag className="heading">
                                {formattedHeading}
                            </HeadingTag>
                        )}
                        {formattedBodyText && (
                            <div className="body_text">{formattedBodyText}</div>
                        )}
                        {items.map((item, index) => {
                            return (
                                item?.call_to_action && (
                                    <SSRLink
                                        linkType={
                                            'collections' ||
                                            'pages' ||
                                            'blogs' ||
                                            'products'
                                        }
                                        linkUrl={item?.call_to_action_link}
                                        className={linkStyles.className}
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
                        })}
                    </div>
                </div>
            </div>
            {linkStyles.styles}
            <style jsx>
                {`
                    .monumentShopifyVideo_element {
                        flex: 1;
                        position: relative;
                        font-size: 16px; /* Reset the base font-size */
                        margin: 0 auto;
                        //height: calc(100vw * 10 / 20);
                        min-height: 100px;
                        overflow: hidden;
                    }
                    .overlay_content {
                        display: flex;
                        position: absolute;
                        height: 100%;
                        width: 100%;
                        top: 0;
                        box-sizing: border-box;
                    }
                    .overlay_content--click-through {
                        display: flex;
                        position: absolute;
                        height: 100%;
                        width: 100%;
                        top: 0;
                        box-sizing: border-box;
                        pointer-events: none;
                    }
                    .content {
                        color: ${font_colour ? font_colour : brandWhite};
                        word-break: normal;
                        ${background_colour
                            ? `background-color: ${background_colour}`
                            : ''};
                    }
                    .heading {
                        font-weight: bold;
                        margin: 0 auto;
                        line-height: 1em;
                        ${headingMode === 'manual'
                            ? `white-space: pre-wrap`
                            : ''}
                    }
                    .desktopOnly {
                        display: initial;
                    }
                    .mobileOnly {
                        display: none;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .monumentShopifyVideo_element {
                            height: calc(100vw * 18 / 18);
                        }
                        .desktopOnly {
                            display: none;
                        }
                        .mobileOnly {
                            display: initial;
                        }
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

                    .overlay_content.center a {
                        padding: 5px 15px 5px 15px;
                        justify-content: center;
                    }

                    .center a {
                        padding: 5px 15px 5px 15px;
                        justify-content: center;
                    }

                    .left-top a {
                        padding: 5px 30px 5px 0;
                    }

                    .left-middle a {
                        padding: 5px 30px 5px 0;
                    }

                    .left-bottom {
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

const MonumentShopifyVideo = ({ block, items }) => {
    if (!block || !items) return null;

    const fillRow = block?.fill_entire_row ? '1' : '2';

    return (
        <>
            <div className="monumentVimeo" data-siblings-count={fillRow}>
                <MonumentShopifyVideoItem
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
                    .monumentVimeo {
                        display: flex;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .monumentVimeo {
                            flex-direction: column;
                        }
                    }
                `}
            </style>
        </>
    );
};

MonumentShopifyVideo.propTypes = {
    block: PropTypes.object,
};

MonumentShopifyVideoItem.propTypes = {
    block: PropTypes.object.isRequired,
};

export default MonumentShopifyVideo;
