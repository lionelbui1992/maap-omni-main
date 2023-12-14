import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { brandBlack } from 'config/styles/colours';
import { getCountrySpecificUrl } from 'helpers/linkHelper';

const PageCard = ({ handle, title, body }) => {
    return (
        <>
            <Link
                as={getCountrySpecificUrl(`/pages/${handle}`)}
                href={getCountrySpecificUrl(`/pages/${handle}`)}
                legacyBehavior
            >
                <a>
                    <article>
                        <div className="title">{title}</div>
                        {body && (
                            <div className="description">
                                {body.split(' ').splice(0, 25).join(' ')}{' '}
                                &hellip;
                            </div>
                        )}
                        <div className="readMore">Read More</div>
                        <hr />
                    </article>
                </a>
            </Link>
            <style jsx>
                {`
                    article {
                        padding: 0 30px;
                    }
                    a {
                        color: ${brandBlack};
                        text-decoration: none;
                    }
                    hr {
                        margin: 30px 0;
                        height: 1px;
                        background-color: ${brandBlack};
                        border: none;
                    }
                    .title {
                        font-weight: 600;
                        text-decoration: underline;
                        margin-bottom: 15px;
                    }
                    .readMore {
                        margin-top: 15px;
                        font-weight: 400;
                        text-decoration: underline;
                    }
                    .description {
                        margin-top: 10px;
                    }
                `}
            </style>
        </>
    );
};

PageCard.propTypes = {
    handle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string,
};

export default PageCard;
