import { lazy } from 'react';
import { HeaderNavProps } from './types';
import cn from 'clsx';
import s from './HeaderNav.module.css';

const HeaderNavDesktopVariant = lazy(
    () => import('./HeaderNavDesktop.variant')
);
const HeaderNavMobileVariant = lazy(() => import('./HeaderNavMobile.variant'));

const HeaderNav = (props: HeaderNavProps) => {
    const { variant, callbacks } = props;
    switch (variant) {
        case 'desktop':
            return <HeaderNavDesktopVariant {...props} />;
        case 'mobile':
            return <HeaderNavMobileVariant callbacks={callbacks} />;
        default:
        case 'responsive':
            return (
                <>
                    <div className={cn(s.responsive, s.mobileOnly)}>
                        <HeaderNavMobileVariant callbacks={callbacks} />
                    </div>
                    <div className={cn(s.responsive, s.desktopOnly)}>
                        <HeaderNavDesktopVariant {...props} />
                    </div>
                </>
            );
    }
};

export default HeaderNav;
