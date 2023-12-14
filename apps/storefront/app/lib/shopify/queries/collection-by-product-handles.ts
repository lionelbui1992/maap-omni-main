import { gql } from 'graphql-request';
const collectionByHandleProductHandles = gql`
    query CollectionQuery($handle: String!) {
        collection(handle: $handle) {
            id
            title
            handle
            products(first: 250) {
                nodes {
                    handle
                }
            }
        }
    }
`;
export default collectionByHandleProductHandles;
