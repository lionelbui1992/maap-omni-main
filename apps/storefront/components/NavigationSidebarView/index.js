import React from 'react';
import { useUI } from '@lib/providers/UIProvider';
import MobileNavigation from 'containers/MobileNavigation';

import { styles } from './styles';

const NavigationSidebarView = (props) => {
    const { active, megaNav, assistanceNav } = props;
    const { toggleMenuUI } = useUI();

    return (
        <div
            className={`menu-sidebar-view${
                active ? ' menu-sidebar-view--active' : ''
            }`}
        >
            <MobileNavigation
                megaNav={megaNav}
                assistanceNav={assistanceNav}
                closeNavigationCallback={toggleMenuUI}
            />
            <style jsx>{styles}</style>
        </div>
    );
};

export default NavigationSidebarView;
