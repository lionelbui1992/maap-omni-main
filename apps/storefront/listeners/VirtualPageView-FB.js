export default (function(debug, infoLog, eventLog) {
    if (debug)
        infoLog('Registering Self-Executing VirtualPageView-FB Listener');

    window.addEventListener(
        'tracking_listeners_registered',
        event => {
            if (typeof window.fbq === 'undefined') {
                if (debug)
                    infoLog(
                        'Facebook virtual Page View not fired. fbq not ready'
                    );
                return false;
            }

            if (debug) eventLog(`Facebook virtual Page View`);

            if (fbq) fbq('track', 'PageView');

            return true;
        },
        { passive: true }
    );

    return true;
});
