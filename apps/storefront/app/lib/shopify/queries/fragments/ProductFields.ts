import { gql } from 'graphql-request';
export const PRODUCT_FIELDS = gql`
    fragment ProductFields on Product {
        id
        handle
        title
        description
        tags
        availableForSale
        productType
        seo {
            description
            title
        }
        priceRange {
            minVariantPrice {
                amount
            }
        }
        images(first: 20) {
            edges {
                node {
                    altText
                    transformedSrc
                    height
                    width
                }
            }
        }
        options {
            name
            values
        }
        metafields(
            identifiers: [
                { namespace: "product", key: "seo_description" }
                { namespace: "product", key: "seo_title" }
                { namespace: "related_products", key: "siblings" }
                { namespace: "product", key: "sizing" }
                { namespace: "product", key: "short_description" }
                { namespace: "product", key: "long_description" }
                { namespace: "breadcrumb_level_1", key: "handle" }
                { namespace: "breadcrumb_level_1", key: "title" }
                { namespace: "breadcrumb_level_2", key: "handle" }
                { namespace: "breadcrumb_level_2", key: "title" }
                { namespace: "breadcrumb_level_3", key: "handle" }
                { namespace: "breadcrumb_level_3", key: "title" }
                { namespace: "related_products", key: "complete_the_look" }
                { namespace: "custom", key: "long_form_pdp_description" }
                { namespace: "custom", key: "detail_icon_1" }
                { namespace: "custom", key: "detail_icon_2" }
                { namespace: "custom", key: "detail_icon_3" }
                { namespace: "custom", key: "detail_icon_4" }
                { namespace: "custom", key: "detail_icon_5" }
                { namespace: "custom", key: "detail_icon_6" }
                { namespace: "custom", key: "detail_icon_7" }
                { namespace: "custom", key: "feature_image_1" }
                { namespace: "custom", key: "feature_image_2" }
                { namespace: "custom", key: "feature_image_3" }
                { namespace: "custom", key: "feature_image_4" }
                { namespace: "custom", key: "feature_image_5" }
                { namespace: "custom", key: "feature_image_6" }
                { namespace: "custom", key: "feature_image_7" }
            ]
        ) {
            value
            key
            namespace
        }
        variants(first: 50) {
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
                    product {
                        handle
                        title
                        images(first: 1) {
                            edges {
                                node {
                                    transformedSrc
                                }
                            }
                        }
                    }
                    metafields(
                        identifiers: [
                            { namespace: "notify_me", key: "date" }
                            { namespace: "preorder", key: "date" }
                        ]
                    ) {
                        value
                        key
                        namespace
                    }
                }
            }
        }
    }
`;
