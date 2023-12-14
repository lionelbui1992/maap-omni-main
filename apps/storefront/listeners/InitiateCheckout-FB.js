import config from 'config/brandConfig';

export default (function (debug, infoLog, eventLog) {
    if (typeof window.fbq === 'undefined') {
        if (debug)
            infoLog(
                'Not registering InitiateCheckout-FB Listener. Fbq unavailable'
            );
        return false;
    }

    if (debug) infoLog('Registering InitiateCheckout-FB Listener');

    window.addEventListener(
        'InitiateCheckout',
        (event) => {
            if (debug) eventLog(`Initiate Checkout - FB`, event);

            console.log('checkout items', event.details);

            const decodedVariantId = Buffer.from(
                event.detail.productId,
                'base64'
            )
                .toString('ascii')
                .replace('gid://shopify/ProductVariant/', '');

            if (fbq) {
                fbq('track', 'InitiateCheckout', {
                    content_name: event.detail.productTitle,
                    content_category: config.tracking.category,
                    content_ids: [decodedVariantId],
                    content_type: 'product',
                    value: event.detail.productPrice,
                    currency: event.detail.productCurrency,
                });
            }
        },
        { passive: true }
    );

    return true;
});
