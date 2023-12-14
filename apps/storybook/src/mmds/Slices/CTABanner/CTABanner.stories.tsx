import type { Meta, StoryObj } from '@storybook/react';
import withStory from 'storefront/app/components/cta-banner/withStory';
import { withDesign } from 'storybook-addon-designs';

const meta: Meta<typeof withStory> = {
    title: 'mmds/Slices/CTA Banner',
    tags: ['autodocs'],
    component: withStory,
    decorators: [withDesign],
    argTypes: {
        variant: {
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
                desktopImage: {
                    description: 'Image aspect ratio 16:9 or 4:3',
                },
                mobileImage: {
                    description: 'Image aspect ratio 3:4',
                },
                link: {
                    table: {
                        disable: true,
                        control: false,
                    },
                },
                icon: {
                    name: 'Title Icon',
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

const sharedArgs = {
    title: 'Shop all this',
    link: '/',
};

const sharedParameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/2bixFu3KY1QySUV8R1fczn/mmds.system?node-id=181%3A1219&mode=dev',
    },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Single: Story = {
    args: {
        variant: 'single',
        items: [
            {
                ...sharedArgs,
                titleSize: 'medium',
                icon: 'northeast',
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/desktop-single-image.png?v=1692787695',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/mobile-single-image.png?v=1692787695',
            },
        ],
    },
    parameters: sharedParameters,
};

export const Split: Story = {
    args: {
        variant: 'split',
        items: [
            {
                ...sharedArgs,
                titleSize: 'small',
                icon: 'northeast',
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/desktop-split-image.png?v=1692788058',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/mobile-split-image.png?v=1692787695',
            },
            {
                ...sharedArgs,
                titleSize: 'small',
                icon: 'discover',
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/desktop-split-image.png?v=1692788058',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/mobile-split-image.png?v=1692787695',
            },
        ],
    },
    parameters: sharedParameters,
};
