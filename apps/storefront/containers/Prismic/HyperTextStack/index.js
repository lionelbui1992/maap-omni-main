import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { breakpointMedium } from 'config/styles/breakpoints';

const HyperTextStack = ({ block, items }) => {
    if (!items) return null;
    const [selectedHyperText, setSelectedHyperText] = useState(items[0]);

    const splitCharacter = '^';
    const contentSplitPattern = new RegExp(/\^/i, 'ig');
    const headingMode =
        selectedHyperText?.hyper_text_heading?.indexOf(splitCharacter) === -1
            ? 'automatic'
            : 'manual';
    const contentMode =
        selectedHyperText?.description?.indexOf(splitCharacter) === -1
            ? 'automatic'
            : 'manual';
    const formattedHeading = selectedHyperText?.hyper_text_heading?.replace(
        contentSplitPattern,
        '\n'
    );
    const formattedBodyText = selectedHyperText?.description?.replace(
        contentSplitPattern,
        '\n'
    );

    return (
        <>
            <section className="hyperTextStack">
                <div className="hyperTextStack__container">
                    <div>
                        <div className="hyperTextStack__heading">
                            {block?.heading}
                        </div>
                        <div className="hyperTextStack__sub_heading">
                            {items?.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`sub_heading ${
                                            selectedHyperText.hyper_text_heading ===
                                            item.hyper_text_heading
                                                ? 'selected_hyperTextStack'
                                                : ''
                                        }`}
                                        onClick={() =>
                                            setSelectedHyperText(item)
                                        }
                                    >
                                        {item?.hyper_text_heading}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        {formattedHeading && (
                            <div className="hyperTextStack__content_heading">
                                {formattedHeading}
                            </div>
                        )}
                        {formattedBodyText && (
                            <div className="hyperTextStack__description">
                                {formattedBodyText}
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <style jsx>
                {`
                    .hyperTextStack__heading {
                        font-family: MonumentExtended-Regular, sans-serif;
                        font-weight: 600;
                        text-transform: uppercase;
                        font-size: 16px;
                        letter-spacing: 0;
                        line-height: 16px;
                        padding-bottom: 20px;
                    }
                    .hyperTextStack__sub_heading {
                        display: flex;
                        width: 80%;
                        flex-wrap: wrap;
                    }
                    .sub_heading {
                        font-family: acumin-pro, sans-serif;
                        font-size: 18px;
                        font-weight: 300;
                        letter-spacing: 0;
                        line-height: 21px;
                        cursor: pointer;
                        padding-bottom: 20px;
                        padding-right: 25px;
                    }
                    .sub_heading:hover {
                        text-decoration: underline;
                        text-underline-offset: 3px;
                    }
                    .sub_heading:after {
                        content: ' >';
                        color: ${block?.font_colour};
                        text-decoration: none;
                        padding-left: 6px;
                        display: inline-block;
                    }
                    .sub_heading:hover:after {
                        content: ' >';
                        color: transparent;
                        text-decoration: none;
                        display: inline-block;
                    }
                    .sub_heading.selected_hyperTextStack:after {
                        content: ' >';
                        color: transparent;
                        display: inline-block;
                        text-decoration: none;
                        padding-left: 6px;
                    }
                    .sub_heading.selected_hyperTextStack:hover:after {
                        content: ' >';
                        color: transparent;
                        text-decoration: none;
                        display: inline-block;
                    }
                    .sub_heading.selected_hyperTextStack {
                        text-decoration: underline;
                        text-underline-offset: 3px;
                        display: inline-block;
                    }
                    .hyperTextStack__description {
                        font-family: acumin-pro, sans-serif;
                        font-size: 16px;
                        font-weight: 300;
                        letter-spacing: 0;
                        line-height: 1.5;
                        ${contentMode === 'manual'
                            ? `white-space: pre-wrap`
                            : ''}
                    }

                    // Mobile style
                    .hyperTextStack {
                        background-color: ${block?.background_colour};
                        color: ${block?.font_colour};
                        flex: 1;
                        width: 50%;
                        padding: 30px 16px;
                    }
                    .hyperTextStack__container {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        height: 424px;
                    }
                    .hyperTextStack__content_heading {
                        font-family: MonumentExtended-Regular, sans-serif;
                        font-weight: 600;
                        font-size: 28px;
                        letter-spacing: 0;
                        line-height: 30px;
                        text-transform: uppercase;
                        padding-bottom: 20px;
                        ${headingMode === 'manual'
                            ? `white-space: pre-wrap`
                            : ''}
                    }
                    @media (min-width: 1260px) {
                        // Desktop style
                        .hyperTextStack {
                            background-color: ${block?.background_colour};
                            color: ${block?.font_colour};
                            flex: 1;
                            width: 50%;
                            padding: 48px;
                        }
                        .hyperTextStack__container {
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            ${block?.full_height
                                ? `height: 664px`
                                : `height: 100%`};
                        }
                        .hyperTextStack__content_heading {
                            font-family: MonumentExtended-Regular, sans-serif;
                            font-weight: 600;
                            text-transform: uppercase;
                            font-size: 42px;
                            letter-spacing: 0;
                            line-height: 42px;
                            padding-bottom: 20px;
                            ${headingMode === 'manual'
                                ? `white-space: pre-wrap`
                                : ''}
                        }
                    }

                    @media (max-width: ${breakpointMedium}) {
                        .hyperTextStack {
                            width: 100%;
                        }
                        .hyperTextStack__sub_heading {
                            width: 100%;
                        }
                    }
                `}
            </style>
        </>
    );
};

HyperTextStack.propTypes = {
    block: PropTypes.object,
    items: PropTypes.array,
};

export default HyperTextStack;
