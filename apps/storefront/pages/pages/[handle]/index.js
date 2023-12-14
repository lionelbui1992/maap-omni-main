import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { getDocumentsByTag, prismicLandingPageParser } from 'helpers/prismic';
import Head from 'containers/Head';
import brandConfig from 'config/brandConfig';
import dynamic from 'next/dynamic';
import InformationPageBreadcrumb from 'components/InformationPageBreadcrumb';
import { useEvent } from '@lib/providers/EventsProvider';
import PageNotFound from '@components/PageNotFound/NotFound';
import { getContext } from '@lib/get-context';
import { getCmsProps } from 'pages/[country]';
import SimplifiedLayout from '@containers/SimplifiedLayout';
import { getShopifyPageByHandle } from 'helpers/pages';
import { seoValuesWithDefaults } from 'helpers/metafields';

const Pages = ({
    document,
    handle,
    isMobileFromSSR,
    isTabletFromSSR,
    seoValues,
    openGraphImage,
    regionCode,
    ...globals
}) => {
    const router = useRouter();
    const { event } = useEvent();

    if (!document) {
        return (
            <SimplifiedLayout {...globals}>
                <PageNotFound />
            </SimplifiedLayout>
        );
    }

    useEffect(() => {
        event('ViewPage', {
            title: seoValues.title,
            handle,
            category: document?.type,
        });

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

    let markup;
    switch (document.type) {
        case 'information_page':
            const InformationPageBlock = dynamic(() =>
                import('containers/Prismic/InformationPageBlock')
            );
            markup = <InformationPageBlock document={document} />;
            break;
        case 'stores_info':
            markup = <></>;
            break;
        case 'stockist':
            const StockistEmbed = dynamic(() =>
                import('components/StockistEmbed')
            );
            markup = <StockistEmbed />;
            break;
        default:
            const PrismicSliceRenderer = dynamic(() =>
                import('containers/Prismic/PrismicSliceRenderer')
            );
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
            break;
    }

    return (
        <SimplifiedLayout {...globals}>
            <Head
                url={router.asPath}
                title={seoValues.title}
                description={seoValues.description}
                ogImage={openGraphImage}
                noIndexStatus={document?.data.do_not_index_page}
            />
            {document?.title && (
                <InformationPageBreadcrumb
                    blockTitle={document?.title[0]?.text}
                />
            )}
            <div className="nosto_page_type" style={{ display: 'none' }}>
                other
            </div>
            <div className="page">{markup}</div>
            <style jsx>
                {`
                    .page {
                        margin: 0 auto;
                    }
                `}
            </style>
        </SimplifiedLayout>
    );
};

export async function getStaticProps({ params, preview = false, previewData }) {
    const { handle } = params;
    const shopContext = getContext(null);
    const language = shopContext.language;
    const cmsProps = await getCmsProps(shopContext, language);
    let seoValues = { title: '', description: '' };
    let openGraphImage = null;

    let documents = await getDocumentsByTag([handle], language);

    if (!documents || !documents.length) {
        documents = await getDocumentsByTag([handle], '*');
    }

    if (documents && documents.length > 1) {
        documents = documents.filter((doc) => doc.type === 'landing_page');
        openGraphImage = documents[0]?.data?.open_graph_image?.url;
    }

    if (!documents[0]) {
        return {
            notFound: true,
        };
    }

    const shopifyPage = await getShopifyPageByHandle(shopContext, handle);

    if (shopifyPage) {
        seoValues = seoValuesWithDefaults(shopifyPage.seo, {
            title: `${shopifyPage.title} ${shopContext.metaTitlePostfix}`,
            description: `${shopifyPage.body}`,
        });
    }

    return {
        props: {
            document: documents[0] || null,
            handle,
            openGraphImage,
            seoValues,
            shopContext,
            ...cmsProps,
        },
        revalidate: 900,
    };
}

export async function getStaticPaths() {
    const paths = [];

    return {
        paths,
        fallback: 'blocking',
    };
}

export default Pages;
