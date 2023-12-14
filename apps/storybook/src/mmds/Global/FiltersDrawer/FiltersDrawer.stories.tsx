import type { Meta, StoryObj } from '@storybook/react';
import FiltersDrawer from 'storefront/app/[country]/ncollections/filters/FiltersDrawer';
import { withDesign } from 'storybook-addon-designs';

const meta: Meta<typeof FiltersDrawer> = {
    title: 'mmds/Global/Filters Drawer',
    tags: ['autodocs'],
    component: FiltersDrawer,
    decorators: [withDesign],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof FiltersDrawer>;

export const Default: Story = {};

export const Active: Story = {
    args: {
        selectedFilters: ['M', 'Black'],
    },
};
