import css from 'styled-jsx/css';

export const bundlerStyles = css.global`
    .bundlerMobileAccordion {
        background-color: #f5f5f5;
    }
    .bundlerMobileAccordionHeading {
        padding: 0 24px;
    }
    .BundlerMobileAccordionBorderBottom {
        border-bottom: 1px solid #d9d9d9;
        margin: 0 24px;
    }
    .bundlerMobileAccordion .accordion__button:hover {
        background-color: transparent;
    }
    .bundlerMobileAccordion .accordion__button:after {
        height: 10px;
        width: 10px;
        right: -6px;
    }
    .bundlerMobileAccordion .accordion__panel {
        padding: 0 !important;
        font-size: 14px;
        line-height: 20px !important;
    }
    .bundlerMobileAccordion .accordion__button:before {
        display: none;
    }
    .bundlerMobileAccordion .accordion__item + .accordion__item {
        border-top: 0;
    }
    .bundlerMobileAccordion .accordion__button {
        width: -webkit-fill-available;
        padding: 16px 0;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: rgb(119, 119, 119);
    }
    .bundlerMobileAccordion .accordion__button[data-selected='true'] {
        color: rgba(34, 34, 34, 1);
    }
`;
