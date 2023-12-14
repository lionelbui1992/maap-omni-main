import Page from 'pages/pages/[handle]';
import { getAllFromAlgoliaIndex } from 'helpers/algolia';
import { getContext } from '@lib/get-context';
import { getCmsProps } from '../../index';
import { getDocumentsByTag } from 'helpers/prismic';
import { getShopifyPageByHandle } from 'helpers/pages';
import { seoValuesWithDefaults } from 'helpers/metafields';
import { getOptionForRegion } from '@config/brandConfig';

export async function getStaticProps({ params }) {
    const { country, handle } = params;
    const shopContext = getContext(country);
    const { language } = shopContext;
    const cmsProps = await getCmsProps(shopContext, language);
    let openGraphImage = null;
    let seoValues = { title: '', description: '' };

    let documents = await getDocumentsByTag([handle], language);

    if (!documents || !documents.length) {
        documents = await getDocumentsByTag([handle], '*');
    }

    if (documents && documents.length > 1) {
        documents = documents.filter((doc) => doc.type === 'landing_page');
        openGraphImage = documents[0]?.data?.open_graph_image?.url;
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
    const pages = await getAllFromAlgoliaIndex(
        getOptionForRegion('algoliaPagesIndex', 'intl')
    );

    const us = pages.map((page) => ({
        params: {
            country: 'us',
            handle: page.handle,
        },
    }));

    const eu = pages.map((page) => ({
        params: {
            country: 'eu',
            handle: page.handle,
        },
    }));

    const uk = pages.map((page) => ({
        params: {
            country: 'uk',
            handle: page.handle,
        },
    }));

    const paths = [...us, ...eu, ...uk];

    return {
        paths,
        fallback: 'blocking',
    };
}

export default Page;
