import { getClient } from '@app/lib/shopify';
import collectionQueryForCount from '@app/lib/shopify/queries/collection-query-for-count';
import { ShopifyClientContext } from '@app/lib/shopify/client';
export default async (
    clientSettings: ShopifyClientContext,
    handle: string,
    filters: any[]
) => {
    let totalProductCount = 0;
    try {
        let hasNextPage = true;
        let cursor = null;
        while (hasNextPage) {
            const response = await getClient(clientSettings).request.send({
                query: collectionQueryForCount,
                variables: {
                    handle,
                    filters,
                    after: cursor,
                },
            });
            if (!response?.collectionByHandle)
                throw new Error(`No collectionByHandle.`);
            const { products } = response?.collectionByHandle;
            cursor = products.pageInfo.endCursor;
            hasNextPage = products.pageInfo.hasNextPage;
            totalProductCount += products.nodes.length;
        }
        return totalProductCount;
    } catch (error) {
        console.log(
            `Couldn\t fetch collection with handle: [${handle}] during product count operation (lib/shopify/methods)`,
            error
        );
        return totalProductCount;
    }
};
