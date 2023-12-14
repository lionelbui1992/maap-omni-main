// @ts-nocheck
import CollectionPage, { CollectionState } from 'pages/collections/[handle]';
import { getContext } from '@lib/get-context';
import { normaliseCollectionProductEdges } from '@lib/collection-products-normaliser';
import { getShopifyCollectionByHandleForServer } from '@lib/shopify-collection/get-collection-by-handle';
import { getGlobalPrismicDocuments } from '@containers/SimplifiedLayout/helpers';
import {
    getPageIALocation,
    getPrismicDocumentForCollection,
    getPrismicDocumentForConfidenceCallOut,
} from 'helpers/collections';
import {
    seoObjectFromMetafields,
    seoValuesWithDefaults,
} from 'helpers/metafields';

import { getPopularCollections } from '@containers/Product/ssgHelpers';

export async function getStaticProps({ params }) {
    const { handle, country } = params;

    const shopContext = getContext(country);

    const { metaTitlePostfix, collectionMetaDescriptionPostfix } = shopContext;

    // We filter on this metafield to only show products that are active.
    // have some rules that are not natively supported. E.g. notify me products.
    const defaultFilters = [
        {
            productMetafield: {
                namespace: 'custom',
                key: 'product_stock_status',
                value: 'ACTIVE',
            },
        },
    ];

    const collection = await getShopifyCollectionByHandleForServer(
        shopContext,
        handle,
        defaultFilters
    );

    if (!collection) {
        return {
            notFound: true,
        };
    }

    const globalPrismicDocumentsPromise = getGlobalPrismicDocuments(
        null,
        shopContext.language
    );

    const collectionPrismicDocumentPromise = getPrismicDocumentForCollection(
        shopContext,
        handle,
        null
    );

    const confidenceCallOutPrismicDocumentPromise =
        getPrismicDocumentForConfidenceCallOut(shopContext, null);

    let globalPrismicDocuments = null;
    let collectionPrismicDocument = null;
    let confidenceCallOutPrismicDocument = null;

    const promiseResult = (result, fallback) =>
        result.status === 'fulfilled' ? result.value : fallback;

    await Promise.allSettled([
        globalPrismicDocumentsPromise,
        collectionPrismicDocumentPromise,
        confidenceCallOutPrismicDocumentPromise,
    ]).then((results) => {
        globalPrismicDocuments = promiseResult(results[0], null);
        collectionPrismicDocument = promiseResult(results[1], { data: null });
        confidenceCallOutPrismicDocument = promiseResult(results[2], {
            data: null,
        });
    });

    const informationArchitecturePageLocation = getPageIALocation(
        handle,
        globalPrismicDocuments.megaNav.data
    );

    const serverSideProducts = normaliseCollectionProductEdges(
        collection?.products?.edges
    );

    const initialState: CollectionState = {
        handle: collection?.handle,
        filters: defaultFilters,
        products: serverSideProducts,
        cursor: serverSideProducts.slice(-1)[0]?.cursor || null,
        hasNextPage: collection?.products.pageInfo.hasNextPage,
        sort: {},
    };

    const availableFilters = collection?.products.filters;

    const seoValues = seoValuesWithDefaults(
        seoObjectFromMetafields(collection?.metafields),
        {
            title: `${collection?.title} ${metaTitlePostfix}`,
            description: `${collection?.description} ${collectionMetaDescriptionPostfix}`,
        }
    );

    let productTiles = [];
    if (collectionPrismicDocument && collectionPrismicDocument.data) {
        const tilesSlice = collectionPrismicDocument?.data?.body?.filter(
            (slice) => {
                return slice.slice_type === 'product_tile';
            }
        );

        if (tilesSlice) {
            productTiles = tilesSlice[0]?.items || null;
        }
    }

    // Reduce HTML Payload size
    delete collection.products;

    return {
        props: {
            shopContext,
            ...globalPrismicDocuments,
            collection: collection ? collection : null,
            availableFilters,
            initialState,
            collectionPrismicDocument,
            productTiles,
            confidenceCallOutPrismicDocument,
            informationArchitecturePageLocation,
            seoValues,
        },
        revalidate: 360,
    };
}

export async function getStaticPaths() {
    let usPaths = [];
    let euPaths = [];
    let ukPaths = [];

    const popularCollectionsUSPromise = getPopularCollections(getContext('us'));
    const popularCollectionsEUPromise = getPopularCollections(getContext('eu'));
    const popularCollectionsUKPromise = getPopularCollections(getContext('uk'));

    const promiseResult = (result, country) => {
        const edges = result.status === 'fulfilled' ? result.value : [];
        return edges.map((edge) => ({
            params: { country, handle: edge.node.handle },
        }));
    };

    await Promise.allSettled([
        popularCollectionsUSPromise,
        popularCollectionsEUPromise,
        popularCollectionsUKPromise,
    ]).then((results) => {
        usPaths = promiseResult(results[0], 'us');
        euPaths = promiseResult(results[1], 'eu');
        ukPaths = promiseResult(results[2], 'uk');
    });

    const paths = [...usPaths, ...euPaths, ...ukPaths];

    return {
        paths: paths,
        fallback: 'blocking',
    };
}

export default CollectionPage;
