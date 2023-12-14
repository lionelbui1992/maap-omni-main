import React from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { brandBlack } from 'config/styles/colours';
import { breakpointSmall } from 'config/styles/breakpoints';

const BlogArticleCard = ({ handle, title, imageUrl, body, published_at }) => {
    return (
        <>
            <Link
                as={`/stories/${handle}`}
                href={`/stories/${handle}`}
                legacyBehavior
            >
                <a>
                    <div className="blog_article_card">
                        <Image
                            src={imageUrl}
                            alt={title}
                            width={500}
                            height={500}
                            className="blog_article_card__image"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                        <div className="blog_article_card__title">{title}</div>
                        <div className="blog_article_card__date">
                            {dayjs(published_at).format('MMMM D YYYY')}
                        </div>
                        <div className="blog_article_card__description">
                            {body}
                        </div>
                    </div>
                </a>
            </Link>
            <style jsx>
                {`
                    .blog_article_card {
                        display: flex;
                        flex-direction: column;
                        cursor: pointer;
                        font-family: acumin-pro, sans-serif;
                    }
                    .blog_article_card__image {
                        width: 100%;
                        display: block;
                    }
                    .blog_article_card__title {
                        font-size: 1.6em;
                        font-weight: 300;
                        padding: 15px 0 5px 0;
                    }
                    .blog_article_card__date {
                        font-size: 0.9em;
                        font-weight: 500;
                        padding-bottom: 7px;
                    }
                    .blog_article_card__description {
                        font-size: 0.9em;
                        font-weight: 200;
                        line-height: 15px;
                    }
                    a {
                        color: ${brandBlack};
                        text-decoration: none;
                    }
                    @media (max-width: ${breakpointSmall}) {
                        .blog_article_card {
                            width: 100%;
                            padding: 0;
                        }
                    }
                `}
            </style>
        </>
    );
};

BlogArticleCard.propTypes = {
    handle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    published_at: PropTypes.string,
};

export default BlogArticleCard;
