import type { Meta, StoryObj } from '@storybook/react';
import { PatternLanguageIntro } from 'mmds';
import { withDesign } from 'storybook-addon-designs';

const meta: Meta<typeof PatternLanguageIntro> = {
    title: 'mmds/Patterns/LanguageIntro',
    tags: ['autodocs'],
    component: PatternLanguageIntro,
    decorators: [withDesign],
};

export default meta;
type Story = StoryObj<typeof PatternLanguageIntro>;

export const Language_Intro: Story = {
    args: {
        context: 'High-performance cycling apparel.',
        sub_count: '414 products',
        content:
            'Explore our range of high-performance jerseys, bib shorts, vests, jackets and accessories designed for the new breed of riders, who are redefining the sport of cycling while never looking back. Engineered to elevate the ride, we master the balance between aesthetic and technical detail to enhance performance.',
    },
    parameters: {
        layout: 'fullscreen',
    },
};
