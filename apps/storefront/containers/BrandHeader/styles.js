import css from 'styled-jsx/css';
import { breakpointMedium } from 'config/styles/breakpoints';

export const globalStyles = css.global`
    @media screen and (max-width: ${breakpointMedium}) {
        .brand_logo {
            display: flex;
            justify-content: center;
            padding: 15px;
        }

        .mobile_menu .menu_nav__logo {
            height: 65px;
            width: 90px;
        }

        .brand_logo_link {
            display: flex;
        }

        .sticky_mobile_header {
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 2;
        }

        .mobile_menu {
            display: flex;
            flex-direction: row;
            justify-content: center;
            background-color: rgb(255, 255, 255);
            text-align: center;
            height: 65px;
        }

        .mobile_menu__item {
            display: flex;
            flex-wrap: wrap;
            margin: auto;
            flex-direction: column;
            justify-content: center;
        }

        .mobile_menu__image {
            display: flex;
            justify-content: center;
        }

        .mobile_menu__image_inner {
            height: 20px;
            width: 20px;
        }

        .mobile_menu__link {
            text-decoration: none;
            color: rgb(0, 0, 0);
        }

        .mobile_menu__title {
            font-size: 0.875em;
            letter-spacing: 0.1em;
        }

        .desktop_menu {
            display: none;
        }
    }

    @media screen and (min-width: ${breakpointMedium}) {
        .mobile_menu {
            display: none;
        }

        .brand_logo {
            display: none;
        }
    }
`;
