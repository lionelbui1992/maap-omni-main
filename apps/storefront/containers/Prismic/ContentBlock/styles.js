import css from 'styled-jsx/css';
import { breakpointMedium } from 'config/styles/breakpoints';

export default css`
    .content_block {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100px;
    }
    .content_block .flex {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    .content_block .outer_container--no_cap {
        max-width: 100% !important;
    }
    .content_block .outer_container {
        width: 100%;
        max-width: 1276px;
        position: relative;
        margin: 0 auto;
    }
    .content_block .outer_container.Center {
        align-items: center;
    }
    .content_block .outer_container.Left {
        align-items: flex-start;
    }
    .content_block .outer_container.Right {
        align-items: flex-end;
    }
    .content_block.Yes .outer_container {
        max-width: 100%;
    }
    .content_block .advanced_hero_image {
        width: 100%;
        display: block;
    }
    .content_block .contentWrapper {
        padding: 40px;
    }
    .content_block .text_container {
        display: flex;
        justify-content: center;
        text-align: center;
        position: absolute;
        z-index: 2;
    }
    .content_block .text_container.Left {
        padding-left: 10%;
    }
    .content_block .text_container.Right {
        padding-right: 10%;
    }
    .content_block .text_container.Center {
        align-items: center;
    }
    @media all and (max-width: ${breakpointMedium}) {
        .content_block .text_container {
            width: 100%;
        }
        .content_block .text_container .intro_text,
        .feature_text,
        .sub_text {
            width: 100%;
            max-width: 100%;
        }
    }
    .content_block .intro_text {
        text-transform: uppercase;
        margin: 0 0 15px;
        font-size: 20px;
    }
    .content_block .feature_text {
        font-size: 44px;
        margin: 0;
        margin: 0 0 15px;
    }
    .content_block .sub_text {
        font-size: 16px;
        margin: 10px 0 25px 0;
    }
    .content_block .advanced_hero_block__buttons {
        display: flex;
        justify-content: center;
        text-align: center;
        flex-wrap: wrap;
    }
    .content_block .advanced_hero_block__buttons--left {
        max-width: 520px;
    }
    .content_block .advanced_hero_block__buttons--right {
        max-width: 520px;
    }
    .content_block .advanced_hero_block__button {
        font-size: 14px;
        min-width: 170px;
        border: 1px solid transparent;
        padding: 15px 60px;
        width: auto;
        margin: 10px;
        line-height: 1.5;
        text-decoration: none;
        text-align: center;
        white-space: nowrap;
        cursor: pointer;
        border-radius: 0;
        font-weight: 300;
        vertical-align: middle;
        position: relative;
        z-index: 1;
        transition: border-color 0.4s, color 0.4s;
    }
    @media all and (max-width: 1024px) {
        .advanced_hero_block .inner_text_container {
            max-width: 620px;
        }
        .advanced_hero_block .advanced_hero_block__buttons--left {
            max-width: 500px;
        }
        .advanced_hero_block .advanced_hero_block__buttons--right {
            max-width: 500px;
        }
    }
    @media all and (max-width: ${breakpointMedium}) {
        .advanced_hero_block .outer_container {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .advanced_hero_block .outer_container.Center {
            align-items: center;
        }
        .advanced_hero_block .outer_container.Left {
            align-items: center;
        }
        .advanced_hero_block .outer_container.Right {
            align-items: center;
        }
        .advanced_hero_block .text_container {
            max-width: 100%;
        }
        .advanced_hero_block .text_container.Left {
            padding-left: 0;
        }
        .advanced_hero_block .text_container.Right {
            padding-right: 0;
        }
        .advanced_hero_block .inner_text_container {
            max-width: 100%;
        }
        .advanced_hero_block .advanced_hero_block__buttons {
            max-width: 100%;
        }
    }
`;
