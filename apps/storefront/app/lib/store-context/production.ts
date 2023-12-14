// This is the production config
import { Environment } from '@app/lib/store-context/Context';

const production: Environment = {
    contexts: [
        {
            label: 'Asia Pacific',
            code: 'INTL',
            routePrefix: null,
            language: 'en-au',
            shopifyDomain: 'maapintl.maap.cc',
            shopifyStorefrontToken: '500bc9fa57d0e0d1100dbbd63da079f9',
            gtmContainerID: 'GTM-MM7SMP',
            klaviyoCompanyID: 'an79Sm',
            justUNOID: 'E2B3CB0F-64E3-4DF9-9890-36197C1121A8',
            flag: 'https://cdn.shopify.com/s/files/1/0510/7809/files/flag-australia.png',
            loopApiKey: '5993c78331f6f361e63199aa4c5fa0caa4153b80',
            nostoAccountID: 'shopify-5107809',
            tiktokTrackingCode: 'CFQO3CBC77UBIS8PJ4MG',
            pinterestTagId: '2612528985582',
        },
        {
            label: 'America',
            code: 'US',
            routePrefix: 'us',
            language: 'en-us',
            shopifyDomain: 'maapus.maap.cc',
            shopifyStorefrontToken: '30f853242eb81fc4de306a58e2f959d8',
            gtmContainerID: 'GTM-P533ZR',
            klaviyoCompanyID: 'spuDKT',
            justUNOID: 'A75CCE1D-1B46-413A-A33D-6A775FF746F5',
            flag: 'https://cdn.shopify.com/s/files/1/1431/8222/files/flag-united-states.png',
            loopApiKey: 'cba32d78e5d33b3c2d6678e671e15f4a1f3321a7',
            nostoAccountID: 'shopify-14318222',
        },
        {
            label: 'Europe',
            code: 'EU',
            routePrefix: 'eu',
            language: 'en-eu',
            shopifyDomain: 'maapeu.maap.cc',
            shopifyStorefrontToken: '84b0e23a57ca2ba6307896b2ad2e9f5a',
            gtmContainerID: 'GTM-58N9VRS',
            klaviyoCompanyID: 'K5Bis4',
            justUNOID: '0E16CF97-28B4-4576-AB4F-48FF09D14C38',
            flag: 'https://cdn.shopify.com/s/files/1/2180/3833/files/flag-europe.png',
            loopApiKey: '7323e4a3c1e5165077876f377d05b83509549c93',
            nostoAccountID: 'shopify-21803833',
        },
        {
            label: 'United Kingdom',
            code: 'UK',
            routePrefix: 'uk',
            language: 'en-uk',
            shopifyDomain: 'maapuk.maap.cc',
            shopifyStorefrontToken: '1281400f87990117c7e16ed5e7636c83',
            gtmContainerID: 'GTM-N9BKK9N',
            klaviyoCompanyID: 'YwMLxd',
            justUNOID: 'BD0B9D97-5533-408C-860B-5C1ED134DD93',
            flag: 'https://cdn.shopify.com/s/files/1/0570/5446/2121/files/flag-united-kingdom.png',
            loopApiKey: 'c99106a716c8b9ab07940280a6124ea570c77082',
            nostoAccountID: 'shopify-57054462121',
        },
    ],
    services: {
        algolia: {
            applicationID: '9KZ3AQR8PN',
            apiKey: '0fce7a190e07c0e23b86cffd188fbc2e',
        },
        zendesk: {
            key: '88e48c99-2339-48c8-86f2-45da47af6e2f',
        },
    },
};

export default production;
