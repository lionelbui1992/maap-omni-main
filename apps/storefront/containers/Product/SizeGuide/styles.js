import css from 'styled-jsx/css';

export const globalStyles = css.global`
    .size_guide_modal {
        min-width: 360px;
        width: 100%;
        background-color: rgba(277, 277, 277, 0.05);
        overflow: scroll;
    }

    .size_guide_modal__overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(238, 238, 238, 0.72);
        display: flex;
        justify-content: center;
        z-index: 6;
    }
`;

export const desktopContentStyles = css`
    .size_guide__title_measurement {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
    }
    .size_guide__title {
        font-size: 1.6em;
        font-weight: 300;
    }
    .size_guide__description {
        font-size: 0.9em;
        font-weight: 300;
    }
    .metric_cm {
        padding: 0 10px 0 0;
    }
    .size_guide__metric {
        cursor: pointer;
    }
`;

export const mobileContentStyles = css`
    .size_guide__title {
        font-size: 1.6em;
        font-weight: 300;
        padding-bottom: 8px;
    }
    .size_guide__description {
        font-size: 0.9em;
        font-weight: 300;
        padding-bottom: 15px;
    }
    .measurement_title {
        font-size: 0.9em;
        font-weight: 400;
    }
    .measurement_description {
        font-size: 0.9em;
        font-weight: 300;
    }
`;
