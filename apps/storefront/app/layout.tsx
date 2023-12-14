import React, { ReactElement } from 'react';
import Script from 'next/script';
import ManagedNavigation from '@app/components/managed-navigation';
import { getContentStructure } from '@app/lib/content-structure/cached-shopify-content-structure';

import 'styles/reset.css';
import 'styles/tokens.css';
import 'styles/global.css';
import 'styles/typography.css';
import 'styles/dark.theme.css';
import 'styles/light.theme.css';
import { getContext } from '@app/lib/store-context/get-context';
import { ShopifyClientContext } from '@app/lib/shopify/client';
import Mock from '@app/components/footer-nav/mock';
import getTheme from '@app/lib/browser/get-theme';
import FooterNav from '@app/components/footer-nav';

export default async function RootLayout({
    children,
}: {
    children: any;
}): Promise<ReactElement> {
    // Hack time 🎊!
    const pathSegments = children.props.childProp.segment;
    const countryCode = pathSegments[1];
    const context = getContext(countryCode);
    const clientSettings: ShopifyClientContext = {
        shopifyDomain: context.shopifyDomain,
        storefrontAccessToken: context.shopifyStorefrontToken,
        languageCode: context.shopifyStorefrontToken,
        countryCode: context.shopifyStorefrontToken,
    };
    const contentStructure = await getContentStructure(clientSettings);
    return (
        <html lang="en" data-theme={getTheme()}>
            <body>
                {contentStructure && (
                    <ManagedNavigation contentStructure={contentStructure} />
                )}
                {children}
                <Script
                    id="prismic-preview"
                    strategy="afterInteractive"
                    src="https://static.cdn.prismic.io/prismic.js?new=true&repo=maap-mmds"
                />
                {process.env.NEXT_PUBLIC_HOTJAR_ID && (
                    <Script
                        id="hotjar"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)}; h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:6}; a=o.getElementsByTagName('head')[0]; r=o.createElement('script');r.async=1; r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv; a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
                        }}
                    />
                )}
                <FooterNav variant="responsive" items={Mock} />
            </body>
        </html>
    );
}
