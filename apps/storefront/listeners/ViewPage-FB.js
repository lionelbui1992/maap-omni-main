export default (function(debug, infoLog, eventLog) {
    if (window.fbq === undefined) {
        if (debug)
            infoLog(
                'Not registering ViewProduct-FB Listener. Data layer unavailable'
            );
        return false;
    }

    if (debug) infoLog('Registering ViewPage-GTM Listener');

    window.addEventListener(
        'ViewPage',
        event => {
            if (debug)
                eventLog(`View Product 'gtm.productPageView (custom)`, event);
        },
        { passive: true }
    );

    return true;
});
