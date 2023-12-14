import React, { useEffect } from 'react';
import { getContext } from '@lib/get-context';
import { useEvent } from '@lib/providers/EventsProvider';
import Head from 'containers/Head';
import PrismicSliceRenderer from 'containers/Prismic/PrismicSliceRenderer';
import SimplifiedLayout from 'containers/SimplifiedLayout';
import { getGlobalPrismicDocuments } from 'containers/SimplifiedLayout/helpers';
import { getDocumentsByTag, prismicLandingPageParser } from 'helpers/prismic';
import { useRouter } from 'next/router';
import { getShopifyPageByHandle } from '../../helpers/pages';
import { seoValuesWithDefaults } from '../../helpers/metafields';

const IndexPage = ({
    pageDocument,
    seoValues,
    seoDescription,
    isMobileFromSSR,
    isTabledFromSSR,
    openGraphImage,
    ...globals
}) => {
    const { shopContext } = globals;
    const { title, description } = seoValues;

    const { storefrontUrl, routePrefix } = shopContext;

    const { asPath } = useRouter();
    const { event } = useEvent();
    const routeURL = `${storefrontUrl}${routePrefix ? `${routePrefix}/` : ''}`;

    useEffect(() => {
        event('ViewPage', {
            title: title,
            handle: asPath,
            category: 'homepage',
        });
        typeof window !== 'undefined' &&
            typeof nostojs === 'function' &&
            nostojs((api) => {
                api.defaultSession()
                    .viewFrontPage()
                    .setPlacements(['frontpage-nosto-1', 'bestseller-recs'])
                    .load()
                    .then((data) => {
                        // console.log(data.recommendations);
                    });
            });
    }, []);

    return (
        <SimplifiedLayout {...globals}>
            <Head
                url="/"
                canonicalUrl="/"
                title={title}
                description={description}
                ogImage={openGraphImage}
            />
            <PrismicSliceRenderer
                isMobile={null}
                isTablet={null}
                blocks={
                    pageDocument
                        ? prismicLandingPageParser(pageDocument, 'uid')
                        : []
                }
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `{
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": "1",
                                "name": "Home",
                                "item": "${routeURL}"
                            }
                        ]
                    }`,
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `{ 
                    "@context": "https://schema.org", 
                    "@type": "Organization", 
                    "name": "MAAP", 
                    "alternateName": "MAAP Cycling Apparel", 
                    "url": "${
                        new URL(
                            globals.shopContext.routePrefix !== false
                                ? globals.shopContext.routePrefix
                                : '',
                            [globals.shopContext.storefrontUrl]
                        ).href
                    }",
                    "logo": "https://maap.cc/_next/static/media/brandLogo.6f652e57.svg", 
                    "contactPoint": { 
                      "@type": "ContactPoint", 
                      "telephone": "61 3 9133 5881", 
                      "contactType": "sales", 
                      "areaServed": "${
                          globals.shopContext.defaultRegionAbbreviated
                      }", 
                      "availableLanguage": "en" 
                    }, 
                    "sameAs": [
                      "https://www.facebook.com/maap.cc/",
                      "https://twitter.com/maap_cc",
                      "https://www.instagram.com/maap.cc/?hl=en",
                      "https://www.youtube.com/c/MAAP_Apparel",
                      "https://au.linkedin.com/company/maap-cc",
                      "https://www.pinterest.com.au/maap_cc/"
                    ]
                  }`,
                }}
            />
        </SimplifiedLayout>
    );
};

export async function getCmsProps(shopContext) {
    const { language } = shopContext;
    let prismicDocuments = await getDocumentsByTag(['HOMEPAGE'], language);

    if (!prismicDocuments || !prismicDocuments.length) {
        prismicDocuments = await getDocumentsByTag(['HOMEPAGE']);
    }

    if (!prismicDocuments || !prismicDocuments.length) {
        return null;
    }

    const globalPrismicDocuments = await getGlobalPrismicDocuments(
        null,
        language
    );

    const pageDocument = prismicDocuments[0];
    let openGraphImage = pageDocument?.data?.open_graph_image?.url;

    if (typeof openGraphImage === 'undefined') {
        openGraphImage = null;
    }

    return {
        pageDocument,
        openGraphImage,
        ...globalPrismicDocuments,
    };
}

export async function getStaticProps({ params, preview = false, previewData }) {
    const { country } = params;
    const shopContext = getContext(country);
    const cmsProps = await getCmsProps(shopContext);
    const shopifyPage = await getShopifyPageByHandle(shopContext, 'homepage');

    const fallbackTitle = shopifyPage
        ? `${shopifyPage.title} ${shopContext.metaTitlePostfix}`
        : shopContext.metaTitle;

    const seoValues = seoValuesWithDefaults(shopifyPage?.seo, {
        title: fallbackTitle,
        description: shopContext.metaDescription,
    });

    return {
        props: {
            seoValues,
            shopContext,
            preview,
            ...cmsProps,
        },
        revalidate: 900,
    };
}

export async function getStaticPaths() {
    const paths = ['/au', '/us', '/uk', '/eu'];

    return {
        paths,
        fallback: false,
    };
}

export default IndexPage;
