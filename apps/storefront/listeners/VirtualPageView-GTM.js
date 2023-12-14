export default (function(debug, infoLog, eventLog) {
    if (window.dataLayer === undefined) {
        if (debug) infoLog('Not registering VirtualPageView-GTM Listener. Data layer unavailable');
        return false;
    }

    if (debug) infoLog('Registering VirtualPageView-GTM Listener');

    window.addEventListener(
        'VirtualPageView',
        event => {
            if (debug) eventLog(`Virtual Page View`, event);

            dataLayer.push({
                event: 'virtualPageView',
                page: {
                    title: 'contact us',
                    url: '/contact',
                },
            });
        },
        { passive: true }
    );

    return true;
});
