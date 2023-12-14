import React from 'react';
import PropTypes from 'prop-types';
import SideCartPrismicImage from 'components/SideCartPrismicImage';

const CartEmpty = ({ config }) => (
    <>
        <div className="cart_container">
            <p className="cart_empty__text">Your cart is currently empty.</p>
            <div className="side_cart_image_container">
                {config && <SideCartPrismicImage config={config} />}
            </div>
        </div>
        <style jsx>
            {`
                .cart_container {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 96%;
                }
                .cart_empty__text {
                    font-weight: 300;
                    min-width: 320px;
                    margin: 20px 25px !important;
                }
                .side_cart_image_container {
                    padding: 20px;
                }
            `}
        </style>
    </>
);

CartEmpty.propTypes = {
    config: PropTypes.object,
};

export default CartEmpty;
