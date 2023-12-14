import config from 'config/brandConfig';

export default (function (debug, infoLog, eventLog) {
    if (window.dataLayer === undefined) {
        if (debug)
            infoLog(
                'Not registering AddToCart-GTM Listener. Data layer unavailable'
            );
        return false;
    }

    if (debug) infoLog('Registering AddToCart-GTM Listener');

    window.addEventListener(
        'AddToCart',
        (event) => {
            if (debug) eventLog(`Add To Cart`, event);
            dataLayer.push({ ecommerce: null });
            dataLayer.push({
                event: 'gtm.addCartLineItem',
                ecommerce: {
                    currencyCode: event.detail.productCurrency,
                    add: {
                        products: [
                            {
                                name: event.detail.productTitle,
                                id: event.detail.productId,
                                price: event.detail.productPrice,
                                brand: config.tracking.brand,
                                category: config.tracking.category,
                                quantity: event.detail.quantity,
                                variant: event.detail.variantTitle,
                                item_id: event.detail.item_id,
                                item_variant: event.detail.item_variant,
                            },
                        ],
                    },
                },
            });
        },
        { passive: true }
    );

    return true;
});
