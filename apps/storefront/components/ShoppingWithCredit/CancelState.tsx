// @ts-nocheck
import React, { FC } from 'react';
import Button from 'components/Button';
import css from 'styled-jsx/css';
import { breakpointMedium } from 'config/styles/breakpoints';
import { useLoop } from '@lib/providers/LoopProvider';

type CancelStateProps = {
    openDefaultState: () => void;
};

const CancelState: FC<CancelStateProps> = ({ openDefaultState }) => {
    const { clearLoopFlow } = useLoop();

    const primaryButtonStyles = css.resolve`
        button.button {
            background-color: rgb(247, 247, 247);
            color: rgb(0, 0, 0);
            font-size: 0.8rem;
            margin: 0 74px 0 0;
            align-items: center;
            padding: 0;
            border: none;
        }
        button.button:hover {
            text-decoration: underline;
        }
        @media (max-width: ${breakpointMedium}) {
            button.button {
                width: 100%;
            }
        }
    `;

    const secondaryButtonStyles = css.resolve`
        button.button {
            background-color: rgb(247, 247, 247);
            color: rgb(0, 0, 0);
            font-size: 0.8rem;
            border: none;
            margin: 0 30px 0 0px;
            align-items: center;
            padding: 0;
        }
        button.button:hover {
            text-decoration: underline;
        }
        @media (max-width: ${breakpointMedium}) {
            button.button {
                margin-bottom: 15px;
            }
        }
    `;

    return (
        <section data-click="loop-cancel-state-banner">
            <div className="column">
                <div className="heading">
                    Are you sure you want to return to normal shopping?
                </div>
                <div className="bodyText">
                    If you cancel, you can restart your exchange process anytime
                    via the returns portal.
                </div>
            </div>
            <div className="buttonWrapper desktopOnly">
                <Button
                    className={primaryButtonStyles.className}
                    text="NO"
                    alt="Continue exchange with credit"
                    onClick={openDefaultState}
                    disabled={false}
                    wide={false}
                />
                <Button
                    className={secondaryButtonStyles.className}
                    text="YES"
                    alt="Return to normal shopping"
                    onClick={clearLoopFlow}
                    disabled={false}
                    wide={false}
                />
            </div>
            <div className="mobileOnly">
                <div onClick={openDefaultState} className="noExchange">
                    No
                </div>
                <div onClick={clearLoopFlow} className="yesReturn">
                    Yes
                </div>
            </div>
            {primaryButtonStyles.styles}
            {secondaryButtonStyles.styles}
            <style jsx>
                {`
                    section {
                        background-color: rgb(247, 247, 247);
                        color: rgb(0, 0, 0);
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        padding: 15px 60px 17px 22px;
                        position: sticky;
                        top: 0;
                        border-left: 6px solid rgb(206, 252, 81);
                    }
                    .heading {
                        font-size: 1.25em;
                        font-weight: 600;
                        padding-bottom: 5px;
                    }
                    .bodyText {
                        font-size: 1em;
                        font-weight: 300;
                    }
                    .buttonWrapper {
                        display: flex;
                    }
                    .buttonWrapper:first-child {
                        margin-right: 15px;
                    }
                    .column {
                        display: flex;
                        padding-right: 30px;
                        flex-direction: column;
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
                    .desktopOnly {
                        display: flex;
                    }
                    .mobileOnly {
                        display: none;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        section {
                            flex-direction: column;
                            align-items: flex-start;
                            padding: 20px 60px 25px 20px;
                        }
                        .heading {
                            font-size: 0.875em;
                        }
                        .bodyText {
                            font-size: 0.75em;
                            padding: 0;
                        }
                        .column {
                            padding-right: 0;
                            margin-bottom: 10px;
                        }
                        .desktopOnly {
                            display: none;
                        }
                        .mobileOnly {
                            display: flex;
                            flex-direction: row;
                            text-transform: uppercase;
                            font-size: 0.75em;
                            font-weight: 400;
                        }
                        .noExchange:hover {
                            text-decoration: underline;
                            text-underline-position: under;
                        }
                        .yesReturn:hover {
                            text-decoration: underline;
                            text-underline-position: under;
                        }
                        .noExchange {
                            padding-right: 15px;
                        }
                    }
                `}
            </style>
        </section>
    );
};

export default CancelState;
