import uuid from 'uuid';

export const graphQlParser = resp => {
    if (!resp.data.shop.collectionByHandle || !resp.data.shop.collectionByHandle.products) {
        return null;
    }

    const products = resp.data.shop.collectionByHandle.products.edges;
    const mapped = products.map(product => {
        const images = product.node.images.edges.map(image => {
            return image.node.transformedSrc;
        });

        return {
            id: product.node.id,
            price: product.node.priceRange.minVariantPrice.amount,
            tags: product.node.tags,
            title: product.node.title,
            link: product.node.onlineStoreUrl,
            displayImage: findDisplayImage(images, product.node.tags),
            options: product.node.options,
            colour: findColour(product.node.options),
        };
    });

    return mapped.length > 5 ? mapped : duplicateUntilEnough(mapped);
};

const findColour = options => {
    const colourObject = options.filter(option => {
        return option.name.toLowerCase() === 'colour';
    });

    return colourObject[0]?.values[0]?.toLowerCase();
};

const findDisplayImage = (images, tags) => {
    const tag = tags.find(tag => tag.includes('carouselImage:'));
    if (tag) {
        return images[tag.split(':')[1] - 1];
    }
    return images[0];
};

const duplicateUntilEnough = array => {
    if (!array || !array.length) return;
    const newArray = array.map(item => {
        return {
            id: uuid.v4(),
            price: item.price,
            tags: item.tags,
            title: item.title,
            link: item.link,
            displayImage: item.displayImage,
        };
    });
    const allItems = [...array, ...newArray];
    return allItems.length > 5 ? allItems : duplicateUntilEnough(allItems);
};
