import { getDefaultVariant } from '@containers/Product/ssgHelpers';
import {
    Product,
    ProductVariantEdge,
    SelectedOption,
} from 'shopify-storefront-api-typings';
import parse from 'fast-json-parse';
import { productImagesByPath, reformatImageSet } from '@lib/productImageUtils';

type VariantAvailablity = {
    size: string;
    sku: string;
    quantityAvailable: number;
    availableForSale: boolean;
};

type NormalisedCollectionProduct = {
    id: string;
    handle: string;
    title: string;
    price: string;
    compareAtPrice: string;
    quantity?: string;
    variants: {
        edges: any[];
    };
    variantAvailablityMap: VariantAvailablity[];
    tags: string[];
    siblings: any[] | null;
    cursor: string;
    imageUrl: string | null;
    hoverImageUrl: string | null;
};

export function normaliseCollectionProductEdges(edges: any) {
    return edges
        .map((edge: any) =>
            normaliseCollectionProductNode(edge.node, edge.cursor)
        )
        .filter(Boolean);
}

export function mapVariantAvailability(variants) {
    const variantAvailablityMap = variants?.edges.map(
        (variant: ProductVariantEdge) => {
            const { quantityAvailable, availableForSale, selectedOptions } =
                variant.node;
            return {
                size:
                    selectedOptions.find(
                        (option: SelectedOption) => option.name === 'Size'
                    )?.value || '',
                sku: variant.node.sku,
                quantityAvailable,
                availableForSale,
            };
        }
    );
    return variantAvailablityMap;
}

function parseProductSiblings(siblingsString: string) {
    if (!siblingsString) return null;
    try {
        const parseResult = parse(siblingsString);

        if (parseResult.err) {
            console.log(
                'unable to parse json',
                parseResult.err.message,
                siblingsString
            );
            return null;
        } else {
            return parseResult.value;
        }
    } catch (e) {
        console.log("Couldn't parse siblings string", e);
        return null;
    }
}

function mapCollectionImages(images) {
    const imagery = reformatImageSet(images);
    const imageUrl = productImagesByPath(
        imagery,
        'product_card.hero.01.all.flatlay',
        true
    );
    const hoverImageUrl = productImagesByPath(
        imagery,
        'product_card.hero.01.all.model',
        true
    );
    return [imageUrl?.src, hoverImageUrl?.src];
}

export function normaliseCollectionProductNode(
    product: Product,
    cursor: string
): NormalisedCollectionProduct | null {
    const {
        id,
        handle,
        title,
        variants,
        tags,
        metafield: siblingsMetafield,
        images,
    } = product;

    if (!variants) {
        return null;
    }

    const defaultVariant = getDefaultVariant(variants.edges);
    const variantAvailablityMap = mapVariantAvailability(variants);
    let siblings = null;
    if (siblingsMetafield?.value) {
        siblings = parseProductSiblings(siblingsMetafield?.value);
    }
    const [imageUrl, hoverImageUrl] = mapCollectionImages(images.edges);

    return {
        id,
        handle,
        title,
        price: defaultVariant.priceV2.amount,
        compareAtPrice: defaultVariant?.compareAtPriceV2
            ? defaultVariant?.compareAtPriceV2.amount
            : null,
        tags,
        siblings,
        variants,
        variantAvailablityMap,
        imageUrl: imageUrl || null,
        hoverImageUrl: hoverImageUrl || null,
        cursor,
    };
}
