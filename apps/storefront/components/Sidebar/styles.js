import css from 'styled-jsx/css';
import { breakpointMedium } from 'config/styles/breakpoints';

export const styles = css`
    @-webkit-keyframes fadeInRight {
        0% {
            opacity: 0;
            -webkit-transform: translateX(200px);
            transform: translateX(20px);
        }
        100% {
            opacity: 1;
            -webkit-transform: translateX(0);
            transform: translateX(0);
        }
    }

    @keyframes fadeInRight {
        0% {
            width: 0;
            -webkit-transform: translateX(20px);
            -ms-transform: translateX(20px);
            transform: translateX(20px);
        }
        100% {
            width: 380px;
            -webkit-transform: translateX(0);
            -ms-transform: translateX(0);
            transform: translateX(0);
        }
    }

    .sidebar {
        // display: none;
    }

    .sidebar--active {
        display: flex;
    }

    .sidebar::-webkit-scrollbar {
        display: none;
    }

    .sidebar {
        position: fixed;
        width: 380px;
        right: 0;
        height: calc(100% - 65px);
        background: rgb(255, 255, 255);
        outline: none;
        overflow-y: scroll;
        z-index: 999999;

        flex-direction: column;
        transform: translate(200%, 0);
        animation-delay: 0s;
        animation-play-state: running;
        animation-iteration-count: 1;
        animation-duration: 800ms;
        animation-name: drawerhide;
        opacity: 1;
    }

    .sidebar--noAnimation {
        position: fixed;
        width: 380px;
        right: 0;
        height: calc(100% - 65px);
        background: rgb(255, 255, 255);
        outline: none;
        overflow-y: scroll;
        z-index: 999999;
        flex-direction: column;
        opacity: 1;
    }

    @keyframes drawerhide {
        from {
            transform: translate(0%, 0);
        }
        to {
            transform: translate(200%, 0);
        }
    }

    .sidebar_content {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: stretch;
    }

    .sidebar-mobile-header {
        display: none;
    }

    .sidebar--active {
        display: flex;
        transform: translate(0%, 0);
        animation-delay: 0s; /* instead of 1 sec */
        animation-play-state: running;
        animation-iteration-count: 1;
        animation-duration: 800ms;
        animation-name: drawershow;
        opacity: 1;
    }

    @keyframes drawershow {
        from {
            transform: translate(200%, 0);
        }
        to {
            transform: translate(0%, 0);
        }
    }

    @supports (-moz-appearance: none) {
        .sidebar {
            width: 395px;
        }
    }

    .sidebar header {
        min-width: 100%;
    }

    .sidebar--hovered {
        display: initial;
    }

    .sidebar .content-container::-webkit-scrollbar {
        display: none;
    }

    .sidebar__close_icon {
        margin-right: 15px;
        margin-top: 4px;
        width: 20px;
        height: 20px;
        cursor: pointer;
    }

    .sidebar main {
        display: block;
        margin: 20px 0;
        min-width: 320px;
    }

    .sidebar-mobile-header__close-icon {
        position: absolute;
        padding: 22px 22px;
        top: 3px;
        right: 0;
        left: 0;
        width: 17px;
        height: 17px;
    }

    @media screen and (max-width: ${breakpointMedium}) {
        .sidebar {
            position: fixed;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            animation-duration: 0s;
            animation-name: unset;
        }

        @supports (-moz-appearance: none) {
            .sidebar {
                width: 100%;
            }
        }

        .sidebar__close_icon {
            margin-left: 45%;
        }

        .sidebar header {
            min-width: 100%;
        }

        .sidebar-mobile-header {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 65px;
            height: 65px;
            z-index: 2;
            //padding-right: 14px; // Simulate scroll bar width
        }

        .sidebar-mobile-header__brand_link {
            display: flex;
        }

        .sidebar-mobile-header__brand_logo {
            height: 65px;
            width: 90px;
            cursor: pointer;
        }
    }
`;
