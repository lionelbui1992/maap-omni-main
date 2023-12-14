import { gql } from 'graphql-request';

const collectionByHandleServerQuery = gql`
    query getCollectionByHandle(
        $handle: String!
        $filters: [ProductFilter!]
        $first: Int
        $after: String
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
            products(first: $first, filters: $filters, after: $after) {
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
                        images(first: 20) {
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

export default collectionByHandleServerQuery;
