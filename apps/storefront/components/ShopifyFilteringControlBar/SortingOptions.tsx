import React from 'react';

const SortingOptions = ({ dispatch }) => {
    const sortOptionsChangeHandler = (e) => {
        let variables;

        if (e.target.value === 'price-low-to-high') {
            variables = {
                sortKey: 'PRICE',
                reverse: false,
            };
        }
        if (e.target.value === 'price-high-to-low') {
            variables = {
                sortKey: 'PRICE',
                reverse: true,
            };
        }
        if (e.target.value === 'default') {
            variables = {
                sortKey: null,
                reverse: null,
            };
        }
        if (e.target.value === 'newest') {
            variables = {
                sortKey: 'CREATED',
                reverse: true,
            };
        }
        dispatch({
            type: 'sort',
            payload: variables,
        });
    };

    return (
        <select
            className="shopify-SortBy-select"
            onChange={sortOptionsChangeHandler}
        >
            <option value="default">Sort</option>
            <option value="newest">Newest</option>
            <option value="price-low-to-high" title="low-to-high">
                Price Low - High
            </option>
            <option value="price-high-to-low">Price High - Low</option>
        </select>
    );
};

export default SortingOptions;
