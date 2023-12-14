import React, { useRef, useState } from 'react';
import {
    brandBlack,
    brandPlaceholderGrey,
    brandWhite,
    brandSelectedGrey,
} from 'config/styles/colours';
import { useShop } from '@lib/providers/ShopProvider';

const NotifyMeForm = ({ variant, date }) => {
    const [message, setMessage] = useState(null);
    const { code } = useShop();
    const emailInput = useRef(null);

    const onSubmit = async () => {
        const emailAddress = emailInput.current.value;

        const response = await fetch(`/api/services/notify-me`, {
            // const response = await fetch(`/api/services/notify-me`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `emailAddress=${emailAddress}&variantId=${variant.id}&region=${code}`,
        });

        const responseObject = await response.json();
        setMessage(responseObject.message);
    };

    return (
        <section>
            <div className="form">
                <input
                    type="email"
                    id="email"
                    placeholder="Your email address"
                    ref={emailInput}
                />
                <button type="button" onClick={onSubmit}>
                    NOTIFY ME
                </button>
            </div>
            {date && !message && (
                <div className="date">
                    Expected arrival on
                    {date}
                </div>
            )}
            {message && <div className="message">{message}</div>}
            <style jsx>
                {`
                    section {
                        display: flex;
                        flex: 1;
                        flex-direction: column;
                        margin: 0;
                        text-align: center;
                        padding: 30px 0 0;
                    }
                    .form {
                        display: flex;
                        justify-content: space-between;
                        position: relative;
                    }
                    button {
                        position: absolute;
                        padding: 3px 20px;
                        right: 0;
                        height: 100%;
                        border-radius: 25px;
                        background-color: ${brandBlack};
                        color: ${brandWhite};
                        font-size: 0.8em;
                        font-weight: 300;
                        outline: none;
                        border: none;
                        cursor: pointer;
                    }
                    input {
                        display: flex;
                        flex: 1;
                        border: none;
                        padding: 10px 10px 10px 25px;
                    }
                    input {
                        background-color: ${brandWhite};
                        border-radius: 25px;
                        border: 1px solid ${brandBlack};
                        width: 70%;
                    }
                    input:focus {
                        border: 1px solid ${brandBlack};
                        outline: none;
                    }
                    input:hover {
                        cursor: pointer;
                        background-color: ${brandWhite};
                        color: ${brandBlack};
                    }
                    input::placeholder {
                        color: ${brandPlaceholderGrey};
                    }
                    input:-webkit-autofill,
                    input:-webkit-autofill:hover,
                    input:-webkit-autofill:focus,
                    input:-webkit-autofill:active {
                        -webkit-box-shadow: 0 0 0 1000px ${brandSelectedGrey}
                            inset !important;
                    }
                    .date {
                        font-weight: 400;
                        font-size: 1.1em;
                        padding: 8px 5px;
                        text-align: left;
                    }
                    .message {
                        font-weight: 400;
                        padding: 10px 5px;
                        text-align: left;
                    }
                `}
            </style>
        </section>
    );
};

export default NotifyMeForm;
