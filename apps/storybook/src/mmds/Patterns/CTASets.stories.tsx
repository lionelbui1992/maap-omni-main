import type { Meta, StoryObj } from '@storybook/react';
import { CTASet, PatternCTASet } from 'mmds';
import { withDesign } from 'storybook-addon-designs';

const meta: Meta<typeof PatternCTASet> = {
    title: 'mmds/Patterns/CTASets',
    tags: ['autodocs'],
    component: PatternCTASet,
    decorators: [withDesign],
};

export default meta;
type Story = StoryObj<typeof PatternCTASet>;

const fullCTASet: CTASet = [
    {
        label: 'Woman',
        hrefLink: '/',
        icon: null,
    },
    {
        label: 'Man',
        hrefLink: '/',
        icon: null,
    },
    {
        label: 'Discover',
        hrefLink: '/',
        icon: 'discover',
        variant: 'base',
    },
];

export const CTA_Triple: Story = {
    args: {
        set: fullCTASet,
    },
};

export const CTA_Double: Story = {
    args: {
        set: fullCTASet.slice(0, 2),
    },
};

export const CTA_Single: Story = {
    args: {
        set: fullCTASet.slice(0, 1),
    },
};
