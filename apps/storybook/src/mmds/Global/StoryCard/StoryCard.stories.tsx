import type { Meta, StoryObj } from '@storybook/react';
import { StoryCard } from 'mmds';
import { withDesign } from 'storybook-addon-designs';

const meta: Meta<typeof StoryCard> = {
    title: 'mmds/Global/Story Card',
    tags: ['autodocs'],
    component: StoryCard,
    decorators: [withDesign],
    argTypes: {
        title: {
            name: 'Title',
            required: false,
        },
    },
};

export default meta;
type Story = StoryObj<typeof StoryCard>;

const sharedParameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/2bixFu3KY1QySUV8R1fczn/mmds.system?node-id=181%3A1219&mode=dev',
    },
};

export const Standard: Story = {
    args: {
        title: 'STORY TITLE GOES HERE.',
        excerpt:
            'Following a two-year hiatus to Adelaide, we returned to celebrate the first event of the UCI...',
        imageSrc:
            'https://cdn.shopify.com/s/files/1/0055/9503/7763/files/StoryCardExample.jpg',
        publishedDate: 'Jan.12.24',
    },
    parameters: sharedParameters,
};
