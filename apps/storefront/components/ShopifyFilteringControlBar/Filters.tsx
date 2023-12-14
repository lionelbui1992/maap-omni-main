import React, { useEffect, useState } from 'react';
import CrossIcon from '@images/small_icon/Close-icon-black.svg';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import {
    filtersToSearchParams,
    searchParamsToFilters,
} from '@lib/shopify-collection/filter-utils';

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
    const getFilterById = () => {
        return availableFilters.find((filter) => {
            return filter.id === filterId;
        });
    };

    const getFilterValues = () => {
        const filter = getFilterById();

        if (!filter) return null;

        let aviliableFilterValues = filter?.values.filter(
            (value) => !!value.count
        );

        if (filter.id === 'filter.v.option.size') {
            aviliableFilterValues = aviliableFilterValues.slice(0, 20);
        }

        if (filter.id === 'filter.v.option.color') {
            aviliableFilterValues = aviliableFilterValues
                .sort((a, b) => {
                    return b.count - a.count;
                })
                .slice(0, 20);
        }

        if (tagFilter) {
            return aviliableFilterValues
                .filter((value) => {
                    return !!value.count;
                })
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

        return aviliableFilterValues;
    };

    return (
        <div className="deskTopFilterItem">
            <FilterLabel>
                <div className="filterLabel">{label}</div>
            </FilterLabel>
            <FilterValues>
                {getFilterValues()
                    ? getFilterValues().map((option, index) => {
                          const filterIsSelected = filterSelected(option);
                          const classes = classnames('desktopFilterOption', {
                              selectedFilterCss: filterIsSelected,
                          });

                          return (
                              <div
                                  className={classes}
                                  onClick={() => onSelectFilter(option.input)}
                                  key={`${filterId}-${option.input}-${option.label}`}
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
                      })
                    : null}
            </FilterValues>
            <style jsx>{`
                .filterLabel {
                    margin-bottom: 15px;
                }
                .selectedFilterCss {
                    background-color: rgb(241, 241, 241);
                }
                .desktopFilterOption {
                    margin-left: 8px;
                    cursor: pointer;
                    width: 200px;
                    display: flex;
                    justify-content: space-between;
                    padding: 1px 7px;
                    line-height: 1.7;
                }
                .desktopFilterOption:hover {
                    background-color: rgb(241, 241, 241);
                }
                .crossIcon {
                    width: 10px;
                }
            `}</style>
        </div>
    );
};

const Filters = ({ availableFilters, selectedFilters, dispatch }) => {
    const router = useRouter();
    const query = router.query;
    const { handle, ...searchParams } = query;
    const [hasSetInitialFilters, setHasSetInitialFilters] = useState(false);

    // Clear filters if page is manually reloaded. Not sure if this is desired?
    const isPageManuallyReloaded = (): boolean => {
        if (typeof window !== 'undefined') {
            const navigationEntry = performance.getEntriesByType(
                'navigation'
            )[0] as PerformanceNavigationTiming;
            return navigationEntry && navigationEntry.type === 'reload';
        }
        return false;
    };

    useEffect(() => {
        if (router.isReady && !hasSetInitialFilters) {
            if (isPageManuallyReloaded()) {
                dispatch({
                    type: 'clearFilter',
                });
            } else {
                //@ts-ignore
                const params = new URLSearchParams(searchParams);
                const initialFilters = searchParamsToFilters(params) || [];
                
                const availabilityFilter = {
                  available: true,
              };

              const combinedFilters = [availabilityFilter, ...initialFilters];
   
              if (initialFilters.length) {
                dispatch({
                    type: 'setFiltersFromUrl',
                    payload: combinedFilters,
                });
              }
            }
            setHasSetInitialFilters(true);
        } else if (router.isReady && hasSetInitialFilters) {
            // Update the URL with selectedFilters
            const params = filtersToSearchParams(selectedFilters, searchParams);
            const queryParams = new URLSearchParams(params).toString();
            const currentPathWithoutQuery = router.asPath.split('?')[0];
            const newPath = queryParams
                ? `${currentPathWithoutQuery}?${queryParams}`
                : currentPathWithoutQuery;
            router.replace(newPath, undefined, {
                shallow: true,
            });
        }
    }, [router.isReady, selectedFilters]);

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
        <>
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
        </>
    );
};

export default Filters;
