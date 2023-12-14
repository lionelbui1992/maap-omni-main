import { BundleRequirement } from './BundleRequirement';

type BundleDefinition = {
    title: string;
    description: string;
    upsell_message: string;
    upsell_message_partial: string;
    badge: string;
    product_image: string;
    published_start: string | null;
    published_end: string | null;
    discount_type: 'FIXED_AMOUNT' | 'PERCENTAGE';
    discount_value: number;
    user_type: 'ANY' | 'KNOWN';
    priority: number;
    currency: string;
    colour: string;
    requirements: BundleRequirement[];
    readonly objectID: string;
};

export default BundleDefinition;
