export function reformatImageSet(imageSet) {
    if (!imageSet) {
        console.log('Images missing in reformatImageSet');
    }
    return imageSet?.map((image) => {
        const location = {};

        if (image.node.transformedSrc.indexOf('PRODUCT_CARD_HERO') > -1) {
            location.usage = 'product_card';
            location.section = 'hero';
            location.slot = '01';
            location.device = 'all';
            location.variant = 'flatlay';
            location.variant_slot = null;
        } else if (image.node.transformedSrc.indexOf('PRODUCT_CARD_ALT') > -1) {
            location.usage = 'product_card';
            location.section = 'hero';
            location.slot = '01';
            location.device = 'all';
            location.variant = 'model';
            location.variant_slot = null;
        } else {
            const locationMatch = image.node.transformedSrc
                .toLowerCase()
                .match(/_pdp_(.*).(jpg|webp|png)/);

            const locationString = locationMatch?.length
                ? locationMatch[1]
                : null;

            if (locationString) {
                const path = locationString
                    ?.replace(/_/g, '/')
                    .replace(/_/g, '');
                const parts = path.split('/');
                location.usage = 'pdp';
                location.section = parts[0];
                location.slot = parts[1];
                location.device = parts[2] ? parts[2] : null;
                location.variant = parts[3] ? parts[3] : null;
                location.variant_slot = parts[4] ? parts[4] : null;
            }
        }

        return {
            src: image.node.transformedSrc,
            alt: image.node.alt || null,
            width: image.node.width || null,
            height: image.node.height || null,
            ...location,
        };
    });
}

const pathComponents = [
    'usage',
    'section',
    'slot',
    'device',
    'variant',
    'variant_slot',
];

export function productImagesByPath(imagery, path, single = false) {
    if (!imagery || !imagery?.length) return [];
    const newPath = path.replace('_VARIANT', '');

    const filter = {};
    newPath.split('.').forEach((value, index) => {
        filter[pathComponents[index]] = value;
    });

    const filteredImages = imagery.filter((item) => {
        for (let key in filter) {
            if (
                filter[key] !== '*' &&
                (item[key] === undefined || filter[key] !== item[key])
            ) {
                return false;
            }
        }
        return true;
    });

    return single ? filteredImages[0] : filteredImages;
}
