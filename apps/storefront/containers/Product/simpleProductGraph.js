import gql from 'graphql-tag';

export const SIMPLE_PRODUCT_CARD_PRODUCT = gql`
    query query($handle: String!, $first: Int!) {
        productByHandle(handle: $handle) {
            id
            handle
            title
            handle
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
            metafields(
                identifiers: [
                    { namespace: "related_products", key: "siblings" }
                ]
            ) {
                value
                key
                namespace
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
                    }
                }
            }
        }
    }
`;

export const simpleProductByHandleVars = (handle) => ({
    handle,
    first: 1,
});
