import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import Head from 'containers/Head';
import brandConfig from 'config/brandConfig';
import { getContext } from '@lib/get-context';
import { getCmsProps } from 'pages/[country]';
import SimplifiedLayout from '@containers/SimplifiedLayout';
import BundlerView from '@containers/Bundler/BundlerView';
import { getShopifyCollectionByHandle } from '../../../helpers/collections';
import {
    seoObjectFromMetafields,
    seoValuesWithDefaults,
} from '../../../helpers/metafields';

const BundleBuilder = ({
    isMobileFromSSR,
    isTabletFromSSR,
    regionCode,
    seoValues,
    shopifyCollection,
    ...globals
}) => {
    const router = useRouter();

    const handleMobileMediaQueryChange = (matches) => {
        setIsMobile(matches);
    };

    const [isMobile, setIsMobile] = useState(
        useMediaQuery(
            brandConfig.breakPoints.mobile,
            isMobileFromSSR ? brandConfig.breakPoints.mobileDeviceWidth : null,
            handleMobileMediaQueryChange
        )
    );

    // const preSelect = {
    //     'womens-cycling-bib-tights': {
    //         handle: 'womens-team-evo-thermal-bib-tight-navy',
    //         variantId:
    //             'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTQ5MDA1NTczMzM2Mw==',
    //     },
    //     'cycling-socks': {
    //         handle: 'evade-sock-white',
    //         variantId:
    //             'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDU0MzkzMzEwNDI0Mw==',
    //     },
    // };

    return (
        <SimplifiedLayout {...globals}>
            <Head
                url={router.asPath}
                title="Build your MAAP Bundle | MAAP Cycling Apparel"
                description="Build our MAAP Bundle Builder to complete your look and save on your next cycling kit."
            />
            <div className="page">
                <BundlerView />
            </div>
        </SimplifiedLayout>
    );
};

export async function generatePropsForContext(shopContext, handle) {
    const {
        algoliaProductIndex,
        metaTitlePostfix,
        collectionMetaDescriptionPostfix,
    } = shopContext;

    // Get the external documents required to load a collection.

    const shopifyCollection = await getShopifyCollectionByHandle(
        shopContext,
        handle,
        true
    );

    const seoValues = seoValuesWithDefaults(
        seoObjectFromMetafields(shopifyCollection?.metafields),
        {
            title: `${shopifyCollection?.title} ${metaTitlePostfix}`,
            description: `${shopifyCollection?.description} ${collectionMetaDescriptionPostfix}`,
        }
    );

    let shopifyProductOrder = null;
    if (
        typeof shopifyCollection !== 'undefined' &&
        shopifyCollection?.products?.edges?.length
    ) {
        shopifyProductOrder = shopifyCollection?.products.edges.map((edge) => {
            return edge.node.handle;
        });
    }

    const searchState = {
        collections: [handle],
    };

    // Prevent the entire products list going through into the
    // next/data prop in response body
    delete shopifyCollection?.id;
    delete shopifyCollection?.products;
    delete shopifyCollection?.metafields;

    return {
        collectionHandle: handle,
        shopContext,
        algoliaProductIndex,
        shopifyCollection: shopifyCollection ? shopifyCollection : null,
        shopifyProductOrder,
        searchState,
        seoValues,
    };
}

export async function getStaticPaths() {
    const paths = [
        '/us/bundle-builder',
        '/uk/bundle-builder',
        '/eu/bundle-builder',
    ];

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const { handle, country } = params;
    const shopContext = getContext(country);
    const { language } = shopContext;

    const cmsProps = await getCmsProps(shopContext, language);
    const props = await generatePropsForContext(shopContext, 'evade-lifestyle');

    const seoValues = { title: '', description: '' };

    if (!props.shopifyCollection) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            seoValues,
            shopContext,
            props,
            ...cmsProps,
        },
        revalidate: 60,
    };
}

export default BundleBuilder;
