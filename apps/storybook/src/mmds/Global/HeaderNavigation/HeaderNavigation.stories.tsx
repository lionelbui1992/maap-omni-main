import type { Meta, StoryObj } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { withMock } from 'storefront/app/components/header-nav';
import { HeaderNavCallbacks } from 'storefront/app/components/header-nav/types';

const meta: Meta<typeof withMock> = {
    title: 'mmds/Global/Header Navigation',
    tags: ['autodocs'],
    component: withMock,
    decorators: [withDesign],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof withMock>;

const callbacks: HeaderNavCallbacks = {
    toggleSupport: () => alert('Toggled Support'),
    toggleMenu: () => alert('Toggled Menu'),
    toggleSearch: () => alert('Toggled Search'),
    toggleCountrySelector: () => alert('Toggled Country Selector'),
    toggleItem: () => alert('Toggled An Item'),
    toggleCart: () => alert('Toggled Cart'),
    toggleProfile: () => alert('Toggled Profile'),
};

export const Desktop: Story = {
    args: {
        variant: 'desktop',
        activeItem: {
            label: 'Man',
            hrefLink: 'Man',
        },
        callbacks,
    },
};

export const Mobile: Story = {
    args: {
        variant: 'mobile',
        activeItem: {
            label: 'Woman',
            hrefLink: 'Woman',
        },
        callbacks,
    },
};
