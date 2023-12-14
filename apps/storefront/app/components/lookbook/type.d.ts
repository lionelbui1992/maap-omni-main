export type LookbookContext = 'Woman' | 'Man';

export type LookbookItem = {
    lookbookContext: LookbookContext;
    desktopImage: string;
    mobileImage: string;
    heading: string;
    productHandle1?: string;
    productTitle1: string;
    variantTitle1: string;
    productHandle2?: string;
    productTitle2: string;
    variantTitle2: string;
    productHandle3?: string;
    productTitle3?: string;
    variantTitle3?: string;
    productHandle4?: string;
    productTitle4?: string;
    variantTitle4?: string;
};

export type Lookbook = {
    lookbook?: LookbookItem[];
};

export type LookbookBlock = {
    context: string;
    items: Lookbook[];
};

export type Image = {
    desktopImage: string;
    mobileImage: string;
};

export interface LookbookDrawerProps {
    look: LookbookItem;
    children: React.ReactNode;
    handles: (string | undefined)[];
}

export type OverlayContentItem = {
    title: string;
    thumbnail: string[];
    productTitle: string;
    productDescription: string;
    productColor: string;
    sizeVariant: string[];
    link: string;
    price: string;
    saved: boolean;
    productImage: Image[];
    children?: any;
    productHandles?: (string | undefined)[];
    activeItem?: any; // TODO
};

export type LookbookOverlayProps = {
    block: LookbookBlock;
    overlayLookbook: OverlayContentItem;
};
