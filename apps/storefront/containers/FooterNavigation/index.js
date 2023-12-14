import React, { useState } from 'react';
import Link from 'next/link';
import { breakpointLarge, breakpointMedium } from 'config/styles/breakpoints';
import pathOr from 'ramda/src/pathOr';
import PropTypes from 'prop-types';
import AccordionPanel from '../AccordionPanel';
import { brandBlack, brandWhite } from 'config/styles/colours';
import { getCountrySpecificUrl } from 'helpers/linkHelper';
import NewsletterSubscriptionForm from 'components/NewsletterSubscriptionForm';

const FooterNavigation = ({ footerNav, regionCode }) => {
    const [activeTab, setActiveTab] = useState(null);

    const nav = pathOr([], ['data', 'body'], footerNav);

    const openConsentWidget = () => {
        return Osano.cm.showDrawer('osano-cm-dom-info-dialog-open');
    };
    return (
        <>
            <nav id="footer_navigation" className="footer_navigation">
                <div className="container">
                    <div className="panel panel--double hidden_on_mobile">
                        {nav.map((item, key) => {
                            const navItem =
                                item && item.items ? item.items : [];
                            return (
                                <div
                                    key={key}
                                    className={
                                        item.items.length > 4
                                            ? 'column--double'
                                            : 'column'
                                    }
                                >
                                    <div className="column_title">
                                        {item.primary &&
                                        item.primary.column_title
                                            ? item.primary.column_title
                                            : ''}
                                    </div>
                                    <ul className="items">
                                        {navItem.map((item, key) => {
                                            if (!item.link) return null;
                                            return (
                                                <li className="item" key={key}>
                                                    {item?.link?.includes(
                                                        'https://'
                                                    ) ? (
                                                        <a
                                                            className="link"
                                                            href={item.link}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            {item.link_title}
                                                        </a>
                                                    ) : (
                                                        <>
                                                            <Link
                                                                href={getCountrySpecificUrl(
                                                                    item.link
                                                                )}
                                                                as={getCountrySpecificUrl(
                                                                    item.link
                                                                )}
                                                                legacyBehavior
                                                            >
                                                                <a className="link">
                                                                    {
                                                                        item.link_title
                                                                    }
                                                                </a>
                                                            </Link>

                                                            {!!item.link.includes(
                                                                'osano'
                                                            ) && (
                                                                <a
                                                                    className="link"
                                                                    onClick={() =>
                                                                        openConsentWidget()
                                                                    }
                                                                >
                                                                    Cookie
                                                                    Preferences
                                                                </a>
                                                            )}
                                                        </>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            );
                        })}
                        <div className="column--double-empty empty-column" />
                    </div>
                    <div className="panel">
                        <div className="column">
                            <NewsletterSubscriptionForm
                                regionCode={regionCode}
                            />
                        </div>
                    </div>
                    <div className="panel hidden_on_desktop">
                        <div className="accordion_container">
                            {nav.map((item, index) => {
                                const navItem =
                                    item && item.items ? item.items : [];
                                return (
                                    <div key={index} className="column">
                                        <AccordionPanel
                                            label={
                                                item.primary &&
                                                item.primary.column_title
                                                    ? item.primary.column_title
                                                    : ''
                                            }
                                            content={
                                                <ul className="items">
                                                    {navItem.map(
                                                        (item, key) => {
                                                            if (!item.link)
                                                                return null;
                                                            return (
                                                                <li
                                                                    className="item"
                                                                    key={key}
                                                                >
                                                                    {item?.link?.includes(
                                                                        'https://'
                                                                    ) ? (
                                                                        <a
                                                                            className="link"
                                                                            href={
                                                                                item.link
                                                                            }
                                                                        >
                                                                            {
                                                                                item.link_title
                                                                            }
                                                                        </a>
                                                                    ) : (
                                                                        <Link
                                                                            href={getCountrySpecificUrl(
                                                                                item.link
                                                                            )}
                                                                            as={getCountrySpecificUrl(
                                                                                item.link
                                                                            )}
                                                                            legacyBehavior
                                                                        >
                                                                            <a className="link">
                                                                                {
                                                                                    item.link_title
                                                                                }
                                                                            </a>
                                                                        </Link>
                                                                    )}
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                                </ul>
                                            }
                                            activeTab={activeTab}
                                            index={index}
                                            activateTab={() => {
                                                setActiveTab(
                                                    activeTab === index
                                                        ? null
                                                        : index
                                                );
                                            }}
                                            revertColor
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </nav>
            <style jsx global>
                {`
                    .klaviyo-form-HZMnMU input[type='email'] {
                        display: flex !important;
                        flex: 1 !important;
                        flex-direction: row;
                        justify-content: space-between !important;
                        border: 1px solid ${brandWhite} !important;
                        background: none !important;
                        border-radius: 50px 0 0 50px !important;
                        width: 100% !important;
                        padding: 0 30px !important;
                        color: ${brandWhite} !important;
                    }
                `}
            </style>
            <style jsx>
                {`
                    .footer_navigation {
                        display: flex;
                        flex-wrap: wrap;
                        flex-direction: row;
                        margin: 0 auto;
                        color: ${brandWhite};
                        background-color: ${brandBlack};
                    }

                    .column {
                        display: flex;
                        flex: 1;
                        flex-direction: column;
                        text-align: left;
                    }

                    .column--double {
                        display: flex;
                        flex: 2;
                        flex-direction: column;
                        text-align: left;
                    }

                    .column--double-empty {
                        flex: 2;
                    }

                    .column_title {
                        text-decoration: underline;
                        margin-bottom: 15px;
                    }

                    .items {
                        margin: 0;
                        padding: 0;
                    }

                    .item {
                        list-style-type: none;
                        margin: 5px 0;
                    }

                    .link {
                        text-decoration: none;
                        cursor: pointer;
                        color: ${brandWhite};
                    }

                    .container {
                        display: flex;
                        flex: 1;
                        padding: 40px 46px;
                        margin: 0 auto;
                    }

                    .panel {
                        display: flex;
                        padding: 15px 0;
                        justify-content: space-evenly;
                    }

                    @media (max-width: ${breakpointMedium}) {
                        .footer_navigation {
                            text-align: center;
                        }

                        .container {
                            padding: 0 0 50px 0;
                            display: flex;
                            flex-direction: column;
                        }

                        .panel {
                            padding: 30px 40px 0 40px;
                            flex-direction: column;
                        }

                        .column_title {
                            margin: 30px 0 15px 0;
                        }

                        .accordion_container {
                            border-top: 1px solid ${brandWhite};
                            display: flex;
                            flex-direction: column;
                        }

                        .context_switcher_in_mobile {
                            color: ${brandWhite};
                            padding-bottom: 20px;
                        }

                        .horizontal-line {
                            padding: 10px 0;
                            border-bottom: 0.2px solid white;
                        }
                    }

                    @media (min-width: ${breakpointMedium}) {
                        .panel {
                            flex: 1;
                        }

                        .panel--double {
                            flex: 3;
                        }
                    }

                    @media (max-width: ${breakpointLarge}) {
                        .column {
                            flex: 3;
                        }

                        .column--double {
                            flex: 4;
                        }

                        .column--double-empty {
                            flex: 1;
                        }
                    }
                `}
            </style>
        </>
    );
};

FooterNavigation.propTypes = {
    footerNav: PropTypes.object,
};

export default FooterNavigation;
