import React from 'react';
import { PillFilter, RadioFilter, CheckboxFilter } from './control-types';
import { FilterComponentProps } from './types';

export function FilterGroup({
    type,
    options,
    selectedFilters,
    ariaLabel,
    onSelectFilter,
}: FilterComponentProps): JSX.Element | null {
    switch (type) {
        case 'LIST':
            return (
                <PillFilter
                    options={options}
                    selectedFilters={selectedFilters}
                    onSelectFilter={onSelectFilter}
                />
            );
        case 'radio':
            return (
                <RadioFilter
                    options={options}
                    selectedFilters={selectedFilters}
                    ariaLabel={ariaLabel}
                    onSelectFilter={onSelectFilter}
                />
            );
        case 'checkbox':
            return (
                <CheckboxFilter
                    options={options}
                    selectedFilters={selectedFilters}
                    onSelectFilter={onSelectFilter}
                />
            );
        default:
            return null;
    }
}
