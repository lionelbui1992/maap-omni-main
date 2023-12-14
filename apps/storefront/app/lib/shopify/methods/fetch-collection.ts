import { getClient, collectionByHandle } from '../../shopify';
import { ShopifyCollection } from '../../shopify/types/Collection';
import { ShopifySortKey } from '../../shopify/types/Sort';
export default async (
    handle,
    first: number = 34,
    filters: any[] = [],
    sortKey: ShopifySortKey = null,
    reverse = false,
    lastCursor: null | string = null
): Promise<ShopifyCollection | null> => {
    try {
        const collectionRes = await getClient().request.send({
            query: collectionByHandle,
            variables: {
                handle,
                first,
                filters,
                sortKey: sortKey,
                reverse: reverse,
                after: lastCursor,
            },
        });
        if (!collectionRes?.collectionByHandle) return null;
        return collectionRes?.collectionByHandle;
    } catch (e) {
        console.log(`Couldn\t collection for "${handle}"`, e);
    }
    return null;
};
