import type { Meta, StoryObj } from '@storybook/react';
import { PatternLanguageSEO } from 'mmds';
import { withDesign } from 'storybook-addon-designs';

const meta: Meta<typeof PatternLanguageSEO> = {
    title: 'mmds/Patterns/LanguageSEO',
    tags: ['autodocs'],
    component: PatternLanguageSEO,
    decorators: [withDesign],
};

export default meta;
type Story = StoryObj<typeof PatternLanguageSEO>;

export const Language_SEO: Story = {
    args: {
        context: 'Cycling Clothing',
        content:
            'It’s the no-compromise approach for us, whether on the city commute or the tough climbs. It’s conquering it all in high-performance cycling clothing designed for Australia’s most dedicated riders. MAAP gear comes into its own when the elements are against you.',
        link: '/',
    },
    parameters: {
        layout: 'fullscreen',
    },
};
