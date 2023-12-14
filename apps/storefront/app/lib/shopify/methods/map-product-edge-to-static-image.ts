import { ImageEdge, ProductEdge } from 'shopify-storefront-api-typings';
import { StaticImageItem } from '../../../../app/components/swiper/type';

export default function (edge: ProductEdge): StaticImageItem {
    const { node } = edge;
    const imagesSrcs = node.images.edges.map((image: ImageEdge) => {
        return image.node.transformedSrc;
    });

    // To filter down the static flatlay Image
    const filteredImages = imagesSrcs.filter(
        (url: string | string[]) =>
            url.includes('PRODUCT_CARD_HERO') ||
            url.includes('PRODUCT_CARD_ALT')
    );

    const productLink = `/nproducts/${node.handle}`;

    return {
        desktopImage: filteredImages[0],
        mobileImage: filteredImages[0],
        link: productLink,
    };
}
