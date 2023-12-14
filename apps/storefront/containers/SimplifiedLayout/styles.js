import css from 'styled-jsx/css';
import { breakpointMedium } from 'config/styles/breakpoints';

export const styles = css`
    @media (min-width: ${breakpointMedium}) {
        header {
            position: sticky;
            top: 0;
            width: 100%;
            background-color: rgb(255, 255, 255);
            z-index: 1;
        }
    }
`;
