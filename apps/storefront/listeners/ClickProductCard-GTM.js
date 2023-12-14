import config from 'config/brandConfig';

export default (function (debug, infoLog, eventLog) {
    if (window.dataLayer === undefined) {
        if (debug)
            infoLog(
                'Not registering ClickProductCard-GTM Listener. Data layer unavailable'
            );
        return false;
    }

    if (debug) infoLog('Registering ClickProductCard-GTM Listener');

    window.addEventListener(
        'ClickProductCard',
        (event) => {
            if (debug) eventLog(`Click Product Card`, event);

            dataLayer.push({ ecommerce: null });
            dataLayer.push({
                event: 'gtm.clickProductImpression',
                ecommerce: {
                    currencyCode: event.detail.productCurrency,
                    click: {
                        products: [
                            {
                                id: event.detail.id,
                                name: event.detail.title,
                                price: event.detail.price,
                                brand: config.tracking.brand,
                                category: event.detail.category,
                                variant: event.detail.variant,
                                list: event.detail.category,
                                position: event.detail.position,
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
