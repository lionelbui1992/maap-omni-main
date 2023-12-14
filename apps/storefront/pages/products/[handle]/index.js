import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { getContext } from '@lib/get-context';
import {
    generatePropsForContext,
    getPopularProducts,
} from 'containers/Product/ssgHelpers';
import Head from '@containers/Head';
import Product from '@containers/Product';
import FindMore from '@containers/Product/FindMore';
import SimplifiedLayout from '@containers/SimplifiedLayout';

const NostoRecommendationsBlock = dynamic(
    () => import('@components/Nosto/NostoRecommendationsBlock'),
    {
        ssr: false,
    }
);

const ProductPage = ({
    handle,
    isMobileFromSSR,
    isTabledFromSSR,
    product,
    structuredVariants,
    defaultVariant,
    defaultSelections,
    imagery,
    regionCode,
    prismicDocuments,
    seoValues,
    ...globals
}) => {
    const router = useRouter();
    const { asPath } = router;
    const { title, description, openGraph, canonical } = seoValues;
    const nostoCompatibleProductId = product.id.split('/').slice(-1)[0];

    useEffect(()=>{
        if(typeof window !== 'undefined' && window.pintrk){
            window.pintrk("track", "PageVisit", {
                line_items: [
                    {
                        product_name: product?.title,
                        product_id: nostoCompatibleProductId,
                        product_category: product?.productType,
                        product_price: product?.priceRange?.minVariantPrice?.amount
                    }
                ]
            })
        }
    }, [])

    return (
        <SimplifiedLayout {...globals}>
            <Head title={title} excludeSeo />
            {seoValues && (
                <NextSeo
                    title={title}
                    description={description}
                    openGraph={openGraph}
                    url={asPath}
                    canonical={canonical}
                />
            )}
            <Product
                url={asPath}
                product={product}
                structuredVariants={structuredVariants}
                defaultVariant={defaultVariant}
                defaultSelections={defaultSelections}
                imagery={imagery}
                handle={handle}
                isMobile={isMobileFromSSR}
                isTablet={isTabledFromSSR}
                regionCode={regionCode}
                prismicDocuments={prismicDocuments}
                seoValues={seoValues}
            />
            <section>
                <NostoRecommendationsBlock
                    placementIdentifier="productpage-nosto-2"
                    pageKey={`product_${handle}`}
                    id={nostoCompatibleProductId}
                    type="product"
                />
            </section>
            <section>
                <NostoRecommendationsBlock
                    placementIdentifier="productpage-nosto-3"
                    pageKey={`product_${handle}`}
                    id={nostoCompatibleProductId}
                    type="product"
                />
            </section>
            <section>
                <NostoRecommendationsBlock
                    placementIdentifier="productpage-nosto-1"
                    pageKey={`product_${handle}`}
                    id={nostoCompatibleProductId}
                    type="product"
                />
            </section>
            <section id="find-more">
                <FindMore tags={product.tags} />
            </section>
        </SimplifiedLayout>
    );
};

export async function getStaticProps({ params }) {
    const { handle, country } = params;
    const shopContext = getContext(country);
    const props = await generatePropsForContext(shopContext, handle);

    if (!props.product) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            shopContext,
            ...props,
        },
        revalidate: 600,
    };
}

export async function getStaticPaths() {
    const shopContext = getContext('intl');

    const popularProduct = await getPopularProducts(shopContext);

    const intl = popularProduct.map((edge) => ({
        params: { handle: edge.node.handle },
    }));

    return {
        paths: intl,
        fallback: 'blocking',
    };
}

export default ProductPage;
