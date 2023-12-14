import React from 'react';
import { brandBlack } from 'config/styles/colours';
import { useShop } from '@lib/providers/ShopProvider';
import { breakpointMedium } from 'config/styles/breakpoints';
import { useUI } from '@lib/providers/UIProvider';

const ContextSwitcherToggle = () => {
    const {
        defaultCurrencySymbol,
        defaultRegionAbbreviated,
        defaultCurrencyCode,
        icon,
        region,
    } = useShop();

    const { toggleLocaleUI } = useUI();

    return (
        <a
            onClick={toggleLocaleUI}
            data-click="country-switcher"
            data-country-code={region}
            className="region-switcher-toggle-button"
        >
            <div className="lang-currency-group">
                <div className="region-flag-wrapper">
                    <img src={icon} alt="region-flag" />
                </div>
                <div className="language">{defaultRegionAbbreviated}</div> /
                <div className="currency-symbol-code">
                    {defaultCurrencyCode} {defaultCurrencySymbol}
                </div>
            </div>
            <style jsx>
                {`
                    a {
                        display: flex;
                        flex-direction: column;
                        cursor: pointer;
                        color: ${brandBlack};
                        font-size: 1em;
                        text-decoration: none;
                    }
                    .country-icon-group {
                        display: flex;
                        align-items: center;
                        padding-bottom: 10px;
                        margin: 2px 0;
                    }
                    .lang-currency-group {
                        display: flex;
                        align-items: center;
                    }
                    img {
                        width: 20px;
                        height: 20px;
                        display: inline;
                    }
                    .region-flag-wrapper {
                        margin: 7px 5px 0 0;
                        font-size: 18px;
                    }
                    .language {
                        padding-right: 5px;
                    }
                    .currency-symbol-code {
                        display: flex;
                        align-items: center;
                        padding-left: 5px;
                    }
                    .right-arrow-image {
                        width: 10px;
                        height: 10px;
                        padding: 0 6px;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .country-icon-group {
                            padding-bottom: 0;
                            margin: 0;
                        }
                        a {
                            flex-direction: row;
                        }
                        .right-arrow-image {
                            padding: 3px 6px 0 6px;
                        }
                    }
                `}
            </style>
        </a>
    );
};

export default ContextSwitcherToggle;
