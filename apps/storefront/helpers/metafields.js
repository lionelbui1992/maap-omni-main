export function seoObjectFromMetafields(metaFieldsNode) {
    return {
        title: metaFieldsNode?.edges
            .filter((item) => item.node.key === 'title_tag')[0]
            ?.node.value.slice(0, 50),
        description: metaFieldsNode?.edges
            .filter((item) => item.node.key === 'description_tag')[0]
            ?.node.value.slice(0, 155),
    };
}

export function seoValuesWithDefaults(storefrontSeoObject, defaults) {
    const seoObjectWithDefaults = defaults;

    if (storefrontSeoObject?.title)
        seoObjectWithDefaults.title = storefrontSeoObject.title;
    if (storefrontSeoObject?.description)
        seoObjectWithDefaults.description = storefrontSeoObject.description;

    return seoObjectWithDefaults;
}
