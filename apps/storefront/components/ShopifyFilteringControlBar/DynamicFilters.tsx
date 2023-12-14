import React from 'react';
import CrossIcon from '@images/small_icon/Close-icon-black.svg';
import classnames from 'classnames';

const FilterLabel = ({ children }) => {
    return children;
};

const FilterValues = ({ children }) => {
    return children;
};

const DynamicFilters = ({ availableFilters, selectedFilters, dispatch }) => {
    const filterSelected = (label) => {
        return false;
        // TODO: Create a check for selected filters.
        return !!selectedFilters.find(
            (selectedFilterItem) =>
                selectedFilterItem.variantOption.value === label
        );
    };
    const onSelectFilter = (filterInput) => {
        dispatch({
            type: 'filter',
            payload: filterInput,
        });
    };

    return (
        <>
            {availableFilters.map((filterItem) => {
                return (
                    <div className="deskTopFilterItem">
                        <FilterLabel>{filterItem.label}</FilterLabel>
                        <FilterValues>
                            {filterItem.values.map((option) => {
                                const filterIsSelected = filterSelected(
                                    option.label
                                );
                                const classes = classnames(
                                    'desktopFilterOption',
                                    { selectedFilterCss: filterIsSelected }
                                );
                                return (
                                    <div
                                        className={classes}
                                        onClick={() =>
                                            onSelectFilter(option.input)
                                        }
                                    >
                                        {option.label}
                                        {filterSelected(option.label) && (
                                            <img
                                                className="crossIcon"
                                                src={CrossIcon.src}
                                                alt="Cross Icon"
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </FilterValues>
                    </div>
                );
            })}
        </>
    );
};

export default DynamicFilters;
