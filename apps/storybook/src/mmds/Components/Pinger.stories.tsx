import { Pinger } from 'mmds/src';
import type { Meta, StoryObj } from '@storybook/react';

import { withDesign } from 'storybook-addon-designs';

const meta: Meta<typeof Pinger> = {
    title: 'mmds/Components/Pinger',
    tags: ['autodocs'],
    component: Pinger,
    decorators: [withDesign],
    argTypes: {
        variant: {
            name: 'Pinger Variant',
            options: ['base', 'secondary', 'ghost', 'alt'],
            control: { type: 'select' },
        },
        radiusSize: {
            name: 'Pinger Size',
            options: ['small', 'medium', 'large'],
            control: { type: 'select' },
        },
        label: {
            name: 'Pinger Label',
        },
        icon: {
            name: 'Select Pinger Icon',
            options: ['globe', 'discover', 'northeast', 'left', 'right'],
            control: { type: 'select' },
        },
        active: {
            name: 'Toggle to see Active Pinger',
            control: 'boolean',
        },
        disabled: {
            name: 'Toggle to see Disabled Pinger',
            control: 'boolean',
        },
        hrefLink: {
            name: 'Pinger Link',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Pinger>;

const sharedParameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/2bixFu3KY1QySUV8R1fczn/mmds.system?type=design&node-id=899-9096&mode=design&t=5kIbXFr2tFHIhp47-4',
    },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Base: Story = {
    args: {
        variant: 'base',
        label: 'Call to Action',
        radiusSize: 'large',
        icon: 'globe',
    },
    parameters: sharedParameters,
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        label: 'Call to Action',
        radiusSize: 'large',
        icon: 'globe',
    },
    parameters: sharedParameters,
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        label: 'Call to Action',
        radiusSize: 'large',
        icon: 'globe',
    },
    parameters: sharedParameters,
};
export const Alt: Story = {
    args: {
        variant: 'alt',
        label: 'Call to Action',
        icon: 'globe',
    },
    parameters: sharedParameters,
};
