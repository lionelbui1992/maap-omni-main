import { getGlobalPrismicDocuments } from 'containers/SimplifiedLayout/helpers';
import getClient from 'services/ShopifyGQL';
import gqlQuery from './query';
import { getDocumentsByTag } from 'helpers/prismic';
import { productImagesByPath, reformatImageSet } from '@lib/productImageUtils';
import { seoValuesWithDefaults } from '../../helpers/metafields';
import getPopularProductsQuery from '@lib/gql/popular-shopify-products';
import getPopularCollectionsQuery from '@lib/gql/popular-shopify-collections';
import { captureException } from '@sentry/nextjs';

const getMappings = (tags) => {
    if (!tags) return {};

    return tags.map((tag) => {
        const parts = tag.split(':');
        return {
            section: parts[0].replace('prismic-', ''),
            tag: parts[1],
        };
    });
};

const findDocumentByTag = (documents, tag) => {
    const document = documents.find((doc) => {
        return doc.tags.indexOf(tag) !== -1;
    });

    if (typeof document === 'undefined' || !document) return null;

    return document;
};

function getMetaDataValues(product, context, ogImage) {
    const {
        metaTitlePostfix,
        productMetaDescriptionPostfix,
        storefrontUrl,
        routePrefix,
    } = context;

    const { title, metafields, handle } = product;

    const defaultValues = {
        title: `${title.slice(0, 50)} ${metaTitlePostfix}`,
        description: `${title.slice(0, 85)} ${productMetaDescriptionPostfix}`,
    };

    const productSeoDescription = (() => {
        const metafield = metafields?.edges?.find(
            (edge) =>
                edge.node.namespace === 'product' &&
                2 - edge.node.key === 'seo_description'
        );

        return metafield ? metafield?.node.value : '';
    })();

    const cleanDescription = productSeoDescription
        ?.replace('</br>', '')
        .slice(0, 150);

    const description = cleanDescription || defaultValues.description;

    const productUrl = `${storefrontUrl}${
        routePrefix ? `${routePrefix}/products/${handle}` : `products/${handle}`
    }`;

    const openGraph = {
        title: defaultValues.title,
        description: description,
        url: productUrl,
        image: ogImage ? [ogImage] : null,
    };

    return {
        title: defaultValues.title,
        description,
        canonical: productUrl,
        openGraph,
    };
}

export const getDefaultVariant = (variants, chosenVariantForProduct = null) => {
    if (!variants) return null;

    if (chosenVariantForProduct) return chosenVariantForProduct;

    const first = variants.find((variant) => {
        return variant.node.availableForSale;
    })?.node;

    if (first) return first;

    return variants[0].node;
};

export const deconstructVariantOptions = (variant) => {
    const sizeOption = variant.selectedOptions.filter((option) => {
        return option.name.toLowerCase() === 'size';
    });

    if (!sizeOption.length) {
        return {};
    }

    return {
        variant: variant,
        available: variant.availableForSale,
        size: sizeOption[0].value,
    };
};

export const getStructuredVariants = (variants) => {
    if (!variants) return null;

    const structuredVariants = variants
        .map((variant) => {
            return deconstructVariantOptions(variant.node);
        })
        .filter((option) => {
            return typeof option !== 'undefined';
        });

    return structuredVariants;
};

const getStructuredVariantByID = (structuredVariants, variantId) => {
    if (!structuredVariants) return null;

    const variant = structuredVariants.find((option) => {
        return option.variant?.id === variantId;
    });

    return variant || null;
};

export async function getPopularCollections(shopContext) {
    const { shopifyStorefrontUrl, shopifyStorefrontToken } = shopContext;
    const shopify = getClient(shopifyStorefrontUrl, shopifyStorefrontToken);
    const popularCollectionsResponse = await shopify(
        getPopularCollectionsQuery
    );
    return popularCollectionsResponse.collections.edges;
}

export async function getPopularProducts(shopContext) {
    const { shopifyStorefrontUrl, shopifyStorefrontToken } = shopContext;
    const shopify = getClient(shopifyStorefrontUrl, shopifyStorefrontToken);
    const popularProductsResponse = await shopify(getPopularProductsQuery);
    return popularProductsResponse.products.edges;
}

export async function generatePropsForContext(shopContext, handle) {
    const { code, language, shopifyStorefrontUrl, shopifyStorefrontToken } =
        shopContext;
    let seoValues = { title: '', description: '' };

    // Get the external documents required to load a collection.
    const globalPrismicDocuments = await getGlobalPrismicDocuments(
        null,
        language
    );

    const shopify = getClient(shopifyStorefrontUrl, shopifyStorefrontToken);
    const productGqlQuery = gqlQuery(handle);
    const productResponse = await shopify(productGqlQuery);
    const product = productResponse?.productByHandle;

    if (product) {
        seoValues = seoValuesWithDefaults(product.seo, {
            title: `${product.title} ${shopContext.metaTitlePostfix}`,
            description: `${product.description} ${shopContext.productMetaDescriptionPostfix}`,
        });
    }

    let isMobileFromSSR = false;
    let isTabledFromSSR = false;

    let prismicDocuments = {};
    let imagery = [];
    let metaDataValues = {};
    let defaultVariant = null;
    let defaultSelections = null;
    let structuredVariants = null;
    let sizeGuideData = null;

    if (product) {
        const prismicTags = product.tags.filter(
            (tag) => tag.includes('prismic') && tag.includes(':')
        );

        if (prismicTags.length) {
            const handles = prismicTags.map((tag) => tag.split(':')[1]);

            try {
                const responseDocuments = await getDocumentsByTag(
                    handles,
                    shopContext.language
                );

                const mappings = getMappings(prismicTags);

                const mappedDocuments = {};
                mappings.forEach((tagPair) => {
                    if (!mappedDocuments[tagPair.section]) {
                        mappedDocuments[tagPair.section] = findDocumentByTag(
                            responseDocuments,
                            tagPair.tag
                        );
                    }
                });

                prismicDocuments = mappedDocuments;
            } catch (error) {
                captureException(error);
            }
        }

        imagery = reformatImageSet(product?.images?.edges);

        const mobileHeroImages = [
            productImagesByPath(imagery, 'pdp.hero.01.mobile', true),
            productImagesByPath(imagery, 'pdp.hero.02.mobile', true),
        ].filter((image) => !!image?.src);

        let ogImage;

        if (mobileHeroImages && mobileHeroImages?.length) {
            ogImage = mobileHeroImages[0].src;
        }

        metaDataValues = getMetaDataValues(product, shopContext, ogImage);

        defaultVariant = getDefaultVariant(product.variants.edges);
        structuredVariants = getStructuredVariants(product.variants.edges);

        defaultSelections = getStructuredVariantByID(
            structuredVariants,
            defaultVariant?.id
        );
    }

    return {
        shopContext,
        handle,
        seoValues,
        product,
        imagery,
        regionCode: code,
        localeCode: language,
        isMobileFromSSR,
        isTabledFromSSR,
        prismicDocuments,
        metaDataValues,
        sizeGuideData,
        defaultVariant,
        structuredVariants,
        defaultSelections,
        ...globalPrismicDocuments,
    };
}
