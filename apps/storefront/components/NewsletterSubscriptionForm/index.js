import React, { useRef, useState } from 'react';
import { brandWhite } from 'config/styles/colours';
import { breakpointMedium } from 'config/styles/breakpoints';
import RightArrow from '@images/small_icon/WhiteRightArrow.svg';
import { hmacSignature } from '@arkadecx/arkade-cloud-functions-auth';
import fetch from 'isomorphic-unfetch';

const NewsletterSubscriptionForm = ({ regionCode }) => {
    const [message, setMessage] = useState(null);
    const emailInput = useRef(null);

    const onSubmit = async () => {
        const emailAddress = emailInput.current.value;

        const body = {
            emailAddress,
            region: regionCode,
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
        if (
            responseObject.message ==
            'Thank you for joining the MAAP mailing list.'
        ) {
            dataLayer.push({
                event: 'gtm.newsletterSubscription',
            });
            ttq.track('Subscribe');
            if (typeof window !== 'undefined' && window.pintrk) {
                window.pintrk('track', 'Signup', {
                    lead_type: 'Newsletter',
                });
            }
        }
    };

    return (
        <section>
            <div className="form" data-testid="newsletter_signup_form">
                <div className="newsletter_signup__text">
                    Sign up to our newsletter
                </div>
                <div className="newsletter_signup__input">
                    <input
                        type="email"
                        id="email"
                        data-testid="newsletter_email_input"
                        className="newsletter_signup__inputbox"
                        placeholder="Enter your email address"
                        ref={emailInput}
                    />
                    <button
                        type="button"
                        data-testid="newsletter_signup_button"
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
            </div>
            {message && (
                <div
                    className="message"
                    data-testid="newsletter_validation_message"
                >
                    {message}
                </div>
            )}
            <style jsx>
                {`
                    .newsletter_signup__text {
                        padding-bottom: 15px;
                    }
                    .newsletter_signup__input {
                        display: flex;
                        height: 40px;
                    }
                    .newsletter_signup__inputbox {
                        display: flex;
                        flex: 1;
                        flex-direction: row;
                        justify-content: space-between;
                        border: 1px solid ${brandWhite};
                        background: none;
                        border-radius: 50px 0 0 50px;
                        width: 100%;
                        padding: 0 30px;
                        color: ${brandWhite};
                    }
                    .newsletter_signup__inputbox:focus {
                        outline: 0;
                    }
                    .newsletter_signup__button {
                        border: 1px solid ${brandWhite};
                        border-left: none;
                        background: none;
                        border-radius: 0 50px 50px 0;
                        margin-left: 0;
                    }
                    .newsletter_signup__icon {
                        padding: 8px 13px 8px 10px;
                        cursor: pointer;
                    }
                    .message {
                        font-weight: 400;
                        padding: 15px 5px;
                        text-align: left;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .newsletter_signup__text {
                            padding-bottom: 20px;
                        }
                    }
                `}
            </style>
        </section>
    );
};

export default NewsletterSubscriptionForm;
