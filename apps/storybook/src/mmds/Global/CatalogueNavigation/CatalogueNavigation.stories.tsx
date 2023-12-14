import type { Meta, StoryObj } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { CatalogueNav } from 'storefront/app/components/catalogue-nav';
import ContentStructureMock from 'storefront/app/lib/content-structure/mock';
import { CatalogueNavCallbacks } from 'storefront/app/components/catalogue-nav/CatalogueNav';
import { ContentStructureGender } from 'storefront/app/lib/content-structure';
import { collectionCountResolver } from '../../../lib/collection-count-resolver';

const meta: Meta<typeof CatalogueNav> = {
    title: 'mmds/Global/Catalogue Navigation',
    tags: ['autodocs'],
    component: CatalogueNav,
    decorators: [withDesign],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof CatalogueNav>;

const callbacks: CatalogueNavCallbacks = {
    onClose: () => alert('Toggled Close'),
};

export const Default: Story = {
    args: {
        collectionCountResolver,
        callbacks,
        contentStructure: ContentStructureMock,
    },
};

export const Tier1_Active: Story = {
    args: {
        collectionCountResolver,
        callbacks,
        contentStructure: ContentStructureMock,
        activeItem: {
            label: 'Man',
            gender: ContentStructureGender.MAN,
        },
    },
};

export const Tier2_Active: Story = {
    args: {
        collectionCountResolver,
        callbacks,
        contentStructure: ContentStructureMock,
        activeItem: {
            label: 'Socks',
            hrefLink: '/collections/socks',
            gender: ContentStructureGender.UNISEX,
        },
    },
};

export const Tier3_Active: Story = {
    args: {
        collectionCountResolver,
        callbacks,
        contentStructure: ContentStructureMock,
        activeItem: {
            label: 'Alt_Road',
            hrefLink: '/collections/alt-road-collection',
            gender: ContentStructureGender.MAN,
        },
    },
};
