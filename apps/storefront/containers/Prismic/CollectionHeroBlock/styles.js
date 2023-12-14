import css from 'styled-jsx/css';
import { breakpointMedium } from 'config/styles/breakpoints';

export default css`
    .collection_hero {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100px;
    }
    .collection_hero .flex {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    .collection_hero .outer_container--no_cap {
        max-width: 100% !important;
    }
    .collection_hero .outer_container {
        width: 100%;
        max-width: 1276px;
        position: relative;
        margin: 0 auto;
    }
    .collection_hero .outer_container.Center {
        align-items: center;
    }
    .collection_hero .outer_container.Left {
        align-items: flex-start;
    }
    .collection_hero .outer_container.Right {
        align-items: flex-end;
    }
    .collection_hero.Yes .outer_container {
        max-width: 100%;
    }
    .collection_hero .advanced_hero_image {
        max-width: 100%;
        display: block;
    }
    .collection_hero .inner_text_container {
        max-width: 520px;
    }
    .collection_hero .contentWrapper {
        padding: 35px;
    }
    .collection_hero .text_container {
        display: flex;
        justify-content: center;
        text-align: center;
        position: absolute;
        z-index: 2;
    }
    .collection_hero .text_container.Left {
        padding-left: 10%;
    }
    .collection_hero .text_container.Right {
        padding-right: 10%;
    }
    .collection_hero .text_container.Center {
        align-items: center;
    }
    @media all and (max-width: ${breakpointMedium}) {
        .collection_hero .text_container {
            width: 100%;
        }

        .collection_hero .intro_text,
        .feature_text,
        .sub_text {
            width: 100%;
            max-width: 100%;
        }
    }
    .collection_hero .intro_text {
        text-transform: uppercase;
        margin: 0 0 15px;
        font-size: 20px;
    }
    .collection_hero .feature_text {
        font-size: 44px;
        margin: 0;
        margin: 0 0 15px;
    }

    .collection_hero .sub_text {
        font-size: 16px;
        margin: 10px 0 25px 0;
    }

    .collection_hero .collection_hero__buttons {
        display: flex;
        justify-content: center;
        text-align: center;
        flex-wrap: wrap;
    }
    .collection_hero .collection_hero__buttons--left {
        max-width: 520px;
    }
    .collection_hero .collection_hero__buttons--right {
        max-width: 520px;
    }
    .collection_hero .collection_hero__button {
        font-size: 14px;
        min-width: 170px;
        border: 1px solid transparent;
        padding: 8px 10px;
        width: auto;
        margin: 10px;
        line-height: 1.42;
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
        .collection_hero .intro_text {
            display: none;
        }
        .collection_hero .inner_text_container {
            max-width: 620px;
        }
        .collection_hero .collection_hero__buttons--left {
            max-width: 500px;
        }
        .collection_hero .collection_hero__buttons--right {
            max-width: 500px;
        }
    }
    @media all and (max-width: ${breakpointMedium}) {
        .collection_hero .outer_container {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .collection_hero .outer_container.Center {
            align-items: center;
        }
        .collection_hero .outer_container.Left {
            align-items: center;
        }
        .collection_hero .outer_container.Right {
            align-items: center;
        }
        .collection_hero .text_container {
            max-width: 100%;
        }
        .collection_hero .text_container.Left {
            padding-left: 0;
        }
        .collection_hero .text_container.Right {
            padding-right: 0;
        }
        .collection_hero .inner_text_container {
            max-width: 100%;
        }
        .collection_hero .collection_hero__buttons {
            max-width: 100%;
        }
    }
`;
