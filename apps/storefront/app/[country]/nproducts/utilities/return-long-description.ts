export function returnLongDescription(product): string | null {
    if (!product || !product.metafields) {
        return null;
    }

    const longDescriptionMetafield = product.metafields.find(
        (metafield) =>
            metafield &&
            metafield.namespace === 'custom' &&
            metafield.key === 'long_form_pdp_description'
    );

    return longDescriptionMetafield
        ? longDescriptionMetafield.value
        : product.description || 'Description temporarily unavailable.';
}
