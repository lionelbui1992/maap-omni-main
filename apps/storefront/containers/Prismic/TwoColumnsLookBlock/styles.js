import css from 'styled-jsx/css';
import { breakpointSmall } from 'config/styles/breakpoints';

export const styles = css.global`
    .two_columns_look_block {
        display: flex;
        justify-content: center;
        min-height: 100px;
    }
    .two_columns_look_block .container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: row-reverse;
    }
    .two_columns_look_block .column {
        width: 45%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .two_columns_look_block .column img {
        width: 100%;
    }
    .two_columns_look_block .column .content {
        display: flex;
        text-align: left;
        flex-direction: column;
        width: 85%;
        padding: 15px 0;
    }
    .two_columns_look_block .column .content .content_container {
        margin: 15px 0;
    }
    .two_columns_look_block .column .content .text_container_button {
        cursor: pointer;
        padding: 0;
        padding: 0 20px;
        background-color: black;
        color: white;
        text-align: center;
        display: block;
    }
    .two_columns_look_block .right_column {
        width: 37%;
    }
    .two_columns_look_block .left_column {
        width: 57%;
    }
    @media all and (max-width: ${breakpointSmall}) {
        .two_columns_look_block .container {
            display: block;
        }
        .two_columns_look_block .container .content {
            margin: 0px auto;
        }
        .two_columns_look_block .container .column {
            width: 100% !important;
        }
        .two_columns_look_block .container .column .content {
            width: 85%;
            text-align: center !important;
            align-items: center !important;
        }
    }
`;
