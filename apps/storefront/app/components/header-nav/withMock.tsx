import { HeaderNavCallbacks, HeaderNavProps } from './types';
import HeaderNav from './HeaderNav';
import { useContentStructureWithMock } from '../../lib/content-structure';

export const withMock = ({ activeItem }: HeaderNavProps) => {
    const { structure, getNavFromNode, getPathsForNode } =
        useContentStructureWithMock();

    const callbacks: HeaderNavCallbacks = {
        toggleSupport: () => alert('Toggled Support'),
        toggleMenu: () => alert('Toggled Menu'),
        toggleSearch: () => alert('Toggled Search'),
        toggleCountrySelector: () => alert('Toggled Country Selector'),
        toggleItem: () => alert('Toggled An Item'),
        toggleCart: () => alert('Toggled Cart'),
        toggleProfile: () => alert('Toggled Profile'),
    };

    return (
        <HeaderNav
            items={structure}
            callbacks={callbacks}
            activeItem={activeItem}
            variant={'desktop'}
        />
    );
};
