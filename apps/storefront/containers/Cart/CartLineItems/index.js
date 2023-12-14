import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import Pricing from 'components/Pricing';
import {
    CHECKOUT_REMOVE_LINE_ITEM,
    CHECKOUT_REPLACE_LINE_ITEM_MUTATION,
    checkoutReplaceLineItemVars,
} from 'lib/gql/checkout';
import SideCartLoader from '../SideCartLoader';
import { useCheckoutGifts } from '@lib/providers/CartGiftsProvider';
import { useCart } from '@lib/providers/CartProvider';
import { styles } from './styles';
import { useLoop } from '@lib/providers/LoopProvider';
import { useShop } from '@lib/providers/ShopProvider';

import { getCountrySpecificUrl } from 'helpers/linkHelper';

const CartLineItems = ({ checkoutId, checkout }) => {
    const { setCart } = useCart();
    const { defaultCurrencyCode, defaultCurrencySymbol, code } = useShop();
    const { lineItemIsAGift } = useCheckoutGifts();
    const { creditShoppingActive } = useLoop();

    const [
        checkoutLineItemRemove,
        { loading: loadingRemove, error: errorRemove, data: dataRemove },
    ] = useMutation(CHECKOUT_REMOVE_LINE_ITEM);

    const [checkoutLineItemReplace, { loading, error, data }] = useMutation(
        CHECKOUT_REPLACE_LINE_ITEM_MUTATION
    );

    const increaseLineItem = (node) => {
        plusQty(node.variant.id, node.quantity);

        window.dispatchEvent(
            new CustomEvent('AddToCart', {
                detail: {
                    productTitle: node.title,
                    productId: node.variant.sku,
                    productCategory: 'Apparel & Accessories',
                    productType: 'product',
                    productPrice: node.variant.priceV2.amount,
                    variantTitle: node.variant.title,
                    quantity: 1,
                    item_id: node.variant.product.handle,
                    item_variant: node.variant.sku,
                },
            })
        );

        if(typeof window !== 'undefined' && window.pintrk){
            window.pintrk("track", "addtocart", {
                value: node.variant.priceV2.amount * (node.quantity + 1),
                order_quantity: node.quantity + 1,
                currency: defaultCurrencyCode,
                line_items: [
                    {
                        product_name: node.title,
                        product_id: node.variant.sku,
                        product_category: node.variant.product.productType,
                        product_price: node.variant.priceV2.amount,
                        product_quantity: 1,
                    }
                ]
            })
        }
    };

    const plusQty = (variantId, quantity) => {
        const lineItems = checkout.lineItems.edges.map(({ node }) => {
            const newQuantity =
                node.variant.id === variantId ? quantity + 1 : node.quantity;

            return {
                customAttributes: node.customAttributes.map((attribute) => ({
                    key: attribute.key,
                    value: attribute.value,
                })),
                variantId: node.variant.id,
                quantity: newQuantity,
            };
        });

        const variables = checkoutReplaceLineItemVars({
            lineItems,
            checkoutId,
        });

        checkoutLineItemReplace({
            variables,
            context: { clientName: code },
            update(proxy, { data: { checkoutLineItemsReplace } }) {
                setCart(checkoutLineItemsReplace.checkout);
            },
        });
    };

    const reduceLineItem = (node) => {
        minusQty(node.variant.id, node.quantity, node.id);
        window.dispatchEvent(
            new CustomEvent('RemoveCartLineItem', {
                detail: {
                    productTitle: node.title,
                    productId: node.variant.sku,
                    productCategory: 'Apparel & Accessories',
                    productType: 'product',
                    productPrice: node.variant.priceV2.amount,
                    variantTitle: node.variant.title,
                    quantity: 1,
                    item_id: node.variant.product.handle,
                    item_variant: node.variant.sku,
                },
            })
        );
    };

    const minusQty = (variantId, quantity, lineItemId) => {
        if (quantity > 1) {
            const lineItems = checkout.lineItems.edges.map(({ node }) => {
                const newQuantity =
                    node.variant.id === variantId
                        ? node.quantity - 1
                        : node.quantity;
                return {
                    customAttributes: node.customAttributes.map(
                        (attribute) => ({
                            key: attribute.key,
                            value: attribute.value,
                        })
                    ),
                    variantId: node.variant.id,
                    quantity: newQuantity,
                };
            });

            const variables = checkoutReplaceLineItemVars({
                lineItems,
                checkoutId,
            });

            checkoutLineItemReplace({
                variables,
                context: { clientName: code },
                update(proxy, { data: { checkoutLineItemsReplace } }) {
                    setCart(checkoutLineItemsReplace.checkout);
                },
            });
        } else {
            checkoutLineItemRemove({
                variables: { checkoutId, lineItemIds: [lineItemId] },
                context: { clientName: code },
                update(proxy, { data: { checkoutLineItemsRemove } }) {
                    setCart(checkoutLineItemsRemove.checkout);
                },
            });
        }
    };

    const getBundleItems = (bundleId) => {
        return checkout.lineItems.edges.filter((edge) => {
            const { node } = edge;
            const { customAttributes } = node;
            return customAttributes.find((customAttribute) => {
                return (
                    customAttribute.key === '_bundle_id' &&
                    customAttribute.value === bundleId
                );
            });
        });
    };

    const getBundleId = (lineItemNode) => {
        return lineItemNode.customAttributes.find(
            (attribute) => attribute.key === '_bundle_id'
        )?.value;
    };

    const lineItemIsInABundle = (lineItemNode) => {
        return !!getBundleId(lineItemNode);
    };

    const removeBundle = (bundleId) => {
        const bundleLineItemIds = getBundleItems(bundleId).map(
            (edge) => edge.node.id
        );

        checkoutLineItemRemove({
            variables: { checkoutId, lineItemIds: bundleLineItemIds },
            context: { clientName: code },
            update(proxy, { data: { checkoutLineItemsRemove } }) {
                setCart(checkoutLineItemsRemove.checkout);
            },
        });
    };

    const removeProduct = (node, variantId, quantity, lineItemId) => {
        if (quantity === 0) {
            const lineItems = checkout.lineItems.edges.map(({ node }) => {
                const newQuantity =
                    node.variant.id === variantId
                        ? node.quantity
                        : node.quantity;
                return {
                    customAttributes: node.customAttributes.map(
                        (attribute) => ({
                            key: attribute.key,
                            value: attribute.value,
                        })
                    ),
                    variantId: node.variant.id,
                    quantity: newQuantity,
                };
            });

            const variables = checkoutReplaceLineItemVars({
                lineItems,
                checkoutId,
            });
            checkoutLineItemReplace({
                variables,
                context: { clientName: code },
                update(proxy, { data: { checkoutLineItemsReplace } }) {
                    setCart(checkoutLineItemsReplace.checkout);
                },
            });
        } else {
            window.dispatchEvent(
                new CustomEvent('RemoveCartLineItem', {
                    detail: {
                        productTitle: node.title,
                        productId: node.variant.sku,
                        productCategory: 'Apparel & Accessories',
                        productType: 'product',
                        productPrice: node.variant.priceV2.amount,
                        variantTitle: node.variant.title,
                        variantId: node.variant.id,
                        quantity: 1,
                        item_id: node.variant.product.handle,
                        item_variant: node.variant.sku,
                    },
                })
            );
            checkoutLineItemRemove({
                variables: { checkoutId, lineItemIds: [lineItemId] },
                context: { clientName: code },
                update(proxy, { data: { checkoutLineItemsRemove } }) {
                    setCart(checkoutLineItemsRemove.checkout);
                },
            });
        }
    };

    const checkoutLineItem = checkout.lineItems.edges.map((node) => node);

    if (loading || loadingRemove) {
        return <SideCartLoader numberOfImages={checkoutLineItem.length} />;
    }

    return (
        <ul className="sideCart_lineItem">
            {checkout?.lineItems &&
                checkout.lineItems.edges.map(({ node }) => {
                    const isGiftCard =
                        node.variant.product.productType === 'Gift Card';

                    const productLink = getCountrySpecificUrl(
                        `/products/${node.variant.product.handle}`
                    );
                    const currentPrice = node.variant?.priceV2?.amount;
                    const previousPrice =
                        node.variant?.compareAtPriceV2?.amount || 0.0;
                    const comparePrice =
                        parseFloat(previousPrice).toFixed(0) * node.quantity;

                    const color = node.variant.title.split(' / ')[0];
                    const size = node.variant.title.split(' / ')[1];

                    const discountMessage =
                        node?.discountAllocations[0]?.discountApplication
                            ?.title;

                    const discountAmount =
                        node?.discountAllocations[0]?.allocatedAmount?.amount;

                    const totalLineDiscount = node?.discountAllocations.reduce(
                        (total, allocation) => {
                            return (
                                total +
                                parseFloat(allocation?.allocatedAmount?.amount)
                            );
                        },
                        0
                    );

                    const isInABundle = lineItemIsInABundle(node);

                    return (
                        <li key={node.variant.id}>
                            <div className="sideCart_lineItem__image">
                                {!lineItemIsAGift(node) ? (
                                    <a href={productLink}>
                                        <img
                                            src={
                                                node.variant.image
                                                    .transformedSrc
                                            }
                                            alt={node.title}
                                        />
                                    </a>
                                ) : (
                                    <img
                                        src={node.variant.image.transformedSrc}
                                        alt={node.title}
                                    />
                                )}
                            </div>
                            <div className="sideCart_lineItem__content">
                                <p className="sideCart_lineItem__productTitle">
                                    {node.title}
                                </p>
                                {!isGiftCard && !lineItemIsAGift(node) && (
                                    <>
                                        <span>Size {size}</span>
                                        <div className="sideCart_lineItem__colorPriceContainer">
                                            <span>Colour {color}</span>
                                            {comparePrice !== 0 &&
                                            previousPrice !== currentPrice ? (
                                                <div className="sideCart_lineItem__comparePrice">
                                                    {defaultCurrencySymbol}
                                                    {comparePrice}
                                                    {` ${defaultCurrencyCode}`}
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </>
                                )}
                                <div className="sideCart_lineItem__qtyAndPrice">
                                    {!lineItemIsAGift(node) && !isInABundle && (
                                        <div className="sideCart_lineItem__qtyAndPrice_qty">
                                            <button
                                                className="minus"
                                                type="button"
                                                onClick={() =>
                                                    reduceLineItem(node)
                                                }
                                            >
                                                -
                                            </button>
                                            <button disabled type="button">
                                                {node.quantity}
                                            </button>
                                            <button
                                                type="button"
                                                className="plus"
                                                onClick={() =>
                                                    increaseLineItem(node)
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    )}
                                    <div className="sideCart_lineItem__qtyAndPrice_price">
                                        <div className="sideCart_lineItem__nowTag">
                                            {previousPrice > currentPrice
                                                ? 'Now'
                                                : ''}
                                        </div>
                                        <Pricing
                                            currentPrice={
                                                node.variant.priceV2.amount *
                                                node.quantity
                                            }
                                            discountAmount={
                                                !creditShoppingActive
                                                    ? totalLineDiscount
                                                    : null
                                            }
                                        />
                                    </div>
                                </div>
                                {!lineItemIsAGift(node) && (
                                    <a href={productLink}>
                                        <span className="sideCart_lineItem__viewProduct">
                                            View product
                                        </span>
                                    </a>
                                )}
                                {!isInABundle && (
                                    <div
                                        className="sideCart_lineItem__removeProduct"
                                        onClick={() =>
                                            removeProduct(
                                                node,
                                                node.variant.id,
                                                node.quantity,
                                                node.id
                                            )
                                        }
                                    >
                                        Remove
                                    </div>
                                )}
                                {!!isInABundle && (
                                    <div
                                        className="sideCart_lineItem__removeProduct"
                                        onClick={() =>
                                            removeBundle(getBundleId(node))
                                        }
                                    >
                                        Remove Bundle
                                    </div>
                                )}
                                {discountMessage && !creditShoppingActive && (
                                    <div className="discountMessage">
                                        {discountMessage}
                                    </div>
                                )}
                            </div>
                        </li>
                    );
                })}
            <style jsx>{styles}</style>
        </ul>
    );
};

export default CartLineItems;
