import type { Meta, StoryObj } from '@storybook/react';
import SwiperWithStory from 'storefront/app/components/swiper/withStory';
import { withDesign } from 'storybook-addon-designs';

const meta: Meta<typeof SwiperWithStory> = {
    title: 'mmds/Slices/Swiper',
    tags: ['autodocs'],
    component: SwiperWithStory,
    decorators: [withDesign],
    argTypes: {
        variant: {
            name: 'Swiper Variant',
            options: [
                'product_feature',
                'collection',
                'capsule',
                'product_shopify',
                'product_sku_feature',
                'product_flatlay_single_collection',
                'product_flatlay_tabbed_collections',
                'pdp_gallery',
            ],
            control: { type: 'select' },
        },
    },
};

export default meta;
type Story = StoryObj<typeof SwiperWithStory>;

const sharedParameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/2bixFu3KY1QySUV8R1fczn/mmds.system?node-id=148%3A1049&mode=dev',
    },
    layout: 'fullscreen',
};

const productFeatureItem = {
    desktopImage:
        'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
    mobileImage:
        'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim.',
};

export const ProductFeatureSwiper = {
    args: {
        variant: 'product_feature',
        context: 'Features',
        items: [
            {
                ...productFeatureItem,
            },
            {
                ...productFeatureItem,
            },
            {
                ...productFeatureItem,
            },
            {
                ...productFeatureItem,
            },
            {
                ...productFeatureItem,
            },
            {
                ...productFeatureItem,
            },
            {
                ...productFeatureItem,
            },
            {
                ...productFeatureItem,
            },
            {
                ...productFeatureItem,
            },
            {
                ...productFeatureItem,
            },
            {
                ...productFeatureItem,
            },
            {
                ...productFeatureItem,
            },
            {
                ...productFeatureItem,
            },
            {
                ...productFeatureItem,
            },
        ],
    },
    parameters: sharedParameters,
};

const collectionItem = {
    desktopImage:
        'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
    mobileImage:
        'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
    overlayContext: 'Context',
    overlayTitle: 'MAAP X 100% EYEWEAR',
    overlayCTASet: [
        {
            variant: 'secondary',
            label: 'Discover',
            icon: 'discover',
            link: '/',
        },
    ],
};
export const CollectionSwiper = {
    args: {
        variant: 'collection',
        context: 'See also: Collection',
        items: [
            {
                ...collectionItem,
            },
            {
                ...collectionItem,
            },
            {
                ...collectionItem,
            },
            {
                ...collectionItem,
            },
            {
                ...collectionItem,
            },
        ],
    },
    parameters: sharedParameters,
};

const capsuleItem = {
    desktopImage:
        'https://cdn.shopify.com/s/files/1/0510/7809/files/4_3_CAP.jpg?v=1694154964',
    mobileImage:
        'https://cdn.shopify.com/s/files/1/0510/7809/files/4_3_CAP.jpg?v=1694154964',
    CTASet: [
        {
            variant: 'text',
            label: 'Call to Action',
            icon: 'northeast',
            link: '/',
        },
    ],
};

export const CapsuleSwiper = {
    args: {
        variant: 'capsule',
        context: 'See Also: FEATURES',
        items: [
            {
                ...capsuleItem,
            },
            {
                ...capsuleItem,
            },
            {
                ...capsuleItem,
            },
            {
                ...capsuleItem,
            },
            {
                ...capsuleItem,
            },
            {
                ...capsuleItem,
            },
            {
                ...capsuleItem,
            },
            {
                ...capsuleItem,
            },
            {
                ...capsuleItem,
            },
            {
                ...capsuleItem,
            },
        ],
    },
    parameters: sharedParameters,
};

