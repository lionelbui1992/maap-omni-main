import React from 'react';
import Router from 'next/router';
import config from 'config/brandConfig';
import { brandBlack, brandWhite } from 'config/styles/colours';

const { breakPoints } = config;

const Error = () => (
    <div className="error_page">
        <div className="error_page__inner">
            <div className="error_page__text">
                Sorry, This page is not available.
            </div>
            <div className="error_page__action">
                <button
                    className="button"
                    onClick={() => Router.back()}
                    type="button"
                >
                    Return to the previous page
                </button>
                <br />
                <a className="error_page__link" href="/">
                    or visit our home page
                </a>
            </div>
        </div>
        <style jsx>
            {`
                .error_page {
                    padding: 140px 0;
                }
                .button {
                    display: flex;
                    flex-wrap: wrap;
                    flex-direction: row;
                    justify-content: center;
                    padding: 16px;
                    margin: 10px 0;
                    color: ${brandWhite};
                    background-color: ${brandBlack};
                    cursor: pointer;
                    font-size: 1.25em;
                    border: none;
                }
                .button:focus {
                    outline: none;
                }
                @media (max-width: ${breakPoints.mobile.maxDeviceWidth}px) {
                    .error_page {
                        height: 200px;
                        padding: 100px 0;
                    }
                }
            `}
        </style>
    </div>
);

export default Error;
