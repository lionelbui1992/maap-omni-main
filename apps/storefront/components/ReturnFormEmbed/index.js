import React from 'react';
import { useShop } from '@lib/providers/ShopProvider';
import { getStoreNameFromCountryCode } from '@lib/get-store-name';

const ReturnFormEmbed = () => {
    const { code } = useShop();

    const storeName = getStoreNameFromCountryCode(code);

    return (
        <>
            <section>
                {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                <iframe
                    frameBorder="0"
                    width="100%"
                    height="600px"
                    src={`https://rm.boldapps.net/customer_admin/customer_lookup.php?shop=${storeName}.myshopify.com`}
                />
            </section>
            <style jsx>
                {`
                    section {
                        padding: 55px;
                    }
                `}
            </style>
        </>
    );
};

export default ReturnFormEmbed;
