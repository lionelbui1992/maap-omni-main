import React, { useEffect } from 'react';
import {
    CheckoutGiftProvider,
    useCheckoutGifts,
} from '@lib/providers/CartGiftsProvider';
import { useCart } from '@lib/providers/CartProvider';
import { getCheckoutId } from 'helpers/cookies';
import CartGiftMessage from '@containers/Cart/CartGiftMessage/CartGiftMessage';
import CartLineItems from 'containers/Cart/CartLineItems';
import CartBundles from 'containers/Cart/CartBundles';
import CartTotals from 'containers/Cart/CartTotals';
import CartEmpty from 'containers/Cart/CartEmpty';
import { breakpointMedium } from 'config/styles/breakpoints';
import { styles } from './styles';
import SideCartLoader from '@containers/Cart/SideCartLoader';
import { useLoop } from '@lib/providers/LoopProvider';
import { useUI } from '@lib/providers/UIProvider';

const EmptyCartContent = ({ config }) => {
    return <CartEmpty config={config} />;
};

const ActiveCartContent = ({ checkoutId, cartCount, cart, regionCode }) => {
    const { appliedGifts, loading } = useCheckoutGifts();
    const { creditShoppingActive } = useLoop();
    const cartHeight = creditShoppingActive ? 'loopCart' : 'content';

    return (
        <>
            <div className="root">
                <div className={`${cartHeight}`}>
                    <div className="lineItems">
                        <section>
                            {loading ? (
                                <SideCartLoader />
                            ) : (
                                <CartLineItems
                                    checkoutId={checkoutId}
                                    checkout={cart}
                                    numberOfLineItems={cartCount}
                                    loadingUpstream={loading}
                                />
                            )}
                        </section>
                    </div>
                    <div className="cartCallouts">
                        {appliedGifts.map((gift) => (
                            <CartGiftMessage
                                title={gift.title}
                                description={gift.description}
                            />
                        ))}
                        <CartBundles shopifyCheckout={cart} />
                    </div>
                </div>
                <div className="totals">
                    <section>
                        <CartTotals checkout={cart} countryCode={regionCode} />
                    </section>
                </div>
            </div>
            <style jsx global>
                {`
                    .shipping-delay-link {
                        color: rgb(0, 0, 0) !important;
                    }
                `}
            </style>
            <style jsx>
                {`
                    section {
                        padding: 15px;
                        box-sizing: border-box;
                    }

                    .content {
                        overflow-y: scroll;
                        height: ${creditShoppingActive
                            ? ` calc(100vh - 400px)`
                            : `calc(100vh - 280px)`};
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        scrollbar-width: 4px;
                    }

                    .loopCart {
                        overflow-y: scroll;
                        height: ${creditShoppingActive
                            ? ` calc(100vh - 400px)`
                            : `calc(100vh - 280px)`};
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        scrollbar-width: 4px;
                    }

                    .content::-webkit-scrollbar {
                        height: 13px;
                        width: 4px;
                        background: rgb(255, 255, 255);
                    }

                    .content::-webkit-scrollbar-thumb {
                        background: rgb(230, 230, 230);
                        height: 50px;
                        width: 50px;
                        -webkit-border-radius: 1ex;
                    }

                    .totals {
                        background: rgb(255, 255, 255);
                    }

                    @media (max-width: ${breakpointMedium}) {
                        .content {
                            height: ${creditShoppingActive
                                ? ` calc(100vh - 310px)`
                                : `calc(100vh - 330px)`};
                        }
                        .loopCart {
                            height: ${creditShoppingActive
                                ? ` calc(100vh - 310px)`
                                : `calc(100vh - 330px)`};
                        }
                    }
                `}
            </style>
        </>
    );
};

const CartContent = (props) => {
    const { checkoutId, cartCount, cart } = props;
    if (checkoutId && cart && cartCount > 0)
        return <ActiveCartContent {...props} />;

    return <EmptyCartContent {...props} />;
};

const CartSidebarView = (props) => {
    const { displaySidebar } = useUI();
    const { active, config, regionCode } = props;
    const checkoutId = getCheckoutId(null, regionCode);
    const { cart, cartCount } = useCart();

    useEffect(() => {
        if (active && displaySidebar) {
            if (cart !== null) {
                var cartItems = cart.lineItems.edges.map((cartItem) => ({
                    item_id: cartItem.node.variant?.product?.handle,
                    item_name: cartItem.node.title,
                    price: Number(cartItem.node.variant?.priceV2?.amount),
                    item_variant: cartItem.node.variant.sku,
                    quantity: cartItem.node.quantity,
                }));
                window.dataLayer.push({ ecommerce: null });
                if (typeof window !== 'undefined') {
                    window.dataLayer.push({
                        event: 'gtm.viewCart',
                        ecommerce: {
                            cartTotal: Number(cart.totalPriceV2.amount),
                            currency: cart.totalPriceV2.currencyCode,
                            items: cartItems,
                        },
                    });
                }
            }
        }
    }, [active, displaySidebar]);

    useEffect(() => {
        if (active && displaySidebar) {
            if (cart !== null) {
                const nostoCartItems = cart.lineItems.edges.map((cartItem) => ({
                    name: cartItem.node.title,
                    price_currency_code:
                        cartItem.node.variant.priceV2.currencyCode,
                    product_id: cartItem.node.variant.id,
                    quantity: cartItem.node.quantity,
                    sku_id: cartItem.node.variant.sku,
                    unit_price: Number(cartItem.node.variant.priceV2.amount),
                }));

                typeof nostojs === 'function' &&
                    nostojs((api) => {
                        api.defaultSession().setCart({
                            items: nostoCartItems,
                        });
                    });
            }
        }
    }, [cartCount]);

    return (
        <div
            className={`cart-sidebar-view${
                active ? ' cart-sidebar-view--active' : ''
            }`}
        >
            <header>
                <div>Shopping Bag ({cartCount} Items)</div>
            </header>
            <CheckoutGiftProvider config={config} regionCode={regionCode}>
                <CartContent
                    cart={cart}
                    checkoutId={checkoutId}
                    cartCount={cartCount}
                    {...props}
                />
            </CheckoutGiftProvider>
            <style jsx>{styles}</style>
        </div>
    );
};

export default CartSidebarView;
