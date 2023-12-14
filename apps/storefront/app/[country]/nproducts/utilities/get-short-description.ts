export function getShortDescription(product): string | null {
    if (!product || !product.metafields) {
        return null;
    }

    const shortDescriptionMetafield = product.metafields.find(
        (metafield) =>
            metafield &&
            metafield.namespace === 'product' &&
            metafield.key === 'short_description'
    );

    return shortDescriptionMetafield
        ? shortDescriptionMetafield.value
        : product.description;
}
