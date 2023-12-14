import React, { useEffect, useState } from 'react';
import { useShop } from '@lib/providers/ShopProvider';
import RegionList from 'components/RegionList';
import { breakpointMedium, breakpointSmall } from 'config/styles/breakpoints';
import Button from 'components/Button';
import {
    brandSelectedGrey,
    brandBackgroundGrey,
    brandActiveGrey,
    brandBlack,
} from 'config/styles/colours';
import { globalStyles } from './styles';
import css from 'styled-jsx/css';
import RightArrow from '@images/small_icon/ArrowRight.svg';
import LeftArrow from '@images/small_icon/ArrowLeft.svg';
import { getContextByRegion } from '@lib/get-context';
import { useUI } from '@lib/providers/UIProvider';

const ContextSwitcher = () => {
    const { closeLocaleUI } = useUI();
    const { switchShopContext, region } = useShop();
    const [selectedTargetRegion, setSelectedTargetRegion] = useState(region);
    const [stringValues, setStringValues] = useState({
        targetRegionNameAbbreviated: '',
        targetRegionCurrencyCode: '',
    });

    const handleSelectContext = (targetRegion) => {
        setSelectedTargetRegion(targetRegion);
    };

    const updateContext = () => {
        switchShopContext(selectedTargetRegion);

        // switch region custom GA4 event
        if (typeof window !== 'undefined') {
            window.dataLayer.push({
                event: 'gtm.switchRegion',
                switchRegionDetails: {
                    currentRegion: region,
                    selectedTargetRegion: selectedTargetRegion,
                },
            });
        }

        setTimeout(closeLocaleUI, 250);
    };

    const clearSelection = () => {
        setSelectedTargetRegion(region);
    };

    const hasChanges = region !== selectedTargetRegion;

    const buttonStyle = css.resolve`
        button.button {
            font-size: 1rem;
            margin: 0 !important;
        }
        @media (min-width: ${breakpointMedium}) {
            button.button {
                display: block;
                font-size: 1rem;
                width: 100%;
            }
        }
    `;

    useEffect(() => {
        if (hasChanges) {
            const { defaultRegionAbbreviated, defaultCurrencyCode } =
                getContextByRegion(selectedTargetRegion);
            setStringValues({
                targetRegionNameAbbreviated: defaultRegionAbbreviated,
                targetRegionCurrencyCode: defaultCurrencyCode,
            });
        }
    }, [hasChanges]);

    const { targetRegionNameAbbreviated, targetRegionCurrencyCode } =
        stringValues;

    return (
        <nav className="context_switcher">
            {!hasChanges && (
                <div className="regions">
                    <RegionList
                        currentRegion={region}
                        selectedRegion={selectedTargetRegion}
                        onSelect={handleSelectContext}
                    />
                </div>
            )}
            {hasChanges && (
                <div className="controls">
                    <div className="heading-bar">
                        <p className="location-heading">
                            Select your location
                            <img
                                src={RightArrow.src}
                                alt="right-arrow"
                                className="rightArrowImage"
                            />
                        </p>
                    </div>
                    <div className="column switch_check">
                        Are you sure you want to switch?
                    </div>
                    <div className="alertText">
                        Applying selected changes will switch to your{' '}
                        {targetRegionNameAbbreviated} cart, any items in your
                        current cart will be cleared.
                    </div>
                    {hasChanges && (
                        <div className="column-switch">
                            <div className="button_switch">
                                <Button
                                    text={
                                        hasChanges
                                            ? `SWITCH TO ${targetRegionNameAbbreviated} > ENGLISH / ${targetRegionCurrencyCode}`
                                            : 'Select country'
                                    }
                                    onClick={() => updateContext()}
                                    disabled={!hasChanges}
                                    className={`${buttonStyle.className} button--secondary region-switcher-button`}
                                    data-event-label="Open region switcher"
                                    data-event-category={`Region ${targetRegionNameAbbreviated} selection`}
                                    data-event-action="Click"
                                />
                            </div>
                        </div>
                    )}
                    <div className="backButton">
                        <img
                            src={LeftArrow.src}
                            alt="left-arrow"
                            className="LeftArrowImage"
                        />{' '}
                        <a className="backLink" onClick={clearSelection}>
                            Back
                        </a>
                    </div>
                    <div className="moreInfo">
                        For more information on Region and Currency,{' '}
                        <a href="/pages/faq">click here</a>
                    </div>
                </div>
            )}
            {buttonStyle.styles}
            <style jsx>
                {`
                    nav {
                        display: flex;
                        flex-wrap: wrap;
                        padding: 18px 35px;
                        height: 100%;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        nav {
                            padding: 0;
                        }
                    }
                    @media (max-width: ${breakpointSmall}) {
                        .regions {
                            flex-direction: column;
                        }
                    }
                    .regions {
                        display: flex;
                        width: 100%;
                    }
                    a {
                        color: rgb(0, 0, 0);
                    }
                    .location-heading {
                        display: flex;
                        font-size: 1em;
                        margin: 0;
                        padding: 20px;
                        font-weight: 400;
                        background-color: ${brandSelectedGrey};
                    }
                    .rightArrowImage {
                        padding: 6px 0 0 6px;
                        width: 11px;
                        height: 11px;
                    }
                    .desktopCurrencySelector {
                        display: block;
                    }
                    .mobileCurrencySelector {
                        display: none;
                    }
                    .alertText {
                        line-height: 1.4em;
                        font-size: 0.9rem;
                        font-weight: 400;
                        align-items: center;
                    }
                    .controls {
                        flex: 1;
                        height: 100%;
                        background-color: ${brandBackgroundGrey};
                    }
                    .column {
                        flex: 1;
                        flex-direction: column;
                        margin: 0 60px 0 0;
                        padding: 20px 20px 20px 30px;
                    }
                    .column-switch {
                        display: flex;
                        align-items: center;
                        padding: 0 20px;
                    }
                    .switch_check {
                        font-weight: 400;
                        padding-bottom: 10px;
                        font-size: 1.5em;
                    }
                    .flex {
                        display: flex;
                        align-items: flex-end;
                        flex-direction: column;
                    }
                    .moreInfo {
                        padding: 20px;
                        font-size: 0.9rem;
                        background-color: ${brandActiveGrey};
                        color: ${brandBlack} !important;
                    }
                    .column {
                        flex: 1;
                    }
                    .buttonContainer {
                        width: 100%;
                    }
                    .backButton {
                        padding: 20px 20px 30px 30px;
                        display: flex;
                        align-items: center;
                    }
                    .LeftArrowImage {
                        width: 11px;
                        height: 11px;
                    }
                    .backLink {
                        padding: 0 0 2px 5px;
                        cursor: pointer;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .column-switch {
                            flex-direction: column;
                            margin: 0;
                        }
                        .button_switch {
                            width: 100%;
                            padding-top: 15px;
                            padding-bottom: 50px;
                        }
                        .column {
                            margin: 0;
                            padding: 20px;
                        }
                        .switch_check {
                            font-size: 1.8em;
                            padding-bottom: 10px;
                        }
                        .alertText {
                            padding: 0 20px 20px 20px;
                        }
                        .backButton {
                            padding: 20px 20px 30px 20px;
                        }
                    }
                    @media (min-width: ${breakpointMedium}) {
                        nav {
                            background-color: initial;
                            padding: initial;
                        }
                        .controls {
                            flex-direction: column;
                            align-items: flex-start;
                            margin: 0;
                        }
                        .buttonContainer {
                            justify-content: flex-end;
                            align-items: flex-end;
                            width: 300px;
                        }
                        .column:first-child {
                            flex: 3;
                        }
                        .column:last-child {
                            flex: 7;
                            align-items: flex-end;
                        }
                        .column {
                            flex: 1;
                            flex-direction: row;
                            padding-right: 50px;
                        }
                        .flex {
                            display: flex;
                            align-items: flex-end;
                        }
                        .alertText {
                            font-size: 1.1em;
                            line-height: 1.4em;
                            padding: 0 20px 20px 30px;
                        }
                        .moreInfo {
                            margin: 0;
                            color: ${brandBlack} !important;
                            font-size: 0.9rem;
                        }
                        .button_switch {
                            width: 35%;
                            padding: 15px 20px 50px 10px;
                        }
                    }
                `}
            </style>
            <style jsx global>
                {globalStyles}
            </style>
        </nav>
    );
};

export default ContextSwitcher;
