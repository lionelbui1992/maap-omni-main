import css from 'styled-jsx/css';

export const styles = css`
    .overlay-sidebar {
        position: absolute;
        top: 0;
        width: 100%;
        height: 2000vh;
        display: none;
        background: rgba(0, 0, 0, 0.55);
        z-index: 1;
        pointer-events: initial;
    }

    .overlay-sidebar--active {
        display: block;
    }
`;
