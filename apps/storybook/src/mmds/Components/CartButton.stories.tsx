import { CartButton } from 'mmds';
import type { Meta } from '@storybook/react';
import { StoryObj } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

const meta: Meta<typeof CartButton> = {
    title: 'mmds/Components/CartButton',
    tags: ['autodocs'],
    component: CartButton,
    decorators: [withDesign],
};

export default meta;
type Story = StoryObj<typeof CartButton>;

export const Default: Story = {
    args: {
        state: 'default',
        label: 'Select',
    },
};

export const Selected: Story = {
    args: {
        state: 'selected',
        label: 'Select',
    },
};

export const Alternative: Story = {
    args: {
        state: 'alternative',
        label: 'Select',
    },
};

export const SoldOut: Story = {
    args: {
        state: 'soldOut',
        label: 'Select',
    },
};

export const Added: Story = {
    args: {
        state: 'added',
        label: 'Select',
    },
};
