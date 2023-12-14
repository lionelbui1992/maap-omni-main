import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from 'mmds';
import { withDesign } from 'storybook-addon-designs';

const meta: Meta<typeof ProductCard> = {
    title: 'mmds/Global/Product Card',
    tags: ['autodocs'],
    component: ProductCard,
    decorators: [withDesign],
    argTypes: {
        variant: {
            name: 'Variant',
            options: ['Standard', 'Alternative'],
            mapping: {
                Standard: 'standard',
                Alternative: 'alternative',
            },
            control: { type: 'select' },
        },
        saved: {
            name: 'Saved to Wishlist',
        },
        coloursCount: {
            name: 'Available Colours Count',
        },
        label: {
            name: 'Label',
            required: false,
        },
        backgroundColour: {
            name: 'Background Colour',
            control: { type: 'color' },
        },
        product: {
            name: 'Product Data',
            handle: {
                name: 'Handle',
            },
            title: {
                name: 'Title',
            },
            price: {
                name: 'Price',
                type: 'number',
            },
            image: {
                description: 'Image (aspect ratio 3:4).',
            },
            altImage: {
                description: 'Image (aspect ratio 3:4).',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

const sharedParameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/2bixFu3KY1QySUV8R1fczn/mmds.system?node-id=181%3A1219&mode=dev',
    },
};

const product = {
    handle: 'alt-road-jersey',
    sku: 'alt-road',
    title: 'Alt Road Jersey',
    price: 250.0,
    image: 'https://cdn.shopify.com/s/files/1/0055/9503/7763/files/product_card_default.png?v=1693204162',
    hoverImage:
        'https://cdn.shopify.com/s/files/1/0055/9503/7763/files/product_card_hover.png?v=1693204162',
    label: 'Label',
    variants: [
        {
            size: 'XXS',
            availability: 10,
            sku: 'alt-road-black-xxs',
        },
        {
            size: 'XS',
            availability: 10,
            sku: 'alt-road-black-xs',
        },
        {
            size: 'S',
            availability: 5,
            sku: 'alt-road-black-s',
        },
        {
            size: 'M',
            availability: 0,
            sku: 'alt-road-black-M',
        },
        {
            size: 'L',
            availability: 10,
            sku: 'alt-road-black-lg',
        },
        {
            size: 'XL',
            availability: 0,
            sku: 'alt-road-black-xl',
        },
        {
            size: 'XXL',
            availability: 3,
            sku: 'alt-road-black-xxl',
        },
    ],
};

export const Standard: Story = {
    args: {
        variant: 'standard',
        product,
        saved: true,
        label: 'NEW',
        coloursCount: 4,
        quarterWidth: true,
    },
    parameters: sharedParameters,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Alternative: Story = {
    args: {
        variant: 'alternative',
        product: {
            ...product,
            image: 'https://cdn.shopify.com/s/files/1/0055/9503/7763/files/product_card_alt_default.png?v=1693204162',
            hoverImage:
                'https://cdn.shopify.com/s/files/1/0055/9503/7763/files/product_card_alt_hover.png?v=1693204162',
        },
        saved: false,
        label: 'NEW',
        coloursCount: 10,
        backgroundColour: '#CCFD50',
        quarterWidth: true,
    },
    parameters: sharedParameters,
};
