import React from 'react';
import AfterPay from '@images/payment/afterpay_solid.svg';
import ApplePay from '@images/payment/applepay.svg';
import Visa from '@images/payment/visa.svg';
import PayPal from '@images/payment/paypal.svg';
import Mastercard from '@images/payment/mastercard.svg';
import { brandWhite } from 'config/styles/colours';
import { breakpointMedium } from 'config/styles/breakpoints';
import PropTypes from 'prop-types';
import pathOr from 'ramda/src/pathOr';

const Footer = ({ paymentOptions }) => {
    return (
        <>
            <div id="page_footer" className="footer_wrapper">
                <div className="footer">
                    <div className="footer__copyright">
                        <div className="footer__copyright_text">
                            &copy; Maap {new Date().getFullYear()}
                        </div>
                    </div>
                    <div className="footer__payment_options">
                        {pathOr(
                            false,
                            ['data', 'after_pay'],
                            paymentOptions
                        ) && (
                            <img
                                src={AfterPay.src}
                                alt="afterpay"
                                className="footer__payment_options_image"
                            />
                        )}
                        {pathOr(
                            false,
                            ['data', 'apple_pay'],
                            paymentOptions
                        ) && (
                            <img
                                src={ApplePay.src}
                                alt="applepay"
                                className="footer__payment_options_image"
                            />
                        )}
                        {pathOr(false, ['data', 'visa'], paymentOptions) && (
                            <img
                                src={Visa.src}
                                alt="visa"
                                className="footer__payment_options_image"
                            />
                        )}
                        {pathOr(false, ['data', 'paypal'], paymentOptions) && (
                            <img
                                src={PayPal.src}
                                alt="paypal"
                                className="footer__payment_options_image"
                            />
                        )}
                        {pathOr(
                            false,
                            ['data', 'mastercard'],
                            paymentOptions
                        ) && (
                            <img
                                src={Mastercard.src}
                                alt="mastercard"
                                className="footer__payment_options_image"
                            />
                        )}
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    .footer {
                        display: flex;
                        flex-wrap: wrap;
                        flex-direction: row;
                    }
                    .footer__copyright_text {
                        padding: 10px 0;
                    }
                    .footer__copyright_border {
                        border: 0.5px solid ${brandWhite};
                        margin: 0 20px;
                    }
                    .footer__payment_options_image {
                        padding: 0 0 0 20px;
                    }
                    .footer__copyright {
                        display: flex;
                        flex-direction: row;
                        flex: 1;
                    }
                    .footer__payment_options {
                        display: flex;
                        flex-direction: row;
                        flex: 1;
                        flex-wrap: wrap;
                        justify-content: flex-end;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .footer {
                            padding: 15px 25px 50px;
                        }
                        .footer__payment_options {
                            display: none;
                        }
                    }
                `}
            </style>
        </>
    );
};

Footer.propTypes = {
    paymentOptions: PropTypes.object,
};

export default Footer;
