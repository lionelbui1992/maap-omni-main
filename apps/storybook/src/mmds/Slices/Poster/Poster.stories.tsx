import type { Meta, StoryObj } from '@storybook/react';
import PostersWithStory from 'storefront/app/components/poster/withStory';
import { withDesign } from 'storybook-addon-designs';

const meta: Meta<typeof PostersWithStory> = {
    title: 'mmds/Slices/Posters',
    tags: ['autodocs'],
    component: PostersWithStory,
    decorators: [withDesign],
    argTypes: {
        variant: {
            name: 'Poster Variant',
            options: [
                'oneUp',
                'twoUp',
                'feature',
                'featureStack',
                'featureStackVideo',
            ],
            control: { type: 'select' },
        },
    },
};

export default meta;
type Story = StoryObj<typeof PostersWithStory>;

const sharedParameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/2bixFu3KY1QySUV8R1fczn/mmds.system?node-id=148%3A1049&mode=dev',
    },
    layout: 'fullscreen',
};

export const OneUp: Story = {
    args: {
        variant: 'oneUp',
        items: [
            {
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/OneUp_9afb5f8d-a12a-4789-a4ae-3c300dae962f.jpg?v=1693528015',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/OneUp_9afb5f8d-a12a-4789-a4ae-3c300dae962f.jpg?v=1693528015',
                title: 'Winter Essentials',
                textThemeDesktop: false,
                textThemeMobile: false,
                CTASet: [
                    {
                        hrefLink: '/',
                        variant: 'text',
                        label: 'Call To Action',
                    },
                ],
            },
        ],
    },
    parameters: sharedParameters,
};

export const TwoUp: Story = {
    args: {
        variant: 'twoUp',
        items: [
            {
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/TwoUp.jpg?v=1693527903',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/TwoUp.jpg?v=1693527903',
                title: 'Winter Essentials',
                textThemeDesktop: false,
                textThemeMobile: false,
                CTASet: [
                    {
                        hrefLink: '/',
                        variant: 'text',
                        label: 'Call to Action',
                    },
                ],
            },
        ],
    },
    parameters: sharedParameters,
};

export const Feature: Story = {
    args: {
        variant: 'feature',
        items: [
            {
                backgroundColor: '#E7E7E7',
                productTitle: 'Pro Bib 2.0',
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/Test_image.jpg?v=1693527577',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/Test_image.jpg?v=1693527577',
                textThemeDesktop: true,
                textThemeMobile: true,
                content:
                    'Crafted from Drytex shell fabric with thermo-taped seams, adjustable hem and hood, this waterproof and breathable anorak is ready for every adventure.',
                CTASet: [
                    {
                        hrefLink: '/',
                        variant: 'secondary',
                        label: 'Woman',
                    },
                    {
                        hrefLink: '/',
                        variant: 'secondary',
                        label: 'Man',
                    },
                    {
                        hrefLink: '/',
                        variant: 'ghost',
                        label: 'Discover',
                        icon: 'discover',
                    },
                ],
            },
        ],
    },
    parameters: sharedParameters,
};

export const FeatureStack: Story = {
    args: {
        variant: 'featureStack',
        items: [
            {
                productTitle: 'Pro Bib 2.0',
                CTASet: [
                    {
                        variant: 'secondary',
                        label: 'Woman',
                        hrefLink: '/',
                    },
                    {
                        variant: 'secondary',
                        label: 'Man',
                        hrefLink: '/',
                    },
                    {
                        variant: 'secondary',
                        label: 'Discover Gloves',
                        hrefLink: '/collections/cycling-gloves',
                        icon: 'northeast',
                    },
                ],
                textThemeDesktop: true,
                textThemeMobile: true,
                featureStack: [
                    {
                        productThumbnail:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                        description:
                            'Crafted from Drytex shell fabric with thermo-taped seams, adjustable hem and hood, this waterproof and breathable anorak is ready for every adventure: One',
                        productImage: {
                            desktopImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                            mobileImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                        },
                        backgroundColor: '#efefef',
                    },
                    {
                        productThumbnail:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/Feature_image_2.jpg?v=1693543710',
                        description:
                            'Crafted from Drytex shell fabric with thermo-taped seams, adjustable hem and hood, this waterproof and breathable anorak is ready for every adventure: One',
                        productImage: {
                            desktopImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/Feature_image_2.jpg?v=1693543710',
                            mobileImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/Feature_image_2.jpg?v=1693543710',
                        },
                        backgroundColor: '#b29170',
                    },
                    {
                        productThumbnail:
                            'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example_1.jpg?v=1693540962',
                        description:
                            'Crafted from Drytex shell fabric with thermo-taped seams, adjustable hem and hood, this waterproof and breathable anorak is ready for every adventure: One',
                        productImage: {
                            desktopImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example_1.jpg?v=1693540962',
                            mobileImage:
                                'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example_1.jpg?v=1693540962',
                        },
                        backgroundColor: 'rgba(195,170,253,0.37)',
                    },
                ],
            },
        ],
    },
    parameters: sharedParameters,
};

