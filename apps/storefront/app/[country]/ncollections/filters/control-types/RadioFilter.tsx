import React from 'react';
import { RadioGroup } from 'mmds';
import { RadioFilterProps } from '../types';

export const RadioFilter = ({
    options,
    ariaLabel,
    selectedFilters,
}: RadioFilterProps) => {
    const validOptions = options.filter(
        (option) => option.value !== undefined
    ) as {
        label: string;
        value: string;
    }[];
    return <RadioGroup options={validOptions} ariaLabel={ariaLabel} />;
};
