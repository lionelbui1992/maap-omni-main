import { contentStructureFooterNav } from '@app/components/footer-nav/types';

export const footerNav: contentStructureFooterNav = [
    {
        label: 'Support',
        hrefLink: '/customer-service',
        children: [
            {
                label: 'Email Us',
                hrefLink:
                    'https://support.maap.cc/hc/en-us/requests/new?_ga=2.231372891.53918066.1702255649-1690010028.1701900465',
            },
            {
                label: 'Phone: + 613 9133 5881',
                hrefLink:
                    'https://support.maap.cc/hc/en-us/requests/new?_ga=2.231372891.53918066.1702255649-1690010028.1701900465',
            },
            {
                label: 'Shipping',
                hrefLink: '/shipping',
            },
            {
                label: 'Returns',
                hrefLink: '/returns',
            },
            {
                label: 'Crash Replacement',
                hrefLink: '/crash-replacement',
            },
            {
                label: 'FAQ',
                hrefLink: '/faq',
            },
            {
                label: 'Careers',
                hrefLink: '/careers',
            },
            {
                label: 'Sitemap',
                hrefLink: '/sitemap',
            },
            {
                label: 'Cookie Preferences',
                hrefLink: '/cookie-preferences',
            },
        ],
    },
    {
        label: 'About Us',
        hrefLink: '/about-us',
        children: [
            {
                label: 'About',
                hrefLink: '/about',
            },
            {
                label: 'Stockists',
                hrefLink: '/careers',
            },
            {
                label: 'Privacy Policy',
                hrefLink: '/privacy-policy',
            },
            {
                label: 'Terms and conditions',
                hrefLink: '/terms-and-conditions',
            },
            {
                label: 'MAAP Lab',
                hrefLink: '/maap-lab',
            },
        ],
    },
    {
        label: 'Connect',
        hrefLink: '/connect',
        children: [
            {
                label: 'Instagram',
                hrefLink: '/instagram',
            },
            {
                label: 'Facebook',
                hrefLink: '/facebook',
            },
            {
                label: 'Strava',
                hrefLink: '/strava',
            },
            {
                label: 'Youtube',
                hrefLink: '/youtube',
            },
        ],
    },
];
export default footerNav;
