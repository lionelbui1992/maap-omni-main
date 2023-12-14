import config from 'config/brandConfig';

export default (function (debug, infoLog, eventLog) {
    if (window.dataLayer === undefined) {
        if (debug)
            infoLog(
                'Not registering RemoveCartLineItem-GTM Listener. Data layer unavailable'
            );
        return false;
    }

    if (debug) infoLog('Registering RemoveCartLineItem-GTM Listener');

    window.addEventListener(
        'RemoveCartLineItem',
        (event) => {
            if (debug) eventLog(`Remove Cart Line Item`, event);
            dataLayer.push({ ecommerce: null });
            dataLayer.push({
                event: 'gtm.removeCartLineItem',
                ecommerce: {
                    currencyCode: event?.detail?.productCurrency,
                    remove: {
                        products: [
                            {
                                name: event.detail?.productTitle,
                                id: event.detail?.productId,
                                price: event.detail?.productPrice,
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
