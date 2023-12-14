import { Button } from 'mmds/src';
import type { Meta, StoryObj } from '@storybook/react';

import { withDesign } from 'storybook-addon-designs';

const meta: Meta<typeof Button> = {
    title: 'mmds/Components/Button',
    tags: ['autodocs'],
    component: Button,
    decorators: [withDesign],
    argTypes: {
        variant: {
            name: 'Button Variant',
            options: [
                'base',
                'secondary',
                'ghost',
                'text',
                'quite',
                'quite_alt',
                'link_alt',
                'collection',
                'discover',
                'checkout',
            ],
            control: { type: 'select' },
        },
        radiusSize: {
            name: 'Button Size',
            options: ['small', 'medium', 'large'],
            control: { type: 'select' },
        },
        label: {
            name: 'Button Label',
        },
        icon: {
            name: 'Select Button Icon',
            options: ['globe', 'discover', 'northeast', 'left', 'right'],
            control: { type: 'select' },
        },
        disabled: {
            name: 'Toggle to see Disabled Button',
            control: 'boolean',
        },
        hrefLink: {
            name: 'Button Link',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

const sharedParameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/2bixFu3KY1QySUV8R1fczn/mmds.system?type=design&node-id=13-159&mode=design&t=Kw7QTgQwtZ2fzyv7-0',
    },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Base: Story = {
    args: {
        variant: 'base',
        label: 'Call to Action',
        radiusSize: 'large',
        icon: 'globe',
        hrefLink: '/',
    },
    parameters: sharedParameters,
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        label: 'Call to Action',
        radiusSize: 'large',
        icon: 'discover',
        hrefLink: '/',
    },
    parameters: sharedParameters,
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        label: 'Discover Road',
        radiusSize: 'large',
        icon: 'globe',
        hrefLink: '/',
    },
    parameters: sharedParameters,
};
export const Text: Story = {
    args: {
        variant: 'text',
        label: 'Discover Road',
        icon: 'northeast',
        hrefLink: '/',
    },
    parameters: sharedParameters,
};

export const Quite: Story = {
    args: {
        variant: 'quite',
        label: 'Discover Road',
        icon: 'discover',
        hrefLink: '/',
    },
    parameters: sharedParameters,
};

export const QuiteAlt: Story = {
    args: {
        variant: 'quite_alt',
        label: 'Call to Action',
        icon: 'globe',
        hrefLink: '/',
    },
    parameters: sharedParameters,
};

export const LinkAlt: Story = {
    args: {
        variant: 'link_alt',
        label: 'Call to Action',
        icon: 'globe',
        hrefLink: '/',
    },
    parameters: sharedParameters,
};

export const Collection: Story = {
    args: {
        variant: 'collection',
        label: 'Call to Action',
        icon: 'globe',
        hrefLink: '/',
    },
    parameters: sharedParameters,
};

export const Discover: Story = {
    args: {
        variant: 'discover',
        label: 'Discover Road',
        icon: 'discover',
        hrefLink: '/',
    },
    parameters: sharedParameters,
};

export const Cart: Story = {
    args: {
        variant: 'base',
        label: 'Discover Road',
        icon: 'discover',
        hrefLink: '/',
        radiusSize: 'none',
    },
    parameters: sharedParameters,
};

export const Checkout: Story = {
    args: {
        variant: 'checkout',
        label: 'Discover Road',
        icon: 'discover',
        hrefLink: '/',
        radiusSize: 'none',
    },
    parameters: sharedParameters,
};
