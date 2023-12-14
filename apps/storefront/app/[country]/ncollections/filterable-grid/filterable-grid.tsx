'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    ProductConnectionWithFilters,
    ShopifyCollection,
} from '@app/lib/shopify/types/Collection';
import { FilterableGridProps } from './filterable-grid.d';
import { useInView } from 'react-intersection-observer';
import {
    FilteringToolbarCallbacks,
    ProductPhotoVariant,
    View,
} from '../filtering-toolbar/types';
import { trimGID } from '@app/lib/shopify/helpers/gid';
import { Drawer, DrawerPanel } from '@app/components/ui/drawer/Drawer';
import fetchCollection from '@app/lib/shopify/methods/fetch-collection';
import DefaultCollectionFilters from '@app/lib/shopify/filters/default-collection-filters';
import ManagedFiltersDrawer from '../managed-filters-drawer/managed-filters-drawer';
import connectShopify from '@app/ncollections/product-card/connect-shopify';
import FilteringToolbar from '../filtering-toolbar/FilteringToolbar';
import { ShopifyFilter } from '@app/lib/shopify/types/Filter';
import { ShopifySort } from '@app/lib/shopify/types/Sort';
import { ProductCard } from 'mmds';
import s from './filterable-grid.module.css';
import useUI from '@app/components/ui/state';
import { collectionByHandle, getClient } from '@app/lib/shopify';
import { notFound } from 'next/navigation';
import useDrawerDirection from '@app/lib/hooks/use-drawer-direction';

export default ({
    collection,
    shopifyClientSettings,
    totalProductCount,
}: FilterableGridProps) => {
    const ref = useRef();
    const { ref: loadMoreTriggerRef, inView: loadMoreIsInView } = useInView();
    const isMountingRef = useRef(true);
    const isLoadingMoreRef = useRef(false);
    const [productCursor, setProductCursor] = useState<string>();
    const [selectedSort, setSelectedSort] = useState<ShopifySort>({
        sortKey: null,
        reverse: false,
    });
    const [selectedFilters, setSelectedFilters] = useState<ShopifyFilter[]>([]);
    const [productPhotoVariant, setProductPhotoVariant] =
        useState<ProductPhotoVariant>('flatlay');
    const [products, setProducts] = useState<ProductConnectionWithFilters>(
        collection.products
    );
    const filterView: View = selectedFilters.length ? 'activeFilters' : 'count';
    const filteringCallbacks: FilteringToolbarCallbacks = {
        selectProductPhotoVariant: (variant) => setProductPhotoVariant(variant),
        toggleFilteringUI: () => toggleUI('collection-filters'),
        applyFilters: (filters: ShopifyFilter[]) => {
            setSelectedFilters(filters);
        },
        clearFilters: () => setSelectedFilters([]),
    };
    const { edges } = products;
    const productCount = edges.length;

    const { openUIKey, toggleUI } = useUI();
    const isDrawerOpen = openUIKey === 'collection-filters';
    const drawerDirection = useDrawerDirection();

    useEffect(() => {
        let shouldUpdate: boolean = true;
        // Avoid re-fetching the products on first load if no custom filters have been applied
        if (isMountingRef.current && selectedFilters.length === 0) {
            shouldUpdate = false;
        }
        isMountingRef.current = false;
        if (!shouldUpdate) return;

        const refetch = async () => {
            const appliedFilters = [
                ...DefaultCollectionFilters,
                ...selectedFilters.map((filter: ShopifyFilter) =>
                    JSON.parse(filter?.input)
                ),
            ];

            let updatedCollection: ShopifyCollection | null = null;
            try {
                const collectionResponse = await getClient(
                    shopifyClientSettings
                ).request.send({
                    query: collectionByHandle,
                    variables: {
                        handle: collection.handle,
                        first: 34,
                        filters: appliedFilters,
                        sortKey: selectedSort?.sortKey,
                        reverse: selectedSort?.reverse,
                        after: productCursor,
                    },
                });
                updatedCollection = collectionResponse?.collectionByHandle;
            } catch (error) {
                console.log(
                    `Couldn\t collection for "${collection.handle}"`,
                    error
                );
                return notFound();
            }

            if (!updatedCollection) return;

            let mergedUpdatedCollection = updatedCollection;

            if (isLoadingMoreRef.current) {
                mergedUpdatedCollection = {
                    ...updatedCollection,
                    products: {
                        ...(products || {}),
                        edges: [
                            ...products.edges,
                            ...updatedCollection.products.edges,
                        ],
                    },
                };
                isLoadingMoreRef.current = false;
            }
            setProducts(mergedUpdatedCollection.products);
        };
        refetch();
    }, [selectedFilters, productCursor, selectedSort]);

    const setRefs = useCallback(
        (node) => {
            ref.current = node;
            loadMoreTriggerRef(node);
        },
        [loadMoreTriggerRef]
    );

    React.useEffect(() => {
        if (loadMoreIsInView) {
            const hasNextPage = products.pageInfo.hasNextPage;
            if (!hasNextPage) return;
            isLoadingMoreRef.current = true;
            setProductCursor(edges.slice(-1)[0].cursor);
        }
    }, [loadMoreIsInView]);

    const dynamicProductCount = selectedFilters.length
        ? productCount
        : totalProductCount;

    return (
        <>
            <FilteringToolbar
                productCount={dynamicProductCount}
                selectedFilters={selectedFilters}
                selectedProductPhotoVariant={productPhotoVariant}
                currentView={filterView}
                callbacks={filteringCallbacks}
            />
            <Drawer
                open={isDrawerOpen}
                onOpenChange={() =>
                    toggleUI(isDrawerOpen ? null : 'collection-filters')
                }
            >
                <DrawerPanel inFrom={drawerDirection} variant="filters">
                    <ManagedFiltersDrawer
                        selectedFilters={selectedFilters}
                        availableFilters={collection.products.filters}
                        productCount={productCount}
                        callbacks={filteringCallbacks}
                    />
                </DrawerPanel>
            </Drawer>
            <div className={s.grid}>
                {edges.map((edge) => {
                    const ConnectedProductCard = connectShopify(ProductCard);
                    return (
                        <div
                            className={s.product}
                            key={edge.node.id}
                            data-product-id={trimGID(edge.node.id)}
                            data-product-handle={edge.node.handle}
                        >
                            <ConnectedProductCard
                                product={edge.node}
                                photoVariant={productPhotoVariant}
                            />
                        </div>
                    );
                })}
                <span ref={setRefs}></span>
            </div>
        </>
    );
};
