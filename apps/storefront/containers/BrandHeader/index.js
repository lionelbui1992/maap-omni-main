import React from 'react';

import HeaderNavigationDesktop from '@containers/HeaderNavigationDesktop';
import HeaderNavigationMobile from '@containers/HeaderNavigationMobile';

const LoopCreditBannerPrompt = dynamic(() =>
    import('@components/ShoppingWithCredit/ShoppingWithCredit')
);

import { useLoop } from '@lib/providers/LoopProvider';

import { globalStyles } from './styles';
import dynamic from 'next/dynamic';

const BrandHeader = (props) => {
    const { creditShoppingActive } = useLoop();

    return (
        <>
            {creditShoppingActive && <LoopCreditBannerPrompt />}
            <HeaderNavigationDesktop {...props} />
            <HeaderNavigationMobile {...props} />
            <style jsx global>
                {globalStyles}
            </style>
        </>
    );
};

export default BrandHeader;
