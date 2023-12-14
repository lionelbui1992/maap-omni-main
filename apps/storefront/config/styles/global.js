import css from 'styled-jsx/css';
import { breakpointMedium } from 'config/styles/breakpoints';

export default css.global`
    body {
        font-size: 13px;
        font-family: acumin-pro, MonumentExtended-Black,
            MonumentExtended-Regular, Roboto, sans-serif;
        font-weight: 300;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0;
    }

    img {
        display: block;
    }

    @media (min-width: ${breakpointMedium}) {
        .contained_on_desktop {
            margin: 0 auto;
            max-width: 1440px;
            padding-left: 46px;
            padding-right: 46px;
        }
        .hidden_on_desktop {
            display: none !important;
        }
    }
    @media (max-width: ${breakpointMedium}) {
        .hidden_on_mobile {
            display: none !important;
        }
        .contained_on_mobile {
            margin: 0 auto;
            padding-left: 46px;
            padding-right: 46px;
        }
        #launcher {
            margin: 10px 20px 39px 20px !important;
        }
    }
    .contained_on_mobile--test {
        display: none;
    }
    #nprogress {
        pointer-events: none;
    }
    #nprogress .bar {
        background: rgb(0, 0, 0);
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
    }
    #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px #29d, 0 0 5px #29d;
        opacity: 0.5;
        transform: rotate(3deg) translate(0px, -4px);
    }
    .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
    }
    //
    .nprogress-custom-parent #nprogress .spinner,
    .nprogress-custom-parent #nprogress .bar {
        position: absolute;
    }
    .heading_style__secondary {
        font-size: 1.5625em;
    }
    .heading_style__regular {
        font-size: 1.25em;
        font-weight: 200;
        letter-spacing: 0.1em;
    }
    .heading_style__regular_no_bold {
        font-size: 1.25em;
    }
    .heading_style__regular_bold {
        font-size: 1.25em;
        font-weight: bold;
    }
    .heading_style__medium {
        font-size: 0.75em;
        letter-spacing: 0.3em;
    }
    .heading_style__medium_regular {
        font-size: 0.9em;
        letter-spacing: 0.1em;
    }
    .heading_style__medium_regular_bold {
        font-size: 0.9em;
        letter-spacing: 0.3em;
        font-weight: bold;
    }
    .heading_style__normal {
        font-size: 0.6875em;
        font-weight: 400;
    }
    .heading_style_bold {
        font-size: 0.6875em;
        font-weight: bold;
        letter-spacing: 0.2em;
    }
    .heading_style_no_bold {
        font-size: 0.6em;
        letter-spacing: 0.2em;
    }
    .paragraph_style__hero {
        font-size: 1.125em;
    }
    .paragraph_style__hero_bold {
        font-size: 1.125em;
        font-weight: bold;
    }
    .paragraph_style__primary_regular {
        font-size: 1em;
        letter-spacing: 0.1em;
    }
    .paragraph_style__primary_bold {
        font-size: 1em;
        font-weight: bold;
    }
    .paragraph_style__primary_no_bold {
        font-size: 1em;
    }
    .paragraph_style__secondary_regular {
        font-size: 0.875em;
    }
    .paragraph_style__secondary_bold {
        font-size: 0.875em;
        font-weight: bold;
    }
    blockquote {
        font-size: 1em;
    }
    .caption_style {
        font-size: 0.625em;
    }
    .strong {
        font-weight: 600;
    }
    @font-face {
        font-family: 'MonumentExtended-Black';
        src: url('https://cdn.shopify.com/s/files/1/0510/7809/files/MonumentExtended-Black.otf');
        font-display: swap;
    }
    @font-face {
        font-family: 'MonumentExtended-Regular';
        src: url('https://cdn.shopify.com/s/files/1/0510/7809/files/MonumentExtended-Regular.otf');
        font-display: swap;
    }

    .PhoneInput .PhoneInputInput::placeholder {
        color: rgb(12, 35, 64);
        font-size: 13.7px;
        font-family: inherit;
    }
    .PhoneInput .PhoneInputInput {
        border: none;
    }

    .PhoneInput .PhoneInputInput:focus {
        outline: none;
    }

    .challenge_form_declare_label p {
        margin-top: 0px;
    }

    .challenge_form_declare_label a {
        color: inherit;
    }

    .challengeEvent__container img.desktop_only {
        height: 100%;
    }
`;
