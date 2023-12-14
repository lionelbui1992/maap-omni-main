import { ShopifyFilter } from '../../../lib/shopify/types/Filter';

export type ProductPhotoVariant = 'flatlay' | 'model';

export type Filter = {
    filter?: string;
    value: string;
};

export type View = 'count' | 'wayfinder' | 'activeFilters';

export interface ProductCountViewProps {
    count?: number;
}

export interface WayfinderViewProps {
    // TODO
    contentStructure: any;
    totalProductCount: number;
}

export interface ActiveFiltersViewProps {
    filters: ShopifyFilter[];
    count: number;
    onRemoveFilter: (filter: ShopifyFilter) => void;
}

export type FilteringToolbarCallbacks = {
    toggleFilteringUI: () => void;
    applyFilters: (filters: ShopifyFilter[]) => void;
    selectProductPhotoVariant: (variant: ProductPhotoVariant) => void;
    clearFilters: () => void;
};

export type FilteringToolbarProps = {
    productCount: number;
    selectedFilters: ShopifyFilter[];
    collectionHandle?: string;
    selectedProductPhotoVariant: ProductPhotoVariant;
    callbacks: FilteringToolbarCallbacks;
    currentView: View;
};
