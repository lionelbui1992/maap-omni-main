import { SizeSelector } from 'mmds';
import type { Meta } from '@storybook/react';
import { StoryObj } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

const meta: Meta<typeof SizeSelector> = {
    title: 'mmds/Components/SizeSelector',
    tags: ['autodocs'],
    component: SizeSelector,
    decorators: [withDesign],
};

export default meta;
type Story = StoryObj<typeof SizeSelector>;

export const Unselected: Story = {
    args: {
        state: 'default',
        label: 'L',
    },
};

export const Selected: Story = {
    args: {
        state: 'selected',
        label: 'XXL',
    },
};

export const OutOfStock: Story = {
    args: {
        state: 'outOfStock',
        label: 'M',
    },
};

export const OutOfStockSelected: Story = {
    args: {
        state: 'outOfStockSelected',
        label: 'S',
    },
};
