import { gql } from 'graphql-request';

const collections = gql`
    query CollectionsQuery {
        collections(first: 250) {
            nodes {
                handle
                title
                metafield(namespace: "global", key: "description_tag") {
                    key
                    value
                }
                products(first: 250) {
                    nodes {
                        handle
                    }
                }
            }
        }
    }
`;

export default collections;
