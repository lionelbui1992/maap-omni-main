import { gql } from 'graphql-request';

const collectionQueryForCount = gql`
    query CollectionQuery(
        $handle: String!
        $filters: [ProductFilter!]
        $after: String
    ) {
        collectionByHandle(handle: $handle) {
            handle
            products(first: 250, filters: $filters, after: $after) {
                nodes {
                    handle
                }
                pageInfo {
                    hasNextPage
                    endCursor
                }
            }
        }
    }
`;

export default collectionQueryForCount;
