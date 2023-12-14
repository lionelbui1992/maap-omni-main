import { gql } from 'graphql-request';
import { PRODUCT_FIELDS } from '@app/lib/shopify/queries/fragments/ProductFields';
const productByHandle = gql`
    query ProductQuery($sku: String!) {
        productByHandle(first: 1, query: "sku:$sku") {
            ...ProductFields
        }
        ${PRODUCT_FIELDS}
    }
`;
export default productByHandle;
