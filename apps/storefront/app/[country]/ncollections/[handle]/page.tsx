import React from 'react';
import { notFound } from 'next/navigation';
import CollectionSlices from '../collection-slices/collection-slices';
import ManagedWayfinder from '../managed-wayfinder/managed-wayfinder';
import FilterableGrid from '../filterable-grid/filterable-grid';
import DefaultCollectionFilters from '@app/lib/shopify/filters/default-collection-filters';
import { ShopifyCollection } from '@app/lib/shopify/types/Collection';
import s from './collections.module.css';
import { getContext } from '@app/lib/store-context/get-context';
import { ShopifyClientContext } from '@app/lib/shopify/client';
import { collectionByHandle, getClient } from '@app/lib/shopify';
import fetchCollectionSeo from '@app/lib/prismic/methods/fetch-collection-seo';
import CollectionDescription from '../collection-description/collection-description';
import countProductsInCollection from '@app/lib/shopify/methods/count-products-in-collection';

// Country is available in param.country.
// check next config for rewrite.
export default async function Page({ params }) {
    if (!params || !params?.handle) return notFound();
    let collection: ShopifyCollection | null = null;
    const context = getContext(params.country);
    const clientSettings: ShopifyClientContext = {
        shopifyDomain: context.shopifyDomain,
        storefrontAccessToken: context.shopifyStorefrontToken,
        languageCode: context.shopifyStorefrontToken,
        countryCode: context.shopifyStorefrontToken,
    };
    const totalProductCount: number = await countProductsInCollection(
        clientSettings,
        params.handle,
        DefaultCollectionFilters
    );
    try {
        const collectionResponse = await getClient(clientSettings).request.send(
            {
                query: collectionByHandle,
                variables: {
                    handle: params.handle,
                    first: 34,
                    filters: DefaultCollectionFilters,
                },
            }
        );
        collection = collectionResponse?.collectionByHandle;
    } catch (error) {
        console.log(
            `Couldn\t fetch collection with handle: ["${params.handle}"]`,
            error
        );
    }

    if (!collection) {
        return notFound();
    }

    // Fetch from legacy prismic repo
    const collectionSEO = await fetchCollectionSeo(null, params.handle);

    return (
        <div className={s.root}>
            <CollectionSlices handle={params?.handle} set="above-grid" />
            <ManagedWayfinder
                handle={params?.handle}
                totalProductCount={totalProductCount}
                shopifyClientSettings={clientSettings}
            />
            <div className={s.outerGrid}>
                <FilterableGrid
                    collection={collection}
                    shopifyClientSettings={clientSettings}
                    totalProductCount={totalProductCount}
                />
            </div>
            <CollectionDescription collection={collectionSEO} />
        </div>
    );
}
