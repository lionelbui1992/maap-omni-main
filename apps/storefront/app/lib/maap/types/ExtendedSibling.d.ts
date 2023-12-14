import BasicSibling from '@app/lib/shopify/maap/BasicSibling';

// The sibling data after merging with image data
export default interface ExtendedSibling extends BasicSibling {
    image?: string;
    altText?: string;
}
