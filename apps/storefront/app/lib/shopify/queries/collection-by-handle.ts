import { gql } from 'graphql-request';

const collectionByHandle = gql`
    query CollectionQuery(
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
            description
            descriptionHtml
            image {
                altText
                transformedSrc(maxWidth: 700)
            }
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
                        metafield(
                            key: "siblings"
                            namespace: "related_products"
                        ) {
                            key
                            value
                            namespace
                        }
                        images(first: 25) {
                            edges {
                                node {
                                    altText
                                    height
                                    transformedSrc
                                }
                            }
                        }
                        variants(first: 10) {
                            edges {
                                node {
                                    id
                                    sku
                                    title
                                    availableForSale
                                    quantityAvailable
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
                filters {
                    id
                    label
                    type
                    values {
                        id
                        label
                        count
                        input
                    }
                }
                pageInfo {
                    hasNextPage
                }
            }
        }
    }
`;

export default collectionByHandle;
