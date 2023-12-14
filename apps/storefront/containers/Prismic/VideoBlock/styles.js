import css from 'styled-jsx/css';
import { breakpointSmall, breakpointMedium } from 'config/styles/breakpoints';

export const styles = css.global`
    .video {
        display: flex;
        margin: 0 auto;
        justify-content: center;
        min-height: 100px;
        height: calc(100vw * 10 / 20);
        position: relative;
        overflow: hidden;
    }
    .video .container {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        box-sizing: border-box;
    }
    .video .container .content .intro_text_container p {
        margin: 0;
    }
    .video .container .content .content_title_container {
        line-height: 1em;
    }
    .video .container .content .content_title_container p {
        margin: 0;
    }
    @media (max-width: ${breakpointSmall}) {
        .video {
            height: calc(100vw * 18 / 18);
        }
    }
    @media (max-width: ${breakpointMedium}) {
        .video {
            height: calc(100vw * 18 / 18);
        }
    }
`;
