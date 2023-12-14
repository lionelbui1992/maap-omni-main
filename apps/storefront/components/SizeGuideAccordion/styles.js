import css, { global } from 'styled-jsx/css';
import { breakpointMedium } from '../../config/styles/breakpoints';

export const globalStyles = global`
    .size_guide_accordion .accordion_panel {
        border-top: 1px solid rgb(100, 100, 100);
    }
    .size_guide_accordion .accordion_panel .accordion_panel__label {
        border-bottom: 0 solid rgb(100, 100, 100);
    }
    .accordion_panel[aria-expanded='true'] .accordion_panel__label {
        border-bottom: 1px solid rgb(100, 100, 100);
    }
`;

export const styles = css`
    .size_guide_accordion {
        display: flex;
        flex: 1;
        flex-direction: column;
    }
    .size_guide_accordion__wrapper {
        border-bottom: 1px solid rgb(100, 100, 100);
    }
    .size_guide__metric {
        display: none;
    }
    .size_guide_accordion__content_wrapper {
        border-top: 1px solid rgb(100, 100, 100);
        padding-bottom: 80px;
    }
    .size_guide_accordion__description {
        font-style: italic;
    }
    .size-guide-none {
        padding-top: 1rem;
    }
    table {
        display: flex;
        flex-direction: column;
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
    }
    thead {
        border-bottom: 1px solid rgb(100, 100, 100);
    }
    tbody {
        border-bottom: 1px solid rgb(200, 200, 200);
    }
    th,
    td {
        text-align: center;
        vertical-align: middle;
        width: 14%;
    }
    th:first-child {
        text-align: left;
    }
    td:first-child {
        text-align: left;
    }
    tr {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 10px auto;
    }
    th,
    .row_title {
        font-weight: 500;
    }
    @media (max-width: ${breakpointMedium}) {
        th,
        td {
            width: 20%;
        }
        th:first-child {
            width: 20%;
        }
        td:first-child {
            width: 20%;
        }
    }
`;
