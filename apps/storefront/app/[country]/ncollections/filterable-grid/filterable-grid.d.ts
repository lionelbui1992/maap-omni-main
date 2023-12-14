import { ShopifyCollection } from '@app/lib/shopify/types/Collection';
import { ShopifyClientContext } from '@app/lib/shopify/client';

export type FilterableGridProps = {
    collection: ShopifyCollection;
    shopifyClientSettings: ShopifyClientContext;
    totalProductCount: number;
};
