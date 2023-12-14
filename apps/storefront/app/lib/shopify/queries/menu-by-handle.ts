import { gql } from 'graphql-request';

const menuByHandle = gql`
    query MenuQuery($handle: String!) {
        menu(handle: $handle) {
            handle
            itemsCount
            title
            items {
                tags
                type
                url
                title
                items {
                    tags
                    type
                    url
                    title
                    items {
                        tags
                        type
                        url
                        title
                    }
                }
            }
        }
    }
`;

export default menuByHandle;
