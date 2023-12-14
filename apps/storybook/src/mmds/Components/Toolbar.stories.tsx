import Toolbar from 'storefront/app/components/ui/toolbar';
import type { Meta, StoryObj } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

const meta: Meta<typeof Toolbar> = {
    title: 'mmds/Components/Toolbar',
    tags: ['autodocs'],
    component: Toolbar,
    decorators: [withDesign],
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        position: {
            name: 'Toolbar Position',
            options: ['top', 'bottom'],
            control: { type: 'select' },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

const sharedParameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/2bixFu3KY1QySUV8R1fczn/mmds.system?type=design&node-id=2256-17733&mode=dev',
    },
};

export const Default: Story = {
    args: {},
};

export const Top: Story = {
    args: {
        position: 'top',
        shouldStick: true,
    },
    render: ({ position, shouldStick }) => (
        <>
            <div style={{ height: '75vh' }}>
                Scroll to see the toolbar stick to the top.
            </div>
            <Toolbar position={position} shouldStick={shouldStick}>
                <></>
            </Toolbar>
            <div style={{ height: '200vh', paddingTop: '10rem' }}>
                Keep scrolling to see it continue to stick.
            </div>
        </>
    ),
    parameters: sharedParameters,
};

export const Bottom: Story = {
    args: {
        position: 'bottom',
        shouldStick: true,
    },
    render: ({ position, shouldStick }) => (
        <>
            <Toolbar position={position} shouldStick={shouldStick}>
                <></>
            </Toolbar>
            <div style={{ height: '200vh' }}>
                Scroll to see the toolbar stick to the bottom.
            </div>
        </>
    ),
    parameters: sharedParameters,
};
