import { ImageEdge, ProductEdge } from 'shopify-storefront-api-typings';
import parse from 'fast-json-parse';
import { ProductCardProps, ProductCardVariant } from 'mmds';

// TODO: add the siblings function in a separate folder
type ProductSibling = {
    title: string;
    handle: string;
    swatch: string;
};

export default function (edge: ProductEdge): ProductCardProps {
    const { node } = edge;
    const { handle, title, images, variants } = node;
    const mappedVariants = variants.edges.map((edge: any) => {
        const { sku, availability, priceV2, selectedOptions } = edge.node;
        const size = selectedOptions.find(
            (option: any) => option.name === 'Size'
        );

        return {
            size: size.value,
            sku: sku,
            availability,
            price: priceV2.amount,
        };
    });
    let defaultVariant = mappedVariants[0];
    const availableVariants = mappedVariants.filter(
        (variant: ProductCardVariant) => variant.availability > 0
    );

    if (availableVariants.length) {
        defaultVariant = availableVariants[0].sku;
    }

    let siblings: ProductSibling[] = [];
    if (node.metafield && node.metafield.key === 'siblings') {
        const metafield = node.metafield;

        if (metafield) {
            try {
                const parseResult = parse(metafield.value);
                if (parseResult.err) {
                    console.log(
                        'unable to parse json',
                        parseResult.err.message
                    );
                } else {
                    siblings = parseResult.value;
                }
            } catch (error) {
                console.log('unable to parse json', error);
            }
        }
    }

    const imageSRCs = node.images.edges.map((image: ImageEdge) => {
        return image.node.transformedSrc;
    });

    // To filter down the product card flat image & hover image
    const flatLayImage = imageSRCs.find((url: string | string[]) =>
        url.includes('_LP_FLATLAY')
    );
    const modelImage = imageSRCs.find((url: string | string[]) =>
        url.includes('_PRODUCT_CARD_ALT')
    );
    let defaultImage = flatLayImage;
    if (!defaultImage) {
        // Fallback.
        defaultImage = imageSRCs.find((url: string | string[]) =>
            url.includes('_PRODUCT_CARD_HERO')
        );
    }

    const { price, sku } = defaultVariant;
    return {
        product: {
            sku,
            handle,
            title,
            price: price,
            image: defaultImage,
            hoverImage: modelImage || defaultImage,
            variants: mappedVariants,
        },
        variant: node.variants[1],
        saved: true,
        label: 'NEW',
        coloursCount: siblings.length,
    };
}
