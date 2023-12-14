import React from 'react';
import PropTypes from 'prop-types';
import { getGlobalPrismicDocuments } from 'containers/SimplifiedLayout/helpers';
import SimplifiedLayout from 'containers/SimplifiedLayout';
import { getDocumentsByTag } from 'helpers/prismic';
import { getAllFromAlgoliaIndex } from 'helpers/algolia';
import HtmlSitemap from 'containers/HtmlSitemap';
import { getContext } from '@lib/get-context';

function Sitemap({ pages, articles, collections, products, ...globals }) {
    return (
        <SimplifiedLayout {...globals}>
            <HtmlSitemap
                pages={pages}
                articles={articles}
                collections={collections}
                products={products}
            />
        </SimplifiedLayout>
    );
}

export async function getStaticProps({ params }) {
    const { country } = params;
    const shopContext = getContext(country);

    const { code, language } = shopContext;

    const globalPrismicDocuments = await getGlobalPrismicDocuments(
        shopContext,
        language
    );

    const products = await getAllFromAlgoliaIndex(
        shopContext.algoliaProductIndex
    );
    const collections = await getAllFromAlgoliaIndex(
        shopContext.algoliaCollectionsIndex
    );
    const articles = await getAllFromAlgoliaIndex(
        shopContext.algoliaArticlesIndex
    );
    const pages = await getDocumentsByTag(['show_in_sitemap'], '*');

    return {
        props: {
            regionCode: code,
            shopContext,
            localeCode: language,
            ...globalPrismicDocuments,
            products,
            collections,
            articles,
            pages,
        },
    };
}

export function getStaticPaths() {
    return {
        paths: [
            { params: { country: 'us' } },
            { params: { country: 'eu' } },
            { params: { country: 'uk' } },
        ],
        fallback: false,
    };
}

Sitemap.propTypes = {
    pages: PropTypes.array,
    products: PropTypes.array,
    collections: PropTypes.array,
    articles: PropTypes.array,
};

export default Sitemap;
