import Client from 'shopify-storefront-client';

export type ShopifyClientContext = {
    shopifyDomain: string;
    languageCode: string;
    countryCode: string;
    storefrontAccessToken: string;
};

const getClientSettings = (context: ShopifyClientContext | null) => ({
    shop: {
        myshopify_domain: context?.shopifyDomain || 'maapapparel.myshopify.com',
        language_code: context?.languageCode || 'EN',
        country_code: context?.countryCode || 'US',
    },
    api: {
        token:
            context?.storefrontAccessToken ||
            (process.env
                .NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_ACCESS_TOKEN_INTL as string),
        version: '2023-10',
    },
});

let client: Client | null = null;
export function getClient(context?: ShopifyClientContext | null) {
    client = Client.fromSettings(getClientSettings(context || null));
    client.getSettings();
    return client;
}

export default getClient;
