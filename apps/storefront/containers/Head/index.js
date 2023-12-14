import { useShop } from '@lib/providers/ShopProvider';
import NextHead from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import canonicals from './canonicals';
import fbtracking from './fbtracking';
import hotJar from './hotjar';
import prefetchers from './prefetchers';
import prismic from './prismic';

const Header = ({
    title,
    description,
    keywords,
    ogImage,
    url,
    excludeSeo = false,
    noIndexStatus = false,
}) => {
    const {
        storefrontUrl,
        gtmContainerID,
        justUNOID,
        metaTitle,
        metaDescription,
        metaKeywords,
        klaviyoCompanyID,
        tiktokTrackingCode,
    } = useShop();

    const router = useRouter();
    const sizes = ['512x512', '192x192', '64x64', '32x32', '24x24', '16x16'];

    const includeScripts = process.env.NEXT_PUBLIC_VERCEL_ENV !== 'development';

    return (
        <NextHead>
            {noIndexStatus === true ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : (
                <meta name="robots" content="index, follow" />
            )}
            <link rel="stylesheet" href="https://use.typekit.net/mni2qqn.css" />
            <meta
                name="apple-mobile-web-app-status-bar-style"
                content="default"
            />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="icon" href={`${storefrontUrl}favicon.ico`} />
            {!excludeSeo && (
                <>
                    <title>{title || metaTitle || ''}</title>
                    <meta
                        name="description"
                        content={description || metaDescription}
                    />
                    <meta name="keywords" content={keywords || metaKeywords} />

                    {canonicals(router)}

                    <meta
                        key="og:url"
                        property="og:url"
                        content={url || storefrontUrl}
                    />
                    <meta property="og:title" content={title || metaTitle} />
                    <meta
                        property="og:description"
                        content={description || metaDescription}
                    />
                    <meta name="twitter:site" content={url || storefrontUrl} />
                    <meta name="twitter:card" content="summary_large_image" />

                    <meta property="og:type" content="website" />

                    {!!ogImage && (
                        <meta property="og:image" content={ogImage} />
                    )}
                    {!!ogImage && (
                        <meta name="twitter:image" content={ogImage} />
                    )}

                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                </>
            )}
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1.0"
            />

            {sizes.map((size, index) => {
                return (
                    <link
                        key={`icon_${size}_${index}`}
                        rel="icon"
                        sizes={size}
                        href={`/images/icons/icon-${size}`}
                    />
                );
            })}
            {prefetchers}
            {prismic}
            {fbtracking}
            {hotJar}
            {includeScripts && (
                <>
                    <script
                        type="text/javascript"
                        dangerouslySetInnerHTML={{
                            __html: ` (() => {window.nostojs=window.nostojs||(cb => {(window.nostojs.q=window.nostojs.q||[]).push(cb);});})();`,
                        }}
                    />

                    <script
                        async
                        src={`https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${klaviyoCompanyID}`}
                        dangerouslySetInnerHTML={{
                            __html: `if (window !== undefined && window._learnq === undefined) {
                            window._learnq = [];
                    }`,
                        }}
                    />
                    {tiktokTrackingCode && (
                        <script
                            type="text/javascript"
                            dangerouslySetInnerHTML={{
                                __html: `!function (w, d, t) {
                        w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++
              )ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
                      
                        ttq.load('${tiktokTrackingCode}');
                        ttq.page();
                      }(window, document, 'ttq');
              `,
                            }}
                        />
                    )}
                    {gtmContainerID && (
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document, 'script', 'dataLayer', '${gtmContainerID}');`,
                            }}
                        />
                    )}
                    {justUNOID && (
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `window.ju_num="${justUNOID}";window.asset_host='//cdn.jst.ai/';(function(i,s,o,g,r,a,m){i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)};a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script',asset_host+'vck.js','juapp');`,
                            }}
                            async="async"
                        />
                    )}
                </>
            )}
        </NextHead>
    );
};

Header.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    ogImage: PropTypes.string,
    keywords: PropTypes.string,
    url: PropTypes.string,
    excludeSeo: PropTypes.bool,
    noIndexStatus: PropTypes.bool,
};

export default Header;
