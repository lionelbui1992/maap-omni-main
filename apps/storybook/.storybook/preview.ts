import { Preview } from '@storybook/react';

import globalTheme from './globalTheme.js';

import 'storefront/styles/tokens.css';
import 'storefront/styles/global.css';
import 'storefront/styles/typography.css';
import 'storefront/styles/dark.theme.css';
import 'storefront/styles/light.theme.css';
import 'storefront/styles/reset.css';

import { withDesign } from 'storybook-addon-designs';

export const globalTypes = {
    dataThemes: {
        defaultValue: {
            list: [
                { name: 'Light', dataTheme: 'light', color: '#C7C7C7' },
                { name: 'Dark', dataTheme: 'dark', color: '#222222' },
            ],
        },
    },
    dataTheme: {
        defaultValue: 'light',
    },
};

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    themeSwitcher: {
        themes: ['light', 'dark'],
        dataAttribute: 'theme',
    },
    controls: {
        expanded: true,
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    grid: {
        gridOn: true,
        columns: 12,
        gap: '20px',
        gutter: '50px',
        maxWidth: '1024px',
    },
    layout: 'padded',
    docs: {
        globalTheme,
    },
};

export const decorators = [withDesign];

const preview: Preview = {
    parameters: {
        controls: { expanded: true },
        docs: {
            toc: {
                contentsSelector: '.sbdocs-content',
            },
        },
        backgrounds: {
            default: 'figma',
            values: [
                {
                    name: 'figma',
                    value: '#F5F5F5',
                },
                {
                    name: 'dark',
                    value: '#1E1F22',
                },
                {
                    name: 'white',
                    value: '#ffffff',
                },
            ],
        },
    },
};

export default preview;
