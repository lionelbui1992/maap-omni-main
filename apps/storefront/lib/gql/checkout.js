import { gql } from 'apollo-boost';

export const CHECKOUT_FRAGEMENT = gql`
    fragment checkout on Checkout {
        id
        webUrl
        completedAt
        email
        subtotalPriceV2 {
            amount
            currencyCode
        }
        totalTaxV2 {
            amount
            currencyCode
        }
        totalPriceV2 {
            amount
            currencyCode
        }
        lineItems(first: 200) {
            pageInfo {
                hasNextPage
                hasPreviousPage
            }
            edges {
                node {
                    id
                    title
                    quantity
                    customAttributes {
                        value
                        key
                    }
                    discountAllocations {
                        allocatedAmount {
                            amount
                            currencyCode
                        }
                        discountApplication {
                            ... on ScriptDiscountApplication {
                                allocationMethod
                                targetSelection
                                targetType
                                value
                                title
                            }
                            ... on AutomaticDiscountApplication {
                                allocationMethod
                                targetSelection
                                targetType
                                value
                                title
                            }
                        }
                    }
                    variant {
                        id
                        title
                        sku
                        product {
                            handle
                            productType
                            metafield(
                                namespace: "breadcrumb_level_3"
                                key: "handle"
                            ) {
                                value
                            }
                        }
                        image {
                            transformedSrc
                        }
                        priceV2 {
                            amount
                            currencyCode
                        }
                        compareAtPriceV2 {
                            currencyCode
                            amount
                        }
                    }
                }
            }
        }
    }
`;

export const CHECKOUT_QUERY = gql`
    ${CHECKOUT_FRAGEMENT}
    query checkout($checkoutId: ID!) {
        node(id: $checkoutId) {
            ... on Checkout {
                ...checkout
            }
        }
    }
`;

export const CHECKOUT_CREATE_MUTATION = gql`
    ${CHECKOUT_FRAGEMENT}
    mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
            checkout {
                ...checkout
            }
        }
    }
`;

export const addToCartVars = ({ variantId, quantity, attributes }) => ({
    input: {
        lineItems: [
            {
                variantId,
                quantity,
                attributes,
            },
        ],
    },
});

export const CHECKOUT_ADD_LINE_ITEM_MUTATION = gql`
    ${CHECKOUT_FRAGEMENT}
    mutation checkoutLineItemsAdd(
        $checkoutId: ID!
        $lineItems: [CheckoutLineItemInput!]!
    ) {
        checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
            userErrors {
                message
                field
            }
            checkout {
                ...checkout
            }
        }
    }
`;

export const checkoutAddLineItemVars = ({
    variantId,
    quantity,
    checkoutId,
    attributes,
}) => ({
    checkoutId,
    lineItems: [
        {
            variantId,
            quantity,
            attributes
        },
    ],
});

export const checkoutAddGiftLineItemVars = ({
    variantId,
    quantity,
    checkoutId,
}) => ({
    checkoutId,
    lineItems: [
        {
            customAttributes: {
                key: 'type',
                value: 'gift',
            },
            variantId,
            quantity,
        },
    ],
});

export const CHECKOUT_REMOVE_LINE_ITEM = gql`
    ${CHECKOUT_FRAGEMENT}
    mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
        checkoutLineItemsRemove(
            checkoutId: $checkoutId
            lineItemIds: $lineItemIds
        ) {
            userErrors {
                message
                field
            }
            checkout {
                ...checkout
            }
        }
    }
`;

export const CHECKOUT_REPLACE_LINE_ITEM_MUTATION = gql`
    ${CHECKOUT_FRAGEMENT}
    mutation checkoutLineItemsReplace(
        $checkoutId: ID!
        $lineItems: [CheckoutLineItemInput!]!
    ) {
        checkoutLineItemsReplace(
            checkoutId: $checkoutId
            lineItems: $lineItems
        ) {
            userErrors {
                message
                field
            }
            checkout {
                ...checkout
            }
        }
    }
`;

export const checkoutReplaceLineItemVars = ({ lineItems, checkoutId }) => ({
    checkoutId,
    lineItems,
});

export const CHECKOUT_UPDATE_LINE_ITEM = gql`
    ${CHECKOUT_FRAGEMENT}
    mutation checkoutLineItemsUpdate(
        $checkoutId: ID!
        $lineItems: [CheckoutLineItemUpdateInput!]!
    ) {
        checkoutLineItemsUpdate(
            checkoutId: $checkoutId
            lineItems: $lineItems
        ) {
            userErrors {
                message
                field
            }
            checkout {
                ...checkout
            }
        }
    }
`;

export const CHECKOUT_APPLY_DISCOUNT_CODE = gql`
    mutation checkoutDiscountCodeApplyV2(
        $checkoutId: ID!
        $discountCode: String!
    ) {
        checkoutDiscountCodeApplyV2(
            checkoutId: $checkoutId
            discountCode: $discountCode
        ) {
            checkoutUserErrors {
                code
                field
                message
            }
        }
    }
`;

export const checkoutApplyDiscountVars = ({ checkoutId, discountCode }) => ({
    checkoutId,
    discountCode,
});

export const CHECKOUT_ASSOCIATE_CUSTOMER = gql`
    ${CHECKOUT_FRAGEMENT}
    mutation checkoutCustomerAssociateV2(
        $checkoutId: ID!
        $customerAccessToken: String!
    ) {
        checkoutCustomerAssociateV2(
            checkoutId: $checkoutId
            customerAccessToken: $customerAccessToken
        ) {
            checkout {
                ...checkout
            }
            checkoutUserErrors {
                code
                field
                message
            }
        }
    }
`;
