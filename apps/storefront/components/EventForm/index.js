import React, { useRef, useState } from 'react';
import {
    brandWhite,
    brandNavy,
    brandBlack,
    brandDarkGrey,
} from 'config/styles/colours';
import Link from 'next/link';
import { breakpointMedium, breakpointSmall } from 'config/styles/breakpoints';

const EventForm = ({ event }) => {
    const [complete, setComplete] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null);
    const regionSelect = useRef(null);
    const emailInput = useRef(null);
    const firstNameInput = useRef(null);
    const lastNameInput = useRef(null);
    const phoneInput = useRef(null);
    const emailOptInInput = useRef(null);
    const smsOptInInput = useRef(null);

    const onSubmit = async () => {
        const regionSelected = regionSelect.current.value;
        const emailAddress = emailInput.current.value;
        const firstName = firstNameInput.current.value;
        const lastName = lastNameInput.current.value;
        const phoneNumber = phoneInput.current.value;
        const emailOptIn = emailOptInInput.current.checked;
        const smsOptIn = smsOptInInput.current.checked;
        const tagInput = regionSelected === 'INTL' ? 'TAMELB22' : 'TASF22';

        if (message) setMessage(null);
        if (
            !emailAddress ||
            !firstName ||
            !lastName ||
            !regionSelected ||
            !phoneNumber
        ) {
            setMessage('Please enter your contact details and Region');
        } else if (emailAddress.indexOf('+') !== -1) {
            setMessage(
                'Please enter a valid email address with no + character'
            );
        } else {
            setSubmitting(true);

            const response = await fetch(
                `/api/services/event-signup/${event}`,
                {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `email=${encodeURIComponent(
                        emailAddress
                    )}&first_name=${firstName}&last_name=${lastName}&phoneNumber=${phoneNumber}&email_promo=${emailOptIn}&sms_promo=${smsOptIn}&region=${regionSelected}&tag=${tagInput}`,
                }
            );

            const responseObject = await response.json();

            // const code = responseObject?.discountCode;
            const message = responseObject?.message;

            setSubmitting(false);
            setComplete(true);

            if (message) {
                setMessage(message);
            } else {
                setMessage(
                    'Could not sign up to the event. Please try again later or get in touch.'
                );
            }
        }
    };

    return (
        <>
            {complete ? (
                <section>
                    <h2>{message}</h2>
                </section>
            ) : (
                <section>
                    <div className="form">
                        <div className="event__input">
                            <select
                                id="regionSelect"
                                className="event__inputbox"
                                placeholder="Select Event*"
                                ref={regionSelect}
                                required
                            >
                                <option label="Event Region*" />
                                <option value="INTL" label="Melbourne" />
                                <option value="US" label="San Francisco" />
                            </select>
                        </div>
                        <div className="event__input">
                            <input
                                type="name"
                                id="firstname"
                                className="event__inputbox"
                                placeholder="First Name*"
                                ref={firstNameInput}
                                required
                            />
                        </div>
                        <div className="event__input">
                            <input
                                type="name"
                                id="lastname"
                                className="event__inputbox"
                                placeholder="Last Name*"
                                ref={lastNameInput}
                                required
                            />
                        </div>
                        <div className="event__input">
                            <input
                                type="email"
                                id="email"
                                className="event__inputbox"
                                placeholder="Enter your email address*"
                                ref={emailInput}
                                required
                            />
                        </div>
                        <div className="event__input">
                            <input
                                type="phone"
                                id="phone"
                                className="event__inputbox"
                                placeholder="Enter your phone number*"
                                ref={phoneInput}
                                required
                            />
                        </div>
                        <div className="event__input">
                            <span>*Required fields</span>
                        </div>
                        <div className="event__input">
                            <input
                                type="checkbox"
                                name="agree"
                                id="agree"
                                ref={emailOptInInput}
                            />
                            <label htmlFor="agree" className="declare_label">
                                I agree to subscribe to MAAP’s email newsletter,
                                where I’ll be the first to know about new
                                products, group rides and all things MAAP.
                            </label>
                        </div>
                        <div className="event__input">
                            <input
                                type="checkbox"
                                name="agree"
                                id="sms_opt_in"
                                ref={smsOptInInput}
                            />
                            <label
                                htmlFor="sms_opt_in"
                                className="sms_opt_in_label"
                            >
                                I agree to receive SMS updates.
                            </label>
                        </div>
                        <div className="event__input">
                            <button
                                disabled={submitting}
                                className="event__button"
                                type="submit"
                                onClick={() => onSubmit()}
                            >
                                {submitting ? (
                                    <div className="loader"></div>
                                ) : (
                                    'Join Us'
                                )}
                            </button>
                        </div>
                        <div className="event__input">
                            <span>
                                By entering your details you agree to MAAP's{' '}
                                <Link
                                    href="/pages/terms-and-conditions"
                                    legacyBehavior
                                >
                                    <a>Terms & Conditions</a>
                                </Link>{' '}
                                and{' '}
                                <Link
                                    href="/pages/privacy-policy"
                                    legacyBehavior
                                >
                                    <a>Privacy Policy</a>
                                </Link>
                            </span>
                        </div>
                    </div>
                    {message && <div className="message">{message}</div>}
                </section>
            )}
            <style jsx>
                {`
                    .loader {
                        border: 2px solid darkGrey;
                        border-radius: 50%;
                        border-top: 2px solid white;
                        width: 12px;
                        height: 12px;
                        -webkit-animation: spin 2s linear infinite; /* Safari */
                        animation: spin 2s linear infinite;
                    }

                    /* Safari */
                    @-webkit-keyframes spin {
                        0% {
                            -webkit-transform: rotate(0deg);
                        }
                        100% {
                            -webkit-transform: rotate(360deg);
                        }
                    }

                    @keyframes spin {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }
                    section {
                        width: 410px;
                        background-color: ${brandWhite};
                    }
                    section h1 {
                        font-size: 30px;
                        text-transform: uppercase;
                        font-family: MonumentExtended-Regular, sans-serif;
                        text-align: center;
                        line-height: 1em;
                    }
                    section h2 {
                        font-size: 26px;
                        text-transform: uppercase;
                        font-family: MonumentExtended-Regular, sans-serif;
                        text-align: center;
                        line-height: 1.2em;
                    }
                    section p {
                        font-size: 13px;
                        line-height: 1.5em;
                        text-align: center;
                    }
                    section .discount_code {
                        font-size: 2em;
                        font-weight: 600;
                        font-family: MonumentExtended-Regular, sans-serif;
                    }
                    section p a {
                        color: black;
                        text-decoration: underline;
                    }
                    .event__input {
                        display: flex;
                        padding: 7px 10px;
                        width: 100%;
                        text-align: left;
                    }
                    .event__inputbox,
                    .event__dropdown {
                        display: flex;
                        flex: 1;
                        border: 1px solid ${brandNavy};
                        background: none;
                        border-radius: 50px;
                        width: 100%;
                        padding: 12px 30px;
                        color: ${brandNavy};
                    }
                    select {
                        /* styling */
                        background-color: white;
                        border: thin solid blue;
                        border-radius: 4px;
                        display: inline-block;

                        /* reset */
                        margin: 0;
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                        -webkit-appearance: none;
                        -moz-appearance: none;
                    }
                    select.minimal {
                        background-image: linear-gradient(
                                45deg,
                                transparent 50%,
                                gray 50%
                            ),
                            linear-gradient(135deg, gray 50%, transparent 50%),
                            linear-gradient(to right, #ccc, #ccc);
                        background-position: calc(100% - 20px) calc(1em + 4px),
                            calc(100% - 15px) calc(1em + 4px),
                            calc(100% - 2.5em) 0.8em;
                        background-size: 5px 5px, 5px 5px, 1px 1.4em;
                        background-repeat: no-repeat;
                    }
                    select.minimal:focus {
                        background-image: linear-gradient(
                                45deg,
                                green 50%,
                                transparent 50%
                            ),
                            linear-gradient(135deg, transparent 50%, green 50%),
                            linear-gradient(to right, #ccc, #ccc);
                        background-position: calc(100% - 15px) 1em,
                            calc(100% - 20px) 1em, calc(100% - 2.5em) 0.8em;
                        background-size: 5px 5px, 5px 5px, 1px 1.4em;
                        background-repeat: no-repeat;
                        border: 1px solid ${brandNavy};
                        outline: 0;
                    }

                    .event__inputbox::placeholder {
                        color: ${brandNavy};
                    }
                    .event__inputbox:focus {
                        outline: 0;
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
                    .event__button {
                        background-color: ${brandBlack};
                        border-radius: 50px;
                        padding: 14px 30px;
                        width: 100%;
                        color: ${brandWhite};
                        cursor: pointer;
                        border: none;
                        display: flex;
                        justify-content: center;
                    }
                    .message {
                        font-size: 1.1em;
                        font-weight: 400;
                        padding: 15px 10px 20px;
                        text-align: left;
                    }
                    .event__additional {
                        color: ${brandDarkGrey};
                        font-size: 11px;
                        text-align: left;
                    }
                    .event__additional a {
                        color: ${brandDarkGrey};
                    }
                    .event__additional_ending {
                        padding-top: 0 !important;
                        margin-top: 0 !important;
                    }
                    .declare_label {
                        padding-left: 7px;
                    }
                    @media only screen and (max-width: ${breakpointMedium}) {
                        .event__input {
                            padding: 5px 0;
                        }
                        .event__inputbox,
                        .event__dropdown,
                        .event__button {
                            padding: 15px 30px;
                        }
                        select.minimal {
                            background-image: linear-gradient(
                                    45deg,
                                    transparent 50%,
                                    gray 50%
                                ),
                                linear-gradient(
                                    135deg,
                                    gray 50%,
                                    transparent 50%
                                ),
                                linear-gradient(to right, #ccc, #ccc);
                            background-position: calc(100% - 20px)
                                    calc(1em + 8px),
                                calc(100% - 15px) calc(1em + 8px),
                                calc(100% - 2.5em) 0.8em;
                            background-size: 5px 5px, 5px 5px, 1px 1.9em;
                            background-repeat: no-repeat;
                        }
                        select.minimal:focus {
                            background-image: linear-gradient(
                                    45deg,
                                    green 50%,
                                    transparent 50%
                                ),
                                linear-gradient(
                                    135deg,
                                    transparent 50%,
                                    green 50%
                                ),
                                linear-gradient(to right, #ccc, #ccc);
                            background-position: calc(100% - 15px) 1em,
                                calc(100% - 20px) 1em, calc(100% - 2.5em) 0.8em;
                            background-size: 5px 5px, 5px 5px, 1px 1.9em;
                            background-repeat: no-repeat;
                            border: 1px solid ${brandNavy};
                            outline: 0;
                        }
                    }
                    @media only screen and (max-width: ${breakpointSmall}) {
                        section {
                            width: 330px;
                        }
                        section h1 {
                            font-size: 22px;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default EventForm;
