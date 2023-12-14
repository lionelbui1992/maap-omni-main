import React from 'react';
import PropTypes from 'prop-types';
import { breakpointMedium } from 'config/styles/breakpoints';
import { getCountrySpecificUrl } from 'helpers/linkHelper';

const Index = ({
    handle,
    title,
    colour,
    selected,
    showTitles = true,
    desktopSize = '18px',
    mobileSize = '18px',
}) => {
    return (
        <a
            href={getCountrySpecificUrl(`/products/${handle}`)}
            className="siblingLink"
        >
            <div className={`sibling ${selected ? 'sibling--selected' : ''}`}>
                <div className="swatchContainer">
                    <div className="swatch" style={{ backgroundColor: colour }}>
                        &nbsp;
                    </div>
                </div>
                {showTitles && (
                    <div className="title">
                        {selected && <span>{title}</span>}
                    </div>
                )}
                <style jsx>
                    {`
                        .sibling {
                            // margin-right: 10px;
                            text-align: center;
                            display: flex;
                            align-items: flex-start;
                            flex-direction: column;
                            justify-content: center;
                        }
                        .swatchContainer {
                            display: table;
                            justify-content: center;
                            margin-bottom: 5px;
                            padding: 3px;
                            cursor: pointer;
                        }
                        .title {
                            white-space: pre-wrap;
                            word-break: keep-all;
                            width: 30px;
                            text-align: center;
                            color: black;
                        }
                        .sibling--selected .swatchContainer {
                            border: 1px solid rgb(0, 0, 0);
                            border-radius: 20px;
                            padding: 3px;
                            text-decoration: none;
                        }
                        @media (min-width: ${breakpointMedium}) {
                            .swatch {
                                border-radius: ${desktopSize};
                                width: ${desktopSize};
                                height: ${desktopSize};
                                border: 1px solid #cccccc;
                            }
                        }
                        @media (max-width: ${breakpointMedium}) {
                            .swatch {
                                border-radius: ${mobileSize};
                                width: ${mobileSize};
                                height: ${mobileSize};
                                border: 1px solid #cccccc;
                            }
                            .swatchContainer {
                                margin-bottom: 0;
                            }
                            .title {
                                width: 42px;
                                margin-left: -6px;
                            }
                            .sibling {
                                margin-right: -5px;
                                margin-bottom: 6px;
                            }
                        }
                    `}
                </style>
            </div>
        </a>
    );
};

Index.propTypes = {
    handle: PropTypes.string,
    title: PropTypes.string,
    colour: PropTypes.string,
    selected: PropTypes.bool,
    showTitles: PropTypes.bool,
    desktopSize: PropTypes.string,
    mobileSize: PropTypes.string,
};

export default Index;
