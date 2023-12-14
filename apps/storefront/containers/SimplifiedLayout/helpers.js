import { Client, findDocByUID } from 'helpers/prismic';
import Prismic from 'prismic-javascript';

export async function getGlobalPrismicDocuments(context, localeCode) {
    const { results } = await Client(context?.req).query(
        Prismic.Predicates.any('document.type', [
            'catalogue_navigation_v2',
            'footer_navigation',
            'payment_options',
            'assistance',
            'profile_nav',
            'cart_config',
        ]),
        {
            lang: ['*'],
            pageSize: 30,
        }
    );

    const megaNav = findDocByUID(
        results,
        'catalogue-navigation-v2',
        localeCode
    );
    const footerNav = findDocByUID(results, 'footer-navigation', localeCode);
    const paymentOptions = findDocByUID(results, 'payment-options', localeCode);
    const assistanceNav = findDocByUID(results, 'assistance', localeCode);
    const profileNav = findDocByUID(results, 'profile-nav', localeCode);
    const cartConfig = findDocByUID(results, 'cart-config', localeCode);

    return {
        megaNav,
        footerNav,
        paymentOptions,
        assistanceNav,
        profileNav,
        cartConfig,
    };
}
