export function getProductGender(product) {
    const breadcrumbs = product?.metafields
        .filter(
            (v) => v?.namespace.startsWith('breadcrumb_') && v.key === 'title'
        )
        .map((v) => v.value);

    return breadcrumbs.length > 0 ? breadcrumbs[0] : null;
}
