import React from 'react';
import { addRandomKey } from 'helpers/utils';
import { useProductPrismicDocuments } from '@lib/providers/ProductPrismicDocumentsProvider';

const ProductShippingInfo = () => {
    const { getDocument } = useProductPrismicDocuments();

    const shipping = getDocument('shipping');
    if (!shipping) return null;

    return (
        <>
            <div className="product_shipping_info__container">
                {shipping &&
                    addRandomKey(shipping.data.description).map(text => {
                        return <p key={text.randomKey}>{text.text}</p>;
                    })}
            </div>
            <style jsx>
                {`
                    .product_shipping_info__container {
                        margin: 13px 0;
                    }
                    p {
                        margin: 0;
                    }
                `}
            </style>
        </>
    );
};

export default ProductShippingInfo;
