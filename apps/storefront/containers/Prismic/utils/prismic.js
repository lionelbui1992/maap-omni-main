export const prismicParser = prismicdata => {
    if (!prismicdata.results || !prismicdata.results[0]) return null;

    return prismicdata.results[0].data.body.map(block => {
        return {
            blockType: block.slice_type,
            data: block.primary,
            items: block.items,
        };
    });
};

export const formatPrismicText = textObj => {
    if (!textObj || !textObj[0]) return null;

    return textObj[0].text;
};
