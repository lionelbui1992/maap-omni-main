import { Suspense } from 'react';
import { Bag, LinkManager, Logo, Menu, Profile, Search } from 'mmds';
import { HeaderNavCallbacks } from './types';
import cn from 'clsx';
import s from './HeaderNav.module.css';

const HeaderNavMobileVariant = ({
    callbacks,
}: {
    callbacks: HeaderNavCallbacks;
}) => {
    return (
        <Suspense fallback={<div>Loading navigation...</div>}>
            <div className={cn(s.root, s.mobile, 'mmds-copy-three')}>
                <div className={cn(s.primary)}>
                    <div
                        className={cn(s.item, s.mobile)}
                        key={'mobile_menu_icon_button'}
                        data-testid={`mn-navigation-menu`}
                        onClick={callbacks.toggleMenu}
                    >
                        <Menu />
                    </div>
                    <div
                        className={s.mobileItem}
                        key={'mobile_search_icon_button'}
                        data-testid={`mn-search`}
                        onClick={() => callbacks.toggleSearch()}
                    >
                        <Search />
                    </div>
                </div>
                <div className={s.logo} data-testid={`dn-logo`}>
                    <LinkManager
                        applyLink={true}
                        href={'/'}
                        title={'MAAP Cycling Apparel Home'}
                    >
                        <Logo />
                    </LinkManager>
                </div>
                <div className={s.support}>
                    <div
                        className={cn(s.supportItem, s.mobile)}
                        onClick={callbacks.toggleSupport}
                    >
                        <Profile />
                    </div>
                    <div
                        className={cn(s.supportItem, s.mobile)}
                        onClick={callbacks.toggleSupport}
                    >
                        <Bag />
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default HeaderNavMobileVariant;
