// Convert the filter array to an object suitable for URLSearchParams
// @ts-nocheck
const AVAILABLE_FILTERS = ['size', 'color', 'weather', 'fit'];

export function filtersToSearchParams(filters, currentSearchParams = {}) {
    const params = new URLSearchParams();

    // If country is present in currentSearchParams, add it to the params
    // @ts-ignore
    if (currentSearchParams.country) {
        // @ts-ignore
        params.set('country', currentSearchParams.country);
    }

    filters.forEach((filter) => {
        if (filter.variantOption) {
            const { name, value } = filter.variantOption;
            if (name && value) {
                const existingValue = params.get(name);
                if (existingValue) {
                    params.set(name, `${existingValue},${value}`);
                } else {
                    params.set(name, value);
                }
            }
        } else if (filter.tag) {
            const [key, value] = filter.tag.split(':');
            if (key && value) {
                const existingValue = params.get(key);
                if (existingValue) {
                    params.set(key, `${existingValue},${value}`);
                } else {
                    params.set(key, value);
                }
            }
        }
    });

    return params;
}

// Convert the URLSearchParams back to filter array format
export function searchParamsToFilters(params) {
    const filters = [];
    params.forEach((combinedValue, key) => {
        if (!AVAILABLE_FILTERS.includes(key)) return;
        const values = combinedValue.split(',');
        values.forEach((value) => {
            if (['color', 'size'].includes(key)) {
                filters.push({
                    variantOption: {
                        name: key,
                        value,
                    },
                });
            } else {
                filters.push({
                    tag: `${key}:${value}`,
                });
            }
        });
    });
    return filters;
}
