import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { getDocumentsByTag, prismicLandingPageParser } from 'helpers/prismic';
import Head from 'containers/Head';
import brandConfig from 'config/brandConfig';
import dynamic from 'next/dynamic';
import ChallengeCompleteForm from 'components/ChallengeCompleteForm';
import PageNotFound from '@components/PageNotFound/NotFound';
import { getContext } from '@lib/get-context';
import { getCmsProps } from 'pages/[country]';
import SimplifiedLayout from '@containers/SimplifiedLayout';
import TileBackground from 'public/images/challenges/HalfBlock_.jpg';
import {
    breakpointLarge,
    breakpointMedium,
    breakpointSmall,
} from 'config/styles/breakpoints';

const Pages = ({ document, isMobileFromSSR, isTabletFromSSR, ...globals }) => {
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

    if (!document) {
        return (
            <SimplifiedLayout {...globals}>
                <PageNotFound />
            </SimplifiedLayout>
        );
    }

    const seoTitle = document?.data?.seo_title
        ? document?.data?.seo_title[0]?.text
        : null;
    const seoDescription = document?.data?.seoDescription
        ? document?.data?.seoDescription[0]?.text
        : null;

    let markup;
    switch (document.type) {
        case 'information_page':
            const InformationPageBlock = dynamic(() =>
                import('containers/Prismic/InformationPageBlock')
            );
            markup = <InformationPageBlock document={document} />;
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

    const formLeftBgColour = '#000';
    const formLeftTextColour = '#fff';

    return (
        <SimplifiedLayout {...globals}>
            <Head url={asPath} title={seoTitle} description={seoDescription} />
            <div className="page clean-living-complete">{markup}</div>
            <div className="clean-living-complete-2c">
                <div
                    className="column form-left"
                    style={{
                        backgroundImage: `url(${TileBackground.src})`,
                        backgroundSize: 'cover',
                    }}
                >
                    <h1 className="form-title">YOU’VE TRANSCENDED!</h1>
                    <div className="form-description">
                        <p>
                            By transcending your limits, you've earnt a $75 AUD
                            / $60 USD / €50 / £50 reward! Simply enter your
                            details to redeem your reward and you'll
                            automatically go in the draw to win a ‘Year’s Worth
                            of MAAP Kit’ - valued at up to $5000 AUD.
                        </p>
                    </div>
                </div>
                <div className="column form-right">
                    <ChallengeCompleteForm tag="STRAVATRANSCEND042022-complete" />
                </div>
            </div>
            <style jsx>
                {`
                    .page {
                        margin: 0 auto;
                    }
                    .clean-living-complete-2c {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .column {
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-end;
                        align-items: center;
                        flex: 1 1 50%;
                        height: 600px;
                        padding: 80px 80px;
                    }
                    .form-left {
                        display: flex;
                        justify-content: flex-end;
                        align-items: flex-start;
                        color: ${formLeftTextColour};
                        width: 80%;
                        background-color: #d3dbd3;
                    }
                    .form-title {
                        padding: 0;
                        margin: 0;
                        font-size: 3.625em;
                        line-height: 1em;
                        letter-spacing: 1px;
                        font-weight: 600;
                        text-transform: uppercase;
                        font-family: MonumentExtended-Regular, sans-serif;
                        color: ${formLeftBgColour};
                        width: 70%;
                    }
                    .form-description {
                        font-size: 16px;
                        line-height: 1.5;
                        width: 80%;
                        padding-right: 40px;
                        font-weight: 300;
                        font-family: acumin-pro, sans-serif;
                        color: ${formLeftBgColour};
                    }
                    @media only screen and (max-width: ${breakpointLarge}) {
                        .column {
                            padding: 0 40px;
                        }
                        .form-title {
                            font-size: 2.3em;
                        }
                    }
                    @media only screen and (max-width: ${breakpointMedium}) {
                        .clean-living-complete-2c {
                            flex-direction: column;
                        }
                        .column {
                            width: auto;

                            padding: 80px 50px;
                        }
                        .form-description {
                            width: 80%;
                        }
                        .form-left {
                            padding-top: 260px;
                        }
                    }
                    @media only screen and (max-width: ${breakpointSmall}) {
                        .form-description {
                            width: 80%;
                            padding-left: 20px;
                        }

                        .column {
                            padding: 80px 0;
                        }
                        .form-left {
                            padding-top: 150px;
                            width: 100%;
                        }
                    }
                `}
            </style>
        </SimplifiedLayout>
    );
};

export async function getStaticProps({ params, preview = false, previewData }) {
    const shopContext = getContext(null);
    const cmsProps = await getCmsProps(shopContext, shopContext.language);
    const documents = await getDocumentsByTag([
        'maap-transcend-limits-complete',
    ]);

    return {
        props: {
            document: documents[0] || null,
            shopContext,
            ...cmsProps,
        },
        revalidate: 900,
    };
}

export default Pages;
