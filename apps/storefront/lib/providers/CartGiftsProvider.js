import React, {
    createContext,
    useEffect,
    useState,
    useContext,
    useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { useCart } from '@lib/providers/CartProvider';
import {
    CHECKOUT_ADD_LINE_ITEM_MUTATION,
    CHECKOUT_REMOVE_LINE_ITEM,
    checkoutAddGiftLineItemVars,
} from '../gql/checkout';
import { useLoop } from '@lib/providers/LoopProvider';
import useEventListener from '@lib/hooks/useEventListener';
import sessionStorage from 'helpers/sessionStorage';

const Context = createContext(null);

const GID = (id) =>
    Buffer.from(`gid://shopify/ProductVariant/${id}`).toString('base64');

function CheckoutGiftProvider({ children, regionCode, config }) {
    const [giftEligible, setGiftEligible] = useState();
    const [eligibleGiftsCount, setEligibleGiftsCount] = useState();
    const [appliedGifts, setAppliedGifts] = useState([]);
    const { setCart, cart } = useCart();
    const { creditShoppingActive } = useLoop();

    let giftDefinitions = useMemo(() => {
        if (config) {
            const { data } = config;
            const { body: documentBody } = data;
            return documentBody
                .filter((slice) => slice.slice_type === 'gift')
                .map((slice) => {
                    const [first] = slice.items;
                    if (first) {
                        const {
                            cart_value_requirement,
                            variant_id,
                            fallback_variant_id,
                            gift_title,
                            gift_description,
                        } = first;
                        const title = gift_title[0].text;
                        const description = gift_description[0].text;
                        return {
                            cart_value_requirement,
                            variant_id: GID(variant_id),
                            fallback_variant_id: fallback_variant_id
                                ? GID(fallback_variant_id)
                                : null,
                            title,
                            description,
                            failure: false,
                        };
                    }
                });
        }
    }, [config, creditShoppingActive]);

    const [
        checkoutLineItemsAdd,
        {
            loading: checkoutLineItemsAddMutationLoading,
            error: checkoutLineItemsAddMutationError,
            data: checkoutLineItemsAddMutationData,
        },
    ] = useMutation(CHECKOUT_ADD_LINE_ITEM_MUTATION, {
        context: { clientName: regionCode },
        update(proxy, { data: { checkoutLineItemsAdd } }) {
            setCart(checkoutLineItemsAdd.checkout);
        },
    });

    const [
        checkoutLineItemsRemove,
        {
            loading: checkoutLineItemsRemoveMutationLoading,
            error: checkoutLineItemsRemoveMutationError,
            data: checkoutLineItemsRemoveMutationData,
        },
    ] = useMutation(CHECKOUT_REMOVE_LINE_ITEM, {
        context: { clientName: regionCode },
        update(proxy, { data: { checkoutLineItemsRemove } }) {
            setCart(checkoutLineItemsRemove.checkout);
        },
    });

    const cartContainsEligibleItems = cart?.lineItems.edges.filter((edge) => {
        return (
            edge.node.variant?.product?.productType !== 'MAGAZINE' &&
            edge.node.variant?.product?.productType !== 'Gift Card'
        );
    }).length;

    const lineItemIsAGift = (lineItemNode) => {
        if (!giftDefinitions) return false;
        return !!giftDefinitions.find((definition) => {
            const giftAttributes = lineItemNode.customAttributes.filter(
                (attribute) => attribute.value === 'gift'
            );

            if (!giftAttributes.length) return false;

            return (
                [definition.variant_id, definition.fallback_variant_id].indexOf(
                    lineItemNode.variant.id
                ) !== -1
            );
        });
    };

    const getDefinitionLineItem = (definition) => {
        return cart?.lineItems.edges.find((edge) => {
            const giftAttributes = edge.node.customAttributes.filter(
                (attribute) => attribute.value === 'gift'
            );

            if (!giftAttributes.length) return false;

            return (
                [definition.variant_id, definition.fallback_variant_id].indexOf(
                    edge.node.variant.id
                ) !== -1
            );
        })?.node;
    };

    const cartMeetsDefinitionRequirements = (definition) => {
        if (creditShoppingActive) {
            return false;
        }

        if (!cartContainsEligibleItems || !definition) {
            return false;
        }

        return (
            cart?.subtotalPriceV2.amount >= definition.cart_value_requirement
        );
    };

    const processAddOrRemoveGifts = () => {
        if (!giftDefinitions) return false;
        giftDefinitions.forEach((definition) => {
            const definitionLineItem = getDefinitionLineItem(definition);

            if (
                cartMeetsDefinitionRequirements(definition) &&
                !definitionLineItem &&
                !definition.failure
            ) {
                const variantId = sessionStorage.getItem(
                    'GIFT_UNWANTED_VARIANT_ID'
                );

                if (variantId && variantId === definition.variant_id) return;

                const giftVariantVars = checkoutAddGiftLineItemVars({
                    variantId: definition.variant_id,
                    quantity: 1,
                    checkoutId: cart?.id,
                });

                const giftFallbackVariantVars = checkoutAddGiftLineItemVars({
                    variantId: definition.fallback_variant_id,
                    quantity: 1,
                    checkoutId: cart?.id,
                });

                checkoutLineItemsAdd({
                    variables: giftVariantVars,
                })
                    .catch((e) => {
                        definition.failure = true;
                    })
                    .then((resp) => {
                        if (resp?.data.checkoutLineItemsAdd.userErrors.length) {
                            checkoutLineItemsAdd({
                                variables: giftFallbackVariantVars,
                            }).catch((e) => {
                                definition.failure = true;
                            });
                        }
                    });
            }

            if (
                !cartMeetsDefinitionRequirements(definition) &&
                definitionLineItem
            ) {
                checkoutLineItemsRemove({
                    variables: {
                        checkoutId: cart?.id,
                        lineItemIds: [definitionLineItem.id],
                    },
                }).catch((e) => console.log('e', e.message));
            }
        });
    };

    useEventListener(undefined, 'RemoveCartLineItem', (e) => {
        const unwantedVariantId = sessionStorage.getItem(
            'GIFT_UNWANTED_VARIANT_ID'
        );
        if (unwantedVariantId) return;

        const giftLineItem = giftDefinitions.find(
            (node) => node.variant_id === e.detail?.variantId
        );
        if (giftLineItem) {
            sessionStorage.setItem(
                'GIFT_UNWANTED_VARIANT_ID',
                giftLineItem.variant_id
            );
        }
    });

    useEffect(() => {
        if (giftDefinitions) {
            const hasEligibleItems = cart?.lineItems.edges.filter((edge) => {
                return (
                    edge.node.variant?.product?.productType !== 'MAGAZINE' &&
                    edge.node.variant?.product?.productType !== 'Gift Card'
                );
            }).length;

            const eligibleGiftsCount = giftDefinitions.filter((definition) => {
                return cartMeetsDefinitionRequirements(definition);
            }).length;

            setGiftEligible(hasEligibleItems && !!eligibleGiftsCount);
            setEligibleGiftsCount(eligibleGiftsCount);
        }
    }, [cart?.subtotalPriceV2.amount]);

    useEffect(() => {
        if (giftDefinitions) {
            setAppliedGifts(
                giftDefinitions.filter((definition) =>
                    getDefinitionLineItem(definition)
                )
            );
        }
    }, [cart?.lineItems.edges]);

    useEffect(() => {
        processAddOrRemoveGifts();
    }, [eligibleGiftsCount]);

    const provides = {
        giftEligible,
        lineItemIsAGift,
        appliedGifts,
        loading:
            checkoutLineItemsAddMutationLoading ||
            checkoutLineItemsRemoveMutationLoading,
    };

    return (
        <Context.Provider value={{ ...provides }}>{children}</Context.Provider>
    );
}

CheckoutGiftProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array.isRequired,
        PropTypes.object.isRequired,
    ]),
};

const useCheckoutGifts = () => useContext(Context);

export { CheckoutGiftProvider, useCheckoutGifts };
