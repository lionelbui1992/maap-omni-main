import css from 'styled-jsx/css';
import { breakpointLarge } from 'config/styles/breakpoints';

export const globalStyles = css.global`
    .category_navigation__top {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        list-style-type: none;
        margin: 0px;
    }

    .category_navigation__top > li:hover .category_navigation_container {
        display: flex;
    }

    .category_navigation__top > li:hover > a {
        border-bottom: 1px solid black;
    }

    .category_navigation__top > li > a {
        margin: 22px;
    }

    .category_navigation__top .category_navigation_container {
        display: none;
        position: absolute;
        background-color: #dbdbdb;
        left: 0;
        right: 0;
        z-index: 3;
        -webkit-box-shadow: 0px 5px 6px 0px rgba(0, 0, 0, 0.13);
        -moz-box-shadow: 0px 5px 6px 0px rgba(0, 0, 0, 0.13);
        box-shadow: 0px 5px 6px 0px rgba(0, 0, 0, 0.13);
    }

    .category_navigation__top .category_navigation_container li {
        padding: 3px 7px;
        margin-right: 20px;
    }

    .category_navigation__top
        .category_navigation_container
        .category_navigation_list {
        flex: 3;
        display: flex;
        background-color: #f1f1f1;
        padding: 27px 0 27px 54px;
    }

    .category_navigation__top
        .category_navigation_container
        .category_navigation_list
        .column {
        flex: 1;
    }

    .category_navigation__top
        .category_navigation_container
        .category_navigation_list
        .double-column {
        flex: 2;
    }

    .category_navigation__top
        .category_navigation_container
        .category_navigation_list
        .double-column
        ul {
        display: grid;
        grid-auto-flow: column;
        grid-template-rows: repeat(15, auto);
    }

    .category_navigation__top
        .category_navigation_container
        .category_navigation_list
        li:hover {
        background-color: #dbdbdb;
    }

    .category_navigation__top
        .category_navigation_container
        .category_navigation_grid {
        flex: 2;
        display: flex;
        flex-wrap: wrap;
        padding: 27px 0 27px 20px;
    }

    .category_navigation__top
        .category_navigation_container
        .category_navigation_grid
        .column {
        width: 50%;
    }

    .category_navigation__top
        .category_navigation_container
        .category_navigation_grid
        li:hover {
        background-color: #f1f1f1;
    }

    .category_navigation__top
        .category_navigation_container
        .category_navigation_images {
        flex: 3;
        display: flex;
        padding: 27px 54px 27px 0;
        justify-content: flex-end;
    }

    .category_navigation__top
        .category_navigation_container
        .category_navigation_images
        > :first-child {
        margin-left: 0 !important;
    }

    .category_navigation__top
        .category_navigation_container
        .category_navigation_images
        .column {
        margin-left: 10px;
    }

    .category_navigation__top .category_navigation_container a {
        cursor: pointer;
        margin-right: 0 !important;
    }

    .category_navigation__top .category_navigation_container img {
        max-width: 100%;
    }

    .category_navigation a {
        text-decoration: none;
        color: rgb(0, 0, 0);
        display: block;
        margin-left: 0 !important;
        margin-right: 44px !important;
    }

    .category_navigation li {
        list-style: none;
    }

    .category_navigation ul {
        padding: 0;
    }

    .category_navigation h3 {
        font-weight: 300;
        font-size: 1em;
    }

    @media (max-width: ${breakpointLarge}) {
        .category_navigation a {
            margin-right: 20px !important;
        }
    }
`;
