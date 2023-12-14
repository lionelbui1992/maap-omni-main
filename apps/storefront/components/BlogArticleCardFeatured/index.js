import React from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { brandWhite } from 'config/styles/colours';
import { breakpointMedium, breakpointSmall } from 'config/styles/breakpoints';

const BlogArticleCardFeatured = ({
    handle,
    title,
    body,
    imageUrl,
    published_at,
}) => {
    return (
        <>
            <Link
                as={`/stories/${handle}`}
                href={`/stories/${handle}`}
                legacyBehavior
            >
                <a>
                    <main>
                        <Image
                            src={imageUrl}
                            alt={title}
                            width={1200}
                            height={1200}
                            sizes="(max-width: 768px) 100vw, 33vw"
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                        <section>
                            <div className="date">
                                {dayjs(published_at).format('MMMM D YYYY')}
                            </div>
                            <div className="title">{title}</div>
                            <div className="description">{body}</div>
                        </section>
                    </main>
                </a>
            </Link>
            <style jsx>
                {`
                    main {
                        position: relative;
                        color: ${brandWhite};
                        font-family: acumin-pro, sans-serif;
                    }
                    img {
                        width: 100%;
                        display: block;
                        position: sticky;
                        top: 0;
                        bottom: 0;
                        position: -webkit-sticky;
                    }
                    section {
                        width: 50%;
                        position: absolute;
                        top: 5%;
                        right: 5px;
                        left: 3%;
                    }
                    .title {
                        font-size: 3em;
                        font-weight: 500;
                        text-decoration: underline;
                        padding: 30px 0 30px 0;
                        cursor: pointer;
                    }
                    .date {
                        font-size: 1.5em;
                        font-weight: 500;
                    }
                    .description {
                        font-size: 1.5em;
                        font-weight: 300;
                        line-height: 20px;
                    }
                    @media (max-width: ${breakpointSmall}) {
                        section {
                            width: 80% !important;
                            right: 0;
                            left: 5%;
                            bottom: 10%;
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

BlogArticleCardFeatured.propTypes = {
    handle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    published_at: PropTypes.string,
};

export default BlogArticleCardFeatured;
