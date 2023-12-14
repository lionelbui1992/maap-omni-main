import type { Meta, StoryObj } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { Accordion, AccordionItem, Button, PatternPillCluster } from 'mmds';
import { mock } from '../Patterns/PillCluster/mock';

const meta: Meta<typeof Accordion> = {
    title: 'mmds/Components/Accordion',
    tags: ['autodocs'],
    component: Accordion,
    decorators: [withDesign],
    argTypes: {
        items: {
            controls: { type: 'object' },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const items: AccordionItem[] = [
    {
        header: 'What is the MAAP X MAAP Collaboration?',
        content:
            "At MAAP, we're performance driven. Gear that elevates the ride is our obsession. We work with hand selected athletes, teams and events across the globe to design, refine and test the most technically advanced apparel available, for the most ambitious cyclists.",
    },
    {
        header: 'How do I complete a return with credit?',
        content:
            'Under our Free Returns policy we offer returns for all full price garments as per the following options:\n' +
            '\n' +
            'Refund to the original payment method.  \n' +
            'Exchange for an alternative product.  \n' +
            '‘Shop Now’ credit to the value of the original item, to be used against a new purchase. \n' +
            'MAAP Credit to be used online only, to the value of the returned item if you purchased the item on sale.',
    },
    {
        header: 'Collection',
        content: <PatternPillCluster cluster={mock} />,
    },
];

export const Default: Story = {
    args: {
        items,
    },
};
