import css from 'styled-jsx/css';
import { breakpointMedium, breakpointSmall } from 'config/styles/breakpoints';

export const styles = css.global`
    .tiles {
        display: flex;
        justify-content: center;
        min-height: 100px;
    }
    .tiles .container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
    }
    .tiles .tile {
        position: relative;
        line-height: 0;
    }
    .tiles .tile img {
        width: 100%;
        display: block;
    }
    .tiles .tile.below .content .content_container .content_title_container p {
        margin: 0;
        padding: 8px 0;
        line-height: 1em;
    }
    .tiles .tile.below .content .content_container p {
        margin: 8px 0;
        line-height: 1.5em;
    }
    .tiles .tile.over .content {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    .tiles .tile.over .content_container .content_title_container p {
        margin: 8px 0;
        line-height: 1em;
    }
    .tiles .tile.over .content_container p {
        line-height: 1.5em;
    }
    .tiles .tile.over button.Vertical {
        position: absolute;
    }
    .tiles .tile:last-child {
        margin-bottom: 0 !important;
        margin-top: 0 !important;
    }
    @media (max-width: ${breakpointSmall}), (max-width: ${breakpointMedium}) {
        .tiles .container {
            flex-wrap: wrap;
        }
    }
`;
