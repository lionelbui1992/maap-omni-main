import React, { useState } from 'react';
import PropTypes from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import { breakpointMedium } from 'config/styles/breakpoints';

const TemperatureInfo = ({ block }) => {
    const [isCentigrade, setIsCentigrade] = useState(true);

    let lowEnd = -10;
    let highEnd = 40;
    let low = block.temperature_low_in_c || lowEnd;
    let high = block.temperature_high_in_c || highEnd;
    if (!isCentigrade) {
        lowEnd = 10;
        highEnd = 110;
        low = block.temperature_low_in_f || lowEnd;
        high = block.temperature_high_in_f || highEnd;
    }
    const marginLeft = (100 * (low - lowEnd)) / (highEnd - lowEnd);
    const marginRight = (100 * (highEnd - high)) / (highEnd - lowEnd);

    const conditions = pathOr(
        '',
        ['riding_condition_values', 0, 'text'],
        block
    ).toLowerCase();

    return (
        <>
            <div className="temperature_info__container">
                <div className="temperature_info__toggle_container">
                    <div>
                        <h3>TEMPERATURE RANGE</h3>
                        <p>
                            {pathOr(
                                '',
                                ['temperature_range_description', 0, 'text'],
                                block
                            )}
                        </p>
                    </div>
                    <div className="temperature_info__toggle_container">
                        <button
                            className={
                                isCentigrade
                                    ? 'temperature_info__button_selected'
                                    : 'temperature_info__button'
                            }
                            onClick={() => setIsCentigrade(true)}
                        >
                            ºC
                        </button>
                        <button
                            className={
                                !isCentigrade
                                    ? 'temperature_info__button_selected'
                                    : 'temperature_info__button'
                            }
                            onClick={() => setIsCentigrade(false)}
                        >
                            ºF
                        </button>
                    </div>
                </div>

                <div className="temperature_info__progress_container">
                    <div className="temperature_info__progress" />
                </div>
                {isCentigrade ? (
                    <div className="temperature_info__progress_marks">
                        <div>{'<-10ºC'}</div>
                        <div>0ºC</div>
                        <div>10ºC</div>
                        <div>20ºC</div>
                        <div>30ºC</div>
                        <div>{'>40ºC'}</div>
                    </div>
                ) : (
                    <div className="temperature_info__progress_marks">
                        <div>{'<10ºF'}</div>
                        <div>30ºF</div>
                        <div>50ºF</div>
                        <div>70ºF</div>
                        <div>90ºF</div>
                        <div>{'>110ºF'}</div>
                    </div>
                )}

                <h3>RIDING CONDITIONS</h3>
                <p>
                    {pathOr(
                        '',
                        ['riding_conditions_description', 0, 'text'],
                        block
                    )}
                </p>
                <div className="temperature_info__conditions">
                    <div className="temperature_info__condition_bar_container">
                        <div
                            className={
                                conditions.includes('cold')
                                    ? 'temperature_info__condition_bar_selected'
                                    : 'temperature_info__condition_bar'
                            }
                        />
                        <div className="temperature_info__condition_bar_text">
                            COLD
                        </div>
                    </div>
                    <div className="temperature_info__condition_bar_container">
                        <div
                            className={
                                conditions.includes('rain')
                                    ? 'temperature_info__condition_bar_selected'
                                    : 'temperature_info__condition_bar'
                            }
                        />
                        <div className="temperature_info__condition_bar_text">
                            RAIN
                        </div>
                    </div>
                    <div className="temperature_info__condition_bar_container">
                        <div
                            className={
                                conditions.includes('wind')
                                    ? 'temperature_info__condition_bar_selected'
                                    : 'temperature_info__condition_bar'
                            }
                        />
                        <div className="temperature_info__condition_bar_text">
                            WIND
                        </div>
                    </div>
                    <div className="temperature_info__condition_bar_container">
                        <div
                            className={
                                conditions.includes('hot')
                                    ? 'temperature_info__condition_bar_selected'
                                    : 'temperature_info__condition_bar'
                            }
                        />
                        <div className="temperature_info__condition_bar_text">
                            HOT
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    @media (min-width: ${breakpointMedium}) {
                        .temperature_info__container {
                            padding: 0;
                        }
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .temperature_info__container {
                            padding: 0 0 40px 0;
                        }
                    }
                    .temperature_info__content {
                        display: flex;
                        flex-wrap: wrap;
                    }
                    .temperature_info__column {
                        width: 100%;
                    }
                    .temperature_info__bullet {
                        display: flex;
                        flex-direction: row;
                    }
                    img {
                        margin-top: 2px;
                        margin-right: 15px;
                        width: 35px;
                        height: 35px;
                    }
                    .temperature_info__progress {
                        height: 8px;
                        margin-left: ${marginLeft}%;
                        margin-right: ${marginRight}%;
                        background: linear-gradient(
                            90deg,
                            #f7f7f7,
                            #000000,
                            #f7f7f7
                        );
                    }
                    .temperature_info__progress_container {
                        width: 100%;
                        background-color: #ffffff;
                    }
                    .temperature_info__progress_marks {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        margin: 10px 0;
                    }
                    .temperature_info__conditions {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                    }
                    .temperature_info__condition_bar_container {
                        width: 24.5%;
                    }
                    .temperature_info__condition_bar {
                        background-color: #ffffff;
                        height: 8px;
                    }
                    .temperature_info__condition_bar_selected {
                        background-color: #000000;
                        height: 8px;
                    }
                    .temperature_info__condition_bar_text {
                        margin: 10px 0;
                        text-align: center;
                    }
                    .temperature_info__button {
                        border: none;
                        outline: none;
                        background-color: transparent;
                        color: #000000;
                        cursor: pointer;
                    }
                    .temperature_info__button_selected {
                        border: none;
                        outline: none;
                        font-weight: 800;
                        background-color: transparent;
                        color: #000000;
                        cursor: pointer;
                    }
                    .temperature_info__toggle_container {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                    }
                    h3 {
                        font-weight: 500;
                        font-size: 1em;
                    }
                    p {
                        font-size: 1em;
                        margin: 6px 0;
                    }
                `}
            </style>
        </>
    );
};

TemperatureInfo.propTypes = {
    block: PropTypes.object.isRequired,
};

export default TemperatureInfo;
