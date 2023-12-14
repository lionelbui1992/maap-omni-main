export type ShopifySortKey = null | 'PRICE' | 'PRICE' | 'CREATED';

export type ShopifySort = {
    sortKey: ShopifySortKey;
    reverse: boolean;
};
