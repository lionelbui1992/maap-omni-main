import viewProductGTM from 'listeners/ViewProduct-GTM';
import virtualPageViewFB from 'listeners/VirtualPageView-FB';
import viewProductKlaviyo from 'listeners/ViewProduct-Klaviyo';
import viewPageFB from 'listeners/ViewPage-FB';
import viewProductFB from 'listeners/ViewProduct-FB';
import productImpressionGTM from 'listeners/ProductImpression-GTM';
import clickProductCardGTM from 'listeners/ClickProductCard-GTM';
import addToCartGTM from 'listeners/AddToCart-GTM';
import addToCartFB from 'listeners/AddToCart-FB';
import addToCartKlaviyo from 'listeners/AddToCart-Klaviyo';
import removeCartItemGTM from 'listeners/RemoveCartLineItem-GTM';
import initiateCheckoutGTM from 'listeners/InitiateCheckout-GTM';
import searchTermChanged from 'listeners/SearchTermChanged-GTM';

const infoLog = (message) => {
    console.log(
        '%c%s',
        'color: white; background: green; padding: 2px 10px;',
        message
    );
};

const eventLog = (message, event) => {
    console.log(
        '%c%s',
        'color: white; background: teal; padding: 2px 10px;',
        message,
        event ? event.detail : 'No event details available.'
    );
};

const register = async function (debug) {
    return new Promise((resolve) => {
        window.addEventListener('gtm_ready', () => {
            console.log('GTM Ready Event');

            virtualPageViewFB(debug, infoLog, eventLog);
            viewProductGTM(debug, infoLog, eventLog);
            viewProductKlaviyo(debug, infoLog, eventLog);
            viewPageFB(debug, infoLog, eventLog);
            viewProductFB(debug, infoLog, eventLog);
            productImpressionGTM(debug, infoLog, eventLog);
            clickProductCardGTM(debug, infoLog, eventLog);
            addToCartGTM(debug, infoLog, eventLog);
            addToCartFB(debug, infoLog, eventLog);
            addToCartKlaviyo(debug, infoLog, eventLog);
            removeCartItemGTM(debug, infoLog, eventLog);
            initiateCheckoutGTM(debug, infoLog, eventLog);
            searchTermChanged(debug, infoLog, eventLog);

            resolve();
        });
    });
};

export default register;
