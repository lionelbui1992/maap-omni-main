import gql from 'graphql-tag';

export const COLLECTION_BY_HANDLE_QUERY = gql`
    query collectionByHandle($handle: String!) {
        collectionByHandle(handle: $handle) {
            id
            title
            description
            descriptionHtml
            image {
                altText
                transformedSrc(maxWidth: 700)
            }
        }
    }
`;

export const COLLECTION_BY_HANDLE_WITH_PRODUCTS_QUERY = gql`
    query collectionByHandle($handle: String!, $first: Int!) {
        collectionByHandle(handle: $handle) {
            id
            title
            description
            descriptionHtml
            image {
                altText
                transformedSrc(maxWidth: 700)
            }
            products(first: $first) {
                edges {
                    node {
                        handle
                    }
                }
            }
        }
    }
`;

export const collectionByHandleVars = handle => ({
    handle,
    first: 200,
    skip: 0,
});

export default collectionByHandleVars;
