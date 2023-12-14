import css from 'styled-jsx/css';
import { breakpointSmall, breakpointMedium } from 'config/styles/breakpoints';

export const styles = css.global`
    .two_columns_multi_row_look_block {
        display: flex;
        justify-content: center;
        min-height: 100px;
        margin: 0 auto;
    }
    .two_columns_multi_row_look_block .container {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .two_columns_multi_row_look_block .column {
        flex: 1;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }
    .two_columns_multi_row_look_block .column p {
        margin: 0;
        line-height: 1.2em;
    }
    .two_columns_multi_row_look_block .column img {
        width: 100%;
    }
    .two_columns_multi_row_look_block .row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .two_columns_multi_row_look_block .tile {
        position: relative;
    }
    .two_columns_multi_row_look_block .tile img {
        width: 100%;
        display: block;
    }
    .two_columns_multi_row_look_block .tile .content_container {
        width: 100%;
        padding-top: 40px;
        padding-bottom: 20px;
    }
    .two_columns_multi_row_look_block .tile .content_container p {
        margin: 0;
        line-height: 1.2em;
    }
    .two_columns_multi_row_look_block .tile.over .content {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
    }
    .two_columns_multi_row_look_block .tile:last-child {
        margin-bottom: 0 !important;
    }
    @media (max-width: ${breakpointSmall}) {
        .two_columns_multi_row_look_block .container {
            flex-direction: column;
        }
        .two_columns_multi_row_look_block .container .content {
            text-align: center !important;
        }
        .two_columns_multi_row_look_block .container .content p {
            margin: 0;
            line-height: 1.2em;
        }
        .two_columns_multi_row_look_block
            .container
            .content
            .intro_text_container {
            width: 100%;
        }
        .two_columns_multi_row_look_block
            .container
            .content
            .content_container {
            text-align: center !important;
            padding-top: 30px;
        }
        .two_columns_multi_row_look_block
            .container
            .content
            .content_container
            p {
            margin: 0;
            line-height: 1.2em;
        }
        .two_columns_multi_row_look_block .container .column {
            width: 100% !important;
        }
    }
    @media (max-width: ${breakpointMedium}) {
        .two_columns_multi_row_look_block .container {
            flex-direction: column;
        }
        .two_columns_multi_row_look_block .container .content {
            text-align: center !important;
        }
        .two_columns_multi_row_look_block .container .content p {
            margin: 0;
            line-height: 1.2em;
        }
        .two_columns_multi_row_look_block
            .container
            .content
            .intro_text_container {
            width: 100%;
        }
        .two_columns_multi_row_look_block
            .container
            .content
            .content_container {
            text-align: center !important;
            padding-top: 30px;
        }
        .two_columns_multi_row_look_block
            .container
            .content
            .content_container
            p {
            margin: 0;
            line-height: 1.2em;
        }
    }
`;
