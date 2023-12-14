import React, { useState, useLayoutEffect } from 'react';
import { getRegionPromptHidden, setRegionPromptHidden } from 'helpers/cookies';
import Button from 'components/Button';
import css from 'styled-jsx/css';
import CloseIcon from '@images/small_icon/Close-icon-white.svg';
import GeoPin from '@images/small_icon/geoPin.svg';
import { breakpointMedium } from 'config/styles/breakpoints';
import EUCountryCodes from 'helpers/euCountryCodes';
import { useRouter } from 'next/router';
import { getTargetPathForAlternateRegion } from 'helpers/linkHelper';
import fetch from 'isomorphic-unfetch';
import { useShop } from '@lib/providers/ShopProvider';

const getIntendedRegion = (detectedCountry) => {
    if (detectedCountry === 'US') return 'US';
    if (detectedCountry === 'GB') return 'UK';
    if (detectedCountry === 'UK') return 'UK';
    if (EUCountryCodes.indexOf(detectedCountry) !== -1) return 'EU';

    return 'INTL';
};

const getIntendedRegionTitle = (region) => {
    if (region.toUpperCase() === 'US') return ['US/USD', 'US/USD'];
    if (region.toUpperCase() === 'EU') return ['EU/Euro', 'EU/Euro'];
    if (region.toUpperCase() === 'UK') return ['UK/GBP', 'UK/GBP'];
    if (region.toUpperCase() === 'INTL') return ['Australia/AU', 'AU/AUD'];
};

const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : () => {};

const SwitchRegionPrompt = () => {
    const { asPath } = useRouter();
    const regionPromptHidden = getRegionPromptHidden();
    const previouslyHidden =
        regionPromptHidden === undefined ? false : regionPromptHidden;
    const [showPrompt, setShowPrompt] = useState(!previouslyHidden);
    const [geoLocationData, setGeoLocationData] = useState(!previouslyHidden);

    useIsomorphicLayoutEffect(() => {
        // declare the data fetching function
        const fetchGeoLocation = async () => {
            const response = await fetch(`/api/geo-locate`);
            const geoData = await response.json();

            setGeoLocationData(geoData);
        };

        fetchGeoLocation().catch(console.error);
    }, []);

    const { code } = useShop();

    const { countryCode, country } = geoLocationData;

    if (!countryCode) return null;

    const intendedRegion = getIntendedRegion(countryCode);
    const intendedRegionTitle = getIntendedRegionTitle(intendedRegion);
    const intendedRegionLink = getTargetPathForAlternateRegion(
        intendedRegion,
        asPath.split('?')[0]
    );
    const shouldSwitch = code.toUpperCase() !== intendedRegion;

    if (!showPrompt || !shouldSwitch) return null;

    const hidePrompt = () => {
        setRegionPromptHidden(true);
        setShowPrompt(false);
    };

    const switchButtonStyles = css.resolve`
        button.button {
            background-color: rgb(255, 255, 255);
            color: rgb(0, 0, 0);
            font-size: 0.9rem;
            margin: 0 5px;
            align-items: center;
            padding: 16px 35px;
        }
        @media (min-width: ${breakpointMedium}) {
            button.button {
                // height: 50px;
            }
        }
    `;

    const continueButtonStyles = css.resolve`
        button.button {
            border: 1px solid rgb(255, 255, 255);
            font-size: 0.9rem;
            margin: 0 5px;
            align-items: center;
            padding: 16px 35px;
        }
        @media (min-width: ${breakpointMedium}) {
            button.button {
                // height: 50px;
            }
        }
    `;

    return (
        <section>
            <div className="column">
                <div className="hiddenOnMobile geoPinContainer">
                    <img
                        src={GeoPin.src}
                        className="geoPinIcon"
                        alt="geoPinIcon"
                    />
                </div>
                <div className="">
                    <u>Delivery to {country}?</u>
                    <br />
                    You're currently viewing our {code.toUpperCase()} store,
                    would you prefer to shop on our {intendedRegionTitle[0]}{' '}
                    site?
                </div>
            </div>
            <div className="column last">
                <div className="buttonWrapper">
                    <a href={intendedRegionLink}>
                        <Button
                            className={switchButtonStyles.className}
                            text={`SHOP ${intendedRegionTitle[1]} STORE`}
                        />
                    </a>
                </div>
                <div className="buttonWrapper hidePromptButton">
                    <Button
                        className={continueButtonStyles.className}
                        onClick={hidePrompt}
                        text="CONTINUE SHOPPING"
                    />
                </div>
            </div>
            <div className="hidePrompt">
                <button
                    className="hidePromptButton"
                    onClick={hidePrompt}
                    type="button"
                >
                    <img
                        src={CloseIcon.src}
                        className="closeIcon"
                        alt="CloseIcon"
                    />
                </button>
            </div>
            {switchButtonStyles.styles}
            {continueButtonStyles.styles}
            <style jsx>
                {`
                    section {
                        background-color: rgb(0, 0, 0);
                        color: rgb(255, 255, 255);
                        display: flex;
                        font-size: 1.4em;
                        font-weight: 500;
                        padding: 22px 30px 25px 30px;
                    }
                    .buttonWrapper:first-child {
                        margin-right: 15px;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        section {
                            flex-direction: column;
                            font-size: 1.2em;
                            position: absolute;
                            z-index: 100;
                            //width: 100%;
                        }
                        .hidePrompt {
                            position: absolute;
                            top: 30px;
                            right: 25px;
                        }
                        section .column:first-child {
                            margin-bottom: 22px;
                            padding-right: 30px;
                            justify-content: left;
                        }
                        section .column {
                            padding-right: 0px;
                            justify-content: center;
                        }
                        .buttonWrapper:first-child {
                            margin-right: 0;
                        }
                    }
                    .column {
                        display: flex;
                        padding-right: 30px;
                        align-items: center;
                    }
                    .column a {
                        text-decoration: none;
                    }
                    .column:first-child {
                        flex: 6;
                    }
                    .column.last {
                        justify-content: flex-end;
                    }
                    .column {
                        flex: 4;
                    }
                    .hidePromptButton {
                        background: none;
                        border: none;
                    }
                    .hidePrompt {
                        display: flex;
                        align-items: center;
                    }
                    .geoPinContainer {
                        display: flex;
                        align-items: center;
                        margin: 5px 20px 0 0;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .column.last {
                            flex-direction: column;
                        }
                        .hidePromptButton {
                            padding-top: 8px;
                        }
                        .hiddenOnMobile {
                            display: none;
                        }
                    }
                    @media (min-width: ${breakpointMedium}) {
                        .hiddenOnMobile {
                            display: initial;
                        }
                    }
                `}
            </style>
        </section>
    );
};

export default SwitchRegionPrompt;
