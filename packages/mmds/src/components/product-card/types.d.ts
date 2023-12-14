export type ProductCardSliceVariant = 'standard' | 'alternative';

export type ProductCardProduct = {
    handle: string;
    title: string;
    price?: number;
    image: string;
    hoverImage?: string;
    sku: string;
    variants: ProductCardVariant[];
};

export type ProductCardVariant = {
    sku: string;
    size: string;
    availability: number;
};
