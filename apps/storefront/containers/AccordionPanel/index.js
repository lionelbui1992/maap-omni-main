import React from 'react';
import PropTypes from 'prop-types';
import ChevronDown from '@images/small_icon/Down-Arrow-Accordion.svg';
import { breakpointMedium } from 'config/styles/breakpoints';

const AccordionPanel = ({
    label,
    content,
    activeTab,
    index,
    activateTab,
    revertColor = false,
}) => {
    const isActive = activeTab === index;
    const color = revertColor ? 'white' : 'black';
    const filter = revertColor
        ? 'filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(224deg) brightness(108%) contrast(101%);'
        : 'filter: invert(0%) sepia(97%) saturate(10%) hue-rotate(184deg) brightness(90%) contrast(103%);';

    const transform = isActive ? 'transform: rotate(180deg);' : '';

    return (
        <div
            className="accordion_panel"
            role="tabpanel"
            aria-expanded={isActive}
        >
            <button
                type="button"
                className="accordion_panel__label"
                role="tab"
                onClick={() => activateTab(index)}
            >
                {label}
                <img
                    src={ChevronDown.src}
                    className="accordion_panel__chevron"
                    alt="Right Chevron - Open Panel"
                />
            </button>
            <div className="accordion_panel__inner" aria-hidden={!isActive}>
                <div className="accordion_panel__content">{content}</div>
            </div>
            <style jsx global>
                {`
                    .accordion_panel__content a {
                        color: inherit;
                        text-decoration: underline;
                    }
                `}
            </style>
            <style jsx>
                {`
                    .accordion_panel__label {
                        color: ${color};
                        border-bottom: 1px solid ${color};
                    }
                    .accordion_panel__chevron {
                        ${filter}
                        ${transform}
                    }
                `}
            </style>
            <style jsx>
                {`
                    .accordion_panel__label {
                        position: relative;
                        display: flex;
                        width: 100%;
                        border-top: 0;
                        border-right: 0;
                        border-left: 0;
                        text-align: left;
                        transition: color 0.2s;
                        cursor: pointer;
                        background: none;
                        justify-content: space-between;
                    }

                    .accordion_panel__label:focus {
                        outline: none;
                    }

                    .accordion_panel__label:after,
                    .accordion_panel__label:before {
                        content: '';
                        position: absolute;
                        right: 0;
                        top: 50%;
                        width: 22px;
                        height: 2px;
                        margin-top: -2px;
                    }

                    .accordion_panel__label:before {
                        -webkit-transform: rotate(-90deg);
                        transform: rotate(-90deg);
                        transition: -webkit-transform 0.35s
                            cubic-bezier(0.65, 0.05, 0.36, 1);
                        transition: transform 0.35s
                            cubic-bezier(0.65, 0.05, 0.36, 1);
                        transition: transform 0.35s
                                cubic-bezier(0.65, 0.05, 0.36, 1),
                            -webkit-transform 0.35s cubic-bezier(0.65, 0.05, 0.36, 1);
                    }

                    .accordion_panel[aria-expanded='true']
                        .accordion_panel__content {
                        opacity: 1;
                    }

                    .accordion_panel[aria-expanded='true']
                        .accordion_panel__label {
                        border-bottom: transparent;
                    }

                    .accordion_panel[aria-expanded='true']
                        .accordion_panel__label:before {
                        -webkit-transform: rotate(0deg);
                        transform: rotate(0deg);
                    }

                    .accordion_panel__inner {
                        overflow: hidden;
                        will-change: height;
                        transition: height 0.4s
                            cubic-bezier(0.65, 0.05, 0.36, 1);
                        height: 0;
                    }

                    .accordion_panel[aria-expanded='true']
                        .accordion_panel__inner {
                        height: initial;
                    }

                    .accordion_panel__content {
                        opacity: 0;
                        line-height: 18px;
                        transition: opacity 0.3s linear 0.18s;
                    }

                    .accordion_panel:not(:last-child) {
                        margin-bottom: 3px;
                    }

                    .accordion_panel__chevron {
                        height: 12px;
                    }

                    .accordion_panel__label {
                        font-weight: 300;
                        padding: 15px 0;
                        -webkit-tap-highlight-color: transparent;
                    }

                    @media (max-width: ${breakpointMedium}) {
                        .accordion_panel__label {
                            padding: 12px 0;
                        }
                    }
                `}
            </style>
        </div>
    );
};

AccordionPanel.propTypes = {
    label: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    activeTab: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    index: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired,
    activateTab: PropTypes.func.isRequired,
    revertColor: PropTypes.bool,
};

export default AccordionPanel;
