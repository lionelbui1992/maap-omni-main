import css from 'styled-jsx/css';
import { breakpointMedium } from 'config/styles/breakpoints';

export const styles = css`
    .sideCart_lineItem {
        list-style: none;
        padding: 0;
    }

    .sideCart_lineItem li {
        display: flex;
        width: 100%;
        padding-bottom: 8px;
    }

    .sideCart_lineItem li .sideCart_lineItem__image {
        margin-right: 15px;
    }

    .sideCart_lineItem li .sideCart_lineItem__image img {
        display: inline-block;
        width: 100px;
        padding-bottom: 0;
    }

    .sideCart_lineItem li .sideCart_lineItem__qtyAndPrice {
        display: flex;
    }

    .sideCart_lineItem li .sideCart_lineItem__qtyAndPrice_qty button,
    .sideCart_lineItem li .sideCart_lineItem__qtyAndPrice_qty span {
        padding: 2px 10px;
        border: none;
        background-color: unset;
        display: inline-block;
        font-size: 0.9em;
        cursor: pointer;
        color: rgb(0, 0, 0);
    }

    .sideCart_lineItem li .sideCart_lineItem__qtyAndPrice_qty button:disabled,
    .sideCart_lineItem li .sideCart_lineItem__qtyAndPrice_qty span:disabled {
        color: rgb(0, 0, 0);
        border-left: 0;
        border-right: 0;
    }

    .sideCart_lineItem li .sideCart_lineItem__qtyAndPrice_qty button,
    .sideCart_lineItem li .sideCart_lineItem__qtyAndPrice_qty span:first-child {
        padding-left: 0;
    }

    .sideCart_lineItem li .sideCart_lineItem__qtyAndPrice_price {
        display: flex;
        font-size: 12px;
        margin-left: auto;
        padding-top: 2px;
    }

    .sideCart_lineItem li .sideCart_lineItem__content {
        display: flex;
        flex-direction: column;
        width: 100%;
        font-size: 0.8em;
        color: rgb(0, 0, 0);
    }

    .sideCart_lineItem li .sideCart_lineItem__content span {
        padding-bottom: 2px;
    }

    .sideCart_lineItem li .sideCart_lineItem__content a {
        color: rgb(0, 0, 0);
    }

    .sideCart_lineItem
        li
        .sideCart_lineItem__content
        .sideCart_lineItem__colorPriceContainer {
        display: flex;
        justify-content: space-between;
    }

    .sideCart_lineItem
        li
        .sideCart_lineItem__content
        .sideCart_lineItem__nowTag {
        padding-right: 3px;
    }

    .sideCart_lineItem
        li
        .sideCart_lineItem__content
        .sideCart_lineItem__comparePrice {
        text-decoration: line-through;
        font-size: 12px;
        padding-bottom: 2px;
    }

    .sideCart_lineItem
        li
        .sideCart_lineItem__content
        .sideCart_lineItem__productTitle {
        margin: 0;
        padding-top: 3px;
        padding-bottom: 5px;
    }

    .sideCart_lineItem
        li
        .sideCart_lineItem__content
        .sideCart_lineItem__viewProduct {
        color: rgb(0, 0, 0);
        text-decoration: underline;
    }

    .sideCart_lineItem
        li
        .sideCart_lineItem__content
        .sideCart_lineItem__removeProduct {
        text-decoration: underline;
        border: none;
        padding: 5px 0;
        text-align: left;
        background-color: unset;
        font-size: 0.8em;
        font-weight: 300 !important;
        cursor: pointer;
    }

    @media (max-width: ${breakpointMedium}) {
        .sideCart_lineItem li .sideCart_lineItem__qtyAndPrice_qty button,
        .sideCart_lineItem li .sideCart_lineItem__qtyAndPrice_qty button span {
            font-size: 1em !important;
        }

        .sideCart_lineItem li .sideCart_lineItem__content {
            font-size: 1em !important;
        }

        .sideCart_lineItem
            li
            .sideCart_lineItem__content
            .sideCart_lineItem__removeProduct {
            font-size: 1em !important;
        }
    }
`;
