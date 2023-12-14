export const filter = (filters, input) => {
    const unescapeSlashes = (str) => str.replace(/\\\//g, '/');

    const cleanedInput = unescapeSlashes(input);

    const existingFilter = filters.find(
        (filter) => JSON.stringify(filter) === cleanedInput
    );

    // REMOVE FILTER (return filters without the input)
    if (existingFilter) {
        const updatedFilters = filters.filter(
            (filter) => JSON.stringify(filter) !== cleanedInput
        );

        if (updatedFilters.length === 2) {
            // Only available: true left, remove it.
            return [
                {
                    productMetafield: {
                        namespace: 'custom',
                        key: 'product_stock_status',
                        value: 'ACTIVE',
                    },
                },
            ];
        }

        return updatedFilters;
    }

    const hasAvailableFilter = !!filters.find((filter) => filter.available);
    if (!hasAvailableFilter) {
        filters.push({ available: true });
    }

    const inputObject = JSON.parse(cleanedInput);

    return [...filters, inputObject];
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'filter':
            const filters = filter(state.filters, action.payload);
            console.log('filters after func', filters);
            return { ...state, filters };
        case 'setFiltersFromUrl':
            return {
                ...state,
                filters: [...state.filters, ...action.payload],
            };
        case 'sort':
            return { ...state, sort: action.payload };
        case 'addProducts':
            return {
                ...state,
                products: [...state.products, ...action.payload.products],
                cursor: action.payload.cursor,
                hasNextPage: action.payload.hasNextPage,
            };
        case 'setProducts':
            return {
                ...state,
                products: action.payload.products,
                cursor: action.payload.cursor,
                hasNextPage: action.payload.hasNextPage,
            };
        case 'clearFilter':
            return {
                ...state,
                filters: [
                    {
                        productMetafield: {
                            namespace: 'custom',
                            key: 'product_stock_status',
                            value: 'ACTIVE',
                        },
                    },
                ],
            };
        case 'replace_state':
            return action.payload;
        default:
            return state;
    }
};
