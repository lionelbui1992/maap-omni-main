import { RadioGroup } from 'mmds/src';
import type { Meta, StoryObj } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

const meta: Meta<typeof RadioGroup> = {
    title: 'mmds/Components/Radio Group',
    tags: ['autodocs'],
    component: RadioGroup,
    decorators: [withDesign],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Playground: Story = {
    args: {
        ariaLabel: 'Product features',
        options: [
            { label: 'Moisture wicking', value: 'Moisture wicking' },
            { label: 'Breathable', value: 'Breathable' },
            { label: 'Anti bacterial', value: 'Anti bacterial' },
        ],
    },
};
