const gqlQuery = handle => `{
    blogByHandle(handle: "stories") {
        articleByHandle(handle: "${handle}") {
            id
            handle
            title
            handle
            excerpt
            content
            tags
            seo {
              description
              title
            }
        }
    }
}
`;

export default gqlQuery;
