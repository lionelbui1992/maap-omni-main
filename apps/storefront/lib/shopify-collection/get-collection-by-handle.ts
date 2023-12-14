// @ts-nocheck
import { captureException } from '@sentry/nextjs';
import getClient from '../../services/ShopifyGQL';
import collectionByHandleQuery from '@lib/gql/collection-by-handle';
import collectionByHandleServerQuery from '@lib/gql/collection-by-handle-server';

const client = (context) => {
    return getClient(
        context.shopifyStorefrontUrl,
        context.shopifyStorefrontToken
    );
};

export async function getShopifyCollectionByHandle(
    context,
    handle,
    filters = null,
    lastCursor = null,
    sortKey = null,
    reverse = null
) {
    const shopify = client(context);
    const variables = {
        handle,
        filters,
        after: lastCursor,
        first: 10,
        sortKey: sortKey,
        reverse: reverse,
    };

    try {
        const response = await shopify(collectionByHandleQuery, variables);
        return response.collectionByHandle;
    } catch (error) {
        captureException(error);
        console.log('error', error);
        return null;
    }
}

export async function getShopifyCollectionByHandleForServer(
    context,
    handle,
    filters = null,
    lastCursor = null,
    first = 10
) {
    const shopify = client(context);

    const variables = {
        handle,
        filters,
        after: lastCursor,
        first: first,
    };

    try {
        const response = await shopify(
            collectionByHandleServerQuery,
            variables
        );
        return response.collectionByHandle;
    } catch (error) {
        captureException(error);
        console.log('error', error);
        return null;
    }
}
