export interface Context {
    label: string;
    code: string;
    routePrefix: string | null;
    language: string;
    shopifyDomain: string;
    shopifyStorefrontToken: string;
    gtmContainerID: string;
    klaviyoCompanyID: string;
    justUNOID: string;
    flag: string;
    loopApiKey: string;
    nostoAccountID: string;
    tiktokTrackingCode?: string;
    pinterestTagId?: string;
}

export type Environment = {
    contexts: Context[];
    services: { [key: { [key: any] }] };
};
