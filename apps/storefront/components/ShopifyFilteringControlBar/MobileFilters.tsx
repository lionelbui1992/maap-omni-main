import React from 'react';
import CrossIcon from '@images/small_icon/Close-icon-black.svg';
import classnames from 'classnames';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

const FilterLabel = ({ children }) => {
    return children;
};

const FilterValues = ({ children }) => {
    return children;
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const Filter = ({
    label,
    filterId,
    tagFilter = null,
    availableFilters,
    onSelectFilter,
    filterSelected,
}: {
    label: string;
    filterId: string;
    tagFilter?: string | null;
    availableFilters: any;
    onSelectFilter: any;
    filterSelected: any;
}) => {
    const getFilterById = (id) => {
        return availableFilters.find((filter) => {
            return filter.id === filterId;
        });
    };

    const getFilterValues = (id) => {
        const filter = getFilterById(id);

        if (tagFilter) {
            return filter?.values
                .filter((value) => {
                    return value.label.indexOf(tagFilter) !== -1;
                })
                .map((value) => {
                    return {
                        ...value,
                        label: capitalizeFirstLetter(
                            value.label.replace(tagFilter, '')
                        ),
                    };
                });
        }
        if (filter) {
            return filter.values;
        }
    };

    return (
        <div className="mobileFilterItem">
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        <div className="mobileFilterLabel">
                            <FilterLabel>{label}</FilterLabel>
                        </div>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div className="filterOptionsContainer">
                        <FilterValues>
                            {getFilterValues('filter.v.option.color')
                                ? getFilterValues('filter.v.option.color').map(
                                      (option) => {
                                          const filterIsSelected =
                                              filterSelected(option);
                                          const classes = classnames(
                                              'mobileFilterOption',
                                              {
                                                  selectedFilterCss:
                                                      filterIsSelected,
                                              }
                                          );
                                          return (
                                              <div
                                                  key={`${filterId}-${option.input}-${option.label}`}
                                                  className={classes}
                                                  onClick={() =>
                                                      onSelectFilter(
                                                          option.input
                                                      )
                                                  }
                                              >
                                                  {option.label}

                                                  {filterSelected(option) && (
                                                      <img
                                                          className="crossIcon"
                                                          src={CrossIcon.src}
                                                          alt="Cross Icon"
                                                      />
                                                  )}
                                              </div>
                                          );
                                      }
                                  )
                                : null}
                        </FilterValues>
                    </div>
                </AccordionItemPanel>
            </AccordionItem>
            <style jsx>{`
                .mobileFilterItem {
                    margin-bottom: 40px;
                }
                .mobileFilterLabel {
                }
                .mobileFilterOption {
                    text-align: left;
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    padding: 8px 20px 8px 10px;
                }
                .filterOptionsContainer {
                    margin-top: 20px;
                }
                .mobileFilterOptionItem {
                    padding-bottom: 8px;
                    cursor: pointer;
                }
                .mobileFilterOption:hover {
                    background-color: rgb(241, 241, 241);
                }
                .selectedFilterCss {
                    background-color: rgb(241, 241, 241);
                }
            `}</style>
        </div>
    );
};

const MobileFilters = ({ availableFilters, selectedFilters, dispatch }) => {
    const filterSelected = (fliterValue) => {
        return selectedFilters.find((selectedFilter) => {
            return (
                JSON.stringify(selectedFilter) ===
                fliterValue.input.replace('\\', '')
            );
        });
    };

    const onSelectFilter = (filterInput) => {
        dispatch({
            type: 'filter',
            payload: filterInput,
        });
    };

    return (
        <div className="mobileFiltersContainer">
            <Accordion allowZeroExpanded>
                <Filter
                    label="Size"
                    filterId="filter.v.option.size"
                    onSelectFilter={onSelectFilter}
                    filterSelected={filterSelected}
                    availableFilters={availableFilters}
                />
                <Filter
                    label="Colour"
                    filterId="filter.v.option.color"
                    onSelectFilter={onSelectFilter}
                    filterSelected={filterSelected}
                    availableFilters={availableFilters}
                />

                <Filter
                    label="Fit"
                    filterId="filter.p.tag"
                    tagFilter="fit:"
                    onSelectFilter={onSelectFilter}
                    filterSelected={filterSelected}
                    availableFilters={availableFilters}
                />
                <Filter
                    label="Weather"
                    filterId="filter.p.tag"
                    tagFilter="weather:"
                    onSelectFilter={onSelectFilter}
                    filterSelected={filterSelected}
                    availableFilters={availableFilters}
                />
            </Accordion>
            <style jsx>{`
                .mobileFiltersContainer {
                    padding: 30px 0px;
                }
            `}</style>
        </div>
    );
};

export default MobileFilters;
