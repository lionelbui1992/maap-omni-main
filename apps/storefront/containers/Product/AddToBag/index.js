import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { captureException } from '@sentry/nextjs';
import Button from 'components/Button';
import { getCheckoutId } from 'helpers/cookies';
import { useShop } from '@lib/providers/ShopProvider';
import {
    CHECKOUT_CREATE_MUTATION,
    CHECKOUT_ADD_LINE_ITEM_MUTATION,
    addToCartVars,
    checkoutAddLineItemVars,
} from 'lib/gql/checkout';
import css from 'styled-jsx/css';
import { useCart } from '@lib/providers/CartProvider';
import { useUI } from '@lib/providers/UIProvider';

const sendAddToCartEvent = (checkout, selectedVariant, context) => {
    const { storefrontUrl, routePrefix, defaultCurrencyCode } = context;

    const productPath = routePrefix
        ? `${routePrefix}/products/${selectedVariant.product.handle}`
        : `products/${selectedVariant.product.handle}`;

    const productURL = `${storefrontUrl}${productPath}`;
    const eventDetail = {
        detail: {
            cartTotal: checkout?.totalPriceV2?.amount,
            checkoutUrl: checkout.webUrl,
            variantSku: selectedVariant.sku,
            productTitle: selectedVariant.product?.title,
            productHandle: selectedVariant.product?.handle,
            variantTitle: selectedVariant.title,
            productCategory: 'Apparel & Accessories',
            productId: selectedVariant.id,
            productType: 'product',
            productPrice: selectedVariant.priceV2?.amount,
            productCompareAtPrice: selectedVariant.compareAtPriceV2?.amount,
            productCurrency: defaultCurrencyCode,
            imageUrl:
                selectedVariant.product?.images?.edges[0]?.node?.transformedSrc,
            productURL,
            quantity: 1,
            item_id: selectedVariant.product?.handle,
            item_variant: selectedVariant?.sku,
        },
    };

    window.dispatchEvent(new CustomEvent('AddToCart', eventDetail));

    ttq.track('AddToCart', {
        content_id: eventDetail.detail.productId,
        quantity: 1,
        value: eventDetail.detail.productPrice,

        currency: defaultCurrencyCode,
    });

    if(typeof window !== 'undefined' && window.pintrk){
        window.pintrk("track", "addtocart", {
            value: eventDetail.detail.productPrice,
            order_quantity: 1,
            currency: defaultCurrencyCode,
            line_items: [
                {
                    product_name: eventDetail.detail.productTitle,
                    product_id: eventDetail.detail.productId.replace('gid://shopify/ProductVariant/', ''),
                    product_category: 'Apparel & Accessories',
                    product_price: eventDetail.detail.productPrice,
                    product_quantity: 1,
                }
            ]
        })
    }
};

const AddToBag = ({ disabled, text, qty, selectedVariant, productTitle, customAttributes }) => {  
    const context = useShop();
    const { code: countryCode } = context;
    
    const { setCart } = useCart();
    const { displayCartUI } = useUI();

    const fullClassName = disabled ? ' button--disabled' : '';

    const [variantAttributes, setVariantAttributes] = useState({
        variantId: selectedVariant ? selectedVariant.id : null,
        quantity: Number(qty),
        customAttributes: customAttributes,
    });

    useEffect(() => {
        setVariantAttributes({
            variantId: selectedVariant ? selectedVariant.id : null,
            quantity: Number(qty),
            customAttributes: customAttributes,
        });
    }, [selectedVariant, qty, customAttributes]);
    const [
        checkoutCreate,
        {
            loading: checkoutCreateMutationLoading,
            error: checkoutCreateMutationError,
            data: checkoutCreateMutationData,
        },
    ] = useMutation(CHECKOUT_CREATE_MUTATION, {
        variables: addToCartVars(variantAttributes),
        context: { clientName: countryCode },
        update(proxy, { data, data: { checkoutCreate } }) {
            setCart(checkoutCreate.checkout);
            displayCartUI();

            sendAddToCartEvent(
                checkoutCreate.checkout,
                selectedVariant,
                context
            );
        },
    });

    const [
        checkoutLineItemsAdd,
        {
            loading: checkoutLineItemsAddMutationLoading,
            error: checkoutLineItemsAddMutationError,
            data: checkoutLineItemsAddMutationData,
        },
    ] = useMutation(CHECKOUT_ADD_LINE_ITEM_MUTATION, {
        variables: checkoutAddLineItemVars({
            ...variantAttributes,
            checkoutId: getCheckoutId(null, countryCode),
        }),
        context: { clientName: countryCode },
        update(proxy, { data: { checkoutLineItemsAdd } }) {
            setCart(checkoutLineItemsAdd.checkout);
            displayCartUI();

            sendAddToCartEvent(
                checkoutLineItemsAdd.checkout,
                selectedVariant,
                context
            );
        },
    });

    const _onClick = () => {
        // get checkout id again in case it has been changed by any other process
        const checkoutId = getCheckoutId(null, countryCode);

        if (!variantAttributes.variantId) return false;

        if (checkoutId) {
            checkoutLineItemsAdd({
                variables: checkoutAddLineItemVars({
                    ...variantAttributes,
                    checkoutId,
                }),
            }).catch((e) => {
                if (
                    e.message ===
                    'GraphQL error: Checkout is already completed.'
                ) {
                    checkoutCreate().catch((e) => {
                        captureException(e);
                    });
                }
            });
        } else {
            checkoutCreate().catch((e) => {
                captureException(e);
            });
        }
    };

    if (checkoutCreateMutationError || checkoutLineItemsAddMutationError) {
        if (checkoutCreateMutationError) {
            captureException(new Error(checkoutCreateMutationError));
        }
        if (checkoutLineItemsAddMutationError)
            captureException(new Error(checkoutLineItemsAddMutationError));
    }

    const { className, styles } = css.resolve`
        button.button {
            padding: 15px 18px;
            font-size: 1.15em;
        }
    `;

    return (
        <>
            <Button
                className={`button data-test-cart-button ${fullClassName} ${className}`}
                text={
                    checkoutCreateMutationLoading ||
                    checkoutLineItemsAddMutationLoading
                        ? 'Adding To Bag ...'
                        : text
                }
                disabled={
                    !!(
                        disabled ||
                        checkoutCreateMutationLoading ||
                        checkoutLineItemsAddMutationLoading
                    )
                }
                onClick={_onClick}
            />
            {styles}
        </>
    );
};

export default AddToBag;
