import React from 'react';
import PropTypes from 'prop-types';
import LazyImage from 'components/LazyImage';
import { getCountrySpecificUrl } from 'helpers/linkHelper';
import {
    breakpointSmall,
    breakpointMedium,
    breakpointLarge,
    breakpointExtraLarge,
} from 'config/styles/breakpoints';
import { brandWhite } from 'config/styles/colours';
import SSRLink from 'helpers/SSRLink';
import css from 'styled-jsx/css';

const PrismicProductFeature = ({ feature }) => {
    if (!feature) return null;
    const {
        mobile_image,
        desktop_image,
        medium_image,
        large_image,
        extra_large_image,
        content_title,
        content,
        button_text,
        link_title,
        link_url,
        link_type,
        gtm_identifier,
    } = feature;

    const mobileImageStyles = css.resolve`
        img {
            width: 100%;
            display: flex;
            height: 100%;
        }
        @media (min-width: ${breakpointSmall}) {
            img {
                display: none;
            }
        }
    `;

    const desktopImageStyles = css.resolve`
        @media (min-width: ${breakpointSmall}) {
            img {
                display: block;
                width: 100%;
                height: 100%;
                display: flex;
            }
        }
        @media (max-width: ${breakpointSmall}) {
            img {
                display: none;
            }
        }
    `;

    const mediumImageStyles = css.resolve`
        @media (min-width: ${breakpointMedium}) {
            img {
                display: block;
                width: 100%;
                height: 100%;
                display: flex;
            }
        }
        @media (max-width: ${breakpointMedium}) {
            img {
                display: none;
            }
        }
    `;

    const largeImageStyles = css.resolve`
        @media (min-width: ${breakpointLarge}) {
            img {
                display: block;
                width: 100%;
                height: 100%;
                display: flex;
            }
        }
        @media (max-width: ${breakpointLarge}) {
            img {
                display: none;
            }
        }
    `;

    const extraLargeImageStyles = css.resolve`
        @media (min-width: ${breakpointExtraLarge}) {
            img {
                display: block;
                width: 100%;
                height: 100%;
                display: flex;
            }
        }
        @media (max-width: ${breakpointExtraLarge}) {
            img {
                display: none;
            }
        }
    `;

    return (
        <>
            {link_url && link_url ? (
                <SSRLink
                    linkType={link_type}
                    linkUrl={link_url}
                    linkTitle={link_title}
                    data-event-title={link_title}
                    data-event-description={gtm_identifier}
                >
                    <div
                        className="product_feature"
                        data-event-description={gtm_identifier}
                    >
                        <LazyImage
                            src={mobile_image.url}
                            className={mobileImageStyles.className}
                        />
                        <LazyImage
                            src={desktop_image.url}
                            className={desktopImageStyles.className}
                        />
                        <LazyImage
                            src={medium_image.url}
                            className={mediumImageStyles.className}
                        />
                        <LazyImage
                            src={large_image.url}
                            className={largeImageStyles.className}
                        />
                        <LazyImage
                            src={extra_large_image.url}
                            className={extraLargeImageStyles.className}
                        />
                        {content?.length > 0 && (
                            <div className="content">
                                <h2 className="title">
                                    {content_title[0]?.text}
                                </h2>
                                <span className="text">{content[0]?.text}</span>
                                <span className="link">{button_text}</span>
                            </div>
                        )}
                    </div>
                </SSRLink>
            ) : (
                <div
                    className="product_feature"
                    data-event-description={gtm_identifier}
                >
                    <LazyImage
                        src={mobile_image.url}
                        className={mobileImageStyles.className}
                    />
                    <LazyImage
                        src={desktop_image.url}
                        className={desktopImageStyles.className}
                    />
                    <LazyImage
                        src={medium_image.url}
                        className={mediumImageStyles.className}
                    />
                    <LazyImage
                        src={large_image.url}
                        className={largeImageStyles.className}
                    />
                    <LazyImage
                        src={extra_large_image.url}
                        className={extraLargeImageStyles.className}
                    />
                    <div className="content">
                        <h2 className="title">{content_title[0]?.text}</h2>
                        <span className="text">{content[0]?.text}</span>
                        <a
                            href={getCountrySpecificUrl(link_url)}
                            className="link"
                        >
                            {button_text}
                        </a>
                    </div>
                </div>
            )}
            {mobileImageStyles.styles}
            {desktopImageStyles.styles}
            <style jsx>
                {`
                    .product_feature {
                        position: relative;
                        overflow: hidden;
                        display: flex;
                        height: 100%;
                    }

                    .content {
                        color: ${brandWhite};
                        font-weight: 300;
                    }

                    .title {
                        position: absolute;
                        top: 15px;
                        left: 20px;
                        font-size: 3em;
                        font-weight: 300;
                        margin: 0;
                    }

                    @media (max-width: ${breakpointMedium}) {
                        .title {
                            font-size: 1.5em;
                        }
                    }

                    .text {
                        position: absolute;
                        bottom: 60px;
                        left: 20px;
                        display: block;
                        margin-top: 160px;
                        width: 50%;
                        font-weight: 300;
                    }

                    .link {
                        position: absolute;
                        bottom: 10px;
                        left: 20px;
                        display: flex;
                        margin: 20px 0;
                        color: ${brandWhite};
                        text-decoration: underline;
                    }
                `}
            </style>
        </>
    );
};

PrismicProductFeature.propTypes = {
    feature: PropTypes.object.isRequired,
};

export default PrismicProductFeature;
