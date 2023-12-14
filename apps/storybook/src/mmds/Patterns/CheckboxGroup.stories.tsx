import type { Meta, StoryObj } from '@storybook/react';
import { PatternCheckboxGroup } from 'mmds';
import { withDesign } from 'storybook-addon-designs';

const meta: Meta<typeof PatternCheckboxGroup> = {
    title: 'mmds/Patterns/Checkbox Group',
    tags: ['autodocs'],
    component: PatternCheckboxGroup,
    decorators: [withDesign],
};

export default meta;
type Story = StoryObj<typeof PatternCheckboxGroup>;

export const Default: Story = {
    args: {
        options: [
            { label: 'Checkbox 1', value: '1' },
            { label: 'Checkbox 2', value: '2' },
            { label: 'Checkbox 3', value: '3' },
        ],
    },
};
