export type ShopifyProduct = {
    id?: string;
    handle: string;
    title: string;
    description: string;
    images: {
        edges: [
            {
                node: {
                    altText: string;
                    height?: number;
                    weight?: number;
                    transformedSrc: string;
                };
            },
        ];
    };
    metafield?: {
        namespace: string;
        key: string;
        value: string;
    };
    options: [
        {
            name: string;
            values: string[];
        },
        {
            name: string;
            values: string[];
        },
    ];
    variants: {
        edges: [
            {
                node: {
                    id?: string;
                    sku?: string;
                    title?: string;
                    quantityAvailable: number;
                    availableForSale: boolean;
                    priceV2: {
                        amount: number;
                        currencyCode: string;
                    };
                };
            },
        ];
    };
};
