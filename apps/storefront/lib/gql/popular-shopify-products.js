import { gql } from 'graphql-request';

const getPopularProductsQuery = gql`
    query products {
        products(first: 15, sortKey: BEST_SELLING) {
            edges {
                node {
                    handle
                }
            }
        }
    }
`;

export default getPopularProductsQuery;
