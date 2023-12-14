import React, { FC } from 'react';
import { useUI } from '@lib/providers/UIProvider';
import SidebarView from './SidebarView';

interface SidebarUIProps {
    cartConfig: object;
    regionCode: string;
    megaNav: object;
    assistanceNav: object;
}

const SidebarUI: FC<SidebarUIProps> = (props) => {
    const {
        displaySidebar,
        cancelDelayedSideBarClose,
        closeSidebar,
        sidebarView,
    } = useUI();
    const { regionCode, cartConfig, megaNav, assistanceNav } = props;

    return (
        <SidebarView
            sidebarView={sidebarView}
            onClose={closeSidebar}
            cancelDelayedSideBarClose={cancelDelayedSideBarClose}
            active={displaySidebar}
            regionCode={regionCode}
            cartConfig={cartConfig}
            megaNav={megaNav}
            assistanceNav={assistanceNav}
        />
    );
};

export default SidebarUI;
