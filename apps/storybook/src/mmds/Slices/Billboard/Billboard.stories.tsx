import type { Meta, StoryObj } from '@storybook/react';
import withStory from 'storefront/app/components/billboard/withStory';
import { withDesign } from 'storybook-addon-designs';

const meta: Meta<typeof withStory> = {
    title: 'mmds/Slices/Billboard',
    tags: ['autodocs'],
    component: withStory,
    decorators: [withDesign],
    argTypes: {
        variant: {
            name: 'Billboard Variant',
            options: ['static', 'cta_static', 'cta_carousel'],
            control: { type: 'select' },
            table: {
                disable: true,
                control: false,
            },
        },
        items: [
            {
                title: {
                    name: 'Title',
                },
                titleSize: {
                    name: 'Title Size',
                    options: ['small', 'medium', 'large'],
                    control: { type: 'select' },
                    defaultValue: 'large',
                    description: 'Size options for Title',
                },
                subTitle: {
                    name: 'Sub Title',
                },
                subTitleSize: {
                    name: 'Sub Title Size',
                    options: ['small', 'medium', 'large'],
                    control: { type: 'select' },
                    defaultValue: 'large',
                    description: 'Size options for Sub Title',
                },
                contentPosition: {
                    name: 'Content Position',
                    options: ['bottomLeft', 'center'],
                    control: { type: 'select' },
                },
                desktopImage: {
                    description: 'Image aspect ratio 16:9',
                },
                mobileImage: {
                    description: 'Image aspect ratio 3:4',
                },
                label: {
                    table: {
                        disable: true,
                        control: false,
                    },
                },
                link: {
                    table: {
                        disable: true,
                        control: false,
                    },
                },
                variant: {
                    table: {
                        disable: true,
                        control: false,
                    },
                },
                icon: {
                    table: {
                        disable: true,
                        control: false,
                    },
                },
                ctaSet: {
                    table: {
                        disable: true,
                        control: false,
                    },
                },
            },
        ],
    },
};

export default meta;
type Story = StoryObj<typeof withStory>;

const sharedParameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/2bixFu3KY1QySUV8R1fczn/mmds.system?node-id=181%3A1219&mode=dev',
    },
    layout: 'fullscreen',
};

export const Static: Story = {
    args: {
        variant: 'static',
        items: [
            {
                title: 'Static',
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/Billboard_Desktop_Image_test.jpg?v=1692581366',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/Billboard_Mobile_Image_test.jpg?v=1692581365',
            },
        ],
    },
    parameters: sharedParameters,
};

export const ContainStaticImage: Story = {
    args: {
        variant: 'static',
        items: [
            {
                title: 'Static',
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/Billboard_Desktop_Image_test.jpg?v=1692581366',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/Billboard_Mobile_Image_test.jpg?v=1692581365',
                containImage: true,
                contentPosition: 'center',
            },
        ],
    },
    parameters: sharedParameters,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const CTA_Static: Story = {
    args: {
        variant: 'cta_static',
        items: [
            {
                title: 'New Season Road',
                titleSize: 'large',
                subTitle:
                    'Blur the lines with a spectrum of new Pro Hex Jerseys',
                subTitleSize: 'large',
                contentPosition: 'bottomLeft',
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/Billboard_Desktop_Image_test.jpg?v=1692581366',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/Billboard_Mobile_Image_test.jpg?v=1692581365',
            },
        ],
    },
    parameters: sharedParameters,
};

export const CTA_Carousel: Story = {
    args: {
        variant: 'cta_carousel',
        items: [
            {
                title: 'New Season one',
                titleSize: 'large',
                subTitle:
                    'Blur the lines with a spectrum of new Pro Hex Jerseys',
                subTitleSize: 'large',
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/Billboard_Desktop_Image2_test.jpg?v=1692591832',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/Billboard_Mobile_Image2_test.jpg?v=1692591836',
                contentPosition: 'bottomLeft',
                ctaSet: [
                    {
                        label: 'Woman',
                        hrefLink: '/',
                        variant: 'secondary',
                    },
                    {
                        label: 'Man',
                        hrefLink: '/',
                        variant: 'secondary',
                    },
                    {
                        label: 'Discover',
                        hrefLink: '/',
                        variant: 'base',
                        icon: 'globe',
                    },
                ],
            },
            {
                title: 'New Season two',
                titleSize: 'large',
                subTitle:
                    'Blur the lines with a spectrum of new Pro Hex Jerseys',
                subTitleSize: 'large',
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/Billboard_Desktop_Image2_test.jpg?v=1692591832',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/Billboard_Mobile_Image2_test.jpg?v=1692591836',
                contentPosition: 'center',
                ctaSet: [
                    {
                        label: 'Woman',
                        hrefLink: '/',
                        variant: 'secondary',
                    },
                    {
                        label: 'Man',
                        hrefLink: '/',
                        variant: 'secondary',
                    },
                    {
                        label: 'Discover',
                        hrefLink: '/',
                        variant: 'base',
                        icon: 'globe',
                    },
                ],
            },
            {
                title: 'New Season three',
                titleSize: 'large',
                subTitle:
                    'Blur the lines with a spectrum of new Pro Hex Jerseys',
                subTitleSize: 'large',
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/Billboard_Desktop_Image2_test.jpg?v=1692591832',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/Billboard_Mobile_Image2_test.jpg?v=1692591836',
                contentPosition: 'bottomLeft',
                ctaSet: [
                    {
                        label: 'Woman',
                        hrefLink: '/',
                        variant: 'secondary',
                    },
                    {
                        label: 'Man',
                        hrefLink: '/',
                        variant: 'secondary',
                    },
                    {
                        label: 'Discover',
                        hrefLink: '/',
                        variant: 'base',
                        icon: 'globe',
                    },
                ],
            },
        ],
    },
    parameters: sharedParameters,
};
