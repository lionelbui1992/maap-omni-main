// @ts-nocheck
import React, { FC } from 'react';
import Button from 'components/Button';
import css from 'styled-jsx/css';
import { breakpointMedium } from 'config/styles/breakpoints';
import { useLoop } from '@lib/providers/LoopProvider';

type DefaultStateProps = {
    openCancelState: () => void;
};

const DefaultState: FC<DefaultStateProps> = ({ openCancelState }) => {
    const {
        creditShoppingActive,
        loopInputParams,
        clearLoopFlow,
        loopCreditTotal,
        currencySymbol,
    } = useLoop();

    const cancelButtonStyles = css.resolve`
        button.button {
            background-color: rgb(247, 247, 247);
            color: rgb(0, 0, 0);
            font-size: 0.9rem;
            border: none;
            text-decoration: underline;
            margin: 0 5px;
            align-items: center;
            padding: 0;
        }
        @media (min-width: ${breakpointMedium}) {
            button.button {
                // height: 50px;
            }
        }
    `;

    const handleOnCancel = () => {
        clearLoopFlow();
    };

    return (
        <section data-click="loop-default-banner">
            <div className="column">
                <div className="heading">Shopping with credit</div>
                <div className="bodyText">
                    You have {currencySymbol}
                    {loopCreditTotal} exchange credit, Simply add product(s) to
                    cart to start your exchange.
                </div>
            </div>
            <div>
                <div className="buttonWrapper desktopOnly">
                    <Button
                        className={cancelButtonStyles.className}
                        text="Cancel Exchange"
                        onClick={openCancelState}
                        alt="Cancel Exchange."
                        disabled={false}
                        wide={false}
                    />
                </div>
                <div className="mobileOnly">
                    <div onClick={openCancelState} data-click="cancel-exchange">
                        CANCEL EXCHANGE
                    </div>
                </div>
            </div>
            {cancelButtonStyles.styles}
            <style jsx>
                {`
                    section {
                        background-color: rgb(247, 247, 247);
                        color: rgb(0, 0, 0);
                        display: flex;
                        align-items: center;
                        padding: 15px 60px 17px 22px;
                        border-left: 6px solid rgb(206, 252, 81);
                        position: sticky;
                        top: 0;
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
                    .buttonWrapper:first-child {
                        margin-right: 15px;
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
                        }
                        section .column:first-child {
                            margin-bottom: 10px;
                            padding-right: 30px;
                            justify-content: left;
                        }
                        section .column {
                            padding-right: 0;
                            justify-content: center;
                        }
                        .desktopOnly {
                            display: none;
                        }
                        .mobileOnly {
                            display: flex;
                            flex-direction: row;
                            text-decoration: underline;
                            text-underline-position: under;
                            font-size: 0.75em;
                            font-weight: 400;
                        }
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
                `}
            </style>
        </section>
    );
};

export default DefaultState;
