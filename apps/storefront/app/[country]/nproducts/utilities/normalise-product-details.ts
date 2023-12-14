/* 
For legacy products, we need to do some string manipulation to normalise the product detail names.
All of that manipulation should live in this function - toTitleCase.
We need to ensure those names are in the format: Moisture Wicking and not moisture wicking or moisture-wicking.
We also need to make sure we're handling special cases such as 'dri-release', where the hyphen should be preserved.
*/
function toTitleCase(feature) {
    const specialCases = {
        'dri-release': 'Dri-release',
    };

    const cleanedString = feature
        .replace('feature:', '')
        .replace(/^[0-9]+:/, '');

    return cleanedString
        .split(/[- ]/)
        .map((word) => {
            if (specialCases[word.toLowerCase()]) {
                return specialCases[word.toLowerCase()];
            }

            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');
}

export function normaliseProductDetails(product, fabricDetails) {
    let store: string[] = [];

    // Check for new metafields source
    if (product && product.metafields) {
        const detailsFromMetafields = product.metafields
            .filter(
                (metafield) =>
                    metafield &&
                    metafield.namespace === 'custom' &&
                    metafield.key.startsWith('detail_icon_')
            )
            .map((metafield) => metafield.value);

        store.push(...detailsFromMetafields);
    }

    // Fallback to legacy tags source
    if (product && product.tags) {
        const detailsFromTags = product.tags
            .filter((tag) => tag.match(/feature:/g))
            .map((tag) => {
                const detail = tag.replace('feature:', '');
                return toTitleCase(detail) || null;
            })
            .filter((detail) => detail !== null);

        store.push(...detailsFromTags);
    }

    // Add fabric details
    if (fabricDetails.details) {
        store.push(...fabricDetails.details);
    }

    const details = [...new Set(store)];

    return details;
}
