// @ts-nocheck
'use client';

import React, { useMemo, useState, FC } from 'react';
import { Context } from '@lib/types/Context';
import brandConfig from '@config/brandConfig';
import { useIsomorphicLayoutEffect } from '@lib/useIsomorphicLayoutEffect';
import { getTargetPathForAlternateRegion } from '../../helpers/linkHelper';
import {
    getDisplayRegion,
    removeDisplayRegion,
    setDisplayRegion,
} from '@lib/region-override';
import { getContextByRegion } from '@lib/get-context';

export const ShopContext = React.createContext<Context | any>({});

ShopContext.displayName = 'Shop Context';

export const ShopProvider: FC<{ ctx: Context; children: React.ReactNode }> = (
    props
) => {
    const { ctx } = props;
    const [context, setContext] = useState(ctx);
    const [unresolvedTarget, setUnresolvedTarget] = useState(null);

    const previewMode =
        process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF === 'preview' ||
        process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview';

    const switchShopContext = (region) => {
        let targetContext = brandConfig.contexts.find((config) => {
            return config.region === region;
        });

        if (!targetContext) {
            throw new Error(
                `Can't switch! Invalid target context ${targetContext} specified in switchShopContext.`
            );
        }

        const hasChanged = context.region !== targetContext.region;

        if (hasChanged) {
            setUnresolvedTarget(targetContext);
        }
    };

    useIsomorphicLayoutEffect(() => {
        const displayRegion = getDisplayRegion(context.region);
        if (displayRegion) {
            console.info(
                `An override is set for ${context.region} as ${displayRegion}`
            );
            const displayRegionContext = getContextByRegion(displayRegion);
            const displayContext = { ...context, ...displayRegionContext };
            setContext(displayContext);
        }
    }, []);

    useIsomorphicLayoutEffect(() => {
        if (unresolvedTarget) {
            const contextSwitchPath = getTargetPathForAlternateRegion(
                unresolvedTarget.code,
                window.location.pathname
            );

            if (unresolvedTarget.overridesRegion) {
                setDisplayRegion(
                    unresolvedTarget.overridesRegion,
                    unresolvedTarget.region
                );
            }

            if (!unresolvedTarget.overridesRegion) {
                console.info('Removing override region');
                removeDisplayRegion();
            }

            window.location = contextSwitchPath ? contextSwitchPath : '/';
        }
    }, [unresolvedTarget]);

    const value = useMemo(
        () => ({
            ...context,
            switchShopContext,
            previewMode,
        }),
        [context]
    );

    return <ShopContext.Provider value={value} {...props} />;
};

export const useShop = () => {
    const context = React.useContext(ShopContext);
    if (context === undefined) {
        throw new Error(`useShop must be used within a ManagedShopProvider`);
    }
    return context;
};

export const ManagedShopProvider: FC<{
    children: React.ReactNode;
    ctx: Context;
}> = ({ children, ctx }) => <ShopProvider ctx={ctx}>{children}</ShopProvider>;
