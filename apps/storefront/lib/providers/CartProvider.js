import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { getCheckoutId, setCheckoutId } from 'helpers/cookies';
import { removeCheckoutId } from 'helpers/cookies';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
    CHECKOUT_QUERY,
    CHECKOUT_APPLY_DISCOUNT_CODE,
} from '@lib/gql/checkout';
import withApollo from '@lib/withApollo';
import { useIsomorphicLayoutEffect } from '@lib/useIsomorphicLayoutEffect';
import qs from 'qs';

const Context = createContext(null);

function CartProviderObject({ children, regionCode }) {
    const router = useRouter();
    const [cart, setCart] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [cartUIActive, setCartUIActive] = useState(false);

    const checkoutId = getCheckoutId(null, regionCode);

    const clearState = () => {
        setCart(null);
        setCartCount(0);
    };

    const {
        data: checkoutData,
        error,
        loading,
    } = useQuery(CHECKOUT_QUERY, {
        variables: { checkoutId },
        context: { clientName: regionCode },
        fetchPolicy: 'no-cache',
        skip: !checkoutId,
    });

    const [
        applyDiscountCode,
        {
            data: discountCodeData,
            error: discountCodeError,
            loading: discountCodeLoading,
        },
    ] = useMutation(CHECKOUT_APPLY_DISCOUNT_CODE);

    // to apply Discount Code
    useIsomorphicLayoutEffect(() => {
        const urlParams = qs.parse(window.location.search, {
            ignoreQueryPrefix: true,
        });

        if (urlParams.discount_code) {
            window.sessionStorage.setItem(
                'discountCode',
                urlParams.discount_code
            );
        }
    }, []);

    const cartHasDiscountCode = () => {
        if (!cart) return false;
        let result = false;

        cart.lineItems.edges.forEach((edge) => {
            if (edge.node.discountAllocations.length > 0) {
                result = true;
            }
        });

        return result;
    };

    const applyStoredDiscountCode = () => {
        const discountCode = window.sessionStorage.getItem('discountCode');

        if (checkoutId && discountCode) {
            applyDiscountCode({
                variables: { checkoutId, discountCode },
                context: { clientName: regionCode },
                fetchPolicy: 'no-cache',
                update(proxy, { data }) {
                    setCart(data.checkoutDiscountCodeApplyV2.checkout);
                },
            }).then(() => {
                console.log('discount code applied');
            });
        }
    };

    const hasEmptyVariants = (checkout) => {
        if (!checkout?.node) return false;
        return checkout?.node.lineItems.edges.some((edge) => {
            return edge.node.variant === null;
        });
    };

    useEffect(() => {
        if (typeof checkoutData !== 'undefined') {
            if (
                (checkoutData &&
                    checkoutData.node &&
                    checkoutData.node.completedAt) ||
                !checkoutData ||
                hasEmptyVariants(checkoutData)
            ) {
                clearState();
                removeCheckoutId(regionCode);
            } else {
                setCart(checkoutData.node);

                if (!cartHasDiscountCode()) {
                    applyStoredDiscountCode();
                }
            }
        }
    }, [checkoutData, loading]);

    useEffect(() => {
        if (!cartHasDiscountCode()) {
            applyStoredDiscountCode();
        }
    }, [checkoutId]);

    const clearCart = () => {
        clearState();
        removeCheckoutId(regionCode);
    };

    useEffect(() => {
        const messageHandler = (e) => {
            try {
                const msg = JSON.parse(e.data);
                if (msg.type === 'clear-cart') {
                    clearCart();
                    setCartUIActive(false);
                }
            } catch (error) {
                // Ignore errors.
            }
        };

        window.addEventListener('message', messageHandler, false);

        return () => window.removeEventListener('message', messageHandler);
    }, []);

    useEffect(() => {
        if (cart) {
            setCartCount(
                cart.lineItems.edges
                    .map((item) => item.node.quantity)
                    .reduce((x, y) => x + y, 0)
            );
        }
    }, [cart?.lineItems]);

    useEffect(() => {
        if (cart?.id) {
            setCheckoutId(cart.id, regionCode);
        }
    }, [cart?.id]);

    // If this function is truthy, there is a checkout ID in cookie but no cart.
    // This can be used to check that there's no manipulation going on before allowing
    // add to cart. Use it to stop user's from adding to cart from two parallel pages
    // without the brand catching it.
    const stateIsInconsistent = () => {
        const cookieID = getCheckoutId(null, regionCode);
        if (cart && cart.id !== cookieID) return true;
        return !!cookieID && !cart;
    };

    const toggleCartUI = () => setCartUIActive(!cartUIActive);

    const provides = {
        cart,
        setCart,
        cartCount,
        cartUIActive,
        setCartUIActive,
        toggleCartUI,
        clearCart,
        stateIsInconsistent,
    };

    return (
        <Context.Provider value={{ ...provides }}>{children}</Context.Provider>
    );
}

CartProviderObject.propTypes = {
    children: PropTypes.any.isRequired,
};

const useCart = () => useContext(Context);

const CartProvider = withApollo(CartProviderObject);

export { CartProvider, useCart };
