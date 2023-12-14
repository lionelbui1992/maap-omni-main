import type { Meta, StoryObj } from '@storybook/react';
import { PatternTitleSubtitle } from 'mmds';
import { withDesign } from 'storybook-addon-designs';

const meta: Meta<typeof PatternTitleSubtitle> = {
    title: 'mmds/Patterns/Title Subtitle',
    tags: ['autodocs'],
    component: PatternTitleSubtitle,
    decorators: [withDesign],
    argTypes: {
        titleSize: {
            name: 'Select Title Size',
            options: ['small', 'medium', 'large'],
            control: { type: 'select' },
            defaultValue: 'large',
        },
        subTitleSize: {
            name: 'Select Sub Title Size',
            options: ['small', 'medium', 'large'],
            control: { type: 'select' },
            defaultValue: 'large',
        },
        titleIcon: {
            name: 'Select Title Icon',
            options: ['globe', 'discover', 'northeast', 'right', 'left'],
            control: { type: 'select' },
        },
    },
};
export default meta;
type Story = StoryObj<typeof PatternTitleSubtitle>;

export const Title_Subtitle: Story = {
    args: {
        title: 'New Season Road',
        subTitle: 'Blur the lines with a spectrum of new Pro Hex jerseys.',
        titleSize: 'large',
        subTitleSize: 'large',
        titleIcon: null,
    },
};
