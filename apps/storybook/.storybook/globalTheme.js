import { create } from '@storybook/theming/create';

export default create({
    base: 'light',
    colorPrimary: '#C7C7C7',
    colorSecondary: 'rgb(201, 201, 201)',

    appBg: 'rgb(245, 245, 245)',
    appContentBg: 'rgb(245, 245, 245)',
    appBorderColor: 'rgb(201, 201, 201)',
    appBorderRadius: 4,

    // Typography
    fontBase:
        'TWK Everett, TWK Everett Mono, Rhymes Display Trial, Times Now, acumin-pro, MonumentExtended-Black, MonumentExtended-Regular, Roboto, sans-serif',
    fontCode: 'monospace',

    // Text colors
    textColor: 'rgb(66, 66, 66)',
    textInverseColor: 'rgb(246, 245, 244)',

    // Toolbar default and active colors
    barTextColor: 'rgb(66, 66, 66)',
    barSelectedColor: 'rgb(243, 243, 243)',
    barBg: 'rgb(250, 250, 250)',

    // Form colors
    inputBg: 'white',
    inputBorder: 'silver',
    inputTextColor: 'black',
    inputBorderRadius: 3,

    brandTitle: 'MAAP Modular Design System Storybook',
    brandUrl: 'https://maap.cc/',
    brandImage: 'https://maap.cc/_next/static/media/brandLogo.6f652e57.svg',
    brandTarget: '_blank',
});
