import { getContext } from '@lib/get-context';
import * as Sentry from '@sentry/node';
import { formatDate, getPrismicClient } from './_helpers';

import { getAllCollections, getAllProducts } from 'lib/Shopify';
import Prismic from 'prismic-javascript';

// Initialize Sentry
Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
});

const _sitemapHeader = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;
const _sitemapNode = `<url><loc>{url}</loc><lastmod>{lastModified}</lastmod><changefreq>{changeFrequency}</changefreq><priority>1.0</priority></url>`;

// Provide a default value for _sitemapHeader
const finalSitemapHeader =
    _sitemapHeader ||
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

const fetchAllData = async (shopContext) => {
    try {
        const allProductPromise = getAllProducts(shopContext);
        const allCollectionsPromise = getAllCollections(shopContext);
        const allPagesPromise = getPrismicClient()
            .then((api) =>
                api.query(
                    Prismic.Predicates.any('document.type', [
                        'landing_page',
                        'blog_article',
                        'careers',
                    ])
                )
            )
            .then((pagesResponse) => pagesResponse.results)
            .catch((error) => {
                console.log('error', error);
                return [];
            });

        const results = await Promise.allSettled([
            allProductPromise,
            allCollectionsPromise,
            allPagesPromise,
        ]);

        const promiseResult = (result, fallback) =>
            result.status === 'fulfilled' ? result.value : fallback;

        return {
            products: promiseResult(results[0], []),
            collections: promiseResult(results[1], []),
            pages: promiseResult(results[2], []),
        };
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

const appendToSitemap = (sitemap, url, changeFrequency, lastModified) => {
    if (typeof _sitemapNode === 'string') {
        return (
            sitemap +
            _sitemapNode
                .replace('{url}', url)
                .replace('{changeFrequency}', changeFrequency)
                .replace('{lastModified}', lastModified)
        );
    }
    console.error('_sitemapNode is not a string');
    return sitemap;
};

module.exports = async (request, response) => {
    try {
        const shopContext = getContext('intl');
        const { storefrontUrl } = shopContext;

        if (!storefrontUrl) {
            Sentry.captureException(new Error('storefrontUrl is undefined'));
            return;
        }

        let sitemapXML = finalSitemapHeader;
        const { products, collections, pages } =
            await fetchAllData(shopContext);

        pages.forEach(({ uid, type, last_publication_date }) => {
            const path =
                type === 'blog_article'
                    ? 'stories'
                    : type === 'careers'
                    ? 'careers'
                    : 'pages';
            const lastModified = formatDate(last_publication_date);
            sitemapXML = appendToSitemap(
                sitemapXML,
                `${storefrontUrl}${path}/${uid}`,
                'daily',
                lastModified
            );
        });

        const allEdges = [
            ...collections.map((edge) => ({ ...edge, path: 'collections' })),
            ...products.map((edge) => ({ ...edge, path: 'products' })),
        ];

        allEdges.forEach(({ path, node }) => {
            const { handle, updatedAt } = node;
            const lastModified = formatDate(updatedAt);
            sitemapXML = appendToSitemap(
                sitemapXML,
                `${storefrontUrl}${path}/${handle}`,
                'daily',
                lastModified
            );
        });

        // Check if sitemapXML is well-formed and not empty
        if (!sitemapXML || sitemapXML === finalSitemapHeader) {
            Sentry.captureException(new Error('Generated sitemapXML is empty'));
            response.status(500).send('Internal Server Error');
            return; // Make sure to return here to exit the function
        }

        sitemapXML += '</urlset>';

        response.setHeader(
            'Cache-Control',
            's-maxage=360, stale-while-revalidate'
        );
        response.setHeader('Content-Type', 'application/xml; charset=utf-8');
        response.status(200).send(sitemapXML);
    } catch (error) {
        Sentry.captureException(error);

        // Make sure no response has been sent before sending an error response
        if (!response.headersSent) {
            response.status(500).send('Internal Server Error');
        }
    }
};
