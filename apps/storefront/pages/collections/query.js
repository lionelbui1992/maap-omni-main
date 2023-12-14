const collectionQuery = (handle, productsCursor = null) => `{
    collectionByHandle(handle: "${handle}") {
          id
          title
          description
          descriptionHtml

          image {
              altText
              transformedSrc(maxWidth: 700)
          }

          products(first: 100, after: ${
              productsCursor ? `"${productsCursor}"` : null
          }) {
              edges {
                  cursor
                  node {
                      handle
                  }
              }
              pageInfo {
                  hasNextPage
              }
          }
      }
  }
  `;

export default collectionQuery;
