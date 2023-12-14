import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import {
    getAllPrismicArticlesWithType,
    getDocumentsByTag,
    prismicLandingPageParser,
} from 'helpers/prismic';
import Head from 'containers/Head';
import brandConfig from 'config/brandConfig';
import dynamic from 'next/dynamic';
import { getGlobalPrismicDocuments } from '@containers/SimplifiedLayout/helpers';
import SimplifiedLayout from '@containers/SimplifiedLayout';
import CareerJobOpenings from '@components/CareerJobOpenings';
import { getContext } from '@lib/get-context';

const Careers = ({
    document,
    footerDocument,
    allJobDetailPrismicArticles,
    isMobileFromSSR,
    isTabletFromSSR,
    ...globals
}) => {
    const { asPath } = useRouter();

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

    const PrismicSliceRenderer = dynamic(() =>
        import('containers/Prismic/PrismicSliceRenderer')
    );

    const bodyPrismicContent = (
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

    const footerPrismicContent = (
        <PrismicSliceRenderer
            isMobile={isMobile}
            isTablet={isTablet}
            blocks={
                footerDocument && footerDocument.data
                    ? prismicLandingPageParser(footerDocument, 'uid')
                    : []
            }
        />
    );

    return (
        <SimplifiedLayout {...globals}>
            <Head url={asPath} title={seoTitle} description={seoDescription} />
            <div className="page">{bodyPrismicContent}</div>
            <CareerJobOpenings
                jobDetailArticles={allJobDetailPrismicArticles}
            />
            <div className="page">{footerPrismicContent}</div>
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

export async function getStaticPaths() {
    return {
        paths: [
            {
                params: {
                    country: 'uk',
                },
            },
            {
                params: {
                    country: 'us',
                },
            },
            {
                params: {
                    country: 'eu',
                },
            },
        ],
        fallback: 'blocking',
    };
}

export async function getStaticProps({ params }) {
    const { country } = params;

    const shopContext = getContext(country);
    const { language } = shopContext;

    const documents = await getDocumentsByTag(
        ['careers-hub', 'careers-hub-footer'],
        language
    );

    const globalPrismicDocuments = await getGlobalPrismicDocuments(
        null,
        language
    );

    const allJobDetailPrismicArticles = await getAllPrismicArticlesWithType(
        'job_details',
        language
    );

    const document = documents.find((doc) => doc.tags.includes('careers-hub'));
    const footerDocument = documents.find((doc) =>
        doc.tags.includes('careers-hub-footer')
    );

    return {
        props: {
            shopContext,
            allJobDetailPrismicArticles,
            document,
            footerDocument,
            ...globalPrismicDocuments,
        },
        revalidate: 120,
    };
}

export default Careers;
