import gql from 'graphql-tag';

export const PRODUCT_WITH_RELATED_PRODUCTS_BY_HANDLE_QUERY = gql`
    query query($handle: String!, $first: Int!) {
        productByHandle(handle: $handle) {
            id
            handle
            title
            description
            handle
            priceRange {
                minVariantPrice {
                    amount
                }
            }
            tags
            images(first: 30) {
                edges {
                    node {
                        altText
                        transformedSrc
                    }
                }
            }
            options {
                name
                values
            }
            metafields(first: 20) {
                edges {
                    node {
                        key
                        value
                        namespace
                    }
                }
            }
            variants(first: $first) {
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
                        metafields(first: 6) {
                            edges {
                                node {
                                    key
                                    value
                                    namespace
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const productByHandleVars = handle => ({
    handle,
    first: 1,
});
