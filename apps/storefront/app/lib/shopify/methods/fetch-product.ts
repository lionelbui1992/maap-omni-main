import { Product } from 'shopify-storefront-api-typings';
import { getClient, productByHandle } from '../../../lib/shopify';

export default async (handle): Promise<Product | null> => {
    try {
        const productRes = await getClient().request.send({
            query: productByHandle,
            variables: { handle },
        });
        if (!productRes?.productByHandle) return null;
        return productRes?.productByHandle;
    } catch (e) {
        console.error(`Couldn't fetch product with handle "${handle}"`, e);
    }
    return null;
};
