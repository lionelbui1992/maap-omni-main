export const getShortDescription = (product) => {
    const metafield = product?.metafields?.find(
        (edge) =>
            edge?.namespace === 'product' && edge.key === 'short_description'
    );

    return metafield ? metafield?.value : '';
};
