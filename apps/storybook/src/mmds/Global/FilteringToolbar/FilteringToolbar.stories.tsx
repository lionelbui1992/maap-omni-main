import type { Meta, StoryObj } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import FilteringToolbar from 'storefront/app/[country]/ncollections/filtering-toolbar/FilteringToolbar';

const meta: Meta<typeof FilteringToolbar> = {
    title: 'mmds/Global/Filtering Toolbar',
    tags: ['autodocs'],
    component: FilteringToolbar,
    decorators: [withDesign],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof FilteringToolbar>;

export const Default: Story = {
    args: {
        currentView: 'count',
        productCount: 256,
        initialFilters: [],
        callbacks: {
            openFilteringUI: () => alert('Filtering UI opened'),
            applyFilters: (filters) => console.log('Filters applied', filters),
            selectProductPhotoVariant: (variant) =>
                console.log('Photo variant selected', variant),
            productCountResolver: async (handle, filters) => {
                console.log('Product count resolved for', handle, filters);
                return 256;
            },
        },
    },
};

export const WithActiveFilters: Story = {
    args: {
        ...Default.args,
        currentView: 'activeFilters',
        initialFilters: [
            { value: 'Black' },
            { value: 'Black' },
            { filter: 'Size', value: 'M' },
            { value: 'Blue' },
        ],
    },
};

export const WithWayfinder: Story = {
    args: {
        ...Default.args,
        currentView: 'wayfinder',
    },
};
