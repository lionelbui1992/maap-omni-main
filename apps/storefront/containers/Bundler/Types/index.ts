import React from 'react';

export type BundleCollection = {
    handle: string;
    title: string;
    key: string;
};

export type Bundle = {
    title: string;
    variant: string;
    handle: string;
    discountPercentage?: number;
    collections: BundleCollection[];
};

export type Product = {
    id: string;
    handle: string;
    title: string;
    price: string;
    image: string;
    variants: {
        edges: {
            node: Variant;
        };
    }[];
};

export type Variant = {
    id: string;
    title: string;
    sku: string;
    priceV2: { amount: string; currencyCode: string };
    product: {
        handle: string;
        tags: string;
        images: {
            edges: {
                node: {
                    transformedSrc: string;
                };
            }[];
        };
    };
    quantityAvailable: number;
    selectedOptions: {
        name: string;
        value: string;
    };
};

export type Collection = {
    id: string;
    title: string;
    handle: string;
    products: {
        edges: {
            node: Product;
        }[];
    };
};

export type AddToCartObject = {
    checkoutId?: string;
    lineItems: {
        variantId: string;
        quantity: number;
        customAttributes: { key: string; value: string }[];
    }[];
};

export type BundleBuilderState = {
    bundle: Bundle | null;
    isFetching: boolean;
    selectedProduct: null | Product;
    selectedCollectionKey: null | string;
    selectedCollectionHandle: null | string;
    fetchedCollections: Collection[];
    chosenBundleVariants: {};
    selectedCollection: null | Collection;
    bundleSize: number;
    bundleId: string | null;
};

export type PrismicBundleDefinition = Array<Bundle>;

export type BundlerProviderProps = {
    bundleDefinition?: PrismicBundleDefinition;
    children: React.ReactNode;
};
