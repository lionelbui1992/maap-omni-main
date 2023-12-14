import { ShopifyClientContext } from '@app/lib/shopify/client';

export type ManagedWayfinderProps = {
    handle: string;
    totalProductCount?: number;
    shopifyClientSettings: ShopifyClientContext;
};
