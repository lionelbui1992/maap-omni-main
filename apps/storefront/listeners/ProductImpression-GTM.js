import config from 'config/brandConfig';

export default (function (debug, infoLog, eventLog) {
    if (window.dataLayer === undefined) {
        if (debug)
            infoLog(
                'Not registering ProductImpression-GTM Listener. Data layer unavailable'
            );
        return false;
    }

    if (debug) infoLog('Registering ProductImpression-GTM Listener');

    window.addEventListener(
        'ProductImpression',
        (event) => {
            if (debug)
                eventLog(
                    `View Product Card Custom Event ProductImpression`,
                    event
                );

            dataLayer.push({
                event: 'gtm.productImpression',
                ecommerce: {
                    currencyCode: event.detail.productCurrency,
                    impressions: [
                        {
                            id: event.detail.id,
                            sku: event.detail.sku,
                            name: event.detail.title,
                            price: event.detail.price,
                            brand: config.tracking.brand,
                            category: event.detail.category,
                            variant: event.detail.variant,
                            list: event.detail.category,
                        },
                    ],
                },
            });
        },
        { passive: true }
    );

    return true;
});
