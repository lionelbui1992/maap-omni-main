import { gql } from 'graphql-request';

const getPopularCollectionsQuery = gql`
    query collections {
        collections(first: 20, sortKey: RELEVANCE) {
            edges {
                node {
                    handle
                }
            }
        }
    }
`;

export default getPopularCollectionsQuery;
