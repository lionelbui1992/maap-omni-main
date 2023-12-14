export const getImageUrls = (alternate_image_urls) => {
    const imageUrl =
        alternate_image_urls.find((url) => url.includes('PRODUCT_CARD_HERO')) ||
        '';

    const hoverImageUrl =
        alternate_image_urls.find((url) => url.includes('PRODUCT_CARD_ALT')) ||
        '';

    return { imageUrl, hoverImageUrl };
};

export const getSiblings = (customFields) => {
    let siblings = [];
    try {
        if (
            typeof customFields['related_products-siblings'] === 'undefined' ||
            !customFields['related_products-siblings']
        ) {
            return siblings;
        }
        siblings = JSON.parse(customFields['related_products-siblings']);
    } catch (error) {
        console.error('Error parsing related_products-siblings:', error);
    }

    return siblings;
};
