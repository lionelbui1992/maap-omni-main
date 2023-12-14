import React, { useState } from 'react';

import ChevronDown from '@images/small_icon/Down-Arrow-Accordion.svg';
import { connectCurrentRefinements } from 'react-instantsearch-dom';
import { breakpointMedium, breakpointSmall } from 'config/styles/breakpoints';
import {
    brandActiveGrey,
    brandBackgroundGrey,
    brandBlack,
    brandWhite,
} from 'config/styles/colours';

const ClearRefinements = ({ items, refine }) => {
    return (
        <button
            className="clear_all_button clear"
            onClick={() => refine(items)}
            disabled={!items.length}
            type="button"
        >
            Clear All
            <style jsx>
                {`
                    .clear_all_button {
                        border: none;
                        background-color: white;
                        color: ${brandBlack};
                        margin: 0 0 0 50px;
                        text-transform: none;
                    }
                `}
            </style>
        </button>
    );
};
const CustomClearRefinements = connectCurrentRefinements(ClearRefinements);

const AlgoliaFilteringControlBar = ({ sortingComponent, facetsComponent }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="filteringPanel">
            <div className="controlBar">
                {sortingComponent && (
                    <div className="sortTab">{sortingComponent}</div>
                )}
                {facetsComponent && (
                    <div
                        className={`filterTab ${isOpen ? 'active' : ''}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div className="filterTabTitle">
                            Filter
                            <img
                                src={ChevronDown.src}
                                alt="arrow"
                                className="filterTitleChevron"
                            />
                        </div>
                    </div>
                )}
                <div className="spacer" />
            </div>
            {facetsComponent && (
                <div className={`facetsContainer ${isOpen ? 'active' : ''}`}>
                    <div className={`facets ${isOpen ? 'active' : ''}`}>
                        {facetsComponent}
                    </div>
                    <div className="facetControls">
                        <button
                            className="button done"
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            Done
                        </button>
                        <CustomClearRefinements />
                    </div>
                </div>
            )}
            <style jsx>
                {`
                    .controlBar {
                        display: flex;
                        align-items: center;
                        background-color: ${brandBackgroundGrey};
                        padding-left: 35px;
                    }
                    .filterTabTitle {
                        padding: 10px 20px;
                        font-size: 1em;
                        font-weight: 400;
                    }
                    .sortTab,
                    .filterTab,
                    .filterTabTitle {
                        display: flex;
                        flex: 1.1;
                        justify-content: space-between;
                        align-items: center;
                        cursor: pointer;
                    }
                    .filterTitleChevron {
                        width: 10px;
                        height: 10px;
                    }
                    @media (max-width: ${breakpointSmall}) {
                        .filterTabTitle {
                            padding: 10px 40px !important;
                        }
                        .filterTitleChevron {
                            width: 20px;
                            height: 20px;
                        }
                    }
                    @media only screen and (min-width: ${breakpointMedium}) {
                        .spacer {
                            flex: 8;
                        }
                    }
                    .filterTab.active img {
                        transform: rotate(180deg) scaleX(-1);
                    }
                    .facetsContainer {
                        max-height: 0;
                        transition: height 1s ease-in-out;
                        overflow: hidden;
                    }
                    .facets {
                        padding: 0 50px;
                    }
                    .facetControls {
                        display: flex;
                        justify-content: space-around;
                        padding: 20px 45px;
                        background-color: ${brandWhite};
                    }
                    .button {
                        border: 1px solid ${brandBlack};
                        border-radius: 30px;
                        padding: 15px 55px;
                        text-transform: none;
                    }
                    .button.done {
                        background-color: ${brandBlack};
                        color: ${brandWhite};
                    }
                    @media only screen and (min-width: ${breakpointMedium}) {
                        .facetControls {
                            display: none;
                        }
                        .facetsContainer.active {
                            padding: 30px 50px 30px 7px;
                            max-height: 600px;
                        }
                        .filterTitleChevron {
                            height: 15px;
                            width: 15px;
                        }
                    }
                    @media (max-width: ${breakpointSmall}) {
                        .controlBar {
                            padding-left: 0 !important;
                        }

                        .facets {
                            padding: 0 40px !important;
                        }
                    }
                    @media only screen and (max-width: ${breakpointMedium}) {
                        .facetsContainer.active {
                            text-align: center;
                            max-height: initial;
                        }
                        .filterTitleChevron {
                            width: 20px;
                            height: 20px;
                        }
                    }
                    .active {
                        background-color: ${brandActiveGrey};
                    }
                `}
            </style>
        </div>
    );
};

export default AlgoliaFilteringControlBar;
