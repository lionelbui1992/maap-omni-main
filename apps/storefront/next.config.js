const redirects = require('./redirects.json');
const { withSentryConfig } = require('@sentry/nextjs');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    poweredByHeader: false,
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    transpilePackages: ['mmds'],
    async redirects() {
        return redirects;
    },
    async rewrites() {
        return [
            {
                source: '/ncollections/:handle',
                destination: '/intl/ncollections/:handle',
            },
            {
                source: '/nproducts/:handle',
                destination: '/intl/nproducts/:handle',
            },
            {
                source: '/sitemap.xml',
                destination: '/api/sitemap/sitemap.xml',
            },
            {
                source: '/sitemap-hreflang.xml',
                destination: '/api/sitemap/sitemap-hreflang.xml',
            },
            {
                source: '/service-worker.js',
                destination: '/_next/static/service-worker.js',
            },
            {
                source: '/blog/:slug',
                destination: '/stories/:slug',
            },
            {
                source: '/stories/collection/:slug',
                destination: '/stories?collection=:slug',
            },
            {
                source: '/cart.json',
                destination: 'https://maapintl.maap.cc/cart.json',
            },
        ];
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET,OPTIONS,POST',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: 'frame-ancestors http://localhost:9999 https://maap-mmds.prismic.io https://maap.cc/ https://maap.cc https://*.maap.cc',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    // {
                    //     key: 'X-Content-Type-Options',
                    //     value: 'nosniff',
                    // },
                ],
            },
        ];
    },
};

const sentryWebpackPluginOptions = {
    silent: true,
    org: 'maap',
    project: 'maap-storefront-omni',
    authToken: process.env.SENTRY_AUTH_TOKEN,
    hideSourceMaps: true,
};

// For analysis only.
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true',
// });
// module.exports = withBundleAnalyzer(nextConfig);

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
