import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'containers/Head';

import brandConfig from '@config/brandConfig';
import algoliasearch from 'algoliasearch/lite';
import { getContext } from '@lib/get-context';
import { getCmsProps } from 'pages/[country]';
import SimplifiedLayout from '@containers/SimplifiedLayout';
import BlogBreadcrumb from 'components/BlogBreadcrumb';
import AlgoliaArticleHit from 'components/AlgoliaArticleHit';
import BlogArticleHits from 'containers/AlgoliaBlogArticleHits';
import { useShop } from '@lib/providers/ShopProvider';
import AlgoliaBlogFacetGroups from 'components/AlgoliaBlogFacetGroups';
import AlgoliaFilteringControlBar from 'components/AlgoliaFilteringControlBar';
import { InstantSearch, connectRefinementList } from 'react-instantsearch-dom';
import { useEvent } from '@lib/providers/EventsProvider';
import { getShopifyPageByHandle } from 'helpers/pages';
import { seoValuesWithDefaults } from 'helpers/metafields';

const { services } = brandConfig;
const searchClient = algoliasearch(
    services.algolia.applicationID,
    services.algolia.apiKey
);

const VirtualRefinementList = connectRefinementList(() => null);

const Stories = ({ seoValues, ...globals }) => {
    const { event } = useEvent();
    const { asPath, query } = useRouter();
    const { metaTitlePostfix } = useShop();
    const [localSearchState, setLocalSearchState] = useState({});
    const { collection } = query;

    useEffect(() => {
        event('ViewPage', {
            title: seoTitle,
            handle: '/stories',
            category: 'stories',
        });

        typeof nostojs === 'function' &&
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

    useEffect(() => {
        setLocalSearchState({});
    }, [asPath]);

    const seoTitle = `Stories ${metaTitlePostfix}`;
    const blogIndex = 'shopify_intl_articles';
    const previewMode =
        process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF === 'preview' ||
        process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview';

    const previewRefinement = ['Stories', 'Preview Stories'];
    const productionRefinement = 'Stories';

    return (
        <SimplifiedLayout {...globals}>
            <Head
                url={asPath}
                title={seoValues.title}
                description={seoValues.description}
            />
            <div className="blogCollection">
                <InstantSearch
                    indexName={blogIndex}
                    searchClient={searchClient}
                    searchState={localSearchState}
                    onSearchStateChange={setLocalSearchState}
                >
                    <BlogBreadcrumb />
                    <AlgoliaFilteringControlBar
                        facetsComponent={<AlgoliaBlogFacetGroups />}
                    />
                    {collection ? (
                        <VirtualRefinementList
                            attribute="named_tags.collection"
                            defaultRefinement={collection}
                        />
                    ) : null}
                    <VirtualRefinementList
                        attribute="blog.title"
                        defaultRefinement={
                            previewMode
                                ? previewRefinement
                                : productionRefinement
                        }
                    />
                    <BlogArticleHits
                        HitComponent={AlgoliaArticleHit}
                        refinements={localSearchState?.refinementList}
                        hasDefaultRefinement={!!collection}
                    />
                </InstantSearch>
            </div>
        </SimplifiedLayout>
    );
};

export async function getStaticProps({ params, preview = false, previewData }) {
    const shopContext = getContext(null);
    const cmsProps = await getCmsProps(shopContext, shopContext.language);
    const shopifyPage = await getShopifyPageByHandle(shopContext, 'stories');
    let seoValues = { title: '', description: '' };

    if (shopifyPage) {
        seoValues = seoValuesWithDefaults(shopifyPage.seo, {
            title: `${shopifyPage.title} ${shopContext.metaTitlePostfix}`,
            description: `${shopifyPage.bodySummary}`,
        });
    }

    return {
        props: {
            shopContext,
            seoValues,
            ...cmsProps,
        },
        revalidate: 900,
    };
}

export default Stories;
