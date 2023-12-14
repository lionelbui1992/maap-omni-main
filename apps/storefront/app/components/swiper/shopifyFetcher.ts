import { ProductEdge } from 'shopify-storefront-api-typings';
import { logError } from '../../lib/logger';
import { getClient, collectionByHandle } from '../../lib/shopify';

export default function shopifyFetcher(
    handle: string | undefined,
    first: number
): Promise<{ edges: ProductEdge[]; handle?: string; error?: any }> {
    return new Promise((resolve, reject) => {
        try {
            getClient()
                .request.send({
                    query: collectionByHandle,
                    variables: {
                        handle: handle,
                        first: first,
                        next: { tags: ['collections'] },
                    },
                })
                .then((data) => {
                    if (data.error) {
                        logError(data.error);
                        reject({ edges: [], handle, error: data.error });
                    }

                    const edges = data.collectionByHandle.products.edges;

                    resolve({ edges, handle });
                })
                .catch((error) => {
                    logError('error fetching collection data from Shopify');
                    logError(error);
                    reject({ edges: [], handle, error });
                });
        } catch (error: unknown) {
            logError('error fetching collection data from Shopify');
            logError(error);
            reject({ edges: [], error });
            return null;
        }
    });
}
