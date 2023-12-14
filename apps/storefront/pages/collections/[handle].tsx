// @ts-nocheck
import React, {
    useReducer,
    useEffect,
    useState,
    useCallback,
    useRef,
    useLayoutEffect,
} from 'react';
import { captureException } from '@sentry/nextjs';
import { Product } from 'shopify-storefront-api-typings';
import { getContext } from '@lib/get-context';
import { normaliseCollectionProductEdges } from '@lib/collection-products-normaliser';
import {
    getShopifyCollectionByHandle,
    getShopifyCollectionByHandleForServer,
} from '@lib/shopify-collection/get-collection-by-handle';
import { reducer } from '@lib/shopify-collection/collection-state-reducer';
import { brandBackgroundGrey } from 'config/styles/colours';
import CollectionHeader from '@containers/CollectionHeader';
import FeatureBlock from '@containers/Prismic/FeatureBlock';
import SimplifiedLayout from '@containers/SimplifiedLayout';
import ProductCard from '@components/ProductCard';
import { getGlobalPrismicDocuments } from '@containers/SimplifiedLayout/helpers';
import {
    getPageIALocation,
    getPrismicDocumentForCollection,
    getPrismicDocumentForConfidenceCallOut,
} from 'helpers/collections';
import {
    seoObjectFromMetafields,
    seoValuesWithDefaults,
} from 'helpers/metafields';

import ShopifyFilteringControlBar from '../../components/ShopifyFilteringControlBar';
import { useInView } from 'react-intersection-observer';
import PrismicProductFeature from '@containers/Product/PrismicProductFeature';
import NostoTileDisruptor from '@containers/Product/NostoTileDisruptor';
import { RichText } from 'prismic-reactjs';
import { breakpointMedium } from 'config/styles/breakpoints';
import { getPopularCollections } from '@containers/Product/ssgHelpers';
import classnames from 'classnames';
import styles from './Collection.module.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const NostoRecommendationsBlock = dynamic(
    () => import('@components/Nosto/NostoRecommendationsBlock'),
    {
        ssr: false,
    }
);

export type CollectionState = {
    handle: string;
    filters: any;
    products: Product[];
    cursor: string;
    hasNextPage: boolean;
    sort: any;
};

const useChangeEffect = (func, deps) => {
    const didChange = useRef(false);

    useEffect(() => {
        if (didChange.current) func();
        else didChange.current = true;
    }, deps);
};

