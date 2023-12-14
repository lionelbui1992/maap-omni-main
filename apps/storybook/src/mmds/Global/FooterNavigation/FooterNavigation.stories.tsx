import type { Meta, StoryObj } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { withMock } from 'storefront/app/components/footer-nav';
import Mock from 'storefront/app/components/footer-nav/mock';

const meta: Meta<typeof withMock> = {
    title: 'mmds/Global/Footer Navigation',
    tags: ['autodocs'],
    component: withMock,
    decorators: [withDesign],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof withMock>;

export const Desktop: Story = {
    args: {
        items: Mock,
        variant: 'desktop',
    },
};

export const Mobile: Story = {
    args: {
        items: Mock,
        variant: 'mobile',
    },
};

export const Responsive: Story = {
    args: {
        items: Mock,
        variant: 'responsive',
    },
};
