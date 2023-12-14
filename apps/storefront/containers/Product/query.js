const gqlQuery = (handle) => `{
    productByHandle(handle: "${handle}") {
        id
        handle
        title
        description
        handle
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
        images(first: 30) {
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
        metafields(identifiers: [
            {namespace: "product", key: "seo_description"},
            {namespace: "product", key: "seo_title"},
            {namespace: "related_products", key: "siblings"},
            {namespace: "product", key: "sizing"},
            {namespace: "product", key: "short_description"},
            {namespace: "product", key: "long_description"},
            {namespace: "breadcrumb_level_1", key: "handle"},
            {namespace: "breadcrumb_level_1", key: "title"},
            {namespace: "breadcrumb_level_2", key: "handle"},
            {namespace: "breadcrumb_level_2", key: "title"},   
            {namespace: "breadcrumb_level_3", key: "handle"},
            {namespace: "breadcrumb_level_3", key: "title"},
            {namespace: "related_products", key: "complete_the_look"},
        ]) {
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
                    metafields(identifiers: [
                        {namespace: "notify_me", key: "date"},
                        {namespace: "preorder", key: "date"}
                    ]) {
                        value
                        key
                        namespace
                    }
                }
            }
        }
    }
}
`;

export default gqlQuery;
