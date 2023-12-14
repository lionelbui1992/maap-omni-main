import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Loader from 'components/Loader';
import Error from '../ExceptionsHandling/Error';
import ShopifyProductCard from 'components/ShopifyProductCard';
import {
    SIMPLE_PRODUCT_CARD_PRODUCT,
    simpleProductByHandleVars,
} from '@containers/Product/simpleProductGraph';
import dynamic from 'next/dynamic';
import { useShop } from '@lib/providers/ShopProvider';

const ShopifyProductCardWithGql = ({
    productHandle,
    category,
    nostoProductCardAttributes,
}) => {
    const { code } = useShop();
    const { loading, error, data } = useQuery(SIMPLE_PRODUCT_CARD_PRODUCT, {
        variables: simpleProductByHandleVars(productHandle),
        notifyOnNetworkStatusChange: true,
        context: { clientName: code },
    });

    if (error)
        return (
            <div>
                <Error />
            </div>
        );

    if (loading) return <Loader type="product" />;

    return (
        <ShopifyProductCard
            product={data.productByHandle}
            category={category}
            nostoProductCardAttributes={nostoProductCardAttributes}
        />
    );
};

export const DynamicProductCard = dynamic(
    () => import('@containers/ShopifyProductCardWithGql'),
    { loading: () => <Loader type="product" />, ssr: false }
);

export default ShopifyProductCardWithGql;
