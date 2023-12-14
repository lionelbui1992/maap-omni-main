import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { prismicLandingPageParser } from 'helpers/prismic';
import Head from 'containers/Head';
import brandConfig from 'config/brandConfig';
import PrismicSliceRenderer from '../../../containers/Prismic/PrismicSliceRenderer';
import { Client } from 'helpers/prismic';
import { getContext } from '@lib/get-context';
import { getCmsProps } from 'pages/[country]';
import SimplifiedLayout from '@containers/SimplifiedLayout';

const Pages = ({
    document,
    isMobileFromSSR,
    isTabletFromSSR,
    regionCode,
    ...globals
}) => {
    const router = useRouter();

    const handleMobileMediaQueryChange = (matches) => {
        setIsMobile(matches);
    };

    const handleTabletMediaQueryChange = (matches) => {
        setIsTablet(matches);
    };

    const [isMobile, setIsMobile] = useState(
        useMediaQuery(
            brandConfig.breakPoints.mobile,
            isMobileFromSSR ? brandConfig.breakPoints.mobileDeviceWidth : null,
            handleMobileMediaQueryChange
        )
    );

    const [isTablet, setIsTablet] = useState(
        useMediaQuery(
            brandConfig.breakPoints.tablet,
            isTabletFromSSR ? brandConfig.breakPoints.tabletDeviceWidth : null,
            handleTabletMediaQueryChange
        )
    );

    const seoTitle = document?.data?.seo_title
        ? document?.data?.seo_title[0]?.text
        : null;
    const seoDescription = document?.data?.seoDescription
        ? document?.data?.seoDescription[0]?.text
        : null;

    let markup;

    markup = (
        <PrismicSliceRenderer
            isMobile={isMobile}
            isTablet={isTablet}
            blocks={
                document && document.data
                    ? prismicLandingPageParser(document, 'uid')
                    : []
            }
        />
    );

    useEffect(() => {
        typeof nostojs === 'function' &&
            nostojs((api) => {
                api.defaultSession()
                    .viewOther()
                    .setPlacements(['general-recommendations'])
                    .load()
                    .then((data) => {
                        // console.log(data.recommendations);
                    });
            });
    }, []);

    return (
        <SimplifiedLayout {...globals}>
            <Head
                url={router.asPath}
                title={seoTitle}
                description={seoDescription}
            />
            <div className="nosto_page_type" style={{ display: 'none' }}>
                other
            </div>
            <div className="page challengeEvent__container">{markup}</div>
        </SimplifiedLayout>
    );
};

export async function getStaticProps({ params }) {
    const { handle, country } = params;

    const shopContext = getContext(country);
    const { language } = shopContext;

    const cmsProps = await getCmsProps(shopContext, language);
    let document = await Client().getByUID('landing_page', handle);

    if (!document || !document.tags.includes('maap-event')) document = null;

    if (!document) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            document,
            shopContext,
            ...cmsProps,
        },
        revalidate: 1800,
    };
}

export async function getStaticPaths() {
    return {
        paths: [
            {
                params: {
                    handle: 'arrivals-maap-outthere-ride',
                },
            },
        ],
        fallback: 'blocking',
    };
}

export default Pages;
