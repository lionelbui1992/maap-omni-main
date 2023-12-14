import config from 'config/brandConfig';

export default (function (debug, infoLog, eventLog) {
    if (window.dataLayer === undefined) {
        if (debug)
            infoLog(
                'Not registering ViewProduct-GTM Listener. Data layer unavailable'
            );
        return false;
    }

    if (debug) infoLog('Registering ViewProduct-GTM Listener');

    window.addEventListener(
        'ViewProduct',
        (event) => {
            if (debug)
                eventLog(`View Product 'gtm.productPageView (custom)`, event);

            dataLayer.push({ ecommerce: null });
            dataLayer.push({
                event: 'gtm.productPageView',
                ecommerce: {
                    detail: {
                        products: [
                            {
                                name: event.detail.productTitle,
                                id: event.detail.sku,
                                sku: event.detail.sku,
                                price: event.detail.productPrice,
                                brand: config.tracking.brand,
                                category: config.tracking.category,
                                variant: event.detail.variant,
                                size: event.detail.size,
                                item_id: event.detail.handle,
                                item_variant: event.detail.sku,
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
