export const convertGQLVariantId = variantId => {
    return Buffer.from(variantId, 'base64')
        .toString('ascii')
        .replace('gid://shopify/ProductVariant/', '');
};
