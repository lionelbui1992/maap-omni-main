import React from 'react';
import PropTypes from 'prop-types';
import LazyImage from 'components/LazyImage';
import { getCountrySpecificUrl } from 'helpers/linkHelper';
import { breakpointSmall } from 'config/styles/breakpoints';
import SSRLink from 'helpers/SSRLink';
import css from 'styled-jsx/css';
import styles from './NostoTileDisruptor.module.css';

const PrismicProductFeature = ({ tile }) => {
    if (!tile) return null;
    const { backgroundImg, buttonLink, buttonText, subtitle, title } = tile;

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

    return (
        <>
            {buttonLink && buttonLink ? (
                <SSRLink
                    linkType="Internal"
                    linkUrl={getCountrySpecificUrl(buttonLink)}
                    linkTitle={buttonText}
                    data-event-title={buttonText}
                    data-event-description={null}
                >
                    <div
                        className={styles.product_feature}
                        data-event-description={null}
                    >
                        <LazyImage
                            src={backgroundImg}
                            className={mobileImageStyles.className}
                        />
                        <LazyImage
                            src={backgroundImg}
                            className={desktopImageStyles.className}
                        />
                        {subtitle !== '' && (
                            <div className={styles.content}>
                                <h2 className={styles.title}>{title}</h2>
                                <span className={styles.text}>{subtitle}</span>
                                <span className={styles.link}>
                                    {buttonText}
                                </span>
                            </div>
                        )}
                    </div>
                </SSRLink>
            ) : (
                <div
                    className={styles.product_feature}
                    data-event-description={null}
                >
                    <LazyImage
                        src={backgroundImg}
                        className={mobileImageStyles.className}
                    />
                    <LazyImage
                        src={backgroundImg}
                        className={desktopImageStyles.className}
                    />

                    <div className={styles.content}>
                        <h2 className={styles.title}>{title}</h2>
                        <span className={styles.text}>{subtitle}</span>
                        <a
                            href={getCountrySpecificUrl(buttonLink)}
                            className={styles.link}
                        >
                            {buttonText}
                        </a>
                    </div>
                </div>
            )}
            {mobileImageStyles.styles}
            {desktopImageStyles.styles}
        </>
    );
};

PrismicProductFeature.propTypes = {
    feature: PropTypes.object.isRequired,
};

export default PrismicProductFeature;
