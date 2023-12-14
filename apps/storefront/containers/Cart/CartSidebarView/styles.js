import css from 'styled-jsx/css';
import { breakpointMedium, breakpointSmall } from 'config/styles/breakpoints';

export const styles = css`
    .cart-sidebar-view::-webkit-scrollbar {
        display: none;
    }

    .cart-sidebar-view {
        display: none;
        padding-bottom: 10px;
    }

    .cart-sidebar-view--active {
        display: initial;
        height: 100%;
    }

    .cart-sidebar-view header {
        background-color: rgb(219, 219, 219);
        display: flex;
        justify-content: space-between;
        padding: 12px;
    }

    .cart-sidebar-view__close_icon {
        margin-right: 15px;
        margin-top: 4px;
        width: 20px;
        height: 20px;
        cursor: pointer;
    }

    .cart-sidebar-view main {
        display: block;
        margin: 20px 0;
        min-width: 320px;
    }

    .cart-sidebar-view footer {
        border-top: 1px solid rgb(117, 117, 117);
        padding: 15px 20px 10px 20px;
    }

    .cart-sidebar-view footer .button-checkout {
        margin-top: 20px;
        min-width: 250px;
    }

    .cart-sidebar-view
        .side_cart_subtotal
        .side_cart_subtotal__price
        .pricing__current {
        font-size: 1.5em;
        font-weight: 300;
    }

    @media (max-width: ${breakpointMedium}) {
        .cart-sidebar-view {
            top: 0;
        }

        .cart-sidebar-view {
            left: 0;
            top: 0;
            animation-duration: 0s;
            animation-name: unset;
            width: 100%;
        }

        .cart-sidebar-view__close_icon {
            margin-left: 45%;
        }

        .cart-sidebar-view footer .button-checkout {
            width: inherit;
        }
    }

    @media (min-width: ${breakpointMedium}) {
        .cart-sidebar-view {
            width: 380px;
        }

        .cart-sidebar-view .cartContainer {
            top: 60px;
        }
    }
`;
