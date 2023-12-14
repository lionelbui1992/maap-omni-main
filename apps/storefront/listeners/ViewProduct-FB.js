export default (function(debug, infoLog, eventLog) {
    if (window.fbq === undefined) {
        if (debug)
            infoLog(
                'Not registering ViewProduct-FB Listener. Data layer unavailable'
            );
        return false;
    }

    if (debug) infoLog('Registering ViewProduct-GTM Listener');

    window.addEventListener(
        'ViewProduct',
        event => {
            if (debug)
                eventLog(`View Product 'gtm.productPageView (custom)`, event);

            const decodedVariantId = Buffer.from(
                event.detail.productId,
                'base64'
            )
                .toString('ascii')
                .replace('gid://shopify/ProductVariant/', '');

            fbq('track', 'ViewContent', {
                content_name: event.detail.productTitle,
                content_ids: [decodedVariantId],
                content_category: 'Apparel & Accessories',
                content_type: 'product',
                value: event.detail.productPrice,
                currency: event.detail.productCurrency,
            });
        },
        { passive: true }
    );

    return true;
});
