import getClient from 'services/ShopifyGQL';
import gqlQuery from '@lib/gql/article';
import { captureException } from '@sentry/nextjs';

export async function getShopifyArticleByHandle(context, handle) {
    const shopify = getClient(
        context.shopifyStorefrontUrl,
        context.shopifyStorefrontToken
    );

    const articleGqlQuery = gqlQuery(handle, null);

    try {
        const response = await shopify(articleGqlQuery);

        return response.blogByHandle.articleByHandle;
    } catch (error) {
        captureException(error);
        return null;
    }
}
