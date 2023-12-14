import React, { useRef, useState, useEffect } from 'react';
import {
    brandWhite,
    brandNavy,
    brandBlack,
    brandDarkGrey,
} from 'config/styles/colours';
import Link from 'next/link';
import {
    breakpointMedium,
    breakpointSmall,
    breakpointExtraLarge,
} from 'config/styles/breakpoints';
import { RichText } from 'prismic-reactjs';
import { linkResolver } from 'helpers/prismicConfiguration';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import fetch from 'isomorphic-unfetch';
import { useIsomorphicLayoutEffect } from '@lib/useIsomorphicLayoutEffect';
import { hmacSignature } from '@arkadecx/arkade-cloud-functions-auth';
import { useRouter } from 'next/router';

const ChallengeOrEventForm = ({ formAttributes, formItems }) => {
    const router = useRouter();
    const isAnchorToForm = router.query.anchorToForm;
    const eventRegionsArr = formItems;

    const [selectedRegion, setSelectedRegion] = useState('intl');
    const [complete, setComplete] = useState(false);
    const [redeemed, setRedeemed] = useState(false);
    const [signedUp, setSignedUp] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [discountCode, setDiscountCode] = useState('');
    const [message, setMessage] = useState(null);
    const emailInput = useRef(null);
    // const phoneInput = useRef(null);
    const firstNameInput = useRef(null);
    const lastNameInput = useRef(null);
    const regionInput = useRef(null);
    const genderInput = useRef(null);
    const agreeInput = useRef(null);
    const smsAgreeInput = useRef(null);
    const declareInput = useRef(null);
    const textAreaInput = useRef(null);
    const instagramHandleInput = useRef(null);
    const stravaProfileHandleInput = useRef(null);

    const [phoneInput, setPhoneInput] = useState('');
    const [votingInput, setVotingInput] = useState('');
    const [geoLocationData, setGeoLocationData] = useState(null);

    useIsomorphicLayoutEffect(() => {
        // declare the data fetching function
        const fetchGeoLocation = async () => {
            const response = await fetch(`/api/geo-locate`);
            const geoData = await response.json();

            setGeoLocationData(geoData);
        };

        fetchGeoLocation().catch(console.error);
    }, []);

    let countryCode = 'AU';
    if (geoLocationData) countryCode = geoLocationData.countryCode;

    const {
        form_type,
        region_selector_placeholder,
        klaviyo_property_key,
        discount_code_prefix,
        discount_pricing_rule_id_eu,
        discount_pricing_rule_id_intl,
        discount_pricing_rule_id_retail,
        discount_pricing_rule_id_uk,
        discount_pricing_rule_id_us,
        show_mobile_number_input,
        show_gender_selection,
        show_email_opt_in,
        show_privacy_policy,
        show_event_region_selection,
        email_opt_in_copy_text,
        sign_up_button_copy_text,
        privacy_policy_copy_text,
        privacy_policy_url,
        terms_and_conditions_url,
        profile_tag,
        eu_discount_rule_control,
        intl_discount_rule_control,
        retail_discount_rule_control,
        uk_discount_rule_control,
        us_discount_rule_control,
        show_sms_opt_in,
        sms_opt_in_copy_text,
        event_form_complete_message,
        show_voting_options,
        voting_options,
        region_option_field_placeholder,
        voting_option_field_placeholder,
        challenge_form_success_message_heading,
        intl_challenge_form_success_message_part_one,
        us_challenge_form_success_message_part_one,
        uk_challenge_form_success_message_part_one,
        eu_challenge_form_success_message_part_one,
        intl_challenge_form_success_message_part_two,
        us_challenge_form_success_message_part_two,
        uk_challenge_form_success_message_part_two,
        eu_challenge_form_success_message_part_two,
        display_free_text_input_field,
        free_text_input_field_title,
        display_instagram_handle_input_field,
        display_strava_profile_input_field,
    } = formAttributes;

    let votingOptions = null;
    if (voting_options != null) {
        votingOptions = voting_options.split('|');
    }

    const onSubmit = async () => {
        const emailAddress = emailInput.current.value;
        const firstName = firstNameInput.current.value;
        const lastName = lastNameInput.current.value;
        const gender = genderInput.current.value;
        const agree = agreeInput.current.checked;
        const smsAgree = smsAgreeInput.current.checked;
        const textArea = textAreaInput?.current?.value;
        const instagramHandle = instagramHandleInput?.current?.value;
        const stravaProfileHandle = stravaProfileHandleInput?.current?.value;

        let declare = declareInput.current.checked;
        let region = regionInput.current.value;

        if (!show_privacy_policy) {
            declare = true;
        }

        // if event region selection is hidden, assign intl to region.
        if (!show_event_region_selection && !region) {
            region = 'intl';
        }

        setSelectedRegion(region);

        if (message) setMessage(null);

        // require email, first name, last name
        if (!emailAddress || !firstName || !lastName) {
            setMessage('Please enter your contact details');
        } else if (
            // require email, first name, last name and Gender
            !emailAddress ||
            !firstName ||
            !lastName ||
            (show_gender_selection && !gender)
        ) {
            setMessage('Please enter your contact details and Gender');
        } else if (
            // require email, first name, last name and Region
            !emailAddress ||
            !firstName ||
            !lastName ||
            (show_event_region_selection && !region)
        ) {
            setMessage('Please enter your contact details and Region');
        } else if (
            // require email, first name, last name, Gender and Region
            !emailAddress ||
            !firstName ||
            !lastName ||
            (show_event_region_selection && !region) ||
            (show_gender_selection && !gender)
        ) {
            setMessage('Please enter your contact details, Gender and Region');
        } else if (
            // require email, first name, last name, text area
            !emailAddress ||
            !firstName ||
            !lastName ||
            (free_text_input_field_title && textArea.trim().length === 0)
        ) {
            setMessage('Please enter your contact details and message');
        } else if (!declare) {
            setMessage('Please accept our terms & conditions');
        } else if (form_type.toLowerCase() === 'challenge' && !agree) {
            setMessage('Please accept email opt-in');
        } else if (emailAddress.indexOf('+') !== -1) {
            setMessage(
                'Please enter a valid email address with no + character'
            );
        } else if (
            show_mobile_number_input &&
            isPossiblePhoneNumber(phoneInput) != true
        ) {
            setMessage('Please enter a valid phone number');
        } else {
            setSubmitting(true);

            const now = Date.now();
            if (form_type.toLowerCase() === 'challenge') {
                const body = {
                    email: emailAddress,
                    first_name: firstName,
                    last_name: lastName,
                    mobile_phone: phoneInput,
                    region,
                    gender,
                    email_promo: agree,
                    sms_promo: smsAgree,
                    declare,
                    tag: profile_tag,
                    discountCodePrefix: discount_code_prefix,
                    discountRuleIdEu: discount_pricing_rule_id_eu,
                    discountRuleIdIntl: discount_pricing_rule_id_intl,
                    discountRuleIdRetail: discount_pricing_rule_id_retail,
                    discountRuleIdUk: discount_pricing_rule_id_uk,
                    discountRuleIdUs: discount_pricing_rule_id_us,
                    eu_discount_rule_control: eu_discount_rule_control,
                    intl_discount_rule_control: intl_discount_rule_control,
                    us_discount_rule_control: us_discount_rule_control,
                    uk_discount_rule_control: uk_discount_rule_control,
                    retail_discount_rule_control: retail_discount_rule_control,
                    form_type: form_type,
                    klaviyo_property_key: klaviyo_property_key,
                };
                const route = '/api/services/challenge-complete';
                const signature = await hmacSignature(
                    process.env.NEXT_PUBLIC_API_SECRET,
                    now,
                    route,
                    body
                );
                const response = await fetch(route, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-authentication': `${now}:${signature}`,
                    },
                    body: JSON.stringify(body),
                });

                const responseObject = await response.json();

                const status = responseObject?.status;

                if (status === 'redeemed') {
                    setRedeemed(true);
                }

                const code = responseObject?.discountCode;
                const message = responseObject?.message;
                const omneoErrorMessage = responseObject?.omneoErrorMessage;

                setSubmitting(false);
                if (code) {
                    setDiscountCode(code);
                    setComplete(true);
                } else if (message) {
                    setMessage(message);
                } else if (omneoErrorMessage) {
                    setMessage(omneoErrorMessage);
                } else {
                    setMessage(
                        'Can not redeem your reward. Please check your input and try again later.'
                    );
                }
            }

            if (form_type.toLowerCase() === 'event') {
                const body = {
                    email: emailAddress,
                    first_name: firstName,
                    last_name: lastName,
                    mobile_phone: phoneInput,
                    region: region,
                    gender: gender,
                    email_promo: agree,
                    sms_promo: smsAgree,
                    declare: declare,
                    tag: profile_tag,
                    event_form_complete_message: event_form_complete_message,
                    voting_option: votingInput,

                    textArea_title: free_text_input_field_title,
                    textArea_input: textArea,
                    instagram_handle: instagramHandle,
                    strava_profile_handle: stravaProfileHandle,
                };

                const route = '/api/services/event-signup';

                const signature = await hmacSignature(
                    process.env.NEXT_PUBLIC_API_SECRET,
                    now,
                    route,
                    body
                );
                const response = await fetch(route, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-authentication': `${now}:${signature}`,
                    },
                    body: JSON.stringify(body),
                });

                const responseObject = await response.json();

                const status = responseObject?.status;
                const omneoErrorMessage = responseObject?.omneoErrorMessage;

                if (status === 'signedup') {
                    setSignedUp(true);
                }

                const message = responseObject?.message;

                setSubmitting(false);
                if (message) {
                    setMessage(message);
                    setComplete(true);
                } else if (omneoErrorMessage) {
                    setMessage(omneoErrorMessage);
                } else {
                    setMessage('Please check your input and try again later.');
                }
            }
        }
    };

    const getPlaceholderValues = (region) => {
        switch (region.toUpperCase()) {
            case 'US':
                return {
                    message_part_one:
                        us_challenge_form_success_message_part_one,
                    message_part_two:
                        us_challenge_form_success_message_part_two,
                };
            case 'EU':
                return {
                    message_part_one:
                        eu_challenge_form_success_message_part_one,
                    message_part_two:
                        eu_challenge_form_success_message_part_two,
                };
            case 'UK':
                return {
                    message_part_one:
                        uk_challenge_form_success_message_part_one,
                    message_part_two:
                        uk_challenge_form_success_message_part_two,
                };
            case 'INTL':
            default:
                return {
                    message_part_one:
                        intl_challenge_form_success_message_part_one,
                    message_part_two:
                        intl_challenge_form_success_message_part_two,
                };
        }
    };

    const { message_part_one, message_part_two } =
        getPlaceholderValues(selectedRegion);

    // anchor to form
    useEffect(() => {
        if (isAnchorToForm) {
            const scrollIntoViewWithOffset = (selector, offset) => {
                const element = document.getElementById(selector);
                const y =
                    element.getBoundingClientRect().top +
                    window.pageYOffset +
                    offset;

                window.scrollTo({ top: y, behavior: 'smooth' });
            };
            scrollIntoViewWithOffset('form', -120);
        }
    }, []);

    if (redeemed) {
        return (
            <section>
                <h2>{message}</h2>
                <style jsx>
                    {`
                        section {
                            width: 410px;
                            background-color: ${brandWhite};
                            margin: auto;
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

    // if already signed up
    if (signedUp) {
        return (
            <section>
                <h2>{message}</h2>
                <style jsx>
                    {`
                        section {
                            width: 410px;
                            background-color: ${brandWhite};
                            margin: auto;
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
                form_type.toLowerCase() === 'challenge' ? (
                    <section className="complete__section">
                        <h1 data-testid="challenge_success_heading">
                            {challenge_form_success_message_heading}
                        </h1>
                        <div
                            className="messagePartOne"
                            data-testid="challenge_message_part_one"
                        >
                            {message_part_one &&
                                RichText.render(message_part_one, linkResolver)}
                        </div>
                        <p
                            className="discount_code"
                            data-testid="discount_code"
                        >
                            {discountCode}
                        </p>

                        <div
                            className="messagePartTwo"
                            data-testid="challenge_message_part_two"
                        >
                            {message_part_two &&
                                RichText.render(message_part_two, linkResolver)}
                        </div>
                    </section>
                ) : (
                    <section className="complete__section">
                        <h2>{message}</h2>
                    </section>
                )
            ) : (
                <section className="challengeForm__section">
                    <div className="form" id="form">
                        {/* voting selection */}
                        {form_type.toLowerCase() === 'event' &&
                            voting_options != null &&
                            show_voting_options == true && (
                                <div className="challenge_complete__input">
                                    <select
                                        name="voting"
                                        id="voting"
                                        data-testid="voting_input"
                                        className="challenge_complete__dropdown minimal"
                                        onChange={(e) =>
                                            setVotingInput(e.target.value)
                                        }
                                    >
                                        <option
                                            label={
                                                voting_option_field_placeholder
                                                    ? voting_option_field_placeholder
                                                    : 'Select voting option'
                                            }
                                            value=""
                                        />
                                        {votingOptions.map((item, index) => (
                                            <option
                                                // value={item.replace(/ /g, '')}
                                                // key={item.replace(/ /g, '')}
                                                value={item.replace(/ /g, '-')}
                                                key={index}
                                            >
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        {/* First Name Input */}
                        <div className="challenge_complete__input">
                            <input
                                type="name"
                                id="firstname"
                                data-testid="firstname_input"
                                className="challenge_complete__inputbox"
                                placeholder="First Name*"
                                ref={firstNameInput}
                                required
                            />
                        </div>
                        {/* Last Name Input */}
                        <div className="challenge_complete__input">
                            <input
                                type="name"
                                id="lastname"
                                data-testid="lastname_input"
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
                                data-testid="email_input"
                                className="challenge_complete__inputbox"
                                placeholder="Enter your email address*"
                                ref={emailInput}
                                required
                            />
                        </div>

                        {show_mobile_number_input && (
                            <div
                                style={{
                                    display: show_mobile_number_input
                                        ? 'flex'
                                        : 'none',
                                }}
                                className="challenge_complete__input"
                            >
                                <div className="challengeForm__phoneInputContainer">
                                    <PhoneInput
                                        value={phoneInput}
                                        international
                                        defaultCountry={countryCode}
                                        onChange={setPhoneInput}
                                        placeholder={'Enter your phone number'}
                                        maxLength="17"
                                        data-testid="phone_input"
                                    />
                                </div>
                            </div>
                        )}
                        {form_type.toLowerCase() === 'challenge' && (
                            <div className="challenge_complete__input">
                                <select
                                    name="region"
                                    id="region"
                                    data-testid="region_input"
                                    className="challenge_complete__dropdown minimal"
                                    ref={regionInput}
                                >
                                    <option
                                        label={`${
                                            region_selector_placeholder
                                                ? region_selector_placeholder
                                                : 'Preferred Shopping Region'
                                        }*`}
                                        value=""
                                    />
                                    <option value="US">USA/USD</option>
                                    <option value="EU">EU/EUR</option>
                                    <option value="UK">UK/GBP</option>
                                    <option value="INTL">
                                        REST OF WORLD/AUD
                                    </option>
                                </select>
                            </div>
                        )}

                        {form_type.toLowerCase() === 'event' && (
                            <div
                                className="challenge_complete__input"
                                style={{
                                    display: show_event_region_selection
                                        ? 'flex'
                                        : 'none',
                                }}
                            >
                                <select
                                    name="region"
                                    id="region"
                                    data-testid="region_input"
                                    className="challenge_complete__dropdown minimal"
                                    ref={regionInput}
                                >
                                    <option
                                        label={
                                            region_option_field_placeholder
                                                ? region_option_field_placeholder
                                                : 'Please select region'
                                        }
                                        value=""
                                    />
                                    {eventRegionsArr.map((item) => (
                                        <option
                                            value={item.event_region}
                                            key={item.event_location}
                                        >
                                            {item.event_location}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* gender selection */}

                        <div className="challenge_complete__additional">
                            <div
                                style={{
                                    display: show_gender_selection
                                        ? 'flex'
                                        : 'none',
                                }}
                                className="challenge_complete__input"
                            >
                                <select
                                    name="gender"
                                    id="gender"
                                    data-testid="gender_input"
                                    className="challenge_complete__dropdown minimal"
                                    ref={genderInput}
                                >
                                    {' '}
                                    <option label="Gender" value="" />
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Non-binary</option>
                                    <option value="withheld">
                                        Prefer Not To Say
                                    </option>
                                </select>
                            </div>

                            {/* Instagram input */}
                            {display_instagram_handle_input_field && (
                                <div className="challenge_complete__input">
                                    <input
                                        type="text"
                                        id="instagramInput"
                                        data-testid="instagram_handle_input"
                                        className="challenge_complete__inputbox"
                                        placeholder="Instagram Handle"
                                        ref={instagramHandleInput}
                                        required
                                    />
                                </div>
                            )}

                            {/* Strava Profile input */}
                            {display_strava_profile_input_field && (
                                <div className="challenge_complete__input">
                                    <input
                                        type="text"
                                        id="stravaProfileInput"
                                        data-testid="strava_profile_input"
                                        className="challenge_complete__inputbox"
                                        placeholder="Strava Profile"
                                        ref={stravaProfileHandleInput}
                                        required
                                    />
                                </div>
                            )}

                            {/* textarea message field */}
                            {display_free_text_input_field && (
                                <div className="challenge_complete__input">
                                    <textarea
                                        rows="7"
                                        id="challenge_textarea"
                                        data-testid="challenge_textarea"
                                        className="challenge_complete__inputbox textAreaInputField"
                                        placeholder={`${free_text_input_field_title} in under 200 Characters*`}
                                        ref={textAreaInput}
                                        required
                                        maxLength="200"
                                    />
                                </div>
                            )}

                            <div className="challenge_complete__input">
                                <span>*Required fields</span>
                            </div>
                            {/* Email Opt-In */}

                            <div
                                className="challenge_complete__input"
                                style={{
                                    display:
                                        show_email_opt_in ||
                                        form_type.toLowerCase() === 'challenge'
                                            ? 'flex'
                                            : 'none',
                                }}
                            >
                                <input
                                    type="checkbox"
                                    name="newsletter_consent"
                                    id="newsletter_consent_input"
                                    data-testid="newsletter_consent_input"
                                    ref={agreeInput}
                                    required={
                                        form_type.toLowerCase() === 'challenge'
                                    }
                                />
                                <label
                                    htmlFor="agree"
                                    className="declare_label"
                                >
                                    {email_opt_in_copy_text
                                        ? email_opt_in_copy_text
                                        : 'I agree to be emailed my voucher and subscribe to MAAP’s newsletter, where I’ll be the first to know about new products, group rides and all things MAAP.'}
                                </label>
                            </div>

                            {/* SMS opt-in */}
                            <div
                                className="challenge_complete__input"
                                style={{
                                    display: show_sms_opt_in ? 'flex' : 'none',
                                }}
                            >
                                <input
                                    type="checkbox"
                                    name="sms_consent"
                                    id="sms_consent_input"
                                    data-testid="sms_consent_input"
                                    ref={smsAgreeInput}
                                />
                                <label
                                    htmlFor="smsAgreeInput"
                                    className="declare_label"
                                >
                                    {sms_opt_in_copy_text
                                        ? sms_opt_in_copy_text
                                        : ' I agree to receive SMS updates.'}
                                </label>
                            </div>

                            {/* privacy policy */}

                            <div
                                className="challenge_complete__input"
                                style={{
                                    display: show_privacy_policy
                                        ? 'flex'
                                        : 'none',
                                }}
                            >
                                <input
                                    type="checkbox"
                                    name="terms_consent"
                                    id="terms_consent_input"
                                    data-testid="terms_consent_input"
                                    ref={declareInput}
                                    required
                                />
                                <label
                                    htmlFor="declare"
                                    className="declare_label challenge_form_declare_label"
                                >
                                    {privacy_policy_copy_text
                                        ? RichText.render(
                                              privacy_policy_copy_text,
                                              linkResolver
                                          )
                                        : 'I declare that I am over the age of 18 and agree to the MAAP Transcend Challenge rules and Terms & Conditions.'}
                                </label>
                            </div>

                            <div className="challenge_complete__input">
                                <button
                                    disabled={submitting}
                                    className="challenge_complete__button"
                                    data-testid="complete_challenge_button"
                                    type="submit"
                                    onClick={() => onSubmit()}
                                >
                                    {submitting ? (
                                        <div className="loader"></div>
                                    ) : sign_up_button_copy_text ? (
                                        sign_up_button_copy_text
                                    ) : (
                                        'Redeem Reward'
                                    )}
                                </button>
                            </div>
                            <div className="challenge_complete__input">
                                <span>
                                    By entering your details you agree to MAAP's{' '}
                                    <Link
                                        href={
                                            terms_and_conditions_url
                                                ? terms_and_conditions_url
                                                : 'https://maap.cc/pages/terms-and-conditions'
                                        }
                                        legacyBehavior
                                    >
                                        <a>Terms & Conditions</a>
                                    </Link>{' '}
                                    and{' '}
                                    <Link
                                        href={
                                            privacy_policy_url
                                                ? privacy_policy_url
                                                : 'https://maap.cc/pages/privacy-policy'
                                        }
                                        legacyBehavior
                                    >
                                        <a>Privacy Policy</a>
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>

                    {message && (
                        <div
                            className="message"
                            data-testid="validation_message"
                        >
                            {message}
                        </div>
                    )}
                </section>
            )}
            <style jsx>
                {`
                    // form style
                    .challengeForm__section {
                        width: 100%;
                        padding: 80px 30px;
                    }

                    @media (min-width: ${breakpointSmall}) {
                        .challengeForm__section {
                            width: 400px;
                            margin: auto;
                            padding: 80px 30px;
                        }
                    }

                    @media (min-width: ${breakpointExtraLarge}) {
                        .challengeForm__section {
                            width: 600px;
                        }
                    }
                    .challengeForm__phoneInputContainer {
                        border: 1px solid;
                        padding: 13px 25px;
                        border-radius: 30px;

                        width: 100%;
                    }

                    .challenge_complete__button {
                        text-transform: uppercase;
                        font-weight: bold;
                    }

                    .complete__section {
                        margin: auto;
                        padding: 30px 0px;
                    }

                    .textAreaInputField {
                        font-family: inherit;
                        border-radius: 20px !important;
                    }

                    // end form style

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
                        background-position:
                            calc(100% - 20px) calc(1em + 4px),
                            calc(100% - 15px) calc(1em + 4px),
                            calc(100% - 2.5em) 0.8em;
                        background-size:
                            5px 5px,
                            5px 5px,
                            1px 1.4em;
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
                        background-position:
                            calc(100% - 15px) 1em,
                            calc(100% - 20px) 1em,
                            calc(100% - 2.5em) 0.8em;
                        background-size:
                            5px 5px,
                            5px 5px,
                            1px 1.4em;
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

                    .challenge_complete__input {
                        align-items: start;
                    }

                    input[type='checkbox'] {
                        min-width: 13px;
                        min-height: 13px;
                        max-width: 13px;
                        max-height: 13px;
                    }

                    .messagePartOne,
                    .messagePartTwo {
                        text-align: center;
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
                            background-position:
                                calc(100% - 20px) calc(1em + 8px),
                                calc(100% - 15px) calc(1em + 8px),
                                calc(100% - 2.5em) 0.8em;
                            background-size:
                                5px 5px,
                                5px 5px,
                                1px 1.9em;
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
                            background-position:
                                calc(100% - 15px) 1em,
                                calc(100% - 20px) 1em,
                                calc(100% - 2.5em) 0.8em;
                            background-size:
                                5px 5px,
                                5px 5px,
                                1px 1.9em;
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

export default ChallengeOrEventForm;
