'use client';

import React, { useState, useEffect } from 'react';
import { ProductInformationDocumentData } from 'prismicio-types';
import { TableData } from '@app/lib/google/size-guide';
import ProductAssistanceDrawerHeader from './product-assistance-drawer-header';
import ProductAssistanceDrawerContent from './product-assistance-drawer-content';
import { Drawer, DrawerPanel, Side } from '@app/components/ui/drawer/Drawer';
import useUI from '@app/components/ui/state';
import useDrawerDirection from '@app/lib/hooks/use-drawer-direction';

interface ProductAssistanceOverlayProps {
    navItems: string[];
    activeLabel: string;
    warranty: ProductInformationDocumentData | null;
    shipping: ProductInformationDocumentData | null;
    product: any; // TODO
    sizeGuide: ProductInformationDocumentData | null;
    googleSizeGuideData: TableData | null;
}

const ProductAssistanceDrawer = ({
    navItems,
    activeLabel,
    warranty,
    shipping,
    product,
    sizeGuide,
    googleSizeGuideData,
}: ProductAssistanceOverlayProps) => {
    const [content, setContent] = useState<string>('');
    const { openUIKey, toggleUI } = useUI();
    const isDrawerOpen = openUIKey === 'product-assistance';
    const drawerDirection = useDrawerDirection();

    useEffect(() => {
        setContent(`${activeLabel}`);
    }, [activeLabel]);

    const handleNavItemClick = (item: string): void => {
        setContent(`${item}`);
    };

    const toggleDrawer = () => {
        toggleUI(isDrawerOpen ? null : 'product-assistance');
    };

    return (
        <Drawer open={isDrawerOpen} onOpenChange={toggleDrawer}>
            <DrawerPanel inFrom={drawerDirection} variant="product-assistance">
                <ProductAssistanceDrawerHeader
                    navItems={navItems}
                    onClick={handleNavItemClick}
                    activeItem={activeLabel}
                />
                <ProductAssistanceDrawerContent
                    content={content}
                    warranty={warranty}
                    shipping={shipping}
                    product={product}
                    sizeGuide={sizeGuide}
                    googleSizeGuideData={googleSizeGuideData}
                />
            </DrawerPanel>
        </Drawer>
    );
};

export default ProductAssistanceDrawer;