const product = {
    handle: 'alt-road-jersey',
    sku: 'alt-road',
    title: 'Alt Road Jersey',
    price: 250.0,
    image: 'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
    hoverImage:
        'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD.jpg?v=1694408328',
    label: 'Label',

    variants: [
        {
            size: 'XXS',
            availability: 10,
            sku: 'alt-road-black-xs',
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

export const ProductShopifySwiper = {
    args: {
        variant: 'product_shopify',
        context: 'Jersey',
        productCard: [
            {
                variant: 'standard',
                product,
                saved: true,
                label: 'NEW',
                coloursCount: 4,
            },
            {
                variant: 'standard',
                product,
                saved: true,
                label: 'NEW',
                coloursCount: 4,
            },
            {
                variant: 'standard',
                product,
                saved: true,
                label: 'NEW',
                coloursCount: 4,
            },
            {
                variant: 'standard',
                product,
                saved: true,
                label: 'NEW',
                coloursCount: 4,
            },
            {
                variant: 'standard',
                product,
                saved: true,
                label: 'NEW',
                coloursCount: 4,
            },
            {
                variant: 'standard',
                product,
                saved: true,
                label: 'NEW',
                coloursCount: 4,
            },
            {
                variant: 'standard',
                product,
                saved: true,
                label: 'NEW',
                coloursCount: 4,
            },
            {
                variant: 'standard',
                product,
                saved: true,
                label: 'NEW',
                coloursCount: 4,
            },
            {
                variant: 'standard',
                product,
                saved: true,
                label: 'NEW',
                coloursCount: 4,
            },
            {
                variant: 'standard',
                product,
                saved: true,
                label: 'NEW',
                coloursCount: 4,
            },
            {
                variant: 'standard',
                product,
                saved: true,
                label: 'NEW',
                coloursCount: 4,
            },
            {
                variant: 'standard',
                product,
                saved: true,
                label: 'NEW',
                coloursCount: 4,
            },
            {
                variant: 'standard',
                product,
                saved: true,
                label: 'NEW',
                coloursCount: 4,
            },
            {
                variant: 'standard',
                product,
                saved: true,
                label: 'NEW',
                coloursCount: 4,
            },
            {
                variant: 'standard',
                product,
                saved: true,
                label: 'NEW',
                coloursCount: 4,
            },
        ],
    },
    parameters: sharedParameters,
};

export const ProductFlatlaySingleCollection = {
    args: {
        variant: 'product_flatlay_single_collection',
        context: 'Alt Road Jersey',
        title: 'Title goes here.',
        description:
            'Crafted from Drytex shell fabric with thermo-taped seams, adjustable hem and hood, this waterproof and breathable anorak is ready for every adventure.',
        CTASet: [
            {
                variant: 'secondary',
                label: 'Woman',
                link: '/',
            },
            {
                variant: 'secondary',
                label: 'Man',
                link: '/',
            },
            {
                variant: 'base',
                label: 'Discover Collection',
                icon: 'discover',
                link: '/',
            },
        ],
        productImage: [
            {
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                link: '/nproducts/alt-road-jersey',
            },
            {
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                link: '/nproducts/alt-road-jacket',
            },
            {
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                link: '/nproducts/alt-road-jacket',
            },
            {
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                link: '/nproducts/alt-road-jacket',
            },
            {
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                link: '/nproducts/alt-road-jacket',
            },
            {
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                link: '/nproducts/alt-road-jacket',
            },
            {
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                link: '/nproducts/alt-road-jacket',
            },
            {
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                link: '/nproducts/alt-road-jacket',
            },
            {
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                link: '/nproducts/alt-road-jacket',
            },
            {
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                link: '/nproducts/alt-road-jacket',
            },
        ],
    },
    parameters: sharedParameters,
};

export const ProductFlatlayTabbedCollections = {
    args: {
        variant: 'product_flatlay_tabbed_collections',
        context: 'Jerseys',
        items: [
            {
                collectionHandle: 'Pro Base',
                description:
                    'Crafted from Drytex shell fabric with thermo-taped seams, adjustable hem and hood, this waterproof and breathable anorak is ready for every adventure : Pro Base',
                CTASet: [
                    {
                        variant: 'secondary',
                        label: 'Woman',
                        link: '/',
                    },
                    {
                        variant: 'secondary',
                        label: 'Man',
                        link: '/',
                    },
                    {
                        variant: 'base',
                        label: 'Discover Collection',
                        icon: 'discover',
                        link: '/',
                    },
                ],
                productImage: [
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
                        link: '/nproducts/alt-road-jersey',
                    },
                ],
            },
            {
                collectionHandle: 'Pro Air',
                description:
                    'Crafted from Drytex shell fabric with thermo-taped seams, adjustable hem and hood, this waterproof and breathable anorak is ready for every adventure : Pro Air',
                CTASet: [
                    {
                        variant: 'secondary',
                        label: 'Woman',
                        link: '/',
                    },
                    {
                        variant: 'secondary',
                        label: 'Man',
                        link: '/',
                    },
                    {
                        variant: 'base',
                        label: 'Discover Collection',
                        icon: 'discover',
                        link: '/',
                    },
                ],
                productImage: [
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_LOO.jpg?v=1694060795',
                        link: '/nproducts/alt-road-jersey',
                    },
                ],
            },
            {
                collectionHandle: 'Race Fit',
                description:
                    'Crafted from Drytex shell fabric with thermo-taped seams, adjustable hem and hood, this waterproof and breathable anorak is ready for every adventure : Race Fit',
                CTASet: [
                    {
                        variant: 'secondary',
                        label: 'Woman',
                        link: '/',
                    },
                    {
                        variant: 'secondary',
                        label: 'Man',
                        link: '/',
                    },
                    {
                        variant: 'base',
                        label: 'Discover Collection',
                        icon: 'discover',
                        link: '/',
                    },
                ],
                productImage: [
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD.jpg?v=1694408328',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD.jpg?v=1694408328',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD.jpg?v=1694408328',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD.jpg?v=1694408328',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD.jpg?v=1694408328',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD.jpg?v=1694408328',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD.jpg?v=1694408328',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD.jpg?v=1694408328',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD.jpg?v=1694408328',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD.jpg?v=1694408328',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD.jpg?v=1694408328',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD.jpg?v=1694408328',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD.jpg?v=1694408328',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD.jpg?v=1694408328',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD.jpg?v=1694408328',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD.jpg?v=1694408328',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD.jpg?v=1694408328',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD.jpg?v=1694408328',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD.jpg?v=1694408328',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD.jpg?v=1694408328',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD.jpg?v=1694408328',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD.jpg?v=1694408328',
                        link: '/nproducts/alt-road-jersey',
                    },
                ],
            },
            {
                collectionHandle: 'Training',
                description:
                    'Crafted from Drytex shell fabric with thermo-taped seams, adjustable hem and hood, this waterproof and breathable anorak is ready for every adventure : Training',
                CTASet: [
                    {
                        variant: 'secondary',
                        label: 'Woman',
                        link: '/',
                    },
                    {
                        variant: 'secondary',
                        label: 'Man',
                        link: '/',
                    },
                    {
                        variant: 'base',
                        label: 'Discover Collection',
                        icon: 'discover',
                        link: '/',
                    },
                ],
                productImage: [
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_COL.jpg?v=1694149626',
                        link: '/nproducts/alt-road-jersey',
                    },
                ],
            },
            {
                collectionHandle: 'Pro Hex',
                description:
                    'Crafted from Drytex shell fabric with thermo-taped seams, adjustable hem and hood, this waterproof and breathable anorak is ready for every adventure : Pro Hex',
                CTASet: [
                    {
                        variant: 'secondary',
                        label: 'Woman',
                        link: '/',
                    },
                    {
                        variant: 'secondary',
                        label: 'Man',
                        link: '/',
                    },
                    {
                        variant: 'base',
                        label: 'Discover Collection',
                        icon: 'discover',
                        link: '/',
                    },
                ],
                productImage: [
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                        link: '/nproducts/alt-road-jersey',
                    },
                    {
                        desktopImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                        mobileImage:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                        link: '/nproducts/alt-road-jersey',
                    },
                ],
            },
        ],
    },
    parameters: sharedParameters,
};

