import React, { useRef, useState } from 'react';
import {
    brandWhite,
    brandNavy,
    brandBlack,
    brandDarkGrey,
} from 'config/styles/colours';
import Link from 'next/link';
import { breakpointMedium, breakpointSmall } from 'config/styles/breakpoints';

const ChallengeCompleteForm = ({ tag }) => {
    const [selectedRegion, setSelectedRegion] = useState('intl');
    const [complete, setComplete] = useState(false);
    const [redeemed, setRedeemed] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [discountCode, setDiscountCode] = useState('');
    const [message, setMessage] = useState(null);
    const emailInput = useRef(null);
    const firstNameInput = useRef(null);
    const lastNameInput = useRef(null);
    const regionInput = useRef(null);
    const genderInput = useRef(null);
    const agreeInput = useRef(null);
    const declareInput = useRef(null);

    const onSubmit = async () => {
        const emailAddress = emailInput.current.value;
        const firstName = firstNameInput.current.value;
        const lastName = lastNameInput.current.value;
        const region = regionInput.current.value;
        const gender = genderInput.current.value;
        const agree = agreeInput.current.checked;
        const declare = declareInput.current.checked;

        setSelectedRegion(region);

        if (message) setMessage(null);
        if (!emailAddress || !firstName || !lastName || !region || !gender) {
            setMessage(
                'Please enter your contact details, Gender and Preferred Shopping Region'
            );
        } else if (!declare) {
            setMessage('Please accept our terms & conditions to redeem');
        } else if (emailAddress.indexOf('+') !== -1) {
            setMessage(
                'Please enter a valid email address with no + character'
            );
        } else {
            setSubmitting(true);

            const response = await fetch(
                `/api/services/challenge-complete-old`,
                {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `email=${encodeURIComponent(
                        emailAddress
                    )}&first_name=${firstName}&last_name=${lastName}&region=${region}&gender=${gender}&email_promo=${agree}&declare=${declare}&tag=${tag}`,
                }
            );

            const responseObject = await response.json();

            const status = responseObject?.status;

            if (status === 'redeemed') {
                setRedeemed(true);
            }

            const code = responseObject?.discountCode;
            const message = responseObject?.message;

            setSubmitting(false);
            if (code) {
                setDiscountCode(code);
                setComplete(true);
            } else if (message) {
                setMessage(message);
            } else {
                setMessage(
                    'Can not redeem your reward. Please try again later.'
                );
            }
        }
    };

    const getPlaceholderValues = (region) => {
        switch (region.toUpperCase()) {
            case 'US':
                return {
                    value: '$60 USD',
                    website: 'http://maap.cc/us',
                    minimum_spend_gross: '$200 USD',
                    minimum_spend_net: ' $140 USD',
                };
            case 'EU':
                return {
                    value: '€50 EUR',
                    website: 'http://maap.cc/eu',
                    minimum_spend_gross: '€165 EUR',
                    minimum_spend_net: ' €115 EUR',
                };
            case 'UK':
                return {
                    value: '£45 GBP',
                    website: 'http://maap.cc/uk',
                    minimum_spend_gross: '£140 GBP',
                    minimum_spend_net: ' £95 GBP',
                };
            case 'INTL':
            default:
                return {
                    value: '$75 AUD',
                    website: 'http://maap.cc',
                    minimum_spend_gross: '$250 AUD',
                    minimum_spend_net: ' $175 AUD',
                };
        }
    };

    const { value, website, minimum_spend_gross, minimum_spend_net } =
        getPlaceholderValues(selectedRegion);

    if (redeemed) {
        return (
            <section>
                <h2>{message}</h2>
                <style jsx>
                    {`
                        section {
                            width: 410px;
                            background-color: ${brandWhite};
                        }
                        section h2 {
                            font-size: 26px;
                            text-transform: uppercase;
                            font-family: MonumentExtended-Regular, sans-serif;
                            text-align: center;
                            line-height: 1.2em;
                        }
                    `}
                </style>
            </section>
        );
    }

    return (
        <>
            {complete ? (
                <section>
                    <h1>YOU’VE TRANSCENDED!</h1>

                    <p>
                        By transcending your limits, you've earnt a {value}*
                        reward! Simply enter your details to redeem your reward
                        and you'll automatically go into the draw to win a
                        ‘Year’s Worth of MAAP Kit’ - valued at up to $5000 AUD.
                    </p>

                    <p className="discount_code">{discountCode}</p>

                    <p>Simply apply the code above at checkout.</p>

                    <p>
                        Don't worry if you don't find the perfect item today.
                        We've also emailed your code to you for future
                        reference.
                    </p>

                    <p>
                        *Valid on orders over {minimum_spend_gross} pre-discount
                        (minimum spend:
                        {minimum_spend_net}
                        ).
                    </p>

                    <p>
                        ^Please note that your challenge complete email may take
                        up to 15 minutes to hit your inbox, however you can shop
                        with your code now.
                    </p>
                </section>
            ) : (
                <section>
                    <div className="form">
                        <div className="challenge_complete__input">
                            <input
                                type="name"
                                id="firstname"
                                className="challenge_complete__inputbox"
                                placeholder="First Name*"
                                ref={firstNameInput}
                                required
                            />
                        </div>
                        <div className="challenge_complete__input">
                            <input
                                type="name"
                                id="lastname"
                                className="challenge_complete__inputbox"
                                placeholder="Last Name*"
                                ref={lastNameInput}
                                required
                            />
                        </div>
                        <div className="challenge_complete__input">
                            <input
                                type="email"
                                id="email"
                                className="challenge_complete__inputbox"
                                placeholder="Enter your email address*"
                                ref={emailInput}
                                required
                            />
                        </div>
                        <div className="challenge_complete__input">
                            <select
                                name="region"
                                id="region"
                                className="challenge_complete__dropdown minimal"
                                ref={regionInput}
                            >
                                <option
                                    label="Preferred Shopping Region*"
                                    value=""
                                />
                                <option value="US">USA/USD</option>
                                <option value="EU">EU/EUR</option>
                                <option value="UK">UK/GBP</option>
                                <option value="INTL">REST OF WORLD/AUD</option>
                            </select>
                        </div>
                        <div className="challenge_complete__additional">
                            <div className="challenge_complete__input">
                                <select
                                    name="gender"
                                    id="gender"
                                    className="challenge_complete__dropdown minimal"
                                    ref={genderInput}
                                >
                                    <option label="Gender*" value="" />
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">
                                        Prefer Not To Say
                                    </option>
                                </select>
                            </div>
                            <div className="challenge_complete__input">
                                <span>*Required fields</span>
                            </div>
                            <div className="challenge_complete__input">
                                <input
                                    type="checkbox"
                                    name="agree"
                                    id="agree"
                                    ref={agreeInput}
                                />
                                <label
                                    htmlFor="agree"
                                    className="declare_label"
                                >
                                    I agree to be emailed my voucher and
                                    subscribe to MAAP’s newsletter, where I’ll
                                    be the first to know about new products,
                                    group rides and all things MAAP.
                                </label>
                            </div>
                            <div className="challenge_complete__input">
                                <input
                                    type="checkbox"
                                    name="declare"
                                    id="declare"
                                    ref={declareInput}
                                    required
                                />
                                <label
                                    htmlFor="declare"
                                    className="declare_label"
                                >
                                    I declare that I am over the age of 18 and
                                    agree to the MAAP Transcend Challenge rules
                                    and{' '}
                                    <Link
                                        href="/pages/maap-transcend-limits-terms-and-conditions"
                                        legacyBehavior
                                    >
                                        <a>Terms & Conditions.</a>
                                    </Link>
                                </label>
                            </div>
                            <div className="challenge_complete__input">
                                <button
                                    disabled={submitting}
                                    className="challenge_complete__button"
                                    type="submit"
                                    onClick={() => onSubmit()}
                                >
                                    {submitting ? (
                                        <div className="loader"></div>
                                    ) : (
                                        'REDEEM REWARD'
                                    )}
                                </button>
                            </div>
                            <div className="challenge_complete__input">
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
                    .challenge_complete__input {
                        display: flex;
                        padding: 7px 10px;
                        width: 100%;
                    }
                    .challenge_complete__inputbox,
                    .challenge_complete__dropdown {
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

                    .challenge_complete__inputbox::placeholder {
                        color: ${brandNavy};
                    }
                    .challenge_complete__inputbox:focus {
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
                    .challenge_complete__button {
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
                        font-weight: 400;
                        padding: 15px 10px;
                        text-align: left;
                    }
                    .challenge_complete__additional {
                        color: ${brandDarkGrey};
                        font-size: 11px;
                        text-align: left;
                    }
                    .challenge_complete__additional a {
                        color: ${brandDarkGrey};
                    }
                    .challenge_complete__additional_ending {
                        padding-top: 0 !important;
                        margin-top: 0 !important;
                    }
                    .declare_label {
                        padding-left: 7px;
                    }
                    @media only screen and (max-width: ${breakpointMedium}) {
                        .challenge_complete__input {
                            padding: 5px 0;
                        }
                        .challenge_complete__inputbox,
                        .challenge_complete__dropdown,
                        .challenge_complete__button {
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

export default ChallengeCompleteForm;
