import React, { useEffect } from 'react';
import Head from 'containers/Head';
import { useRouter } from 'next/router';
import Prismic from 'prismic-javascript';
import { Client } from 'helpers/prismic';
import algoliasearch from 'algoliasearch/lite';
import { useEvent } from '@lib/providers/EventsProvider';
import { formatPrismicText } from 'containers/Prismic/utils/prismic';
import { prismicLandingPageParser } from 'helpers/prismic';
import SimplifiedLayout from '@containers/SimplifiedLayout';
import PrismicSliceRenderer from '@containers/Prismic/PrismicSliceRenderer';
import CustomBreadcrumb from '@components/CustomBreadcrumb';
import RelatedBlogArticles from '@components/RelatedBlogArticles';
import Loader from '@components/Loader';
import { getContext } from '@lib/get-context';
import { getGlobalPrismicDocuments } from '@containers/SimplifiedLayout/helpers';
import brandConfig from '@config/brandConfig';
import { getShopifyArticleByHandle } from '@lib/get-shopify-article';
import { seoValuesWithDefaults } from 'helpers/metafields';

const ClimateMattersBlogArticle = ({
    pageDocument,
    seoValues,
    schemaDocument,
    schemaDescription,
    schemaTitle,
    storefrontUrl,
    shopifyImageUrl,
    openGraphImage,
    relatedArticles,
    ...globals
}) => {
    const { event } = useEvent();
    const { asPath, isFallback } = useRouter();

    useEffect(() => {
        event('ViewPage', {
            title: seoValues.title,
            handle: asPath,
            category: 'story',
        });

        typeof nostojs === 'function' &&
            nostojs((api) => {
                api.defaultSession()
                    .viewOther()
                    .setPlacements(['general-recommendations'])
                    .load()
                    .then((data) => {
                        // console.log(data.recommendations);
                    });
            });
    }, []);

    return (
        <SimplifiedLayout {...globals}>
            <Head
                url={asPath}
                title={seoValues.title}
                description={seoValues.description}
                ogImage={openGraphImage}
            />
            {isFallback && <Loader type="product" />}
            {pageDocument && (
                <>
                    <div className="page blog_article">
                        <CustomBreadcrumb
                            homeTitle="MAAP Cycling Apparel"
                            blockTitle={pageDocument.data?.title}
                        />
                        <PrismicSliceRenderer
                            blocks={
                                pageDocument
                                    ? prismicLandingPageParser(
                                          pageDocument,
                                          'uid'
                                      )
                                    : []
                            }
                        />
                        <RelatedBlogArticles articles={relatedArticles} />
                    </div>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: `{
                                "@context": "https://schema.org",
                                "@type": "BlogPosting",
                                "mainEntityOfPage": {
                                    "@type": "WebPage",
                                    "@id": "${storefrontUrl}${asPath.slice(1)}"
                                },
                                "headline": "${
                                    formatPrismicText(schemaTitle)
                                        ? formatPrismicText(
                                              schemaTitle
                                          ).replace(/"/g, '')
                                        : ''
                                }",
                                "description": "${
                                    formatPrismicText(schemaDescription)
                                        ? formatPrismicText(schemaDescription)
                                        : ''
                                }",
                                "image": [
                                    "${schemaDocument?.desktop_image?.url}"
                                ],
                                "datePublished": "${
                                    pageDocument?.first_publication_date
                                }",
                                "dateModified": "${
                                    pageDocument?.last_publication_date
                                }",
                                "author": {
                                    "@type": "Person",
                                    "name": "${formatPrismicText(
                                        schemaDocument?.sub_text
                                    )}"
                                },
                                "publisher": {
                                    "@type": "Organization",
                                    "name": "MAAP",
                                    "logo": {
                                      "@type": "ImageObject",
                                      "url": "${shopifyImageUrl}MAAP-LOGO.png?v=1605667056"
                                    }
                                }
                            }`,
                        }}
                    />
                </>
            )}
            <style jsx>
                {`
                    .page {
                        margin: 0 auto;
                    }
                `}
            </style>
        </SimplifiedLayout>
    );
};

const parseAlgoliaArticle = (article) => {
    const { title, created_at, handle, image, body_html_safe } = article;
    return {
        created_at,
        handle,
        title,
        image,
        body: body_html_safe,
    };
};

async function getArticles(handle, collection) {
    const client = algoliasearch(
        brandConfig.services.algolia.applicationID,
        brandConfig.services.algolia.apiKey
    );

    const index = client.initIndex('shopify_intl_articles');

    let relatedArticles = await index
        .search('', {
            filters: `named_tags.collection:'${collection}'`,
            hitsPerPage: 16,
        })
        .then(({ hits }) => hits);

    if (relatedArticles) {
        relatedArticles = relatedArticles
            .map((article) => parseAlgoliaArticle(article))
            .filter((story) => story.handle !== handle)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return relatedArticles;
}

async function getCmsProps(shopContext, locale, handle) {
    let seoValues = { title: '', description: '' };
    const { results: prismicDocuments } = await Client().query(
        Prismic.Predicates.at('my.blog_article.uid', handle),
        {
            lang: '*',
        }
    );

    const globalPrismicDocuments = await getGlobalPrismicDocuments(
        null,
        locale
    );

    const pageDocument = prismicDocuments[0];

    const shopifyArticle = await getShopifyArticleByHandle(shopContext, handle);
    let relatedArticles = null;

    if (shopifyArticle) {
        const collectionTags = shopifyArticle.tags
            .filter((tag) => tag.startsWith('collection:'))
            .map((tag) => tag.replace('collection:', ''));

        if (collectionTags) {
            relatedArticles = await getArticles(handle, collectionTags[0]);
        }
    }

    const { storefrontUrl, shopifyImageUrl } = shopContext;

    if (shopifyArticle) {
        seoValues = seoValuesWithDefaults(shopifyArticle.seo, {
            title: `${shopifyArticle.title} ${shopContext.metaTitlePostfix}`,
            description: `${shopifyArticle.content}`,
        });
    }

    const schemaDocument = pageDocument?.data?.body[0]?.primary;
    const schemaDescription = pageDocument?.data?.schema_description;
    const schemaTitle = pageDocument?.data?.title;
    const openGraphImage =
        pageDocument?.data?.body?.[0]?.primary?.mobile_image?.url;

    return {
        seoValues,
        schemaDocument,
        schemaDescription,
        schemaTitle,
        storefrontUrl,
        shopifyImageUrl,
        pageDocument,
        openGraphImage,
        relatedArticles,
        ...globalPrismicDocuments,
    };
}

export async function getStaticProps({ preview = false, previewData }) {
    const handle = 'climate-matters';
    const shopContext = getContext('intl');

    const cmsProps = await getCmsProps(
        shopContext,
        shopContext.language,
        handle
    );

    return {
        props: {
            shopContext,
            preview,
            ...cmsProps,
        },
        revalidate: 900,
    };
}

export default ClimateMattersBlogArticle;
