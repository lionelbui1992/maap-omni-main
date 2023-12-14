import { PatternCheckboxGroup } from 'mmds';
import { CheckboxFilterProps } from '../types';

export const CheckboxFilter = ({
    options,
    selectedFilters,
}: CheckboxFilterProps) => {
    return <PatternCheckboxGroup options={options} />;
};
