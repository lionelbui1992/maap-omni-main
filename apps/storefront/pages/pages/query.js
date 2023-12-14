const pageQuery = handle => `{
    pageByHandle(handle: "${handle}") {
        id
        handle
        title
        handle
        bodySummary
        seo {
          description
          title
        }
    }
}
`;

export default pageQuery;
