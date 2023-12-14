import React from 'react';
import { SortBy } from 'react-instantsearch-dom';
import Down from '@images/small_icon/Down-Arrow-Accordion.svg';
import { useShop } from '@lib/providers/ShopProvider';
import { breakpointMedium } from 'config/styles/breakpoints';

const AlgoliaCatalogSortingSelector = () => {
    const context = useShop();

    if (!context || !context.algoliaProductIndex) {
        return null;
    }

    return (
        <>
            <SortBy
                defaultRefinement={context.algoliaProductIndex}
                items={[
                    { value: context.algoliaProductIndex, label: 'Sort' },
                    {
                        value: `${context.algoliaProductIndex}_published_at_desc`,
                        label: 'Newest',
                    },
                    {
                        value: `${context.algoliaProductIndex}_price_asc`,
                        label: 'Price Low - High',
                    },
                    {
                        value: `${context.algoliaProductIndex}_price_desc`,
                        label: 'Price High - Low',
                    },
                ]}
            />
            <style jsx global>
                {`
                    .ais-SortBy {
                        display: flex;
                        flex: 1;
                    }

                    .ais-SortBy-select {
                        display: flex;
                        flex: 1;
                        justify-content: space-between;
                        align-items: center;
                        background: rgba(0, 0, 0, 0) url("${Down.src}") no-repeat 85% 50%;
                        background-size: 20px 20px;
                        border: none;
                        box-shadow: none;
                        -webkit-appearance: none;
                        cursor: pointer;
                        padding: 10px 30px;
                        box-sizing: border-box;
                        font-size: 1em;
                        font-weight: 400;
                        color: rgb(0, 0, 0);
                    }

                    .ais-SortBy-select:focus {
                        outline: 0;
                    }

                    @media only screen and (min-width: ${breakpointMedium}) {
                        .ais-SortBy-select {
                            background-size: 15px 15px;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default AlgoliaCatalogSortingSelector;
