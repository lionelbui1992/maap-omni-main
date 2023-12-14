// The sibling data that comes back from ShopifyProduct
export interface BasicSibling {
  title: string;
  handle: string;
  swatchColour?: string;
}

// The sibling data after merging with image data
export interface ExtendedSibling extends BasicSibling {
  image?: string;
  altText?: string;
}
