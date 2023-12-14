import css from 'styled-jsx/css';
import { breakpointSmall } from 'config/styles/breakpoints';

export default css`
    .hero_block {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100px;
    }
    .hero_block > a {
        padding-left: 0;
        padding-right: 0;
    }
    .hero_block .flex {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    .hero_block .outer_container {
        width: 100%;
        position: relative;
        margin: 0 auto;
    }
    .hero_block .outer_container.Center {
        align-items: center;
    }
    .hero_block .outer_container.Left {
        align-items: flex-start;
    }
    .hero_block .outer_container.Right {
        align-items: flex-end;
    }
    .hero_block.Yes .outer_container {
        max-width: 100%;
    }
    .hero_block .hero_image {
        max-width: 100%;
        display: block;
    }
    .hero_block .text_container {
        text-align: center;
        position: absolute;
        z-index: 2;
    }
    .hero_block .text_container.Left {
        padding-left: 10%;
    }
    .hero_block .text_container.Right {
        padding-right: 10%;
    }
    .hero_block .text_container.Center {
        align-items: center;
    }
    @media (max-width: ${breakpointSmall}) {
        .hero_block .text_container {
            width: 100%;
            top: 10px;
        }
        .hero_block .text_container .intro_text,
        .feature_text,
        .sub_text {
            width: 100%;
            max-width: 100%;
        }
    }
    .hero_block .intro_text {
        text-transform: uppercase;
        margin: 0 0 15px;
        font-size: 20px;
        max-width: 320px;
    }
    .hero_block .feature_text {
        font-size: 44px;
        margin: 0;
        margin: 0 0 15px;
        max-width: 320px;
    }
    .hero_block .sub_text {
        font-size: 16px;
        margin: 10px 0 25px 0;
    }
    .hero_block .text_container_button {
        cursor: pointer;
        padding: 0;
        width: 200px;
        margin: 0 auto;
        display: block;
    }
    .hero_block .button {
        cursor: pointer;
        padding: 15px 20px;
        width: 200px;
        margin: 0 auto;
        display: block;
    }
    .hero_block .button_text {
        padding: 10px;
        font-size: 20px;
    }
    @media (max-width: ${breakpointSmall}) {
        .hero_block .outer-container {
            display: block;
        }
        .hero_block .outer-container.Center {
            align-items: center;
        }
        .hero_block .outer-container.Left {
            align-items: center;
        }
        .hero_block .outer-container.Right {
            align-items: center;
        }
        .hero_block .text_container.Left {
            padding-left: 0;
        }
        .hero_block .text_container.Right {
            padding-right: 0;
        }
    }
`;
