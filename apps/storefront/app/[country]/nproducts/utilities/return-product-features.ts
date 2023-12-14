export function returnFeatureImages(images) {
    if (!images) {
        return [];
    }

    return images
        .filter((image) => image.src.includes('PDP_FEATURE'))
        .map((image) => ({
            image: {
                desktopImage: image.src,
                mobileImage: image.src,
                altText: image.alt || 'Product Image',
            },
        }));
}

export function returnFeatures(product, featureImages) {
    if (!product || !product.metafields || !featureImages) {
        return [];
    }

    return Array.from({ length: 7 }, (_, index) => {
        const key = `feature_image_${index + 1}`;
        const metafield = product.metafields.find(
            (metafield) =>
                metafield &&
                metafield.namespace === 'custom' &&
                metafield.key === key
        );

        return {
            ...featureImages[index],
            description: metafield ? metafield.value : '',
        };
    }).filter(Boolean);
}
