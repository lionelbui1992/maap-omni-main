import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { Client, prismicLandingPageParser } from 'helpers/prismic';
import Head from 'containers/Head';
import brandConfig from 'config/brandConfig';
import PrismicSliceRenderer from 'containers/Prismic/PrismicSliceRenderer';
import PageNotFound from '@components/PageNotFound/NotFound';
import { getContext } from '@lib/get-context';
import { getCmsProps } from 'pages/[country]';
import SimplifiedLayout from 'containers/SimplifiedLayout';
import { getShopifyPageByHandle } from '../../helpers/pages';
import { seoValuesWithDefaults } from '../../helpers/metafields';

const LabPage = ({
    document,
    isMobileFromSSR,
    isTabletFromSSR,
    regionCode,
    seoValues,
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

    if (!document) {
        return (
            <SimplifiedLayout regionCode={regionCode} {...globals}>
                <PageNotFound />
            </SimplifiedLayout>
        );
    }

    const markup = (
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
        <SimplifiedLayout regionCode={regionCode} {...globals}>
            <Head
                url={router.asPath}
                title={seoValues.title}
                description={seoValues.description}
            />

            <div className="page challengeEvent__container">{markup}</div>
        </SimplifiedLayout>
    );
};

export async function getStaticProps() {
    const shopContext = getContext(null);
    const cmsProps = await getCmsProps(shopContext, shopContext.language);

    let document = await Client().getByUID('landing_page', 'maap-lab');

    if (!document) document = null;

    const shopifyPage = await getShopifyPageByHandle(shopContext, 'stores');

    let seoValues = { title: '', description: '' };

    if (shopifyPage) {
        seoValues = seoValuesWithDefaults(shopifyPage.seo, {
            title: `${shopifyPage.title} ${shopContext.metaTitlePostfix}`,
            description: `${shopifyPage.body}`,
        });
    }

    const openGraphImage = document?.data?.open_graph_image?.url;

    return {
        props: {
            document,
            seoValues,
            openGraphImage,
            shopContext,
            ...cmsProps,
        },
        revalidate: 60,
    };
}

export default LabPage;