const Collection = ({
    prismicDocument,
    collection,
    initialState,
    availableFilters,
    informationArchitecturePageLocation,
    preRenderedAlgoliaCatalogCollection,
    collectionPrismicDocument,
    productTiles,
    confidenceCallOutPrismicDocument,
    seoValues,
    shopContext,
    ...globals
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { products, cursor, hasNextPage, filters, sort } = state;
    const [readMore, setReadMore] = useState(true);
    const [productTilesWithNosto, setProductTilesWithNosto] = useState(null);
    const [isNostoTilesLoading, setIsNostoTilesLoading] = useState(true);
    const { handle: collectionHandle, title: nostoCompatibleCollectionHandle } =
        collection;
    const ref = useRef();
    const { ref: loadMoreTriggerRef, inView: loadMoreIsInView } = useInView();
    const router = useRouter();

    const setRefs = useCallback(
        (node) => {
            ref.current = node;
            loadMoreTriggerRef(node);
        },
        [loadMoreTriggerRef]
    );

    // Update the state if the handle changes.
    useEffect(() => {
        if (collectionHandle !== state.handle) {
            dispatch({
                type: 'replace_state',
                payload: initialState,
            });
        }

        if (typeof window !== 'undefined' && (window as any).nostojs) {
            (window as any).nostojs((api) => {
                api.defaultSession()
                    .viewCategory(`/${collectionHandle}`)
                    .setPlacements(['category-related'])
                    .load()
                    .then((data) => {
                        // console.log(data.recommendations);
                    });
            });

            (window as any).nostojs((api) => {
                api.defaultSession()
                    .viewCategory(`/${collectionHandle}`)
                    .setPlacements(api.placements.getPlacements())
                    .load()
                    .then((data) => {
                        let nostoTilesArray = [];

                        const nostoTilePlacements = Object.keys(
                            data.recommendations
                        )
                            .filter((key) =>
                                key.startsWith('plp-disruptor-placement')
                            )
                            .map((key) =>
                                JSON.parse(data.recommendations[key].html)
                            );

                        nostoTilePlacements.map((placement) => {
                            placement.data.map((tile) =>
                                nostoTilesArray.push(tile)
                            );
                        });
                        setProductTilesWithNosto(nostoTilesArray);

                        setIsNostoTilesLoading(false);
                    });
            });
        }
        if (typeof window !== 'undefined' && (window as any).pintrk) {
            (window as any).pintrk('track', 'ViewCategory', {
                line_items: [
                    {
                        product_id: products?.[0]?.id.replace(
                            'gid://shopify/Product/',
                            ''
                        ),
                        product_category: nostoCompatibleCollectionHandle,
                    },
                ],
            });
        }
    }, [collectionHandle]);

    const descriptionPart1 =
        collectionPrismicDocument?.data?.long_description_read_more;
    const descriptionPart2 =
        collectionPrismicDocument?.data?.long_description_read_less;
    const linkText = readMore ? '< Read Less' : 'Read More >';
    const dots = !readMore ? '...' : '';
    const title = !readMore ? 'ReadMore' : 'ReadLess';

    const useIsomorphicLayoutEffect =
        typeof window !== 'undefined' ? useLayoutEffect : () => {};

    useIsomorphicLayoutEffect(() => {
        setReadMore(false);
    }, []);

    const loadMoreProducts = async () => {
        try {
            const newCollectionResponse = await getShopifyCollectionByHandle(
                shopContext,
                collectionHandle,
                filters,
                cursor,
                sort.sortKey,
                sort.reverse
            );

            const { products } = newCollectionResponse;

            if (products.edges.length) {
                const newCursor = products.edges.slice(-1)[0].cursor;
                const hasNextPage = products.pageInfo.hasNextPage;

                const fetchedProducts = normaliseCollectionProductEdges(
                    products.edges
                );

                dispatch({
                    type: 'addProducts',
                    payload: {
                        products: fetchedProducts,
                        cursor: newCursor,
                        hasNextPage,
                    },
                });
            }
        } catch (e) {
            captureException(e);
        }
    };

    useChangeEffect(() => {
        const filterProducts = async () => {
            const newCollectionResponse = await getShopifyCollectionByHandle(
                shopContext,
                collectionHandle,
                filters,
                null,
                sort.sortKey,
                sort.reverse
            );

            const { products } = newCollectionResponse;

            if (products.edges.length) {
                // TODO: This code is duplicated from above. Refactor...
                const newCursor = products.edges.slice(-1)[0].cursor;
                const hasNextPage = products.pageInfo.hasNextPage;

                if (products) {
                    const fetchedProducts = normaliseCollectionProductEdges(
                        newCollectionResponse?.products.edges
                    );

                    dispatch({
                        type: 'setProducts',
                        payload: {
                            products: fetchedProducts,
                            cursor: newCursor,
                            hasNextPage,
                        },
                    });
                }
            } else {
                dispatch({
                    type: 'setProducts',
                    payload: {
                        products: [],
                    },
                });
            }
        };

        filterProducts().catch((e) => captureException(e));

        return () => {};
    }, [sort, filters]);

    useEffect(() => {
        dispatch({
            type: 'clearFilter',
            payload: {},
        });
    }, [collectionHandle]);

    const confidenceCallOutData =
        confidenceCallOutPrismicDocument?.data?.body[0];

    React.useEffect(() => {
        if (loadMoreIsInView) {
            loadMoreProducts();
        }
    }, [loadMoreIsInView]);

    const getFeatureBlockByPosition = (position) => {
        const filtered = productTiles?.filter(
            (tile) => tile.position - 1 === position
        );

        return filtered?.length ? filtered[0] : null;
    };

    const getNostoDisruptorBlockByPosition = (position) => {
        const nostoFiltered = productTilesWithNosto?.filter(
            (tile) => tile.position - 1 === position
        );

        return nostoFiltered?.length ? nostoFiltered[0] : null;
    };

    const shouldRenderNostoBlock = [
        '/collections/archive-sale-man',
        '/collections/archive-sale-woman',
        '/collections/archive-sale',
    ].some((path) => router.asPath.endsWith(path));

    if (productTilesWithNosto && isNostoTilesLoading) return null;

    return (
        <SimplifiedLayout {...globals} shopContext={shopContext}>
            <div className="plp-page-identifier">
                <div className={styles.root}>
                    <CollectionHeader
                        collectionHandle={collectionHandle}
                        shopifyCollection={collection}
                        pageIAPath={informationArchitecturePageLocation}
                        seoValues={seoValues}
                    />
                    {shouldRenderNostoBlock && (
                        <NostoRecommendationsBlock
                            placementIdentifier="categorypage-nosto-5"
                            pageKey={`product_${collectionHandle}`}
                            id={nostoCompatibleCollectionHandle}
                            type="collection"
                            shouldApplyPaddingBottom={true}
                        />
                    )}
                    <ShopifyFilteringControlBar
                        availableFilters={availableFilters}
                        dispatch={dispatch}
                        selectedFilters={filters}
                    />
                    <div className={styles.products}>
                        {!!products &&
                            products.map((product, position) => {
                                const tile =
                                    getFeatureBlockByPosition(position);
                                const nostoTile =
                                    getNostoDisruptorBlockByPosition(position);
                                let tileMarkup = null;
                                let nostoTileMarkup = null;

                                if (tile) {
                                    const { block_width } = tile;
                                    const tileRootClass = classnames(
                                        styles.product,
                                        {
                                            [styles.double]:
                                                block_width === 'double',
                                        }
                                    );
                                    tileMarkup = (
                                        <div className={tileRootClass}>
                                            {tile && (
                                                <PrismicProductFeature
                                                    feature={tile}
                                                />
                                            )}
                                        </div>
                                    );
                                }
                                if (nostoTile) {
                                    nostoTileMarkup = <p>nosto tile</p>;
                                    const { block_width } = nostoTile;
                                    const tileRootClass = classnames(
                                        styles.product,
                                        {
                                            [styles.double]:
                                                block_width === 'double',
                                        }
                                    );
                                    nostoTileMarkup = (
                                        <div className={tileRootClass}>
                                            {nostoTile && (
                                                <NostoTileDisruptor
                                                    tile={nostoTile}
                                                />
                                            )}
                                        </div>
                                    );
                                }

                                const {
                                    id,
                                    title: productTitle,
                                    handle: productHandle,
                                    price,
                                    compareAtPrice,
                                    siblings,
                                    imageUrl,
                                    hoverImageUrl,
                                } = product;
                                return (
                                    <React.Fragment key={product.id}>
                                        {tileMarkup}
                                        {nostoTileMarkup}
                                        <div className={styles.product}>
                                            <ProductCard
                                                id={id}
                                                handle={productHandle}
                                                title={productTitle}
                                                variantTitle={productTitle}
                                                price={price}
                                                compareAtPrice={compareAtPrice}
                                                sku={
                                                    product.variants.edges[0]
                                                        .node.sku
                                                }
                                                siblings={siblings}
                                                productImageUrl={imageUrl}
                                                hoverImageUrl={hoverImageUrl}
                                                position={position}
                                                category={collectionHandle}
                                                nostoProductCardAttributes={
                                                    null
                                                }
                                            />
                                        </div>
                                    </React.Fragment>
                                );
                            })}
                        {/* trigger auto load more */}
                        <span ref={setRefs}></span>
                    </div>
                    {!hasNextPage && (
                        <>
                            <NostoRecommendationsBlock
                                placementIdentifier="categorypage-nosto-1"
                                pageKey={`product_${collectionHandle}`}
                                id={nostoCompatibleCollectionHandle}
                                type="collection"
                            />

                            <NostoRecommendationsBlock
                                placementIdentifier="categorypage-nosto-2"
                                pageKey={`product_${collectionHandle}`}
                                id={nostoCompatibleCollectionHandle}
                                type="collection"
                            />
                            <NostoRecommendationsBlock
                                placementIdentifier="categorypage-nosto-3"
                                pageKey={`product_${collectionHandle}`}
                                id={nostoCompatibleCollectionHandle}
                                type="collection"
                            />
                        </>
                    )}
                    {/* description */}
                    {descriptionPart1?.[0]?.text ? (
                        <div className="collectionDescription">
                            <div>
                                {RichText.render(descriptionPart1)}
                                {dots}
                                {readMore && RichText.render(descriptionPart2)}
                                <a
                                    className="collectionDescription__expand_link"
                                    onClick={() => {
                                        setReadMore(!readMore);
                                    }}
                                    title={title}
                                >
                                    {linkText}
                                </a>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                    {/* end of description */}
                    {confidenceCallOutData && (
                        <FeatureBlock
                            items={confidenceCallOutData?.items}
                            block={confidenceCallOutData?.primary}
                            isMobile={false}
                        />
                    )}
                    <style jsx global>
                        {`
                            .collectionDescription h2 {
                                font-size: 1em;
                                line-height: 1.5em;
                                font-weight: 300;
                                margin: 0;
                                padding-top: 30px;
                            }
                            .nosto-dynamic-placement {
                                display: none;
                            }
                        `}
                    </style>

                    <style jsx>
                        {`
                            .collection {
                                background-color: ${brandBackgroundGrey};
                            }

                            .collectionDescription {
                                display: flex;
                                flex-wrap: wrap;
                                font-size: 1.5em;
                                line-height: 1.5em;
                                padding: 35px 55px;
                                width: 50%;
                                font-weight: 300;
                                box-sizing: border-box;
                            }
                            .collectionDescription h2:first-child {
                                padding-top: 0;
                            }
                            .collectionDescription br {
                                padding-top: 10px;
                            }
                            .collectionDescription__expand_link {
                                text-decoration: underline;
                                text-align: left;
                                padding: 5px 0 5px 10px;
                                cursor: pointer;
                            }
                            @media (max-width: ${breakpointMedium}) {
                                .collectionDescription {
                                    padding: 20px 30px;
                                    font-size: 0.85rem;
                                    font-weight: 300;
                                    width: 100%;
                                    line-height: 1.7em;
                                }
                            }
                        `}
                    </style>
                </div>
            </div>
        </SimplifiedLayout>
    );
};

export async function getStaticProps({ params }) {
    const { handle } = params;

    const shopContext = getContext(null);

    const { metaTitlePostfix, collectionMetaDescriptionPostfix } = shopContext;

    // We filter on this metafield to only show products that are active.
    // have some rules that are not natively supported. E.g. notify me products.
    const defaultFilters = [
        {
            productMetafield: {
                namespace: 'custom',
                key: 'product_stock_status',
                value: 'ACTIVE',
            },
        },
    ];

    const collection = await getShopifyCollectionByHandleForServer(
        shopContext,
        handle,
        defaultFilters
    );

    if (!collection) {
        return {
            notFound: true,
        };
    }

    const globalPrismicDocumentsPromise = getGlobalPrismicDocuments(
        null,
        shopContext.language
    );

    const collectionPrismicDocumentPromise = getPrismicDocumentForCollection(
        shopContext,
        handle,
        null
    );

    const confidenceCallOutPrismicDocumentPromise =
        getPrismicDocumentForConfidenceCallOut(shopContext, null);

    let globalPrismicDocuments = null;
    let collectionPrismicDocument = null;
    let confidenceCallOutPrismicDocument = null;

    const promiseResult = (result, fallback) =>
        result.status === 'fulfilled' ? result.value : fallback;

    await Promise.allSettled([
        globalPrismicDocumentsPromise,
        collectionPrismicDocumentPromise,
        confidenceCallOutPrismicDocumentPromise,
    ]).then((results) => {
        globalPrismicDocuments = promiseResult(results[0], null);
        collectionPrismicDocument = promiseResult(results[1], { data: null });
        confidenceCallOutPrismicDocument = promiseResult(results[2], {
            data: null,
        });
    });

    const informationArchitecturePageLocation = getPageIALocation(
        handle,
        globalPrismicDocuments.megaNav.data
    );

    const serverSideProducts = normaliseCollectionProductEdges(
        collection?.products?.edges
    );

    const initialState: CollectionState = {
        handle: collection?.handle,
        filters: defaultFilters,
        products: serverSideProducts,
        cursor: serverSideProducts.slice(-1)[0]?.cursor || null,
        hasNextPage: collection?.products.pageInfo.hasNextPage,
        sort: {},
    };

    const availableFilters = collection?.products.filters;

    const seoValues = seoValuesWithDefaults(
        seoObjectFromMetafields(collection?.metafields),
        {
            title: `${collection?.title} ${metaTitlePostfix}`,
            description: `${collection?.description} ${collectionMetaDescriptionPostfix}`,
        }
    );

    let productTiles = [];
    if (collectionPrismicDocument && collectionPrismicDocument.data) {
        const tilesSlice = collectionPrismicDocument?.data?.body?.filter(
            (slice) => {
                return slice.slice_type === 'product_tile';
            }
        );

        if (tilesSlice) {
            productTiles = tilesSlice[0]?.items || null;
        }
    }

    // Reduce HTML Payload size
    delete collection.products;

    return {
        props: {
            shopContext,
            ...globalPrismicDocuments,
            collection: collection ? collection : null,
            availableFilters,
            initialState,
            collectionPrismicDocument,
            productTiles,
            confidenceCallOutPrismicDocument,
            informationArchitecturePageLocation,
            seoValues,
        },
        revalidate: 300,
    };
}

export async function getStaticPaths() {
    const popularCollections = await getPopularCollections(getContext('intl'));

    const paths = popularCollections.map((edge) => ({
        params: { handle: edge.node.handle },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
}

export default Collection;
