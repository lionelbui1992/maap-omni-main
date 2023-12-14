import config from 'config/brandConfig';

export default (function (debug, infoLog, eventLog) {
    if (window.fbq === undefined) {
        if (debug)
            infoLog('Not registering AddToCart-FB Listener. Fbq unavailable');
        return false;
    }

    if (debug) infoLog('Registering AddToCart-FB Listener');

    window.addEventListener(
        'AddToCart',
        (event) => {
            if (debug) eventLog(`Add To Cart - FB`, event);

            const decodedVariantId = Buffer.from(
                event.detail.productId,
                'base64'
            )
                .toString('ascii')
                .replace('gid://shopify/ProductVariant/', '');

            fbq('track', 'AddToCart', {
                content_name: event.detail.productTitle,
                content_category: config.tracking.category,
                content_ids: [decodedVariantId],
                content_type: 'product',
                value: event.detail.productPrice,
                currency: event.detail.productCurrency,
            });
        },
        { passive: true }
    );

    return true;
});
