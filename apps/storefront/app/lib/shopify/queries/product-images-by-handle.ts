import { gql } from 'graphql-request';

const productImagesByHandle = gql`
    query ProductImagesQuery($handle: String!) {
        productByHandle(handle: $handle) {
            images(first: 25) {
                edges {
                    node {
                        transformedSrc
                        altText
                    }
                }
            }
        }
    }
`;

export default productImagesByHandle;
