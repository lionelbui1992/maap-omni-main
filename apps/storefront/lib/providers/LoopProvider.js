import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useShop } from '@lib/providers/ShopProvider';

import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import { getCheckoutId, setCheckoutId } from 'helpers/cookies';

const Context = createContext(null);

const createUpdateCart = async (variantIds, token = null, loopApiKey) => {
    const mode = token ? 'update' : 'create';

    const url =
        mode === 'update'
            ? `https://api.loopreturns.com/api/v1/cart/${token}`
            : `https://api.loopreturns.com/api/v1/cart/`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Authorization': loopApiKey,
        },
        body: JSON.stringify({ cart: variantIds }),
    });

    const responseObject = await response.json();

    return responseObject;
};

const getCart = async (token, loopApiKey) => {
    if (!token || !loopApiKey) return;

    const url = `https://api.loopreturns.com/api/v1/cart/${token}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Authorization': loopApiKey,
        },
    });

    const responseObject = await response.json();

    return responseObject;
};

function LoopProvider({ children }) {
    const [loopInputParams, setLoopInputParams] = useState(null);
    const [loopCreditTotal, setLoopCreditTotal] = useState(null);
    const [loopCheckoutToken, setLoopCheckoutToken] = useState(null);
    const [loopCheckoutUrl, setLoopCheckoutUrl] = useState(null);
    const [creditShoppingActive, setCreditShoppingActive] = useState(false);
    const [variantIds, setVariantIds] = useState();

    const {
        loopApiKey,
        code: regionCode,
        defaultCurrencySymbol: currencySymbol,
    } = useShop();

    const {
        query: {
            loop_return_id,
            loop_currency,
            loop_base,
            loop_total,
            loop_redirect_uri,
            loop_customer_name,
        },
    } = useRouter();

    const saveLoopCartToken = (token) => {
        localStorage.setItem('loopToken', token);
    };

    useEffect(() => {
        const asyncFunc = async () => {
            if (!window) {
                return;
            }

            let paramsObject = JSON.parse(
                window.localStorage.getItem('loopOnstoreParams')
            );

            const storedToken = window.localStorage.getItem('loopToken');
            const checkoutId = window.localStorage.getItem(
                `checkoutId${regionCode}`
            );

            if (window.location.search.includes('loop_return_id')) {
                window.localStorage.setItem('inLoopFlow', true);
                const params = new URLSearchParams(window.location.search);
                // Remove any non-loop related query params, then convert the query string
                // to an object of key/value pairs to make it easier to work with
                const newParamsObject = [...params.entries()]
                    .filter(([key]) => key.startsWith('loop'))
                    .reduce((acc, [key, value]) => {
                        return {
                            ...acc,
                            [key]: value,
                        };
                    }, {});

                if (
                    paramsObject?.loop_return_id ===
                        newParamsObject?.loop_return_id &&
                    checkoutId
                ) {
                    setCheckoutId(checkoutId, regionCode);
                }

                paramsObject = newParamsObject;
                localStorage.setItem(
                    'loopOnstoreParams',
                    JSON.stringify(paramsObject)
                );
            }

            const savedLoopList = paramsObject || {};
            const getStoredToken = storedToken;

            setLoopInputParams(savedLoopList);
            setLoopCheckoutToken(getStoredToken);

            setCreditShoppingActive(
                window.localStorage.getItem('inLoopFlow') === 'true'
            );
        };
        asyncFunc();
    }, []);

    // When cart changes
    useEffect(() => {
        const asyncFunc = async () => {
            if (creditShoppingActive) {
                const response = null;
                if (loopCheckoutToken && loopCheckoutUrl) {
                    await createUpdateCart(
                        variantIds,
                        loopCheckoutToken,
                        loopApiKey
                    );
                } else {
                    const response = await createUpdateCart(
                        variantIds,
                        null,
                        loopApiKey
                    );

                    if (response?.token) {
                        // Create
                        const localCheckoutUrl = `https://${loopInputParams?.loop_domain}/#/cart/v2/${response.token}`;

                        saveLoopCartToken(response.token);
                        setLoopCheckoutToken(response.token);
                        setLoopCheckoutUrl(localCheckoutUrl);
                    }
                }
            }
        };
        asyncFunc();
    }, [variantIds]);

    useEffect(() => {
        const { loop_base } = loopInputParams ?? {};
        const total = parseFloat(loop_base) ?? 0;
        const dollarAmount = total / 100;
        setLoopCreditTotal(dollarAmount.toFixed(2));
    }, [loopInputParams]);

    const clearLoopFlow = () => {
        setCreditShoppingActive(false);
        window.localStorage.removeItem('loopOnstoreParams');
        window.localStorage.removeItem('loopToken');
        window.localStorage.removeItem('savedList');
        window.localStorage.removeItem(`checkoutId${regionCode}`);
        window.localStorage.setItem('inLoopFlow', false);
        window.location = '/';
    };

    const completeLoopReturn = () => {
        setCreditShoppingActive(false);
        const checkoutId = getCheckoutId(null, regionCode);
        window.localStorage.setItem(`checkoutId${regionCode}`, checkoutId);
        window.localStorage.setItem('inLoopFlow', false);
    };

    const provides = {
        creditShoppingActive,
        loopInputParams,
        loopCheckoutToken,
        saveLoopCartToken,
        loopCheckoutUrl,
        setVariantIds,
        clearLoopFlow,
        completeLoopReturn,
        loopCreditTotal,
        currencySymbol,
    };

    return (
        <Context.Provider value={{ ...provides }}>{children}</Context.Provider>
    );
}

LoopProvider.propTypes = {
    children: PropTypes.any,
};

const useLoop = () => useContext(Context);

export { LoopProvider, useLoop };
