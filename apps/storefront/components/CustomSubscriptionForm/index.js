import React, { useContext, useRef, useState } from 'react';
import { brandWhite } from 'config/styles/colours';
import { breakpointMedium } from 'config/styles/breakpoints';
import { useShop } from '@lib/providers/ShopProvider';

const CustomSubscriptionForm = () => {
    const { code } = useShop();
    const [message, setMessage] = useState(null);
    const emailInput = useRef(null);
    const nameInput = useRef(null);
    const cityInput = useRef(null);
    const dateInput = useRef(null);
    const [groupSize, setGroupSize] = useState('20');

    const onSubmit = async event => {
        event.preventDefault();
        const emailAddress = emailInput.current.value;
        const name = nameInput.current.value;
        const city = cityInput.current.value;
        const date = dateInput.current.value;
        const groupSizeValue = groupSize;

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SITE_URL}/api/services/custom-subscribe`,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `emailAddress=${emailAddress}&name=${name}&city=${city}&date=${date}&size=${groupSizeValue}&region=${code}`,
            }
        );

        const responseObject = await response.json();
        setMessage(responseObject.message);
    };

    return (
        <section>
            <form onSubmit={onSubmit}>
                <div className="form">
                    <div className="newsletter_signup__input">
                        <input
                            type="name"
                            id="name"
                            className="newsletter_signup__inputbox"
                            placeholder="Your name*"
                            ref={nameInput}
                            required
                        />
                    </div>
                    <div className="newsletter_signup__input">
                        <input
                            type="email"
                            id="email"
                            className="newsletter_signup__inputbox"
                            placeholder="Enter your email address*"
                            ref={emailInput}
                            required
                        />
                    </div>
                    <div className="row">
                        <div className="column">
                            <div className="newsletter_signup__input">
                                <input
                                    type="name"
                                    id="city"
                                    className="newsletter_signup__inputbox"
                                    placeholder="City*"
                                    ref={cityInput}
                                    required
                                />
                            </div>
                            <div className="newsletter_signup__input">
                                <input
                                    type="name"
                                    id="date"
                                    className="newsletter_signup__inputbox"
                                    placeholder="When do you need your kit by?*"
                                    ref={dateInput}
                                    required
                                />
                            </div>
                        </div>
                        <div className="column">
                            <div className="newsletter_signup__input">
                                <div className="newsletter_signup__checkbox newsletter_signup__inputbox">
                                    <div className="newsletter_signup__groupsize">
                                        <span>Group Size*</span>
                                    </div>
                                    <div className="newsletter_signup__checkoutInputLabel">
                                        <div className="checkbox_group">
                                            <input
                                                type="checkbox"
                                                name="30+"
                                                value="30"
                                                onChange={() =>
                                                    setGroupSize('30')
                                                }
                                                checked={groupSize === '30'}
                                            />
                                            <label htmlFor="30+"> 30+</label>
                                        </div>
                                        <div className="checkbox_group">
                                            <input
                                                type="checkbox"
                                                name="50+"
                                                value="50"
                                                onChange={() =>
                                                    setGroupSize('50')
                                                }
                                                checked={groupSize === '50'}
                                            />
                                            <label htmlFor="50+"> 50+</label>
                                        </div>
                                        <div className="checkbox_group">
                                            <input
                                                type="checkbox"
                                                name="100+"
                                                id="100+"
                                                value="100"
                                                onChange={() =>
                                                    setGroupSize('100')
                                                }
                                                checked={groupSize === '100'}
                                            />
                                            <label htmlFor="100+"> 100+</label>
                                        </div>
                                        <div className="checkbox_group">
                                            <input
                                                type="checkbox"
                                                name="other"
                                                value="other"
                                                onChange={() =>
                                                    setGroupSize('other')
                                                }
                                                checked={groupSize === 'other'}
                                            />
                                            <label htmlFor="other">
                                                {' '}
                                                Other
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="newsletter_signup__input">
                        <button
                            type="button"
                            className="newsletter_signup__button"
                        >
                            SEND
                        </button>
                    </div>
                </div>
            </form>

            {message && <div className="message">{message}</div>}
            <style jsx>
                {`
                    section {
                        width: 100%;
                    }
                    .newsletter_signup__text {
                        padding-bottom: 15px;
                    }
                    .newsletter_signup__input {
                        display: flex;
                        padding: 10px;
                    }
                    .newsletter_signup__inputbox {
                        display: flex;
                        flex: 1;
                        flex-direction: row;
                        border: 1px solid ${brandWhite};
                        background: none;
                        border-radius: 50px;
                        width: 100%;
                        padding: 15px 30px;
                        color: ${brandWhite};
                    }
                    .newsletter_signup__groupsize {
                        padding-bottom: 5px;
                    }
                    .checkbox_group {
                        flex: 1 0 33%;
                        margin-bottom: 5px;
                    }
                    .newsletter_signup__inputbox::placeholder {
                        color: ${brandWhite};
                    }
                    .newsletter_signup__inputbox:focus {
                        outline: 0;
                    }
                    .newsletter_signup__checkbox {
                        border-radius: 25px;
                        display: flex;
                        flex-direction: column;
                        padding: 20px 30px;
                    }
                    input[type='checkbox'] {
                        -webkit-appearance: none;
                        -moz-appearance: none;
                        appearance: none;

                        /* Styling checkbox */
                        width: 10px;
                        height: 10px;
                        border: 1px solid white;
                        margin: 0;
                        cursor: pointer;
                    }
                    input[type='checkbox']:checked {
                        background-color: rgb(333, 333, 333);
                    }
                    input:-webkit-autofill,
                    input:-webkit-autofill:hover,
                    input:-webkit-autofill:focus,
                    input:-webkit-autofill:active {
                        background: none;
                        background-color: initial;
                    }
                    input:focus {
                        outline: none;
                    }
                    .newsletter_signup__checkoutInputLabel {
                        flex-wrap: wrap;
                        display: flex;
                        justify-content: flex-start;
                    }
                    .newsletter_signup__checkoutInputLabel label {
                        padding-left: 2px;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .newsletter_signup__checkbox {
                            padding: 15px 30px;
                        }
                        .newsletter_signup__checkoutInputLabel label {
                            padding-right: 20px;
                        }
                    }
                    .newsletter_signup__button {
                        border: 1px solid ${brandWhite};
                        background: none;
                        border-radius: 50px;
                        padding: 15px 30px;
                        width: 100%;
                        color: ${brandWhite};
                        cursor: pointer;
                    }
                    .newsletter_signup__icon {
                        padding: 10px 13px 8px 10px;
                        cursor: pointer;
                    }
                    .message {
                        font-weight: 400;
                        padding: 15px 5px;
                        text-align: left;
                    }
                    .row {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        width: 100%;
                    }
                    .column {
                        display: flex;
                        flex-direction: column;
                        flex-basis: 100%;
                    }
                    @media screen and (min-width: 800px) {
                        .column {
                            flex: 1;
                        }
                    }
                    @media screen and (max-width: 800px) {
                        .newsletter_signup__button {
                            margin-top: 20px;
                        }
                    }
                `}
            </style>
        </section>
    );
};

export default CustomSubscriptionForm;
