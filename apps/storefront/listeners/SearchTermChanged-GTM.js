export default (function(debug, infoLog, eventLog) {
    if (window.dataLayer === undefined) {
        if (debug)
            infoLog(
                'Not registering SearchTermChange-GTM Listener. Data layer unavailable'
            );
        return false;
    }

    if (debug) infoLog('Registering SearchTermChange-GTM Listener');

    window.addEventListener(
        'SearchTermChanged',
        event => {
            if (debug) eventLog(`Search Term Change`, event);

            dataLayer.push({
                event: 'gtm.SearchTermChange',
                term: event.detail.searchTerm,
            });
        },
        { passive: true }
    );

    return true;
});
