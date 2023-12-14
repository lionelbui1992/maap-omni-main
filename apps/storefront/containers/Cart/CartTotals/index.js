import React, { useEffect } from 'react';
import { brandMediumGrey } from 'config/styles/colours';
import Pricing from 'components/Pricing';
import { useEvent } from '@lib/providers/EventsProvider';
import { useLoop } from '@lib/providers/LoopProvider';
import { useCart } from '@lib/providers/CartProvider';

const CartTotals = ({ checkout }) => {
    const { event } = useEvent();
    const { clearCart } = useCart();
    const {
        creditShoppingActive,
        loopCheckoutUrl,
        setVariantIds,
        completeLoopReturn,
        loopCreditTotal,
    } = useLoop();

    useEffect(() => {
        const checkoutVariantIds = checkout.lineItems.edges.map((edge) => {
            const variantID = edge.node.variant.id;
            const variantIDRoot = variantID
                .split('?')[0]
                .replace('gid://shopify/ProductVariant/', '');

            return variantIDRoot;
        });

        setVariantIds(checkoutVariantIds);
    }, [checkout.lineItems.edges.length]);

    const checkoutUrl = loopCheckoutUrl || checkout.webUrl;
    const checkoutCTA = loopCheckoutUrl ? 'COMPLETE RETURN' : 'CHECKOUT';

    const checkoutEvent = () => {
        const checkoutEventItems = checkout.lineItems.edges.map((edge) => {
            return {
                id: edge.node.variant.id,
                handle: edge.node.variant?.product?.handle,
                sku: edge.node.variant.sku,
                title: edge.node.title,
                variant: edge.node.variant.title,
                price: edge.node.variant.priceV2.amount,
                currencyCode: edge.node.variant.priceV2.currencyCode,
                quantity: edge.node.quantity,
            };
        });

        event('InitiateCheckout', checkoutEventItems);

        if(typeof window !== 'undefined' && window.pintrk){
            checkout.lineItems.edges.map((edge)=>{
                const productId = edge.node.variant.id.replace("gid://shopify/ProductVariant/","")
                const trackData = {
                    value: edge.node.variant.priceV2.amount * edge.node.quantity,
                    order_id: productId + "-" + (new Date().getTime()),
                    order_quantity: edge.node.quantity,
                    currency: edge.node.variant.priceV2.currencyCode,
                    line_items: [
                        {
                            product_id: productId,
                            product_name: edge.node.title,
                            product_category: edge.node.variant.product.productType,
                            product_price: edge.node.variant.priceV2.amount,
                            product_quantity: edge.node.quantity,
                        }
                    ]
                }
                window.pintrk("track", "checkout", trackData)
            })
        }
    };

    const handleOnCheckout = (e) => {
        checkoutEvent(e);
        if (creditShoppingActive) {
            completeLoopReturn();
            clearCart();
            e.preventDefault();
            window.location = checkoutUrl;
        }

        typeof nostojs === 'function' &&
            nostojs((api) => {
                api.defaultSession()
                    .viewCart()
                    .setPlacements(['cart-related'])
                    .load()
                    .then((data) => {
                        // console.log(data.recommendations);
                    });
            });

        // Send Tiktok Initiate Checkout Event
        ttq.track('InitiateCheckout');
    };

    return (
        <>
            <div className="side_cart_subtotal">
                {creditShoppingActive && (
                    <div className="side_cart__exchange">
                        <span className="side_cart_subtotal__title">
                            EXCHANGE CREDIT
                        </span>
                        <Pricing
                            currentPrice={loopCreditTotal}
                            className="side_cart_subtotal__price"
                        />
                    </div>
                )}
                <div className="side_cart__subtotal_price">
                    <span className="side_cart_subtotal__title">SUBTOTAL</span>
                    <Pricing
                        currentPrice={parseFloat(
                            checkout.subtotalPriceV2.amount
                        ).toFixed(2)}
                        discountAmount={
                            creditShoppingActive ? loopCreditTotal : undefined
                        }
                        className="side_cart_subtotal__price"
                    />
                </div>
            </div>
            <p className="side_cart__checkoutText">
                Shipping calculated at checkout.
            </p>
            <a
                className="button button--primary button-checkout"
                href={checkoutUrl}
                onClick={handleOnCheckout}
            >
                {checkoutCTA}
            </a>
            <style jsx>
                {`
                    .side_cart_subtotal {
                        min-width: 250px;
                        border-bottom: 1px solid ${brandMediumGrey};
                        padding-bottom: 10px;
                    }
                    .side_cart__exchange {
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 1px solid ${brandMediumGrey};
                        padding-bottom: 10px;
                        align-items: center;
                    }
                    .side_cart__subtotal_price {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .side_cart_subtotal__title {
                        font-size: 0.9em;
                    }
                    .pricing__current {
                        font-size: 1.5em;
                        font-weight: 300;
                    }
                    .product__price_and_currency_container {
                        margin-left: auto;
                        padding-top: 0;
                    }
                    .side_cart__afterpay {
                        padding-top: 10px;
                        height: 20px;
                        width: 60px;
                    }
                    .side_cart__checkoutText {
                        font-size: 0.9em;
                        margin: 5px 0 15px 0;
                    }
                `}
            </style>
        </>
    );
};

export default CartTotals;
