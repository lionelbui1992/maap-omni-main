import React from 'react';
import { breakpointSmall, breakpointMedium } from 'config/styles/breakpoints';
import {
    brandSelectedGrey,
    brandBackgroundGrey,
    brandActiveGrey,
    brandBlack,
} from 'config/styles/colours';
import RightArrow from '@images/small_icon/ArrowRight.svg';
import SubRegionItem from './SubRegionItem';
import brandConfig from 'config/brandConfig';

const RegionList = ({ onSelect, currentRegion, selectedRegion }) => {
    function getGroupContexts(group) {
        return brandConfig.contexts.filter(
            (context) => context.grouping === group
        );
    }

    function getAllGroupedContexts() {
        return [
            getGroupContexts('Asia Pacific'),
            getGroupContexts('United States'),
            getGroupContexts('Europe'),
            getGroupContexts('International'),
        ];
    }

    const groups = getAllGroupedContexts();

    const regionList = groups.map((groupContexts, index) => {
        const regionTitle = groupContexts[0].region;

        return (
            <div className="region" key={`${index}_${regionTitle}`}>
                <p className="regionTitle">{regionTitle}</p>
                {groupContexts.map((groupItemContext, groupIndex) => (
                    <div
                        className="subRegions"
                        key={`${groupIndex}_subRegion_${groupItemContext.code}`}
                    >
                        <SubRegionItem
                            region={groupItemContext.code}
                            defaultCurrencyCode={
                                groupItemContext.defaultCurrencyCode
                            }
                            subRegion={groupItemContext.title}
                            icon={groupItemContext.icon}
                            selectContext={() =>
                                onSelect(groupItemContext.region)
                            }
                            regionAbbreviation={
                                groupItemContext.defaultRegionAbbreviated
                            }
                            current={currentRegion === groupItemContext.region}
                            selected={
                                selectedRegion === groupItemContext.region
                            }
                            key={groupItemContext.title}
                            currency={groupItemContext.currency}
                            currencySymbol={
                                groupItemContext.defaultCurrencySymbol
                            }
                            country={groupItemContext.country}
                            regionName={groupItemContext.region}
                        />
                    </div>
                ))}
                <style jsx>
                    {`
                        .region {
                            box-sizing: content-box;
                            flex: 1;
                        }
                        @media (max-width: ${breakpointSmall}) {
                            .region {
                                flex: 1 0 100%;
                            }
                        }
                        .regionTitle {
                            font-size: 1.5em;
                        }
                        .subRegions {
                            display: flex;
                            flex-wrap: wrap;
                        }
                    `}
                </style>
            </div>
        );
    });

    return (
        <nav>
            <div className="titleBar">
                <p>
                    Select your location
                    <img
                        src={RightArrow.src}
                        alt="right-arrow"
                        className="rightArrowImage"
                    />
                </p>
            </div>
            <div className="content">{regionList}</div>
            <div className="moreInfo">
                For more information on Region and Currency,{' '}
                <a href="/pages/faq">click here</a>
            </div>
            <style jsx>
                {`
                    nav {
                        box-sizing: border-box;
                        width: 100%;
                        background-color: ${brandBackgroundGrey};
                    }
                    p {
                        display: flex;
                        font-size: 1em;
                        margin: 0;
                        padding: 20px;
                        background-color: ${brandSelectedGrey};
                    }
                    .rightArrowImage {
                        padding: 6px 0 0 6px;
                        width: 10px;
                        height: 10px;
                    }
                    button {
                        margin-top: 0;
                    }
                    a {
                        text-decoration: underline;
                        cursor: pointer;
                        color: black;
                    }
                    .content {
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                        padding: 20px;
                    }
                    .regionTitle {
                        font-size: 1.5em;
                    }
                    .context_switcher__options {
                        display: flex;
                        flex-wrap: wrap;
                    }
                    .region {
                        display: flex;
                        flex-direction: column;
                    }
                    .moreInfo {
                        padding: 20px;
                        color: ${brandBlack};
                        font-size: 0.9rem;
                        background-color: ${brandActiveGrey};
                    }
                    @media (max-width: ${breakpointMedium}) {
                        p {
                            font-size: 1.2em;
                        }
                        .content {
                            flex-wrap: wrap;
                            width: 94%;
                        }
                        .regionTitle {
                            font-size: 1.2em;
                            font-weight: 300;
                        }
                        .rightArrowImage {
                            padding: 8px 0 0 6px;
                        }
                    }
                `}
            </style>
        </nav>
    );
};

export default RegionList;
