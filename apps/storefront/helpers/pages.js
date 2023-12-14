import getClient from 'services/ShopifyGQL';
import gqlQuery from '../pages/pages/query';
import { captureException } from '@sentry/nextjs';

export async function getShopifyPageByHandle(context, handle) {
    const shopify = getClient(
        context.shopifyStorefrontUrl,
        context.shopifyStorefrontToken
    );

    const pageGqlQuery = gqlQuery(handle, null);

    try {
        const response = await shopify(pageGqlQuery);

        return response.pageByHandle;
    } catch (error) {
        console.log(error.message);
        captureException(error);
    }
}
