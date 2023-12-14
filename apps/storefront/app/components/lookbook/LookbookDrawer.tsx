'use client';

import React, { useEffect, useState } from 'react';
import { LookbookDrawerProps } from './type';
import LookbookDrawerHeader from './LookbookDrawerHeader';
import LookBookDrawerContent from './LookbookDrawerContent';
import fetchAllProductHandles from '../../lib/shopify/methods/fetch-all-product-handles';
import { Drawer, DrawerPanel, DrawerTrigger } from '../ui/drawer/Drawer';
import useUI from '../ui/state';
import useDrawerDirection from '../../lib/hooks/use-drawer-direction';

const LookbookDrawer = ({ look, children, handles }: LookbookDrawerProps) => {
    const [products, setProducts] = useState<any>([]);
    const { openUIKey, toggleUI } = useUI();
    const drawerDirection = useDrawerDirection();

    const isDrawerOpen = openUIKey === `lookbook-${look.heading}`;

    if (!handles) return null;

    const filteredProductHandles: string[] = handles.filter(
        (handle) => handle !== undefined && handle
    ) as string[];

    useEffect(() => {
        if (filteredProductHandles) {
            const fetchTheProduct = async () => {
                const productItems = await fetchAllProductHandles(
                    filteredProductHandles
                );
                if (!productItems) return;

                setProducts(productItems);
            };
            fetchTheProduct().then(
                (error) => `Error fetching products: ${error}`
            );
        }
    }, [handles]);

    if (!products.length) return null;

    const toggleDrawer = () => {
        toggleUI(isDrawerOpen ? null : `lookbook-${look.heading}`);
    };

    if (!products) return null;

    // To filter out null items and get the actual product length
    const filteredProducts = products.filter((item: any) => item);

    return (
        <Drawer open={isDrawerOpen} onOpenChange={toggleDrawer}>
            <DrawerTrigger>{children}</DrawerTrigger>
            <DrawerPanel inFrom={drawerDirection} variant="lookbook">
                <LookbookDrawerHeader
                    title={look.heading}
                    productCount={filteredProducts.length}
                />
                <LookBookDrawerContent products={products} />
            </DrawerPanel>
        </Drawer>
    );
};

export default LookbookDrawer;
