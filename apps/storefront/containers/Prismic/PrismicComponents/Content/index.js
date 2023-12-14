import React from 'react';
import Button from '../Button';
import { RichText } from 'prismic-reactjs';
import { breakpointMedium } from 'config/styles/breakpoints';
import { brandBlack } from 'config/styles/colours';
import SSRLink from 'helpers/SSRLink';

const Content = ({
    content,
    font_family_content,
    content_font_size,
    content_mobile_font_size,
    content_font_colour,
    content_title,
    font_family_content_title,
    content_title_font_size,
    content_title_mobile_font_size,
    content_title_colour,
    content_top_position,
    content_position_left,
    content_right_position,
    content_bottom_position,
    content_alignment,
    content_width,
    buttons,
    content_top_position_mobile,
    content_left_position_mobile,
    content_right_position_mobile,
    content_width_mobile,
    intro_text,
    font_family_intro_text,
    intro_text_font_size,
    intro_text_mobile_font_size,
    intro_text_colour,
    invert_content_order,
    content_title_font_weight,
    content_font_weight,
    intro_text_font_weight,
    content_container_text_alignment,
    content_mobile_bottom_space,
    content_alignment_unit_type,
    image_link_type,
    image_link,
    image_link_title,
    gtm_identifier,
    videoLink,
    videoLinkType,
}) => {
    if (!content_title && !content && buttons.length < 1) {
        return null;
    }

    const buttonMarkup =
        buttons.length > 0 ? (
            <div className="buttonsContainer">
                {buttons?.map((button, key) => (
                    <Button
                        key={`buttons_${key}`}
                        text={button.button_text}
                        type={button.button_type}
                        position={button.button_position}
                        link={button.buttonLink}
                        linkTitle={button.button_link_title}
                        textColour={button.button_text_colour}
                        colour={button.button_colour}
                        gtm_identifier={button.button_gtm_identifier}
                        link_type={button.button_link_type}
                        font_weight={button.button_text_font_weight}
                        desktop_font_size={button.button_text_font_size}
                        mobile_font_size={button.button_text_mobile_font_size}
                        transform_x_axis={button.button_transform_x_axis}
                        button_underline={button.button_underline}
                    />
                ))}
            </div>
        ) : (
            ''
        );
    const contentPositionUnitType =
        content_alignment_unit_type === 'pixels' ? 'px' : '%';

    return (
        <>
            {image_link || videoLink ? (
                <SSRLink
                    linkType={
                        (image_link_type && image_link_type) ||
                        (videoLinkType && videoLinkType)
                    }
                    linkUrl={
                        (image_link && image_link) || (videoLink && videoLink)
                    }
                    title={image_link_title && image_link_title}
                    gtm_identifier={gtm_identifier}
                    gtm_value="0"
                    styles={{
                        padding: 0,
                        display: 'block',
                        cursor: 'pointer',
                        textDecoration: 'none',
                    }}
                >
                    <div className={`content ${content_alignment}`}>
                        {intro_text && (
                            <div className="intro_text_container">
                                {RichText.render(intro_text)}
                            </div>
                        )}
                        {buttons.length && invert_content_order && buttonMarkup}
                        {content && (
                            <div className="content_container">
                                {content_title && (
                                    <div className="content_title_container">
                                        {RichText.render(content_title)}
                                    </div>
                                )}
                                {RichText.render(content)}
                            </div>
                        )}
                        {buttons.length &&
                            !invert_content_order &&
                            buttonMarkup}
                    </div>
                </SSRLink>
            ) : (
                <div className={`content ${content_alignment}`}>
                    {intro_text && (
                        <div className="intro_text_container">
                            {RichText.render(intro_text)}
                        </div>
                    )}
                    {buttons.length && invert_content_order && buttonMarkup}
                    {content && (
                        <div className="content_container">
                            {content_title && (
                                <div className="content_title_container">
                                    {RichText.render(content_title)}
                                </div>
                            )}
                            {RichText.render(content)}
                        </div>
                    )}
                    {buttons.length && !invert_content_order && buttonMarkup}
                </div>
            )}
            <style jsx global>
                {`
                    .content_container a {
                        color: inherit;
                        text-decoration: underline;
                    }
                `}
            </style>
            <style jsx>
                {`
                    .content {
                        ${content_width ? `width: ${content_width}%` : ''};
                        ${content_top_position
                            ? `padding-top: ${content_top_position}${contentPositionUnitType} !important;`
                            : ''};
                        ${content_bottom_position
                            ? `padding-bottom: ${content_bottom_position}${contentPositionUnitType} !important;`
                            : ''};
                        ${content_position_left
                            ? `padding-left: ${content_position_left}${contentPositionUnitType} !important;`
                            : ''};
                        ${content_right_position
                            ? `padding-right: ${content_right_position}${contentPositionUnitType} !important;`
                            : ''};
                        clear: both;
                        display: flex;
                        flex-direction: column;
                        ${content_alignment
                            ? `text-align: ${content_alignment};`
                            : ''};
                        ${content_alignment
                            ? `justify-content: ${content_alignment};`
                            : ''};
                        position: relative;
                        font-family: ${font_family_content ||
                            'acumin-pro, sans-serif'};
                        box-sizing: border-box;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .content {
                            ${content_width_mobile
                                ? `width: ${content_width_mobile}%`
                                : ''};
                            ${content_top_position_mobile
                                ? `padding-top: ${content_top_position_mobile}${contentPositionUnitType} !important;`
                                : ''};
                            ${content_mobile_bottom_space
                                ? `padding-bottom: ${content_mobile_bottom_space}${contentPositionUnitType} !important;`
                                : ''};
                            ${content_left_position_mobile
                                ? `padding-left: ${content_left_position_mobile}${contentPositionUnitType} !important;`
                                : ''};
                            ${content_right_position_mobile
                                ? `padding-right: ${content_right_position_mobile}${contentPositionUnitType} !important;`
                                : ''};
                        }
                    }
                    .content.Right {
                        text-align: right;
                        align-items: flex-end;
                    }
                    .content.Left {
                        text-align: left;
                        align-items: flex-start;
                    }
                    .content.Center {
                        text-align: center;
                    }
                    .content_container {
                        line-height: 18px;
                    }
                    p {
                        font-size: inherit;
                        line-height: inherit;
                        color: inherit;
                        font-weight: inherit;
                    }
                    .intro_text_container {
                        font-size: ${intro_text_font_size || 10}px;
                        color: ${intro_text_colour || brandBlack};
                        font-weight: ${intro_text_font_weight || 100};
                        font-family: ${font_family_intro_text ||
                            'acumin-pro, sans-serif'};
                    }
                    .content_title_container {
                        font-size: ${content_title_font_size || 10}px;
                        color: ${content_title_colour || brandBlack};
                        font-weight: ${content_title_font_weight || 100};
                        font-family: ${font_family_content_title ||
                            'acumin-pro, sans-serif'};
                    }
                    .content_container {
                        font-size: ${content_font_size}px;
                        color: ${content_font_colour || brandBlack};
                        font-weight: ${content_font_weight || 100};
                        text-align: ${content_container_text_alignment};
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .content_title_container {
                            font-size: ${content_title_mobile_font_size ||
                                content_title_font_size}px;
                        }
                        .intro_text_container {
                            font-size: ${intro_text_mobile_font_size ||
                                intro_text_font_size}px;
                        }
                        .content_container {
                            font-size: ${content_mobile_font_size ||
                                content_font_size}px;
                        }
                        .content_title_container p {
                            width: 100%;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default Content;
