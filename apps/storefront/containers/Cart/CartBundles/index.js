import React from 'react';

import BundlesUpsell from 'components/BundlesUpsell';
import { useLoop } from '@lib/providers/LoopProvider';

const CartBundles = ({ shopifyCheckout }) => {
    const { creditShoppingActive } = useLoop();

    if (creditShoppingActive) return null;

    return <BundlesUpsell lineItems={shopifyCheckout.lineItems.edges} />;
};

export default CartBundles;
