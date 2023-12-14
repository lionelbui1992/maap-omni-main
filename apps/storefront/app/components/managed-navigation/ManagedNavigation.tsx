'use client';

import {
    ContentStructure,
    useContentStructure,
} from '../../lib/content-structure';
import { HeaderNavCallbacks } from '../header-nav/types';
import HeaderNav from '../header-nav';
import CatalogueNav from '../catalogue-nav/CatalogueNav';
import { collectionByHandleCount } from '@app/lib/shopify/resolvers';
import useUI from '@app/components/ui/state';
import { Drawer, DrawerPanel } from '@app/components/ui/drawer/Drawer';
import useDrawerDirection from '@app/lib/hooks/use-drawer-direction';

const ManagedNavigation = ({
    contentStructure,
}: {
    contentStructure: ContentStructure;
}) => {
    const { openUIKey, toggleUI } = useUI();
    const { structure } = useContentStructure(contentStructure);
    const drawerDirection = useDrawerDirection('left', 'left');
    const isDrawerOpen = openUIKey === 'main-menu';

    if (!structure) {
        return <h1>No Content Structure Found</h1>;
    }

    const headerCallbacks: HeaderNavCallbacks = {
        toggleSupport: () => alert('Toggled Support'),
        toggleMenu: () => toggleUI(isDrawerOpen ? null : 'main-menu'),
        toggleSearch: () => alert('Toggled Search'),
        toggleCountrySelector: () => alert('Toggled Country Selector'),
        toggleItem: () => alert('Toggled An Item'),
        toggleCart: () => alert('Toggled Cart'),
        toggleProfile: () => alert('Toggled Profile'),
    };

    const activeItem = {
        label: 'Woman',
        hrefLink: 'Woman',
    };

    return (
        <>
            <HeaderNav
                variant="responsive"
                items={structure}
                callbacks={headerCallbacks}
                activeItem={activeItem}
            />
            <Drawer
                open={isDrawerOpen}
                onOpenChange={headerCallbacks.toggleMenu}
            >
                <DrawerPanel inFrom={drawerDirection} variant="catalogue-nav">
                    <CatalogueNav
                        contentStructure={contentStructure}
                        collectionCountResolver={collectionByHandleCount}
                    />
                </DrawerPanel>
            </Drawer>
        </>
    );
};

export default ManagedNavigation;
