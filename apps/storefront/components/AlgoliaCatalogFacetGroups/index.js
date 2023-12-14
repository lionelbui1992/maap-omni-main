import React, { useState } from 'react';
import { brandActiveGrey } from 'config/styles/colours';
import ChevronDown from '@images/small_icon/Down-Arrow-Accordion.svg';
import { breakpointMedium } from 'config/styles/breakpoints';
import AlgoliaRefinementList from 'components/AlgoliaRefinementList';

const AlgoliaCatalogFacetGroups = () => {
    const [visibleRefinementList, setVisibleRefinementList] = useState(0);
    const isVisibleFilterGroup = list => visibleRefinementList === list;

    return (
        <div className="facetGroups">
            <div
                className={`panelGroup ${
                    isVisibleFilterGroup(0) ? 'active' : null
                }`}
            >
                <div
                    className="groupTitle"
                    onClick={() => setVisibleRefinementList(0)}
                >
                    Size
                    <img
                        src={ChevronDown.src}
                        alt="Downfacing Chevron"
                        width={20}
                        height={20}
                    />
                </div>
                <div className="refinementList">
                    <AlgoliaRefinementList attribute="options.size" />
                </div>
            </div>
            <div
                className={`panelGroup ${
                    isVisibleFilterGroup(1) ? 'active' : null
                }`}
            >
                <div
                    className="groupTitle"
                    onClick={() => setVisibleRefinementList(1)}
                >
                    Colour
                    <img
                        src={ChevronDown.src}
                        alt="Downfacing Chevron"
                        width={20}
                        height={20}
                    />
                </div>
                <div className="refinementList">
                    <AlgoliaRefinementList
                        attribute="options.color"
                        limit={20}
                    />
                </div>
            </div>
            <div
                className={`panelGroup ${
                    isVisibleFilterGroup(2) ? 'active' : null
                }`}
            >
                <div
                    className="groupTitle"
                    onClick={() => setVisibleRefinementList(2)}
                >
                    Fit
                    <img src={ChevronDown.src} alt="Downfacing Chevron" />
                </div>
                <div className="refinementList">
                    <AlgoliaRefinementList attribute="named_tags.fit" />
                </div>
            </div>
            <div
                className={`panelGroup ${
                    isVisibleFilterGroup(4) ? 'active' : null
                }`}
            >
                <div
                    className="groupTitle"
                    onClick={() => setVisibleRefinementList(4)}
                >
                    Weather
                    <img src={ChevronDown.src} alt="Downfacing Chevron" />
                </div>
                <div className="refinementList">
                    <AlgoliaRefinementList attribute="named_tags.weather" />
                </div>
            </div>
            <style jsx>
                {`
                    .groupTitle {
                        margin: 0 0 10px 0;
                        display: flex;
                        justify-content: space-between;
                    }
                    .active {
                        background-color: ${brandActiveGrey};
                    }
                    .facetGroups {
                        margin-top: 0;
                        padding: 10px 0 20px 0;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                    }
                    .panelGroup {
                        flex: 1;
                        padding: 10px;
                    }
                    .panelGroup .groupTitle img {
                        display: none;
                    }
                    img {
                        height: 20px;
                        width: 20px;
                    }
                    @media only screen and (max-width: ${breakpointMedium}) {
                        .facetGroups {
                            flex-direction: column;
                        }
                        .groupTitle {
                            margin: 0 10px 10px 0;
                        }
                        .panelGroup .refinementList {
                            display: none;
                        }
                        .panelGroup.active .refinementList {
                            display: block;
                        }
                        .panelGroup .groupTitle img {
                            display: block;
                        }
                        .panelGroup.active .groupTitle img {
                            transform: rotate(180deg) scaleX(-1);
                        }
                        .panelGroup {
                            margin: 8px 0;
                            font-size: 1.6em;
                            line-height: 1.5em;
                        }
                        .refinementList {
                            padding: 10px 0;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default AlgoliaCatalogFacetGroups;
