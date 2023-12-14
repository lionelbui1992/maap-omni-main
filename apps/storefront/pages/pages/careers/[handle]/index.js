import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Prismic from 'prismic-javascript';
import { Client } from 'helpers/prismic';
import { useEvent } from '@lib/providers/EventsProvider';
import SimplifiedLayout from '@containers/SimplifiedLayout';
import Loader from '@components/Loader';
import { getContext } from '@lib/get-context';
import { getGlobalPrismicDocuments } from '@containers/SimplifiedLayout/helpers';
import { RichText } from 'prismic-reactjs';
import OpenInNew from '@images/small_icon/icon-openinnew.svg';
import { breakpointMedium } from '@config/styles/breakpoints';
import { RenderBlock } from '@containers/Prismic/PrismicSliceRenderer';
import Link from 'next/link';
import { getCountrySpecificUrl } from 'helpers/linkHelper';

const JobDetails = ({
    pageDocument,
    seoTitle,
    seoDescription,
    schemaDocument,
    schemaDescription,
    schemaTitle,
    storefrontUrl,
    shopifyImageUrl,
    openGraphImage,
    relatedArticles,
    ...globals
}) => {
    const { event } = useEvent();
    const { asPath, isFallback } = useRouter();

    const {
        heading,
        job_details_location,
        job_details_department,
        seek_button_text,
        seek_link,
        linkedin_button_text,
        linkedin_link,
        greenhouse_button_text,
        greenhouse_link,
        share_link,
    } = pageDocument?.data;

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
            {isFallback && <Loader type="article" />}

            <div className="page jobDetails">
                {pageDocument?.data.body.map((block, key) => {
                    if (block.slice_type !== 'job_description') {
                        const blockObject = {
                            blockType: block.slice_type,
                            data: block.primary,
                            items: block.items,
                        };
                        return (
                            <RenderBlock
                                block={blockObject}
                                isMobile={false}
                                isTablet={false}
                                key={key}
                            />
                        );
                    }

                    const {
                        short_description,
                        job_description,
                        how_to_apply,
                        share_description,
                    } = block.primary;

                    return (
                        <>
                            <div className="blockWrapper">
                                <div className="breadcrumbNav__container">
                                    <Link
                                        href={getCountrySpecificUrl('/')}
                                        legacyBehavior
                                    >
                                        <a>Home</a>
                                    </Link>{' '}
                                    <span className="breadcrumbNav__divider">
                                        /
                                    </span>{' '}
                                    <Link
                                        href={getCountrySpecificUrl(
                                            '/pages/careers'
                                        )}
                                        legacyBehavior
                                    >
                                        <a>Careers</a>
                                    </Link>{' '}
                                    <span className="breadcrumbNav__divider">
                                        /
                                    </span>{' '}
                                    <span className="breadcrumbNav__jobHeading">
                                        {heading}
                                    </span>
                                </div>
                                <div className="careers_jobDescription">
                                    <div className="careers_columnLeft">
                                        <div className="careers_jobDetailsContainer">
                                            <div className="heading">
                                                {heading}
                                            </div>
                                            <div className="description">
                                                {short_description}
                                            </div>
                                            <div className="jobDescription">
                                                {RichText.render(
                                                    job_description
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="careers_columnRight">
                                        <div className="careers_rightContainer">
                                            <div className="title">
                                                Job Details
                                            </div>
                                            <div className="jobInfo_container">
                                                <div className="jobInfo">
                                                    <span>Title:</span>
                                                    <span>Location:</span>
                                                    <span>Department:</span>
                                                </div>
                                                <div className="jobInfo">
                                                    <span>{heading}</span>
                                                    <span>
                                                        {job_details_location
                                                            ? job_details_location
                                                            : 'Location: Unspecified'}
                                                    </span>
                                                    <span>
                                                        {job_details_department
                                                            ? job_details_department
                                                            : 'Department Unspecified'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="howToApply">
                                                    {RichText.render(
                                                        how_to_apply
                                                    )}
                                                </div>
                                                <div className="applyButtonContainer">
                                                    {seek_link && (
                                                        <a
                                                            className="link"
                                                            href={seek_link}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            <div className="applyButton">
                                                                {
                                                                    seek_button_text
                                                                }
                                                                <img
                                                                    src={
                                                                        OpenInNew.src
                                                                    }
                                                                    alt="OpenInNew"
                                                                    className="openInNewIcon"
                                                                />
                                                            </div>
                                                        </a>
                                                    )}

                                                    {linkedin_link && (
                                                        <a
                                                            className="link"
                                                            href={linkedin_link}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            <div className="applyButton">
                                                                {
                                                                    linkedin_button_text
                                                                }
                                                                <img
                                                                    src={
                                                                        OpenInNew.src
                                                                    }
                                                                    alt="OpenInNew"
                                                                    className="openInNewIcon"
                                                                />
                                                            </div>
                                                        </a>
                                                    )}
                                                    {greenhouse_link && (
                                                        <a
                                                            className="link"
                                                            href={
                                                                greenhouse_link
                                                            }
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            <div className="applyButton">
                                                                {
                                                                    greenhouse_button_text
                                                                }
                                                                <img
                                                                    src={
                                                                        OpenInNew.src
                                                                    }
                                                                    alt="OpenInNew"
                                                                    className="openInNewIcon"
                                                                />
                                                            </div>
                                                        </a>
                                                    )}
                                                </div>
                                                {/* {share_link && (
                                            <div className="shareJob">
                                                <div>
                                                    {share_description}
                                                </div>
                                                <div>
                                                    <a
                                                        className="shareLink"
                                                        href={share_link}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        <img
                                                            src={Share.src}
                                                            alt="share"
                                                            className="shareIcon"
                                                        />
                                                        <span>SHARE</span>
                                                    </a>
                                                </div>
                                            </div>
                                        )} */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <style jsx global>
                                {`
                                    .blockWrapper {
                                        width: 100%;
                                    }
                                    .jobDetails {
                                        display: flex;
                                        flex-wrap: wrap;
                                    }
                                    .jobDescription h1,
                                    .jobDescription h2 {
                                        margin: 0;
                                        color: #000000;
                                        font-family: Acumin-pro, sans-serif;
                                        font-size: 16px;
                                        letter-spacing: 0;
                                        font-weight: 500;
                                        padding-top: 40px;
                                        padding-bottom: 20px;
                                        line-height: 1.5;
                                    }
                                    .jobDescription p {
                                        color: #000000;
                                        font-family: Acumin-pro, sans-serif;
                                        // font-size: 13px;
                                        // line-height: 20px;
                                        font-size: 14px;
                                        line-height: 1.5;
                                        font-weight: 300;
                                        letter-spacing: 0;
                                    }
                                    .jobDescription ul li {
                                        color: #000000;
                                        font-family: Acumin-pro, sans-serif;
                                        // font-size: 13px;
                                        // line-height: 20px;
                                        font-size: 14px;
                                        line-height: 1.5;
                                        font-weight: 300;
                                        letter-spacing: 0;
                                        padding-bottom: 10px;
                                    }
                                    .jobDescription ul {
                                        margin: 0;
                                        padding: 0 0 0 15px;
                                    }
                                    .howToApply h1,
                                    .howToApply h2 {
                                        color: #000000;
                                        font-family: MonumentExtended-Regular,
                                            sans-serif;
                                        font-size: 16px;
                                        letter-spacing: 0;
                                        line-height: 16px;
                                        margin: 0;
                                        padding: 20px 0 30px 0;
                                    }

                                    .howToApply {
                                        font-size: 14px;
                                        line-height: 1.5;
                                    }

                                    .howToApply p {
                                        color: #000000;
                                        font-family: Acumin-pro, sans-serif;
                                        font-weight: 300;
                                        letter-spacing: 0;
                                        margin: 0;
                                        padding-bottom: 20px;
                                    }
                                    .howToApply ol li {
                                        color: #000000;
                                        font-family: Acumin-pro, sans-serif;
                                        font-weight: 300;
                                        letter-spacing: 0;
                                        padding: 0 0 15px 0;
                                    }
                                    .howToApply ol {
                                        margin: 0;
                                        padding: 0 0 0 15px;
                                    }

                                    .breadcrumbNav__container {
                                        background-color: #f1f1f1;
                                        padding: 15px 20px;
                                    }

                                    .breadcrumbNav__container a {
                                        color: #000;
                                        text-decoration: none;
                                    }
                                    .breadcrumbNav__container a:visited {
                                        color: #000;
                                    }
                                    .breadcrumbNav__divider {
                                        padding: 0px 8px;
                                    }
                                    .breadcrumbNav__jobHeading {
                                        text-transform: capitalize;
                                    }

                                    .careers_jobDetailsContainer {
                                        max-width: 800px;
                                        margin-right: auto;
                                    }

                                    .careers_rightContainer {
                                        max-width: 400px;
                                        margin: auto;
                                    }

                                    @media (min-width: ${breakpointMedium}) {
                                        .breadcrumbNav__container {
                                            padding-left: 50px;
                                        }

                                        .jobDescription p {
                                            font-size: 16px;
                                        }

                                        .jobDescription ul li {
                                            font-size: 16px;
                                        }
                                    }
                                `}
                            </style>
                            <style jsx>
                                {`
                                    .blockWrapper {
                                        display: block;
                                    }
                                    .careers_jobDescription {
                                        display: flex;
                                    }
                                    .careers_columnLeft {
                                        padding: 60px 115px 80px 48px;
                                        flex: 4;
                                    }
                                    .heading {
                                        color: #000000;
                                        font-family: MonumentExtended-Regular,
                                            sans-serif;
                                        font-size: 42px;
                                        font-weight: 600;
                                        letter-spacing: 0;
                                        line-height: 42px;
                                        padding-bottom: 20px;
                                        text-transform: uppercase;
                                    }
                                    .description {
                                        color: #000000;
                                        font-family: Acumin-pro, sans-serif;
                                        font-size: 20px;
                                        font-weight: 300;
                                        letter-spacing: 0;
                                        line-height: 28px;
                                    }
                                    .careers_columnRight {
                                        background-color: #e2e3e3;
                                        padding: 60px 32px 60px 48px;
                                        flex: 2;
                                    }
                                    .title {
                                        color: #000000;
                                        font-family: MonumentExtended-Regular,
                                            sans-serif;
                                        font-size: 16px;
                                        letter-spacing: 0;
                                        line-height: 16px;
                                        font-weight: 600;
                                        text-transform: uppercase;
                                        padding-bottom: 30px;
                                    }
                                    .jobInfo_container {
                                        // width: 50%;
                                        display: flex;
                                        justify-content: flex-start;
                                        font-size: 14px;
                                        line-height: 1.5;
                                    }
                                    .jobInfo {
                                        display: flex;
                                        flex-direction: column;
                                    }

                                    .jobInfo:first-child {
                                        padding-right: 50px;
                                    }

                                    .jobInfo span {
                                        margin-bottom: 20px;
                                        text-transform: capitalize;
                                    }
                                    .applyButtonContainer {
                                        padding: 15px 0 10px 0;
                                    }
                                    .applyButton {
                                        border-radius: 30px;
                                        background-color: #000000;
                                        color: #ffffff;
                                        font-family: Acumin-pro, sans-serif;
                                        font-size: 15px;
                                        letter-spacing: 0;
                                        line-height: 18px;
                                        text-align: center;
                                        padding: 18px 0;
                                        margin-bottom: 10px;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                    }
                                    .link {
                                        text-decoration: none;
                                        color: #ffffff;
                                    }
                                    .openInNewIcon {
                                        height: 15px;
                                        width: 15px;
                                        padding-left: 5px;
                                    }
                                    .shareIcon {
                                        height: 16px;
                                        width: 16px;
                                        padding-right: 5px;
                                    }
                                    .shareJob {
                                        display: flex;
                                        justify-content: space-between;
                                        align-items: center;
                                    }
                                    .shareLink {
                                        display: flex;
                                        align-items: center;
                                        text-decoration: none;
                                        color: #000000;
                                    }
                                    @media (max-width: ${breakpointMedium}) {
                                        .heading {
                                            font-size: 30px;
                                            letter-spacing: 0;
                                            line-height: 30px;
                                        }
                                        .careers_jobDescription {
                                            flex-direction: column;
                                        }
                                        .careers_columnLeft {
                                            padding: 40px 16px 60px 16px;
                                        }
                                        .careers_columnRight {
                                            padding: 30px 16px;
                                        }
                                        .jobInfo_container {
                                            width: 65%;
                                        }

                                        .careers_rightContainer {
                                            max-width: 100%;
                                            margin: auto;
                                        }
                                    }
                                `}
                            </style>
                        </>
                    );
                })}
            </div>
        </SimplifiedLayout>
    );
};

async function getCmsProps(shopContext, locale, handle) {
    const { results: prismicDocuments } = await Client().query(
        Prismic.Predicates.at('my.job_details.uid', handle),
        {
            lang: '*',
        }
    );

    if (!prismicDocuments || !prismicDocuments.length) {
        return null;
    }

    const globalPrismicDocuments = await getGlobalPrismicDocuments(
        null,
        locale
    );

    const pageDocument = prismicDocuments[0];

    const {
        metaTitlePostfix,
        blogMetaDescriptionPrefix,
        blogMetaDescriptionPostfix,
        storefrontUrl,
        shopifyImageUrl,
    } = shopContext;
    //
    // const seoTitle = `${pageDocument?.data?.seo_title[0]?.text} ${metaTitlePostfix}`;
    // const seoDescription = `${blogMetaDescriptionPrefix} ${pageDocument?.data?.seo_title[0]?.text} ${blogMetaDescriptionPostfix}`;
    // const schemaDocument = pageDocument?.data?.body[0]?.primary;
    // const schemaDescription = pageDocument?.data?.schema_description;
    // const schemaTitle = pageDocument?.data?.title;
    // const openGraphImage =
    //     pageDocument?.data?.body?.[0]?.primary?.mobile_image?.url;

    return {
        storefrontUrl,
        shopifyImageUrl,
        pageDocument,
        ...globalPrismicDocuments,
    };
}

export async function getStaticProps({ params, preview = false, previewData }) {
    const { handle } = params;
    const shopContext = getContext('intl');

    const cmsProps = await getCmsProps(
        shopContext,
        shopContext.language,
        handle
    );

    return {
        props: {
            shopContext,
            preview,
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

export default JobDetails;
