import React from 'react';
import { brandMediumGrey } from 'config/styles/colours';

const CartMessaging = () => {
    return (
        <section>
            <h3>Order Update</h3>
            <p>
                Orders placed from 23rd April will experience a dispatch delay.
                Refer to our Support Centre for more info
            </p>
            <style jsx>
                {`
                    h3 {
                        margin: 5px 0;
                    }
                    section {
                        border-left: 5px solid #d78e90;
                        padding: 10px 15px 10px 20px;
                        background-color: rgb(240, 240, 240);
                        border-bottom: 1px solid ${brandMediumGrey};
                    }
                `}
            </style>
        </section>
    );
};

export default CartMessaging;
