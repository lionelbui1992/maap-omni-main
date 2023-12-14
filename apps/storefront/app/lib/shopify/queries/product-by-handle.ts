import { gql } from 'graphql-request';
import { PRODUCT_FIELDS } from '../../../lib/shopify/queries/fragments/ProductFields';

const productByHandle = gql`
    query ProductQuery($handle: String!) {
        productByHandle(handle: $handle) {
            ...ProductFields
        }
    }
    ${PRODUCT_FIELDS}
`;
export default productByHandle;
