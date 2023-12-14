import React from 'react';
import css from 'styled-jsx/css';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import { brandBlack } from 'config/styles/colours';
import { breakpointMedium } from 'config/styles/breakpoints';
import SSRLink from '@containers/Prismic/PrismicComponents/SSRLink';
import { LinkableWrapper } from 'helpers/linkableWrapper';

const BlogContentBlock = ({ block }) => {
    const {
        desktop_side_padding,
        mobile_side_padding,
        top_padding,
        bottom_padding,
        mobile_top_padding,
        mobile_bottom_padding,
        content_description,
        content_font_size,
        content_mobile_font_size,
        content_font_weight,
        content_font_colour,
        content_font_family,
        content_width,
        content_text_alignment,
        mobile_content_width,
        call_to_action,
        call_to_action_link,
        external_tab,
        analytics_event_description,
    } = block;
    const applyLinkToWholeTileCondition = !!call_to_action_link;

    const linkStyles = css.resolve`
        a {
            font-size: ${content_font_size || 20}px;
            font-weight: ${content_font_weight || 200};
            color: ${content_font_colour || brandBlack};
            white-space: nowrap;
            line-height: 1.5em;
            display: inline-flex;
            text-underline-offset: 4px;
            text-decoration-thickness: 1px;
            @media (max-width: ${breakpointMedium}) {
                a {
                    font-size: ${content_mobile_font_size || 15}px;
                }
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
            <div className="blog_content_block">
                <LinkableWrapper
                    applyLink={applyLinkToWholeTileCondition}
                    linkUrl={call_to_action_link}
                    className={linkableWrapper.className}
                    externalTab={external_tab}
                >
                    <div>{RichText.render(content_description)}</div>
                    <div>
                        <SSRLink
                            linkType={'collections' || 'products'}
                            linkUrl={call_to_action_link}
                            className={linkStyles.className}
                            gtm_identifier={analytics_event_description}
                            title={call_to_action}
                            externalTab={external_tab}
                        >
                            {call_to_action}
                        </SSRLink>
                    </div>
                </LinkableWrapper>
            </div>
            {linkStyles.styles}
            {linkableWrapper.styles}
            <style jsx>
                {`
                    .blog_content_block {
                        ${content_width ? `width: ${content_width}%` : ''};
                        padding: ${top_padding || 20}px
                            ${desktop_side_padding || 30}px
                            ${bottom_padding || 20}px
                            ${desktop_side_padding || 30}px;
                        text-align: ${content_text_alignment.toLowerCase() ||
                        'left'};
                        font-family: ${content_font_family ||
                        'acumin-pro, sans-serif'};
                        color: ${content_font_colour ||
                        `${brandBlack}`} !important;
                        font-size: ${content_font_size || 20}px;
                        font-weight: ${content_font_weight || 'normal'};
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .blog_content_block {
                            ${mobile_content_width
                                ? `width: ${mobile_content_width}%`
                                : ''};
                            font-size: ${content_mobile_font_size || 15}px;
                            padding: ${mobile_top_padding || 10}px
                                ${mobile_side_padding || 30}px
                                ${mobile_bottom_padding || 10}px
                                ${mobile_side_padding || 30}px;
                        }
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .blog_content_block > p {
                        margin: 0 !important;
                    }
                `}
            </style>
        </>
    );
};

BlogContentBlock.propTypes = {
    block: PropTypes.object.isRequired,
};

export default BlogContentBlock;
