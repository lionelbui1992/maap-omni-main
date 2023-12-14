import React from 'react';
import { breakpointSmall } from 'config/styles/breakpoints';

const SubRegionItem = ({
    region,
    subRegion,
    selectCountryAndRegion,
    icon,
    current,
    selected,
    currency,
    currencySymbol,
    country,
    defaultCurrencyCode,
    regionName,
    regionAbbreviation,
    selectContext,
}) => {
    return (
        <div
            className={`subRegion${current ? ' current' : ''}${
                selected ? ' selected' : ''
            }`}
        >
            <button
                type="button"
                onClick={selectContext}
                data-event-label={`Selected region ${regionAbbreviation}`}
                data-event-category="Region Selection"
                data-event-action="Click"
            >
                <div>
                    <img src={icon} alt="region-flag" />
                </div>
                <div className="subRegionContainer">
                    <div className="subRegionTitle">{regionName}</div>
                    <div className="subRegionCurrency">
                        <p hidden>
                            {region} {currency}{' '}
                        </p>
                        <div className="subRegionLanguage">ENGLISH</div> /{' '}
                        {defaultCurrencyCode} {currencySymbol}
                    </div>
                </div>
            </button>
            <style jsx>
                {`
                    button {
                        border: none;
                        background: none;
                        margin: 0 0 8px 0;
                        display: flex;
                        align-items: flex-start;
                        cursor: pointer;
                    }

                    button:active,
                    button:focus {
                        outline: none;
                    }

                    @media (max-width: ${breakpointSmall}) {
                        .subRegion {
                            flex: 1 0 100%;
                        }
                    }

                    img {
                        width: 18px;
                        height: 18px;
                    }

                    .subRegionContainer {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        margin-left: 10px;
                    }

                    .subRegion {
                        flex: 1 0 48%;
                        margin: 5px 0 25px 0;
                        padding: 0 5px 0 0;
                        font-size: 0.9em;
                    }

                    .subRegion.current .subRegionTitle,
                    .subRegion.current .subRegionCurrency {
                        text-decoration: none;
                    }

                    .subRegion.selected .subRegionTitle,
                    .subRegion.selected .subRegionCurrency {
                        font-weight: 600;
                    }

                    .subRegionTitle {
                        white-space: nowrap;
                        margin-bottom: 10px;
                        display: flex;
                        font-size: 1.2em;
                        color: rgb(0, 0, 0);
                    }

                    .subRegionCurrency {
                        display: flex;
                        font-size: 0.9em;
                        color: rgb(0, 0, 0);
                    }

                    .subRegionLanguage {
                        padding-right: 5px;
                        padding-top: 1px;
                        font-size: 0.9em;
                        color: rgb(0, 0, 0);
                    }
                `}
            </style>
        </div>
    );
};

export default SubRegionItem;
