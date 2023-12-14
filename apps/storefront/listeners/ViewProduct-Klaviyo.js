export default (function(debug, infoLog, eventLog) {
    if (window._learnq === undefined) {
        if (debug)
            infoLog(
                'Not registering ViewProduct-Klaviyo Listener. _learnq unavailable.'
            );
        return false;
    }

    if (debug) infoLog('Registering ViewProduct-Klaviyo Listener');

    window.addEventListener('ViewProduct', event => {
        if (debug) eventLog(`View Product Klaviyo`, event);

        const {
            productURL,
            imageUrl,
            productId,
            sku,
            productPrice,
            productCompareAtPrice,
            productTitle,
            handle,
            quantity,
        } = event.detail;

        const KlaviyoItem = {
            $value: productPrice,
            Name: productTitle,
            Handle: handle,
            ID: productId,
            SKU: sku,
            Categories: ['Apparel & Accessories'],
            ImageURL: imageUrl,
            URL: productURL,
            Brand: 'MAAP',
            Price: productPrice,
            CompareAtPrice: productCompareAtPrice,
            Quantity: quantity,
            Metadata: {
                Brand: 'MAAP',
                Price: productPrice,
                CompareAtPrice: productCompareAtPrice,
            },
        };

        _learnq.push(['track', 'Viewed Product', KlaviyoItem]);

        _learnq.push(['trackViewedItem', KlaviyoItem]);
    });

    return true;
});
