import config from 'config/brandConfig';

export default (function (debug, infoLog, eventLog) {
    if (window.dataLayer === undefined) {
        if (debug)
            infoLog(
                'Not registering InitiateCheckout-GTM Listener. Data Layer unavailable'
            );
        return false;
    }

    if (debug) infoLog('Registering InitiateCheckout-GTM Listener');

    window.addEventListener(
        'InitiateCheckout',
        (event) => {
            if (debug) eventLog(`Initiate Checkout - GTM`, event);

            console.log('InitiateCheckout Items', event.detail);

            const formattedEventProducts = event.detail.map((product) => ({
                id: product.id,
                handle: product.handle,
                name: product.title,
                sku: product.sku,
                price: product.price,
                currencyCode: product.currencyCode,
                brand: config.tracking.brand,
                category: config.tracking.category,
                variant: product.variant,
                quantity: product.quantity,
            }));

            console.log('DL Push', {
                event: 'checkout',
                ecommerce: {
                    checkout: {
                        products: formattedEventProducts,
                    },
                },
            });
            dataLayer.push({ ecommerce: null });
            dataLayer.push({
                event: 'checkout',
                ecommerce: {
                    checkout: {
                        products: formattedEventProducts,
                    },
                },
            });
        },
        { passive: true }
    );

    return true;
});
