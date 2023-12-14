import React, { useState } from 'react';
import { brandActiveGrey } from 'config/styles/colours';
import ChevronDown from '@images/small_icon/Down-Arrow-Accordion.svg';
import { breakpointMedium } from 'config/styles/breakpoints';
import AlgoliaRefinementList from 'components/AlgoliaRefinementList';
import SSRLink from 'helpers/SSRLink';

const AlgoliaBlogFacetGroups = () => {
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
                    <SSRLink
                        linkType="Stories"
                        linkUrl="stories/collection/community"
                    >
                        Stories
                    </SSRLink>
                    <img src={ChevronDown} alt="Down Chevron" />
                </div>
                <div className="refinementList">
                    <AlgoliaRefinementList
                        attribute="named_tags.collection"
                        limit={5}
                    />
                </div>
            </div>
            {/*<div*/}
            {/*    className={`panelGroup ${*/}
            {/*        isVisibleFilterGroup(1) ? 'active' : null*/}
            {/*    }`}*/}
            {/*>*/}
            {/*    <div*/}
            {/*        className="groupTitle"*/}
            {/*        onClick={() => setVisibleRefinementList(1)}*/}
            {/*    >*/}
            {/*        <SSRLink*/}
            {/*            linkType="Stories"*/}
            {/*            linkUrl="stories/collection/product"*/}
            {/*        >*/}
            {/*            Product*/}
            {/*        </SSRLink>*/}
            {/*        <img src={ChevronDown} alt="Down Chevron" />*/}
            {/*    </div>*/}
            {/*    <div className="refinementList">*/}
            {/*        <AlgoliaRefinementList*/}
            {/*            attribute="named_tags.product"*/}
            {/*            limit={5}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div*/}
            {/*    className={`panelGroup ${*/}
            {/*        isVisibleFilterGroup(2) ? 'active' : null*/}
            {/*    }`}*/}
            {/*>*/}
            {/*    <div*/}
            {/*        className="groupTitle"*/}
            {/*        onClick={() => setVisibleRefinementList(2)}*/}
            {/*    >*/}
            {/*        <SSRLink*/}
            {/*            linkType="Stories"*/}
            {/*            linkUrl="stories/collection/adventure"*/}
            {/*        >*/}
            {/*            Adventure*/}
            {/*        </SSRLink>*/}
            {/*        <img src={ChevronDown} alt="Down Chevron" />*/}
            {/*    </div>*/}
            {/*    <div className="refinementList">*/}
            {/*        <AlgoliaRefinementList*/}
            {/*            attribute="named_tags.adventure"*/}
            {/*            limit={5}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div*/}
            {/*    className={`panelGroup ${*/}
            {/*        isVisibleFilterGroup(3) ? 'active' : null*/}
            {/*    }`}*/}
            {/*>*/}
            {/*    <div*/}
            {/*        className="groupTitle"*/}
            {/*        onClick={() => setVisibleRefinementList(3)}*/}
            {/*    >*/}
            {/*        <SSRLink*/}
            {/*            linkType="Stories"*/}
            {/*            linkUrl="stories/collection/sustainability"*/}
            {/*        >*/}
            {/*            Sustainability*/}
            {/*        </SSRLink>*/}
            {/*        <img src={ChevronDown} alt="Down Chevron" />*/}
            {/*    </div>*/}
            {/*    <div className="refinementList">*/}
            {/*        <AlgoliaRefinementList*/}
            {/*            attribute="named_tags.sustainability"*/}
            {/*            limit={5}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/* <div */}
            {/*    className={`panelGroup ${ */}
            {/*        isVisibleFilterGroup(4) ? 'active' : null */}
            {/*    }`} */}
            {/* > */}
            {/*    <div */}
            {/*        className="groupTitle" */}
            {/*        onClick={() => setVisibleRefinementList(4)} */}
            {/*    > */}
            {/*        <SSRLink */}
            {/*            linkType="Stories" */}
            {/*            linkUrl="stories/collection/off-the-front" */}
            {/*        > */}
            {/*            Off The Front */}
            {/*        </SSRLink> */}
            {/*        <img src={ChevronDown} alt="Down Chevron" /> */}
            {/*    </div> */}
            {/*    <div className="refinementList"> */}
            {/*        <AlgoliaRefinementList attribute="named_tags.off-the-front" /> */}
            {/*    </div> */}
            {/* </div> */}
            <style jsx global>
                {`
                    .groupTitle a {
                        color: #000 !important;
                        text-decoration: none !important;
                    }
                `}
            </style>
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
                        width: 60%;
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
                        width: 20px;
                        height: 20px;
                    }
                    @media only screen and (max-width: ${breakpointMedium}) {
                        .facetGroups {
                            flex-direction: column;
                            width: 100%;
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
                    .ais-CurrentRefinements-list {
                        padding: 0;
                    }
                `}
            </style>
        </div>
    );
};

export default AlgoliaBlogFacetGroups;
