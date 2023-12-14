import { FilteringToolbarCallbacks } from '../../ncollections/filtering-toolbar/types';
import { ShopifyFilter } from '../../../lib/shopify/types/Filter';

export type Option = {
    label: string;
    value: string;
};

export type FilterComponentProps = {
    options: Option[];
    selectedFilters?: ShopifyFilter[];
    type?: string;
    ariaLabel?: string;
    onSelectFilter: (filter: any) => void;
};

export type PillFilterProps = FilterComponentProps;

export type CheckboxFilterProps = FilterComponentProps;

export type RadioFilterProps = FilterComponentProps;

export type FilterGroupItem = {
    id: string;
    label: string;
    values: Option[];
    ariaLabel?: string;
    type: 'pill' | 'radio' | 'checkbox';
};

export type FilterGroupProps = {
    items: FilterGroupItem[];
    activeFilters?: string[];
};

export type FiltersDrawerProps = {
    availableFilters: FilterGroupItem[];
    selectedFilters: ShopifyFilter[];
    productCount: number;
    callbacks: FilteringToolbarCallbacks;
};
