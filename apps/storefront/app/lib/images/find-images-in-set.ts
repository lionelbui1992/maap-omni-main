import {
    ImageConnection,
    ImageEdge,
    Image,
} from 'shopify-storefront-api-typings';

export type ImageType =
    | 'PRODUCT_CARD_HERO'
    | 'PRODUCT_CARD_ALT'
    | 'PLP_FLATLAY'
    | 'TRANSPARENT_FLATLAY'
    | 'PDP_HERO'
    | 'PDP_SPECS'
    | 'PDP_ADDITIONAL_IMAGES'
    | 'PDP_FEATURE'
    | 'CLP_LIFESTYLE';

const imageFilenameNameMapping = {
    PDP_HERO: 'PDP_HERO',
    PLP_FLATLAY: 'CLP_Lifestyle',
    TRANSPARENT_FLATLAY: 'LP_FLATLAY ',
};

export default (image: ImageType, images: ImageConnection): Image[] | Image => {
    const filenameSegment: string = imageFilenameNameMapping[image] || image;
    const imageEdges: ImageEdge[] = images.edges.filter((edge) =>
        edge.node.transformedSrc.includes(filenameSegment)
    );
    const imageNodes: Image[] = imageEdges.map((edge) => edge.node);
    return imageNodes;
};
