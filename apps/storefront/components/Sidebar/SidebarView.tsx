import React, { FC } from 'react';
import Sidebar from './Sidebar';
import CartSidebarView from 'containers/Cart/CartSidebarView';
import SupportSidebarView from 'containers/SupportSideBar';
import ProfileSidebarView from 'containers/Profile/ProfileSidebarView';
import NavigationSidebarView from 'components/NavigationSidebarView';

interface SidebarViewProps {
    sidebarView: string;
    onClose: () => void;
    cancelDelayedSideBarClose: () => void;
    cartConfig: object;
    regionCode: string;
    active: boolean;
    megaNav: object;
    assistanceNav: object;
}

const SidebarView: FC<SidebarViewProps> = ({
    sidebarView,
    onClose,
    cancelDelayedSideBarClose,
    cartConfig,
    regionCode,
    active,
    megaNav,
    assistanceNav,
}) => {
    // Profile view has to actually be loaded on startup otherwise we don't
    // get the 'login' event and the iFrame is slow to load so we can just
    // add/remove these components from the DOM.
    const viewActive = (viewName) => sidebarView === viewName;

    return (
        <Sidebar
            onClose={onClose}
            active={active}
            cancelDelayedSideBarClose={cancelDelayedSideBarClose}
        >
            <NavigationSidebarView
                active={viewActive('MENU_VIEW')}
                megaNav={megaNav}
                assistanceNav={assistanceNav}
            />
            <CartSidebarView
                config={cartConfig}
                regionCode={regionCode}
                active={viewActive('CART_VIEW')}
            />
            <ProfileSidebarView
                regionCode={regionCode}
                active={viewActive('PROFILE_VIEW')}
            />
            <SupportSidebarView
                regionCode={regionCode}
                active={viewActive('SUPPORT_VIEW')}
                assistanceNav={assistanceNav}
            />
        </Sidebar>
    );
};

export default SidebarView;
