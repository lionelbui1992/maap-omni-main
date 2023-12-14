export type BundleRequirement = {
    type: 'TAG' | 'PRODUCT_TYPE' | 'COLLECTION';
    value: string;
    quantity: number;
    text: string;
};

export default BundleRequirement;
