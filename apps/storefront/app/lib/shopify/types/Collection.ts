import { Collection, ProductConnection } from 'shopify-storefront-api-typings';

export type ProductConnectionWithFilters = ProductConnection & { filters: any };

export type ShopifyCollection = Collection & {
    products: ProductConnectionWithFilters;
};
