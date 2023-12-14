export default (function(debug, infoLog, eventLog) {
    if (window._learnq === undefined) {
        if (debug)
            infoLog(
                'Not registering ViewProduct-Klaviyo Listener. _learnq unavailable.'
            );
        return false;
    }

    if (debug) infoLog('Registering AddedToCart-Klaviyo Listener');

    window.addEventListener('AddToCart', event => {
        if (debug) eventLog(`Add To Cart - Klaviyo`, event);

        if (!_learnq.isIdentified()) {
            if (debug)
                eventLog(`Cant Run Event - Session Not Identified`, event);
        }

        if (!event?.detail) {
            if (debug) eventLog(`Cant Run Event - No Event Details`, event);
            return true;
        }

        const {
            productURL,
            imageUrl,
            productId,
            variantSku,
            productPrice,
            productCompareAtPrice,
            productCategory,
            productTitle,
            quantity,
            checkoutUrl,
        } = event.detail;

        const decodedVariantId = Buffer.from(productId, 'base64')
            .toString('ascii')
            .replace('gid://shopify/ProductVariant/', '');

        const KlaviyoItem = {
            $value: productPrice,
            Name: productTitle,
            ID: decodedVariantId,
            SKU: variantSku,
            Categories: [productCategory],
            ImageURL: imageUrl,
            URL: productURL,
            Brand: 'MAAP',
            Price: productPrice,
            CompareAtPrice: productCompareAtPrice,
            Quantity: quantity,
            CheckoutUrl: checkoutUrl,
        };

        console.log(
            '_learnq Item',
            KlaviyoItem,
            _learnq.push(['track', 'Added to Cart', KlaviyoItem])
        );
    });

    return true;
});
