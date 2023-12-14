import { Suspense } from 'react';
import { Bag, Globe, LinkManager, Logo, Profile, slugify } from 'mmds';
import { HeaderNavProps } from './types';
import AUFlag from 'svg-country-flags/svg/au.svg';
import { ContentStructureNavItem } from 'app/lib/content-structure';
import s from './HeaderNav.module.css';
import cn from 'clsx';
import useUI from '../ui/state';

const HeaderNavDesktopVariant = ({
    items,
    activeItem,
    callbacks,
}: HeaderNavProps) => {
    // The SRC value seems to depend on the environment. In the storybook environment, it's a string. In the web environment, it's an object.
    const flagSrc = typeof AUFlag === 'string' ? AUFlag : AUFlag.src;
    const isIntersecting = useUI((state) => !state.isIntersecting);
    const intersectingStyles = cn({ [s.isIntersecting]: isIntersecting });

    return (
        <Suspense fallback={<div>Loading navigation...</div>}>
            <div
                className={cn(
                    s.root,
                    s.desktop,
                    intersectingStyles,
                    'mmds-copy-three'
                )}
            >
                <div className={cn(s.primary)}>
                    {items.map((item: ContentStructureNavItem) => {
                        const itemClassNames = cn(s.item, {
                            [s.active]: item.label === activeItem?.label,
                        });
                        return (
                            <div
                                className={itemClassNames}
                                key={slugify(item.label)}
                                data-testid={`dn-item-${slugify(item.label)}`}
                                onClick={() => callbacks.toggleItem(item)}
                            >
                                {item.label}
                            </div>
                        );
                    })}
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
                        className={cn(s.supportItem)}
                        onClick={callbacks.toggleCountrySelector}
                    >
                        <img src={flagSrc} alt="Australia" className={s.flag} />
                        AU / AUD $
                    </div>
                    <div
                        className={cn(s.supportItem)}
                        onClick={callbacks.toggleSupport}
                    >
                        Support
                    </div>
                    <div
                        className={cn(s.supportItem)}
                        onClick={callbacks.toggleSupport}
                    >
                        <Globe />
                    </div>
                    <div
                        className={s.supportItem}
                        onClick={callbacks.toggleProfile}
                    >
                        <Profile />
                    </div>
                    <div
                        className={s.supportItem}
                        onClick={callbacks.toggleCart}
                    >
                        <Bag />
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default HeaderNavDesktopVariant;