export const ProductSKUFeature = {
    args: {
        variant: 'product_sku_feature',
        context: 'Product Title',
        title: 'Title goes here.',
        productCard: [
            {
                variant: 'alternative',
                product: {
                    ...product,
                    image: 'https://cdn.shopify.com/s/files/1/0055/9503/7763/files/product_card_alt_hover.png?v=1693204162',
                    hoverImage:
                        'https://cdn.shopify.com/s/files/1/0055/9503/7763/files/product_card_alt_default.png?v=1693204162',
                },
                saved: false,
                label: 'NEW',
                coloursCount: 10,
                backgroundColour: '#CCFD50',
            },
            {
                variant: 'alternative',
                product: {
                    ...product,
                    image: 'https://cdn.shopify.com/s/files/1/0055/9503/7763/files/product_card_alt_hover.png?v=1693204162',
                    hoverImage:
                        'https://cdn.shopify.com/s/files/1/0055/9503/7763/files/product_card_alt_default.png?v=1693204162',
                },
                saved: false,
                label: 'NEW',
                coloursCount: 10,
                backgroundColour: '#CCFD50',
            },
            {
                variant: 'alternative',
                product: {
                    ...product,
                    image: 'https://cdn.shopify.com/s/files/1/0055/9503/7763/files/product_card_alt_hover.png?v=1693204162',
                    hoverImage:
                        'https://cdn.shopify.com/s/files/1/0055/9503/7763/files/product_card_alt_default.png?v=1693204162',
                },
                saved: false,
                label: 'NEW',
                coloursCount: 10,
                backgroundColour: '#CCFD50',
            },
        ],
    },
    parameters: sharedParameters,
};

const PDPGalleryItem = {
    desktopImage:
        'https://cdn.shopify.com/s/files/1/0510/7809/files/MAP-WAJ292_MSK.Womens_20Training_20Jersey_Musk_PDP_HERO_01_DESKTOP.jpg',
    mobileImage:
        'https://cdn.shopify.com/s/files/1/0510/7809/files/MAP-WAJ292_MSK.Womens_20Training_20Jersey_Musk_PDP_HERO_01_DESKTOP.jpg',
};

export const PDPGallery = {
    args: {
        variant: 'pdp_gallery',
        items: [
            {
                ...PDPGalleryItem,
            },
            {
                ...PDPGalleryItem,
            },
            {
                ...PDPGalleryItem,
            },
            {
                ...PDPGalleryItem,
            },
            {
                ...PDPGalleryItem,
            },
        ],
    },
    parameters: sharedParameters,
};
