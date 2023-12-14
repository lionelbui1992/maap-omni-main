const collections = (after = null) => `{
    collections(first: 200, after: ${after ? `"${after}"` : null}) {
        edges {
          node {
            id
            handle
            title
            updatedAt
        }
     }
     pageInfo {
      endCursor
      hasNextPage
    }
   }
}
`;

export default collections;
