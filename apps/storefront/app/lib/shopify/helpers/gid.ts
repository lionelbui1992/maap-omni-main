export const trimGID = (gid) => {
    return gid.replace(/gid:\/\/shopify\/[A-Za-z]+\//i, '');
};

export const convertGQLVariantId = (variantId) => {
    return Buffer.from(variantId, 'base64')
        .toString('ascii')
        .replace('gid://shopify/ProductVariant/', '');
};
