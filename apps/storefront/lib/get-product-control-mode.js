export function getProductControlMode(product, selectedVariant) {
    //set default control mode
    let controlMode = 'standard';
    const variantStockQuantity = (variant = null) =>
        variant
            ? variant?.quantityAvailable
            : selectedVariant?.quantityAvailable;
    const availableStock = variantStockQuantity();
    let variantAvailable =
        selectedVariant && selectedVariant.availableForSale && availableStock;

    const upperCasedTags = product.tags.map((tag) => tag.toUpperCase());

    // coming soon
    if (upperCasedTags.indexOf('COMINGSOON') !== -1) controlMode = 'brochure';

    // sold out
    if (!variantAvailable) {
        controlMode = 'soldout';
    }

    // discontinued
    if (upperCasedTags.indexOf('DISCONTINUED') !== -1)
        controlMode = 'discontinued';

    // preorder
    const preOrderDate = selectedVariant?.metafields
        .filter((metafield) => !!metafield)
        .find((metafield) => {
            return (
                metafield.namespace === 'preorder' && metafield.key === 'date'
            );
        })?.value;

    if (preOrderDate) {
        controlMode = 'preorder';
    }
    return controlMode;
}
