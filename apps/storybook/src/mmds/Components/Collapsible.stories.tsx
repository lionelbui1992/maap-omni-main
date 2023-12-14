import { Collapsible } from 'mmds/src';
import type { Meta, StoryObj } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

const meta: Meta<typeof Collapsible> = {
    title: 'mmds/Components/Collapsible',
    tags: ['autodocs'],
    component: Collapsible,
    decorators: [withDesign],
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Playground: Story = {
    args: {
        label: 'Collapsible Items',
    },
};
