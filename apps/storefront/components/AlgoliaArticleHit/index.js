import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { useShop } from '@lib/providers/ShopProvider';

const AlgoliaArticleHit = ({
    hit,
    featured = false,
    promoted = true,
    showBody = false,
}) => {
    const { storefrontUrl } = useShop();
    const ArticleCard = featured
        ? dynamic(() => import('components/BlogArticleCardFeatured'))
        : promoted
        ? dynamic(() => import('components/BlogArticleCardPromoted'))
        : dynamic(() => import('components/BlogArticleCard'));

    if (!hit.image) return null;

    return (
        <>
            <ArticleCard
                handle={hit.handle}
                title={hit.title}
                body={hit.body_html_safe}
                imageUrl={hit.image}
                metafields={hit.metafields}
                published_at={hit.published_at}
                tags={hit.tags}
                showBody={showBody}
                key={`article_card_${hit.title}`}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `{
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": "${hit.title.replace(/"/g, '')}",
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": "${storefrontUrl}stories/${hit.handle}"
                        },
                        "image": [
                            "${hit.image}"
                        ],
                        "datePublished": "${hit.published_at}",
                        "dateModified": "${hit.updated_at}",
                        "author": {
                            "@type": "Person",
                            "name": "${hit.author.name}"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "MAAP",
                            "logo": {
                              "@type": "ImageObject",
                              "url": "https://maap.cc/brandLogo.svg"
                            }
                        }
                    }`,
                }}
            />
        </>
    );
};

AlgoliaArticleHit.propTypes = {
    hit: PropTypes.object,
};

export default AlgoliaArticleHit;
