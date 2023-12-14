import type { Meta, StoryObj } from '@storybook/react';
import { CTAInput, PatternPillCluster } from 'mmds';
import { withDesign } from 'storybook-addon-designs';
import { mock } from './mock';

const meta: Meta<typeof PatternPillCluster> = {
    title: 'mmds/Patterns/Pill Cluster',
    tags: ['autodocs'],
    component: PatternPillCluster,
    decorators: [withDesign],
};

const mockWithPinger = mock.map((pill) => ({
    ...pill,
    componentType: 'pinger',
}));

export default meta;
type Story = StoryObj<typeof PatternPillCluster>;

export const Button_Cluster_Set: Story = {
    args: {
        cluster: mock,
    },
};

export const Pinger_Cluster_Set: Story = {
    args: {
        cluster: mockWithPinger,
    },
};
