import { formatDate } from './_helpers';
import { getContext } from '@lib/get-context';
import { getAllProducts, getAllCollections } from 'lib/Shopify';
import _sitemapHeader from './templates/_sitemapHreflangHeader';
import _sitemapHreflangNode from './templates/_sitemapHrefLangNode';
import _sitemapHrefLangAlternative from './templates/_sitemapHrefLangAlternative';

module.exports = async (request, response) => {
    const shopContext = getContext('intl');
    const { storefrontUrl } = shopContext;

    let sitemapXML = _sitemapHeader;
    let products = [];
    let collections = [];

    const allProductPromise = getAllProducts(shopContext);
    const allCollectionsPromise = getAllCollections(shopContext);

    const promiseResult = (result, fallback) =>
        result.status === 'fulfilled' ? result.value : fallback;

    await Promise.allSettled([allProductPromise, allCollectionsPromise]).then(
        (results) => {
            products = promiseResult(results[0], []);
            collections = promiseResult(results[1], []);
        }
    );

    [
        ...collections.map((edge) => ({ ...edge, path: 'collections' })),
        ...products.map((edge) => ({ ...edge, path: 'products' })),
    ].forEach((edge) => {
        const { path, node } = edge;
        const { handle } = node;
        let alternativesXML = '';
        ['us', 'uk', 'eu'].forEach((alternative) => {
            alternativesXML += _sitemapHrefLangAlternative
                .replace('{lang}', alternative)
                .replace(
                    '{url}',
                    `${storefrontUrl}${alternative}/${path}/${handle}`
                );
        });
        sitemapXML += _sitemapHreflangNode
            .replace('{url}', `${storefrontUrl}${path}/${handle}`)
            .replace('{alternatives}', alternativesXML);
    });

    sitemapXML += '</urlset>';

    response.setHeader('Cache-Control', 's-maxage=360, stale-while-revalidate');
    response.setHeader('Content-Type', 'application/xml; charset=utf-8');
    response.status(200).send(sitemapXML);
    return true;
};
