import { Checkbox } from 'mmds/src';
import type { Meta, StoryObj } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

const meta: Meta<typeof Checkbox> = {
    title: 'mmds/Components/Checkbox',
    tags: ['autodocs'],
    component: Checkbox,
    decorators: [withDesign],
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Checked: Story = {
    args: {
        checked: true,
        label: 'Accept terms and conditions.',
    },
};

export const Unchecked: Story = {
    args: {
        checked: false,
        label: 'Accept terms and conditions.',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        label: 'Accept terms and conditions.',
    },
};
