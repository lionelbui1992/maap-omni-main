import css from 'styled-jsx/css';
import { breakpointLarge, breakpointMedium } from 'config/styles/breakpoints';

export const globalStyles = css.global`
    .styles_closeIcon__1QwbI {
        width: 20px;
        height: 20px;
    }

    .styles_overlay__CLSq- {
        padding: 0;
        background: rgba(0, 0, 0, 0.55);
    }

    .styles_modal__gNwvD {
        width: 60%;
        max-width: 100%;
        height: auto;
        padding: 0;
        background-color: $colour-brand-selected-grey !important;
        z-index: 2;
    }
    .styles_modalCenter__L9F2w {
        margin: auto;
    }
    @media (max-width: ${breakpointLarge}) {
        .styles_modal__gNwvD {
            width: 90%;
        }
        .styles_modalCenter__L9F2w {
            margin: auto;
        }
    }
    @media (max-width: ${breakpointMedium}) {
        styles_modal__gNwvD {
            width: 90%;
        }
        .styles_modalCenter__L9F2w {
            margin: 20px auto;
        }
        .styles_overlay__CLSq- {
            top: 0;
            z-index: 999999;
        }
    }

    .styles_closeButton__20ID4 {
        cursor: pointer;
        top: 25px;
        right: 25px;
    }
`;
