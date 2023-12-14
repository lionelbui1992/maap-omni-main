import React, { FC, PropsWithChildren } from 'react';
import { brandMediumGrey } from 'config/styles/colours';
import { RichText } from 'prismic-reactjs';

type CartGiftMessageProps = {
    title: string;
    description: PropsWithChildren<any>;
};

const CartGiftMessage: FC<CartGiftMessageProps> = ({ title, description }) => {
    return (
        <section>
            <h3>{title}</h3>
            <p>{description}</p>
            <style jsx>
                {`
                    h3 {
                        margin: 5px 0;
                    }
                    section {
                        border-left: 5px solid rgb(0, 68, 73);
                        padding: 10px 15px 10px 20px;
                        background-color: rgb(240, 240, 240);
                        border-bottom: 1px solid ${brandMediumGrey};
                    }
                `}
            </style>
        </section>
    );
};

export default CartGiftMessage;
