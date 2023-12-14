const collectionQueryWithProducts = (handle, limit = 60) => `{
  collectionByHandle(handle: "${handle}") {
        handle
        products(first: ${limit}) {
            edges {
                node {
                    title
                    handle
                    metafield(key: "short_description", namespace: "product") {
                        value
                    }
                     images(first: 15) {
                         edges {
                              node {
                                  transformedSrc
                                  width
                                  height
                              }
                         }
                     }
                     variants(first: 20) {
                        edges {
                            node {
                                id
                                availableForSale
                                quantityAvailable
                                priceV2 {
                                    amount
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
                                    tags
                                    images(first: 15) {
                                        edges {
                                            node {
                                                transformedSrc
                                                width
                                                height
                                            }
                                        }
                                    }
                                }
                            }
                        }
                     }
                }
            }
        }
    }
}
`;

export default collectionQueryWithProducts;
