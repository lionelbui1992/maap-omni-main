import { gql } from 'graphql-request';

const collectionByHandleQuery = gql`
    query getCollectionByHandle(
        $handle: String!
        $filters: [ProductFilter!]
        $first: Int
        $after: String
        $sortKey: ProductCollectionSortKeys
        $reverse: Boolean
    ) {
        collectionByHandle(handle: $handle) {
            handle
            title
            products(
                first: $first
                filters: $filters
                after: $after
                sortKey: $sortKey
                reverse: $reverse
            ) {
                edges {
                    cursor
                    node {
                        id
                        title
                        handle
                        tags
                        images(first: 20) {
                            edges {
                                node {
                                    altText
                                    height
                                    transformedSrc
                                }
                            }
                        }
                        metafield(
                            key: "siblings"
                            namespace: "related_products"
                        ) {
                            key
                            value
                            namespace
                        }
                        variants(first: 1) {
                            edges {
                                node {
                                    id
                                    sku
                                    title
                                    image {
                                        transformedSrc
                                    }
                                    priceV2 {
                                        amount
                                        currencyCode
                                    }
                                    compareAtPriceV2 {
                                        amount
                                    }
                                    selectedOptions {
                                        name
                                        value
                                    }
                                }
                            }
                        }
                    }
                }
                pageInfo {
                    hasNextPage
                }
            }
        }
    }
`;

export default collectionByHandleQuery;
