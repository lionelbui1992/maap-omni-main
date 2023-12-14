import { NavItem } from 'mmds';
import type { Meta, StoryObj } from '@storybook/react';

import { withDesign } from 'storybook-addon-designs';
import { mock as pillClusterMock } from '../Patterns/PillCluster/mock';
import { collectionCountResolver } from '../../lib/collection-count-resolver';

const meta: Meta<typeof NavItem> = {
    title: 'mmds/Components/Nav Item',
    tags: ['autodocs'],
    component: NavItem,
    decorators: [withDesign],
    argTypes: {
        // variant: {
        //   name: "Variant",
        //   options: ["l1", "l2"],
        //   control: { type: "select" },
        // },
        label: {
            name: 'Label',
        },
        hrefLink: {
            name: 'Link URL',
        },
        icon: {
            name: 'Select Button Icon',
            options: ['globe', 'discover', 'northeast', 'down', 'right'],
            control: { type: 'select' },
        },
    },
};

export default meta;
type Story = StoryObj<typeof NavItem>;

const sharedParameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/2bixFu3KY1QySUV8R1fczn/mmds.system?type=design&node-id=1820%3A7298',
    },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Nav_Item_Icon: Story = {
    args: {
        variant: 'l1',
        label: 'All',
        icon: 'northeast',
    },
    parameters: sharedParameters,
};

export const Nav_Item_Count: Story = {
    args: {
        label: 'All',
        countResolver: collectionCountResolver,
        hrefLink: '/collections/all',
    },
    parameters: sharedParameters,
};

export const Nav_Item_Level_Two: Story = {
    args: {
        variant: 'l2',
        label: 'On Bike',
        icon: 'down',
        open: true,
        cluster: pillClusterMock,
    },
    parameters: sharedParameters,
};
