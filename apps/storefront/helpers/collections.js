import getClient from 'services/ShopifyGQL';
import gqlQuery from '../pages/collections/query';
import gqlQueryWithProducts from '../pages/collections/queryWithProducts';
import { Client } from './prismic';
import { captureException } from '@sentry/nextjs';

export async function getShopifyCollectionByHandle(
    context,
    handle,
    fetchAllProductPages = false
) {
    const shopify = getClient(
        context.shopifyStorefrontUrl,
        context.shopifyStorefrontToken
    );

    const baseCollectionGqlQuery = gqlQuery(handle, null);

    try {
        const response = await shopify(baseCollectionGqlQuery);
        const baseCollection = response.collectionByHandle;
        let moreProductsAvailable =
            baseCollection?.products.pageInfo.hasNextPage;

        if (fetchAllProductPages && moreProductsAvailable) {
            let lastCursor = baseCollection.products.edges.slice(-1)[0].cursor;

            /* Iteration has a dependency, loop cannot be async. */
            /* eslint-disable no-await-in-loop */
            while (moreProductsAvailable) {
                const nextCollectionGqlQuery = gqlQuery(handle, lastCursor);
                const nextResponse = await shopify(nextCollectionGqlQuery);
                const nextSet = nextResponse.collectionByHandle;

                baseCollection.products.edges.push(...nextSet.products.edges);

                moreProductsAvailable = nextSet.products.pageInfo.hasNextPage;
                lastCursor = nextSet.products.edges.slice(-1)[0].cursor;
            }
            /* eslint-enable no-await-in-loop */
        }

        return response.collectionByHandle;
    } catch (error) {
        captureException(error);
    }
}

export async function getShopifyCollectionByHandleWithProductsForBundler(
    context,
    handle,
    fetchAllProductPages = false
) {
    const shopify = getClient(
        context.shopifyStorefrontUrl,
        context.shopifyStorefrontToken
    );

    const baseCollectionGqlQuery = gqlQueryWithProducts(handle, 180);

    try {
        const response = await shopify(baseCollectionGqlQuery);
        const baseCollection = response.collectionByHandle;
        // let moreProductsAvailable =
        //     baseCollection?.products.pageInfo.hasNextPage;

        // if (fetchAllProductPages && moreProductsAvailable) {
        //     let lastCursor = baseCollection.products.edges.slice(-1)[0].cursor;
        //
        //     /* Iteration has a dependency, loop cannot be async. */
        //     /* eslint-disable no-await-in-loop */
        //     while (moreProductsAvailable) {
        //         const nextCollectionGqlQuery = gqlQueryWithProducts(
        //             handle,
        //             lastCursor
        //         );
        //         const nextResponse = await shopify(nextCollectionGqlQuery);
        //         const nextSet = nextResponse.collectionByHandle;
        //
        //         baseCollection.products.edges.push(...nextSet.products.edges);
        //
        //         moreProductsAvailable = nextSet.products.pageInfo.hasNextPage;
        //         lastCursor = nextSet.products.edges.slice(-1)[0].cursor;
        //     }
        //     /* eslint-enable no-await-in-loop */
        // }

        return response.collectionByHandle;
    } catch (error) {
        captureException(error);
    }
}

export async function getPrismicDocumentForCollection(
    context,
    handle,
    request = null
) {
    const prismicDocument = await Client(request)
        .getByUID('collection', handle, { lang: context.language })
        .catch((e) => {
            captureException(e);
            return null;
        })
        .then((response) => {
            return response;
        });

    if (typeof prismicDocument === 'undefined') return null;

    return prismicDocument;
}

export async function getPrismicDocumentForConfidenceCallOut(
    context,
    request = null
) {
    const prismicCollectionDocument = await Client(request)
        .getByUID('confidence_call_outs', 'confidence-call-out', {
            lang: context.language,
        })
        .catch((e) => {
            return null;
        })
        .then((response) => {
            return response;
        });

    if (typeof prismicCollectionDocument === 'undefined') return null;

    return prismicCollectionDocument;
}

function findCollectionInGroup(group, handle) {
    let groupName = group.primary.nav_title1;
    let groupLink = group.primary.nav_title_link;

    const collection = group.items.find((collectionLevel) => {
        return collectionLevel.child_nav_link === `/collections/${handle}`;
    });

    if (collection) {
        return [groupName, groupLink];
    }

    return null;
}

export function getPageIALocation(handle, nav) {
    let groupTitleMan = null;
    let groupTitleWoman = null;

    if (handle === 'on-bike-man') return ['Man'];
    if (handle === 'on-bike-woman') return ['Woman'];
    if (handle === 'cycling-accessories') return ['Both'];

    nav.man_sub_navigation
        .filter((item) => item.slice_type === '2nd_level')
        .forEach((group) => {
            const foundGroupTitle = findCollectionInGroup(group, handle);
            if (foundGroupTitle) groupTitleMan = foundGroupTitle;
        });

    nav.woman_sub_navigation
        .filter((item) => item.slice_type === '2nd_level')
        .forEach((group) => {
            const foundGroupTitle = findCollectionInGroup(group, handle);
            if (foundGroupTitle) groupTitleWoman = foundGroupTitle;
        });

    if (groupTitleMan && groupTitleWoman) {
        return ['Both', groupTitleMan];
    }

    // If the group title is not from header menu, both women and men.
    if (!groupTitleMan && !groupTitleWoman) {
        return ['Both'];
    }

    // If the group title is in both genders, its not man or woman.
    if (groupTitleMan) return ['Man', groupTitleMan];

    return ['Woman', groupTitleWoman];
}
