import React from 'react';
import { PatternPillCluster, PillClusterPillInput } from 'mmds';
import { ActiveFiltersViewProps } from '../types';

export function ActiveFiltersView({
    filters,
    count,
    onRemoveFilter,
}: ActiveFiltersViewProps): JSX.Element {
    const pillCluster: PillClusterPillInput[] = filters.map((filter, index) => {
        // The first pill displays a product count and takes different styles
        // if (index === 0) {
        //     const countLabel =
        //         count !== 1 ? `${count} Products` : `${count} Product`;
        //     return {
        //         label: countLabel,
        //         componentType: 'pinger',
        //         pingerVariant: 'ghost',
        //         inactive: true,
        //     };
        // }

        // Rest of the pills...
        // const activeFilterLabel = filter.label
        //     ? `${filter.label}: ${filter.options}`
        //     : filter.options;
        return {
            label: filter.label,
            componentType: 'pinger',
            pingerVariant: 'ghost',
            active: true,
            icon: 'close',
        };
    });

    const cluster = pillCluster.map((pill, index) => ({
        ...pill,
        onClick: () => {
            onRemoveFilter(filters[index]);
        },
    }));

    return <PatternPillCluster cluster={cluster} nowrap />;
}
