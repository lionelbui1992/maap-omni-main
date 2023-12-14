import type { Meta, StoryObj } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import Wayfinder from 'storefront/app/[country]/ncollections/wayfinder';
import ContentStructureMock from 'storefront/app/lib/content-structure/mock';
import { ContentStructureGender } from 'storefront/app/lib/content-structure';
import { collectionCountResolver } from '../../../lib/collection-count-resolver';

const meta: Meta<typeof Wayfinder> = {
    title: 'mmds/Global/Wayfinder',
    tags: ['autodocs'],
    component: Wayfinder,
    decorators: [withDesign],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof Wayfinder>;

export const Tier2_Active_Man: Story = {
    args: {
        contentStructure: ContentStructureMock,
        activeItem: {
            label: 'Man',
            gender: ContentStructureGender.MAN,
        },
    },
};

export const Tier2_Active_Accessories: Story = {
    args: {
        collectionCountResolver,
        contentStructure: ContentStructureMock,
        activeItem: {
            label: 'Accessories',
            hrefLink: '/collections/cycling-accessories',
            gender: ContentStructureGender.UNISEX,
        },
    },
};

export const Tier3_Active_Features: Story = {
    args: {
        collectionCountResolver,
        contentStructure: ContentStructureMock,
        activeItem: {
            label: 'Features',
            gender: ContentStructureGender.MAN,
        },
    },
};
