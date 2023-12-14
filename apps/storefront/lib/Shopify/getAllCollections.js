import collections from '@lib/gql/collections';
import getClient from 'services/ShopifyGQL';

const getAllCollections = async (shopContext) => {
    const { shopifyStorefrontUrl, shopifyStorefrontToken } = shopContext;
    const shopify = getClient(shopifyStorefrontUrl, shopifyStorefrontToken);

    const allEdges = [];
    const getAllCollectionsQuery = collections();
    const queryResponse = await shopify(getAllCollectionsQuery);
    const collectionsItems = queryResponse?.collections;
    allEdges.push(...collectionsItems.edges);

    let moreProductsAvailable = collectionsItems?.pageInfo.hasNextPage;

    if (moreProductsAvailable) {
        let lastCursor = collectionsItems.pageInfo.endCursor;

        while (moreProductsAvailable) {
            const nextProductsGqlQuery = collections(lastCursor);
            const nextResponse = await shopify(nextProductsGqlQuery);
            const nextSet = nextResponse.collections;

            allEdges.push(...nextSet.edges);

            moreProductsAvailable = nextSet.pageInfo.hasNextPage;
            lastCursor = nextSet.pageInfo.endCursor;
        }
    }

    return allEdges;
};

export default getAllCollections;
