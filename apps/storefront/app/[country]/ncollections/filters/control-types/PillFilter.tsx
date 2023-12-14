import React from 'react';
import { PatternPillCluster } from 'mmds';
import { PillFilterProps } from '../types';
import { ShopifyFilter } from '@app/lib/shopify/types/Filter';

export const PillFilter = ({
    options,
    selectedFilters,
    onSelectFilter,
}: PillFilterProps) => {
    // An example of getting the 'active' state.
    const activeFilterLabels = selectedFilters?.map(
        (filter: ShopifyFilter) => filter.label
    );
    const pills = options.map((option) => {
        return {
            ...option,
            active: activeFilterLabels?.includes(option.label),
            onClick: () => onSelectFilter(option),
        };
    });

    return <PatternPillCluster cluster={pills} />;
};
