import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { brandBlack } from 'config/styles/colours';
import { breakpointMedium } from 'config/styles/breakpoints';
import RightArrow from '@images/small_icon/RightArrow.svg';
import { hmacSignature } from '@arkadecx/arkade-cloud-functions-auth';
import fetch from 'isomorphic-unfetch';
import { useShop } from '@lib/providers/ShopProvider';

const NewsletterSignUp = ({ block }) => {
    const { code } = useShop();
    const [message, setMessage] = useState(null);
    const emailInput = useRef(null);
    const { signup_text, tags } = block;

    const tagsList = tags ? tags.split(',').map((tag) => tag.trim()) : [];

    const onSubmit = async () => {
        const emailAddress = emailInput.current.value;

        const body = {
            emailAddress,
            region: code,
            tags: tagsList,
        };
        const route = '/api/services/newsletter-subscribe';

        const now = Date.now();
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
        setMessage(responseObject.message);
    };

    return (
        <section>
            <div className="form">
                <div className="newsletter_signup__text">{signup_text}</div>
                <div className="newsletter_signup__container">
                    <div className="newsletter_signup__input">
                        <input
                            type="email"
                            id="email"
                            className="newsletter_signup__inputbox"
                            placeholder="Enter your email address"
                            ref={emailInput}
                        />
                        <button
                            type="button"
                            className="newsletter_signup__button"
                            onClick={onSubmit}
                        >
                            <img
                                src={RightArrow.src}
                                alt="arrow"
                                className="newsletter_signup__icon"
                            />
                        </button>
                    </div>
                    {message && <div className="message">{message}</div>}
                </div>
            </div>
            <style jsx>
                {`
                    section {
                        flex: 1 0 100%;
                    }
                    .form {
                        display: flex;
                        justify-content: center;
                        padding: 50px;
                        flex-direction: column;
                    }
                    .newsletter_signup__container {
                        display: flex;
                        flex: 1;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                    .newsletter_signup__text {
                        font-size: 2em;
                        margin-bottom: 20px;
                        padding-top: 5px;
                        display: flex;
                        flex: 1;
                        justify-content: center;
                    }
                    .newsletter_signup__input {
                        display: flex;
                        width: 65%;
                        height: 50px;
                        max-width: 500px;
                    }
                    .newsletter_signup__inputbox {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        border: 1px solid ${brandBlack};
                        background: none;
                        border-radius: 50px 0 0 50px;
                        width: 100%;
                        padding: 0 30px;
                        color: ${brandBlack};
                    }
                    .newsletter_signup__inputbox:focus {
                        outline: 0;
                    }
                    .newsletter_signup__button {
                        border: 1px solid ${brandBlack};
                        border-left: none;
                        background: none;
                        border-radius: 0 50px 50px 0;
                        margin-left: 0;
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
                    @media (max-width: ${breakpointMedium}) {
                        .form {
                            flex-direction: column;
                            justify-content: center;
                        }
                        .newsletter_signup__text {
                            font-size: 1.5em;
                            padding-right: 0;
                            padding-bottom: 20px;
                            padding-top: 0;
                        }
                        .newsletter_signup__input {
                            width: 100%;
                        }
                    }
                `}
            </style>
        </section>
    );
};

NewsletterSignUp.propTypes = {
    block: PropTypes.object.isRequired,
};

export default NewsletterSignUp;
