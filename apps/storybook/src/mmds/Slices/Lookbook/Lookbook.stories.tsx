import type { Meta, StoryObj } from '@storybook/react';
import LookbookOverlayWithStory from 'storefront/app/components/lookbook/withStory';
import { withDesign } from 'storybook-addon-designs';

const meta: Meta<typeof LookbookOverlayWithStory> = {
    title: 'mmds/Slices/Lookbook',
    tags: ['autodocs'],
    component: LookbookOverlayWithStory,
    decorators: [withDesign],
};

export default meta;
type Story = StoryObj<typeof LookbookOverlayWithStory>;

const variants = [
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
];

const sharedParameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/2bixFu3KY1QySUV8R1fczn/mmds.system?node-id=148%3A1049&mode=dev',
    },
    layout: 'fullscreen',
};

export const LookbookOverlay: Story = {
    args: {
        overlayLookbook: {
            title: 'Look 1',
            thumbnail: [
                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',

                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',

                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
            ],
            productTitle: 'Evade Pro Base Jersey 2.0',
            productDescription:
                'The Evade Pro Base Jersey 2.0 has been re-imagined with a range of sustainable materials and new design details for premium comfort and durability. The primary body is 70% recycled knitted Italian fabric with...',
            price: '$270.00AUD',
            productColor: 'Bronze Green',
            sizeVariant: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            saved: false,
            link: '/products/alt-road',
            productImage: [
                {
                    desktopImage:
                        'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                    mobileImage:
                        'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                },
                {
                    desktopImage:
                        'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                    mobileImage:
                        'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                },
                {
                    desktopImage:
                        'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                    mobileImage:
                        'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                },
                {
                    desktopImage:
                        'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                    mobileImage:
                        'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                },
                {
                    desktopImage:
                        'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                    mobileImage:
                        'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                },
                {
                    desktopImage:
                        'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                    mobileImage:
                        'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                },
                {
                    desktopImage:
                        'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                    mobileImage:
                        'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                },
                {
                    desktopImage:
                        'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                    mobileImage:
                        'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                },
                {
                    desktopImage:
                        'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                    mobileImage:
                        'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                },
                {
                    desktopImage:
                        'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                    mobileImage:
                        'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                },
            ],
        },
        block: {
            context: 'Lookbook',
            items: [
                {
                    lookbook: [
                        {
                            lookbookContext: 'Man',
                            desktopImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                            mobileImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                            heading: 'LOOK 001',
                            productTitle1: 'Man.',
                            variantTitle1: 'Variant Title',
                            productTitle2: 'Product Title2.',
                            variantTitle2: 'Variant Title2',
                            productTitle3: 'Product Title3.',
                            variantTitle3: 'Variant Title3',
                            productTitle4: 'Product Title4.',
                            variantTitle4: 'Variant Title4',
                        },
                        {
                            lookbookContext: 'Man',
                            desktopImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                            mobileImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                            heading: 'LOOK 002',
                            productTitle1: 'Man.',
                            variantTitle1: 'Variant Title',
                            productTitle2: 'Product Title2.',
                            variantTitle2: 'Variant Title2',
                            productTitle3: 'Product Title3.',
                            variantTitle3: 'Variant Title3',
                            productTitle4: 'Product Title4.',
                            variantTitle4: 'Variant Title4',
                        },
                        {
                            lookbookContext: 'Man',
                            desktopImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                            mobileImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                            heading: 'Look 003',
                            productTitle1: 'Man.',
                            variantTitle1: 'Variant Title',
                            productTitle2: 'Product Title2.',
                            variantTitle2: 'Variant Title2',
                            productTitle3: 'Product Title3.',
                            variantTitle3: 'Variant Title3',
                            productTitle4: 'Product Title4.',
                            variantTitle4: 'Variant Title4',
                        },
                        {
                            lookbookContext: 'Man',
                            desktopImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                            mobileImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                            heading: 'LOOK 004',
                            productTitle1: 'Man.',
                            variantTitle1: 'Variant Title',
                            productTitle2: 'Product Title2.',
                            variantTitle2: 'Variant Title2',
                            productTitle3: 'Product Title3.',
                            variantTitle3: 'Variant Title3',
                            productTitle4: 'Product Title4.',
                            variantTitle4: 'Variant Title4',
                        },
                        {
                            lookbookContext: 'Man',
                            desktopImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                            mobileImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                            heading: 'LOOK 005',
                            productTitle1: 'Man.',
                            variantTitle1: 'Variant Title',
                            productTitle2: 'Product Title2.',
                            variantTitle2: 'Variant Title2',
                            productTitle3: 'Product Title3.',
                            variantTitle3: 'Variant Title3',
                            productTitle4: 'Product Title4.',
                            variantTitle4: 'Variant Title4',
                        },
                        {
                            lookbookContext: 'Man',
                            desktopImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                            mobileImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                            heading: 'LOOK 006',
                            productTitle1: 'Man.',
                            variantTitle1: 'Variant Title',
                            productTitle2: 'Product Title2.',
                            variantTitle2: 'Variant Title2',
                            productTitle3: 'Product Title3.',
                            variantTitle3: 'Variant Title3',
                            productTitle4: 'Product Title4.',
                            variantTitle4: 'Variant Title4',
                        },
                        {
                            lookbookContext: 'Woman',
                            desktopImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                            mobileImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                            heading: 'LOOK 001',
                            productTitle1: 'Woman.',
                            variantTitle1: 'Variant Title',
                            productTitle2: 'Product Title2.',
                            variantTitle2: 'Variant Title2',
                            productTitle3: 'Product Title3.',
                            variantTitle3: 'Variant Title3',
                            productTitle4: 'Product Title4.',
                            variantTitle4: 'Variant Title4',
                        },
                        {
                            lookbookContext: 'Woman',
                            desktopImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                            mobileImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                            heading: 'LOOK 001',
                            productTitle1: 'Woman.',
                            variantTitle1: 'Variant Title',
                            productTitle2: 'Product Title2.',
                            variantTitle2: 'Variant Title2',
                            productTitle3: 'Product Title3.',
                            variantTitle3: 'Variant Title3',
                            productTitle4: 'Product Title4.',
                            variantTitle4: 'Variant Title4',
                        },
                        {
                            lookbookContext: 'Woman',
                            desktopImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                            mobileImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                            heading: 'LOOK 002',
                            productTitle1: 'Woman.',
                            variantTitle1: 'Variant Title',
                            productTitle2: 'Product Title2.',
                            variantTitle2: 'Variant Title2',
                            productTitle3: 'Product Title3.',
                            variantTitle3: 'Variant Title3',
                            productTitle4: 'Product Title4.',
                            variantTitle4: 'Variant Title4',
                        },
                        {
                            lookbookContext: 'Woman',
                            desktopImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                            mobileImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                            heading: 'LOOK 003',
                            productTitle1: 'Woman.',
                            variantTitle1: 'Variant Title',
                            productTitle2: 'Product Title2.',
                            variantTitle2: 'Variant Title2',
                            productTitle3: 'Product Title3.',
                            variantTitle3: 'Variant Title3',
                            productTitle4: 'Product Title4.',
                            variantTitle4: 'Variant Title4',
                        },
                        {
                            lookbookContext: 'Woman',
                            desktopImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                            mobileImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                            heading: 'LOOK 004',
                            productTitle1: 'Woman.',
                            variantTitle1: 'Variant Title',
                            productTitle2: 'Product Title2.',
                            variantTitle2: 'Variant Title2',
                            productTitle3: 'Product Title3.',
                            variantTitle3: 'Variant Title3',
                            productTitle4: 'Product Title4.',
                            variantTitle4: 'Variant Title4',
                        },
                        {
                            lookbookContext: 'Woman',
                            desktopImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                            mobileImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                            heading: 'LOOK 005',
                            productTitle1: 'Woman.',
                            variantTitle1: 'Variant Title',
                            productTitle2: 'Product Title2.',
                            variantTitle2: 'Variant Title2',
                            productTitle3: 'Product Title3.',
                            variantTitle3: 'Variant Title3',
                            productTitle4: 'Product Title4.',
                            variantTitle4: 'Variant Title4',
                        },
                    ],
                },
            ],
        },
    },
    parameters: sharedParameters,
};
