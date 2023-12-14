import React, { useState, useReducer, useEffect } from 'react';
import { breakpointMedium, breakpointSmall } from 'config/styles/breakpoints';
import Down from '@images/small_icon/Down-Arrow-Accordion.svg';
import ChevronDown from '@images/small_icon/Down-Arrow-Accordion.svg';
import CrossIcon from '@images/small_icon/Close-icon-black.svg';

import {
    brandActiveGrey,
    brandBackgroundGrey,
    brandBlack,
    brandWhite,
} from 'config/styles/colours';

import SortingOptions from '@components/ShopifyFilteringControlBar/SortingOptions';
import Filters from '@components/ShopifyFilteringControlBar/Filters';
import MobileFilters from '@components/ShopifyFilteringControlBar/MobileFilters';

const index = ({ availableFilters, dispatch, selectedFilters }) => {
    const [isOpen, setIsOpen] = useState(false);

    const sizeOrder = [
        'Extra Extra Extra Small',
        'Extra Extra Extra Small/Extra Extra Small',
        'Extra Extra Small',
        'Extra Extra Small/Extra Small',
        'Extra Small',
        'Extra Small/Small',
        'Small',
        'Small/Medium',
        'Medium',
        'Medium/Large',
        'Large',
        'Large/Extra Large',
        'Extra Large',
        'Extra Large/Extra Extra Large',
        'Extra Extra Large',
        'Extra Extra Large/Extra Extra Extra Large',
        'Extra Extra Extra Large',
        'XXXS',
        'XXXS/XXS',
        'XXS',
        'XXS/XS',
        'XS',
        'XS/S',
        'S',
        'S/M',
        'M',
        'M/L',
        'L',
        'L/XL',
        'XL',
        'XL/XXL',
        'XXL/XXXL',
        'XXXL',
        'ONE',
        'ONE SIZE',
        'STANDARD',
        'N/A',
        'NONE',
        '5',
        '5.5',
        '6',
        '6.5',
        '7',
        '7.5',
        '8',
        '8.5',
        '9',
        '9.5',
        '10',
        '10.5',
        '11',
        '11.5',
        '12',
        '12.5',
        '13',
        '13.5',
        '14',
        '36',
        '36.5',
        '37',
        '37.5',
        '38',
        '38.5',
        '39',
        '39.5',
        '40',
        '40.5',
        '41',
        '41.5',
        '42',
        '42.5',
        '43',
        '43.5',
        '44',
        '44.5',
        '45',
        '45.5',
        '46',
        '46.5',
        '47',
        '47.5',
        '48',
    ];

    const sizeFilter = availableFilters.find(
        (x) => x.id === 'filter.v.option.size'
    );

    const sizeFilterOptionsArr = sizeFilter ? sizeFilter.values : [];

    const sortedSizeFilterOptionsArr = sizeFilterOptionsArr.sort(function (
        a,
        b
    ) {
        return sizeOrder.indexOf(a.label) - sizeOrder.indexOf(b.label);
    });

    const sortedSizeFilter = {
        ...sizeFilter,
        values: sortedSizeFilterOptionsArr,
    };

    const sizeFilterIndex = availableFilters.findIndex(
        (filter) => filter.id === 'filter.v.option.size'
    );

    if (sizeFilterIndex !== -1) {
        availableFilters[sortedSizeFilter] = sortedSizeFilter;
    }

    const clearAllFiltersHandler = () => {
        dispatch({
            type: 'clearFilter',
            payload: {},
        });
    };

    return (
        <>
            <div className="controlBar">
                <div className="sortTab">
                    <SortingOptions dispatch={dispatch} />
                </div>
                <div
                    className={`filterTab ${isOpen ? 'active' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="filterTabTitle">
                        <div className="filterTabTitle">
                            Filter
                            <img
                                src={ChevronDown.src}
                                alt="arrow"
                                className="filterTitleChevron"
                            />
                        </div>
                    </div>
                </div>
                <div className="spacer" />
            </div>
            <div className={`facetsContainer ${isOpen ? 'active' : ''}`}>
                <div className={`facets ${isOpen ? 'active' : ''}`}>
                    <div className="mobileFilters">
                        {isOpen && (
                            <MobileFilters
                                availableFilters={availableFilters}
                                selectedFilters={selectedFilters}
                                dispatch={dispatch}
                            />
                        )}
                    </div>

                    {/* accordion filters  - screen less than breakpointMedium 991px */}

                    {/* desktop filters - screen larger than 991px */}
                    <div className="desktopFilters">
                        <Filters
                            availableFilters={availableFilters}
                            selectedFilters={selectedFilters}
                            dispatch={dispatch}
                        />
                    </div>
                </div>
                <div className="facetControls">
                    <button
                        className="button done"
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        Done
                    </button>

                    <button
                        className="clear_all_button"
                        onClick={clearAllFiltersHandler}
                    >
                        Clear All
                    </button>
                </div>
            </div>

            {/* css */}
            <style jsx global>{`
                .shopify-SortBy-select {
                    display: flex;
                    flex: 1;
                    justify-content: space-between;
                    align-items: center;
                    background: rgba(0, 0, 0, 0) url('${Down.src}') no-repeat
                        85% 50%;
                    background-size: 20px 20px;
                    border: none;
                    box-shadow: none;
                    -webkit-appearance: none;
                    cursor: pointer;
                    padding: 10px 30px;
                    box-sizing: border-box;
                    font-size: 1em;
                    font-weight: 400;
                    color: rgb(0, 0, 0);
                }

                .shopify-SortBy-select:focus {
                    outline: 0;
                }

                 {
                    /* accordion */
                }

                .filtersAcc .accordion__button:after {
                    z-index: -1;
                }
                .filtersAcc.active .accordion__button:after {
                    z-index: 0;
                }

                @media only screen and (min-width: ${breakpointMedium}) {
                    .shopify-SortBy-select {
                        background-size: 15px 15px;
                    }
                }
            `}</style>
            <style jsx>
                {`
                    .controlBar {
                        display: flex;
                        align-items: center;
                        background-color: ${brandBackgroundGrey};
                        padding-left: 35px;
                    }
                    .sortTab,
                    .filterTab,
                    .filterTabTitle {
                        display: flex;
                        flex: 2.3;
                        justify-content: space-between;
                        align-items: center;
                        cursor: pointer;
                    }

                     {
                    }

                    .filterTabTitle {
                        padding: 10px;
                        font-size: 1em;
                        font-weight: 400;
                    }

                    .filterTitleChevron {
                        width: 10px;
                        height: 10px;
                    }

                    .filterTab.active img {
                        transform: rotate(180deg) scaleX(-1);
                    }

                    .facetControls {
                        display: flex;
                        justify-content: space-around;
                        padding: 20px 45px;
                        background-color: ${brandWhite};
                    }

                    .facetsContainer {
                        max-height: 0;
                        transition: height 1s ease-in-out;
                        overflow: hidden;
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
                        cursor: pointer;
                    }

                    .clear_all_button {
                        border: none;
                        background-color: white;
                        color: ${brandBlack};
                        margin: 0 0 0 50px;
                        text-transform: none;
                        cursor: pointer;
                    }

                    .mobileFilters {
                        display: block;
                    }

                     {
                        /* accordion */
                    }

                    .accordionPanel {
                        padding: 10px;
                    }

                    .facets {
                        padding: 0 50px;
                    }

                    .filterOptionValue {
                        text-align: left;
                        padding: 10px 20px 10px 10px;
                        margin: 0px;
                        cursor: pointer;
                        display: flex;
                        justify-content: space-between;
                    }
                    .filterOptionValue:hover {
                        background-color: rgb(241, 241, 241);
                    }
                    .groupTitle {
                        margin: 0 10px 10px 0;
                        font-size: 20.8px;
                    }

                    .selectedFilterCss {
                        background-color: rgb(241, 241, 241);
                    }

                    .desktopFilters {
                        display: none;
                    }

                    .crossIcon {
                        width: 10px;
                    }

                    @media (max-width: ${breakpointSmall}) {
                        .controlBar {
                            padding-left: 0 !important;
                        }
                        .filterTabTitle {
                            padding: 10px 15px !important;
                        }
                        .filterTitleChevron {
                            width: 20px;
                            height: 20px;
                        }

                        .facets {
                            padding: 0 28px !important;
                        }
                    }
                    @media only screen and (min-width: ${breakpointMedium}) {
                        .spacer {
                            flex: 8;
                        }
                        .facetControls {
                            display: none;
                        }
                        .facetsContainer.active {
                            padding: 30px 50px 30px 20px;
                            max-height: 2000px;
                        }
                        .desktopFilterOption {
                            padding: 1px 7px;
                            margin: 7px 0px;
                            cursor: pointer;
                            display: flex;
                            justify-content: space-between;
                        }

                        .desktopFilterOption:hover {
                            background-color: rgb(241, 241, 241);
                        }

                        .filterTitleChevron {
                            width: 15px;
                            height: 15px;
                        }

                        .mobileFilters {
                            display: none;
                        }
                    }

                    @media (min-width: 992px) {
                        .filtersAcc {
                            display: none;
                        }
                        .desktopFilters {
                            display: flex;
                            justify-content: space-between;
                        }
                        .deskTopFilterItem {
                            margin-bottom: 10px;
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
                        .crossIcon {
                            width: 20px;
                        }
                    }
                    .active {
                        background-color: ${brandActiveGrey};
                    }
                `}
            </style>
        </>
    );
};

export default index;
