import React from 'react';
import { RichText } from 'prismic-reactjs';
import SSRLink from 'helpers/SSRLink';
import config from 'config/brandConfig';

export default function Button({
    type,
    position,
    className,
    colour,
    textColour,
    text,
    link,
    link_type,
    linkTitle,
    gtm_identifier,
    gtm_value,
    font_weight,
    desktop_font_size,
    mobile_font_size,
    button_underline,
}) {
    if (!text || !link) return null;

    return (
        <SSRLink
            asSpan
            linkType={link_type}
            linkUrl={link}
            title={linkTitle}
            data-event-title={linkTitle}
            data-event-description={gtm_identifier}
            data-event-value={gtm_value}
            className={`${type} ${position || ''} ${className || ''}`}
        >
            {Array.isArray(text) ? RichText.render(text) : text}
            <style jsx global>
                {`
                    .Outlined,
                    .Filled {
                        font-size: ${desktop_font_size || 20}px;
                        padding: 10px 35px;
                        margin: 25px 20px;
                    }
                    @media (max-width: ${config.breakPoints.mobile
                            .maxDeviceWidth}px) {
                        .Outlined,
                        .Filled {
                            margin: 15px 15px;
                            padding: 10px 15px;
                            font-size: ${mobile_font_size || 20}px;
                        }
                    }
                    .Outlined {
                        border: 1px solid ${colour || 'rgb(255, 255, 255)'};
                        background: none;
                        color: ${textColour || 'rgb(255, 255, 255)'};
                    }
                    .Outlined:hover {
                        background-color: ${colour || 'rgb(255, 255, 255)'};
                        color: rgb(0, 0, 0);
                        border: 1px solid rgb(0, 0, 0);
                    }
                    .Filled {
                        border: 1px solid ${colour || 'rgb(0, 0, 0)'};
                        background: ${colour || 'rgb(0, 0, 0)'};
                        color: ${textColour || 'rgb(255, 255, 255)'};
                    }
                    .Filled:hover {
                        border: 1px solid ${colour || 'rgb(0, 0, 0)'};
                        color: ${colour || 'rgb(0, 0, 0)'};
                        background: none;
                    }

                    .Link {
                        padding: 0;
                        font-size: ${desktop_font_size || 20}px;
                        font-weight: ${font_weight || 'normal'};
                        font-family: acumin-pro, sans-serif;
                        border: none;
                        background-color: transparent;
                        text-transform: capitalize;
                        font-family: acumin-pro, sans-serif;
                        white-space: pre-wrap;
                        color: ${colour || 'rgb(0, 0, 0)'};
                        cursor: pointer;
                        text-decoration: ${button_underline || 'unset'};
                        line-height: 1em;
                        transition: background-color 0.4s;
                    }

                    .Link.vertical {
                        padding-bottom: 2px;
                    }
                    .top {
                        top: 0;
                    }
                    .bottom {
                        bottom: 0;
                    }
                    .left {
                        left: 0.5em;
                    }
                    .right {
                        right: 0.5em;
                    }
                    .top.left.vertical {
                        transform-origin: bottom left;
                        transform: rotate(90deg);
                    }
                    .top.right.vertical {
                        transform-origin: bottom right;
                        transform: rotate(-90deg);
                    }
                    .bottom.left.vertical {
                        transform-origin: top left;
                        transform: rotate(-90deg);
                    }
                    .bottom.right.vertical {
                        transform-origin: top right;
                        transform: rotate(90deg);
                    }
                    @media (max-width: ${config.breakPoints.mobile
                            .maxDeviceWidth}px) {
                        .Vertical,
                        .Link {
                            font-size: ${mobile_font_size || 20}px;
                        }
                    }
                    @media (max-width: ${config.breakPoints.tablet
                            .maxDeviceWidth}px) {
                        .Vertical,
                        .Link {
                            font-size: ${mobile_font_size || 20}px;
                        }
                    }
                `}
            </style>
        </SSRLink>
    );
}
