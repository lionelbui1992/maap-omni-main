import FiltersDrawer from '../filters';
import { sizeSort } from '@app/lib/shopify/filters/size-filter-order';
import { FilteringToolbarCallbacks } from '../filtering-toolbar/types';
import { ShopifyFilter } from '@app/lib/shopify/types/Filter';

type ManagedFiltersDrawerProps = {
    availableFilters: any;
    selectedFilters: any;
    productCount: number;
    callbacks: FilteringToolbarCallbacks;
};

export default ({
    availableFilters,
    selectedFilters,
    productCount,
    callbacks,
}: ManagedFiltersDrawerProps) => {
    let filterGroups: any[] = [];
    const pushFilterIfAvailable = (
        label: string,
        id: string,
        sort = (a, b) => {
            return b.count - a.count;
        }
    ) => {
        const filter = availableFilters.find((x) => x.id === id);
        if (filter) {
            filter.label = label;
            filterGroups.push({
                ...filter,
                label,
                values: filter?.values.sort(sort),
            });
        }
    };

    pushFilterIfAvailable('Type', 'filter.p.m.custom.product_type');
    pushFilterIfAvailable('Purpose', 'filter.p.m.custom.purpose');
    pushFilterIfAvailable('Gender', 'filter.p.m.custom.gender_multiselect');
    pushFilterIfAvailable('Size', 'filter.v.option.size', sizeSort);
    pushFilterIfAvailable('Colour', 'filter.p.m.custom.colour_family_1');
    pushFilterIfAvailable('Range', 'filter.p.m.custom.maap_range');
    pushFilterIfAvailable('Season', 'filter.p.m.custom.season');
    pushFilterIfAvailable('Length', 'filter.p.m.custom.length_attribute');

    const filteringCallbacks: FilteringToolbarCallbacks = {
        ...callbacks,
        applyFilters: (filters) => {
            let newFilters: any[] = [];
            if (filters.length === 0) {
                callbacks.applyFilters([]);
                return;
            }
            const existingFilters: ShopifyFilter[] = filters.filter(
                (filter) => selectedFilters.indexOf(filter) > -1
            );
            newFilters = [...selectedFilters, ...filters];
            newFilters = newFilters.filter((filter) => {
                return existingFilters.indexOf(filter) === -1;
            });
            callbacks.applyFilters(newFilters);
        },
    };

    return (
        <FiltersDrawer
            availableFilters={filterGroups}
            selectedFilters={selectedFilters}
            productCount={productCount}
            callbacks={filteringCallbacks}
        />
    );
};
