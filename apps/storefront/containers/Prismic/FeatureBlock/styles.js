import css from 'styled-jsx/css';
import { breakpointSmall, breakpointMedium } from 'config/styles/breakpoints';

export const styles = css.global`
    .feature_block__image_container {
        padding: 0 15px 10px 10px;
        width: 115px;
        height: 115px;
    }
    @media (max-width: ${breakpointMedium}) {
        .feature_block__image_container {
            padding: 5px 15px 10px 10px;
            width: 60px;
            height: 60px;
        }
    }
    .feature_block {
        display: flex;
        justify-content: center;
        min-height: 100px;
        background-color: rgb(243, 243, 243);
    }
    .feature_block .content .content_container p {
        margin: 0;
        line-height: 1.4em;
    }
    .feature_block .content .buttonsContainer button,
    .feature_block .content .buttonsContainer span {
        padding: 10px 0;
        letter-spacing: 0;
        display: block;
    }
    .feature_block .featureBlock {
        position: relative;
        line-height: 0;
        display: flex;
    }
    @media all and (max-width: ${breakpointMedium}) {
        .feature_block .featureBlock {
            flex: 1 50%;
        }
    }
    @media all and (max-width: ${breakpointSmall}) {
        .feature_block .featureBlock {
            flex: 1 100%;
            padding-top: 10px;
        }
    }
    .feature_block .featureBlock.over .content {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
    }
    .feature_block .featureBlock:last-child {
        margin-bottom: 0 !important;
    }
`;
