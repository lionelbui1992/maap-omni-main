import { lazy } from 'react';
import { FooterNavProps } from './types';
import cn from 'clsx';
import s from './FooterNav.module.css';

const FooterNavDesktopVariant = lazy(
    () => import('./FooterNavDesktop.variant')
);
const FooterNavMobileVariant = lazy(() => import('./FooterNavMobile.variant'));

const HeaderNav = (props: FooterNavProps) => {
    const { variant } = props;
    switch (variant) {
        case 'desktop':
            return <FooterNavDesktopVariant {...props} />;
        case 'mobile':
            return <FooterNavMobileVariant {...props} />;
        default:
        case 'responsive':
            return (
                <>
                    <div className={cn(s.responsive, s.mobileOnly)}>
                        <FooterNavMobileVariant {...props} />
                    </div>
                    <div className={cn(s.responsive, s.desktopOnly)}>
                        <FooterNavDesktopVariant {...props} />
                    </div>
                </>
            );
    }
};

export default HeaderNav;
