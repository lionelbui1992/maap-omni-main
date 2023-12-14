import css from 'styled-jsx/css';

export const globalStyles = css.global`
    .mobile_navigation__single_item {
        padding: 15px 30px 10px 30px;
        background-color: #dbdbdb;
        border: 1px solid #dbdbdb;
        font-size: 20px;
    }

    .mobile_navigation__single_item a {
        text-decoration: none;
        color: black;
    }

    .mobile_navigation__link {
        text-decoration: none;
        cursor: pointer;
        color: rgb(68, 68, 68);
    }

    .mobile_navigation__context_switcher {
        border: none;
        margin-top: 30px;
    }

    .mobile_navigation__context_switcher {
        display: flex;
        padding-left: 10px;
    }

    .mobile_navigation__tier_two_item {
        padding: 10px 20px;
        margin: 0 35px;
    }

    .mobile_navigation__tier_two_item a {
        text-decoration: none;
        color: black;
    }

    .mobile_navigation__second_level_title {
        padding: 18px;
        margin: 0;
    }

    .mobile_navigation__accordion .accordion__button:before {
        display: none;
    }

    .mobile_navigation__accordion .accordion__button {
        padding: 0;
    }

    .mobile_navigation__accordion .accordion__button:hover {
        background-color: transparent;
    }

    .mobile_navigation__accordion .accordion__panel {
        padding: 0;
    }

    .mobile_navigation__heading {
        padding: 15px 30px 10px 30px;
    }

    .accordion__button span a {
        text-decoration: none;
        color: black;
    }

    .mobile_navigation__accordion * {
        outline: none;
    }

    .accordion__item + .accordion__item {
        border-collapse: collapse;
    }

    .mobile_navigation__accordion_list {
        background-color: #f1f1f1;
    }

    .mobile_navigation__accordion_list:first-child {
        padding-top: 10px;
    }

    .mobile_navigation__accordion_list:nth-child(3) {
        padding-bottom: 10px;
    }

    .mobile_navigation__accordion_grid {
        background-color: #e7e7e7;
    }

    .mobile_navigation__accordion_grid:nth-child(4) {
        padding-top: 10px;
    }

    .mobile_navigation__accordion_grid:nth-child(6) {
        padding-bottom: 10px;
    }

    .mobile_navigation__accordion_assistance {
        background-color: #dbdbdb;
        border: 1px solid #dbdbdb;
    }

    .mobile_navigation__accordion_assistance:nth-child(7) {
        padding-top: 10px;
    }

    .mobile_navigation__accordion_assistance:nth-child(9) {
        padding-bottom: 10px;
    }

    .accordion__button {
        display: flex;
        align-items: center;
        background: transparent;
        cursor: pointer;
        text-align: left;
        border: none;
        font-size: 19px;
    }

    .accordion__button:after {
        display: inline-block;
        position: absolute;
        right: 0;
        content: '';
        height: 13px;
        width: 13px;
        margin-right: 35px;
        border-bottom: 1px solid #000;
        border-right: 1px solid #000;
        transform: rotate(45deg);
    }

    .accordion__button[aria-expanded='true']::after,
    .accordion__button[aria-selected='true']::after {
        transform: rotate(-135deg);
    }

    .accordion__panel {
        animation: fadein 0.35s ease-in;
        background: transparent;
        font-size: 20px;
    }

    .react-tabs__tab-list {
        display: flex !important;
        align-items: stretch !important;
        border: none !important;
        margin-bottom: 0;
        margin-top: 0;
    }

    .react-tabs__tab {
        flex: 1 !important;
        border-top: none !important;
        border-right: none !important;
        border-left: none !important;
        text-align: center;
        padding: 10px 5px;
        background-color: white;
        font-size: 19px;
    }

    .react-tabs__tab--selected {
        background-color: #f1f1f1;
    }

    .react-tabs__tab-list {
        padding: 0;
    }

    .react-tabs__tab {
        list-style: none;
    }

    .react-tabs__tab:focus {
        outline: none;
    }

    .mobile_navigation_info_icon {
        margin-right: 8px;
        width: 18px;
    }

    .mobile-navigation__context-switcher {
        // position: fixed;
        bottom: 0;
        padding: 16px 20px;
        background-color: white;
        width: 100%;
    }
`;
