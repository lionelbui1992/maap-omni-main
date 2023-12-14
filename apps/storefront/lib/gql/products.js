const products = (after = null) => `{
    products(first: 200, after: ${after ? `"${after}"` : null}) {
        edges {
          node {
            id
            handle
            title
            availableForSale
            updatedAt
            images(first: 1) {
                edges {
                    node {
                        altText
                        transformedSrc
                        src
                    }
                }
            }
        }
     }
     pageInfo {
      endCursor
      hasNextPage
    }
   }
}
`;

export default products;
