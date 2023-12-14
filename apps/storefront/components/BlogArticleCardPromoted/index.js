import React from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { brandWhite } from 'config/styles/colours';
import { breakpointMedium, breakpointSmall } from 'config/styles/breakpoints';

const BlogArticleCardPromoted = ({
    handle,
    title,
    body,
    imageUrl,
    published_at,
    show_body = false,
}) => {
    return (
        <>
            <Link
                as={`/stories/${handle}`}
                href={`/stories/${handle}`}
                legacyBehavior
            >
                <a>
                    <article>
                        <img src={imageUrl} alt={title} />
                        <section>
                            <div className="title">{title}</div>
                            <div className="date">
                                {dayjs(published_at).format('MMMM D YYYY')}
                            </div>
                            {show_body && (
                                <div className="blog_promoted_card__description">
                                    {body}
                                </div>
                            )}
                        </section>
                    </article>
                </a>
            </Link>
            <style jsx>
                {`
                    article {
                        position: relative;
                        color: ${brandWhite};
                        font-family: acumin-pro, sans-serif;
                    }
                    img {
                        width: 100%;
                        display: block;
                    }
                    section {
                        ${show_body ? `width: 40%` : `width: 80%`};
                        position: absolute;
                        bottom: 25px;
                        right: 5px;
                        left: 30px;
                    }
                    .title {
                        font-size: 1.5em;
                        font-weight: 300;
                        padding: 15px 0 5px 0;
                    }
                    .date {
                        font-size: 0.9em;
                        font-weight: 500;
                        padding-bottom: 7px;
                    }
                    .description {
                        font-size: 0.9em;
                        font-weight: 100;
                        line-height: 15px;
                    }
                    @media (max-width: ${breakpointSmall}) {
                        section {
                            width: 80% !important;
                            right: 0;
                            left: 20px;
                            bottom: 40px;
                        }
                    }
                    @media (max-width: ${breakpointMedium}) {
                        section {
                            width: 50%;
                        }
                    }
                `}
            </style>
        </>
    );
};

BlogArticleCardPromoted.propTypes = {
    handle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    body: PropTypes.string.isRequired,
    published_at: PropTypes.string,
    show_body: PropTypes.bool,
};

export default BlogArticleCardPromoted;