export const FeatureStackVideo: Story = {
    args: {
        variant: 'featureStackVideo',
        items: [
            {
                productTitle: 'Pro Bib 2.0',
                backgroundColor: '#E7E7E7',
                desktopVideoURL:
                    'https://cdn.shopify.com/videos/c/o/v/6a59ec33ecdf418ea8cf73d47e1326b8.mp4',
                mobileVideoURL:
                    'https://cdn.shopify.com/videos/c/o/v/20dae0b674564fb48270438a888ae825.mp4',
                content:
                    'Crafted from Drytex shell fabric with thermo-taped seams, adjustable hem and hood, this waterproof and breathable anorak is ready for every adventure.',
                variantTitle: 'Variant Title',
                variantImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/product_template.jpg?v=1693526515',
                textThemeDesktop: true,
                textThemeMobile: true,
                CTASet: [
                    {
                        hrefLink: '/',
                        variant: 'secondary',
                        label: 'Woman',
                    },
                    {
                        hrefLink: '/',
                        variant: 'secondary',
                        label: 'Man',
                    },
                    {
                        hrefLink: '/',
                        variant: 'ghost',
                        label: 'Discover',
                        icon: 'discover',
                    },
                ],
            },
        ],
    },
    parameters: sharedParameters,
};

export const Features: Story = {
    args: {
        variant: 'features',
        items: [
            {
                context: 'When the weather turns wild.',
                title: 'Cloud Chaser',
                content:
                    'Alt_Road Lightweight Anorak. Constructed from a waterproof and windproof Drytex™ shell, designed to take on the elements.',
                titlePosition: 'top',
                desktopImageLeft:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example_1.jpg?v=1693540962',
                mobileImageLeft:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example_1.jpg?v=1693540962',
                desktopImageRight:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/Feature_image_2.jpg?v=1693543710',
                mobileImageRight:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/Feature_image_2.jpg?v=1693543710',
                textThemeDesktop: true,
                textThemeMobile: true,
                CTASet: [
                    {
                        hrefLink: '/',
                        variant: 'secondary',
                        label: 'Woman',
                    },
                    {
                        hrefLink: '/',
                        variant: 'secondary',
                        label: 'Man',
                    },
                    {
                        hrefLink: '/',
                        variant: 'secondary',
                        label: 'Discover',
                        icon: 'discover',
                    },
                ],
            },
        ],
    },
    parameters: sharedParameters,
};

export const FeaturesAlt: Story = {
    args: {
        variant: 'featuresAlt',
        items: [
            {
                context: 'Beyond the boundaries.',
                desktopImageRight:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example_1.jpg?v=1693540962',
                mobileImageRight:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example_1.jpg?v=1693540962',
                desktopImageLeft:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                mobileImageLeft:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/feature_example.jpg?v=1693540910',
                textThemeDesktop: true,
                textThemeMobile: true,
                buttonPlacementImageSide: [
                    {
                        buttonPlacement: 'left',
                        CTASet: [
                            {
                                hrefLink: '/',
                                variant: 'secondary',
                                label: 'Woman-left',
                            },
                            {
                                hrefLink: '/',
                                variant: 'secondary',
                                label: 'Man',
                            },
                        ],
                    },
                    {
                        buttonPlacement: 'right',
                        CTASet: [
                            {
                                hrefLink: '/',
                                variant: 'secondary',
                                label: 'Woman-Right',
                            },
                            {
                                hrefLink: '/',
                                variant: 'secondary',
                                label: 'Man',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    parameters: sharedParameters,
};
