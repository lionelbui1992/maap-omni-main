import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { brandBlack } from 'config/styles/colours';
import { useUI } from '@lib/providers/UIProvider';
import { useCart } from '@lib/providers/CartProvider';
import { useProfile } from '@lib/providers/ProfileProvider';
import CategoryNavigation from '../CategoryNavigation';

import ProfileIcon from '@images/branding/Profile.png';
import ProfileIconFilled from '@images/branding/profileFilled.png';
import CloseIcon from '@images/small_icon/Close-gray-icon.svg';
import BrandLogo from '@images/branding/brandLogo.svg';
import SearchIcon from '@images/branding/Search.png';
import Bag from '@images/branding/Bag.png';
import BagFilled from '@images/branding/BagFilled.png';
import { breakpointLarge, breakpointMedium } from 'config/styles/breakpoints';
import { getCountrySpecificUrl } from '../../helpers/linkHelper';
import ContextSwitcherToggle from '@components/ContextSwitcherToggle';
import { useLoop } from '@lib/providers/LoopProvider';

const HeaderNavigationDesktop = ({ ...props }) => {
    const { cartCount } = useCart();
    const { authenticated } = useProfile();
    const {
        displayCartUI,
        toggleSearchUI,
        displayProfileUI,
        displaySupportUI,
        displaySidebar,
        displaySearchbar,
        closeSidebarWithDelay,
    } = useUI();

    const statefulProfileIcon = authenticated ? ProfileIconFilled : ProfileIcon;
    const statefulCartIcon = cartCount ? BagFilled : Bag;
    const { creditShoppingActive } = useLoop();

    return (
        <>
            <div className="desktop_menu">
                <div className="product_menu">
                    <div className="product_menu__column product_menu__column--left">
                        <CategoryNavigation {...props} />
                    </div>
                    <div className="product_menu__column product_menu__column--centered">
                        <div className="menu_nav__title heading_style_no_bold">
                            <Link
                                href={getCountrySpecificUrl('/')}
                                legacyBehavior
                            >
                                <img
                                    src={BrandLogo.src}
                                    alt="Brand Logo"
                                    className="menu_nav__logo"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="product_menu__column product_menu__column--right">
                        <div className="product_menu__utility_navigation">
                            {!creditShoppingActive && (
                                <div className="product_menu__item product_menu__item--extra-margin">
                                    <ContextSwitcherToggle />
                                </div>
                            )}
                            <div className="product_menu__item--extra-margin">
                                <div
                                    className="product_menu__item"
                                    onMouseEnter={displaySupportUI}
                                    onMouseLeave={closeSidebarWithDelay}
                                >
                                    Support
                                </div>
                            </div>
                            <div className="product_menu__item">
                                <div
                                    className="desktop_header__link"
                                    onClick={toggleSearchUI}
                                >
                                    {displaySearchbar ? (
                                        <Image
                                            src={CloseIcon}
                                            alt="close"
                                            className="product_menu__close_icon"
                                            width={20}
                                            height={20}
                                            style={{ display: 'inline' }}
                                        />
                                    ) : (
                                        <Image
                                            src={SearchIcon}
                                            alt="search"
                                            className="product_menu__icon"
                                            data-testing="root-navigation-search"
                                            width={20}
                                            height={20}
                                            style={{ display: 'inline' }}
                                        />
                                    )}
                                </div>
                            </div>
                            <div
                                className="product_menu__item"
                                onMouseEnter={displayProfileUI}
                                onMouseLeave={closeSidebarWithDelay}
                            >
                                <Image
                                    src={statefulProfileIcon}
                                    alt="profile"
                                    className="product_menu__icon"
                                    width={20}
                                    height={20}
                                    style={{ display: 'inline' }}
                                />
                            </div>
                            <div className="product_menu__item">
                                <div
                                    className="desktop_header__link"
                                    onMouseEnter={displayCartUI}
                                    onMouseLeave={closeSidebarWithDelay}
                                >
                                    <Image
                                        src={statefulCartIcon}
                                        alt="bag"
                                        className="product_menu__icon"
                                        width={20}
                                        height={20}
                                        style={{ display: 'inline' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="brand_logo" />
            <style jsx>
                {`
                    .desktop_menu {
                        height: 65px;
                        // ${displaySidebar ? 'margin-right: 15px;' : ''}
                    }

                    .product_menu {
                        display: flex;
                        flex-wrap: wrap;
                        height: 65px;
                    }

                    .menu_nav__logo {
                        height: 24px;
                        width: 90px;
                        cursor: pointer;
                        display: inline;
                    }

                    .menu_nav__title {
                        padding-left: 100px;
                    }

                    .menu_nav__arrow_image {
                        height: 10px;
                        width: 10px;
                        padding: 3px 0;
                    }

                    .product_menu__icon {
                        height: 20px;
                        width: 20px;
                    }

                    .menu_nav__link {
                        text-decoration: none;
                        color: ${brandBlack};
                        font-size: 0.9em;
                        white-space: nowrap;
                    }

                    .product_menu__column {
                        display: flex;
                        flex: 1;
                        align-items: center;
                        justify-content: space-between;
                    }

                    .product_menu__column--left {
                        flex: 2;
                        justify-content: flex-start;
                        height: 65px;
                    }

                    .product_menu__column--centered {
                        justify-content: center;
                        height: 65px;
                    }

                    .product_menu__column--right {
                        flex: 2;
                        justify-content: flex-end;
                        height: 65px;
                    }

                    .product_menu__utility_navigation {
                        display: flex;
                        width: 80%;
                        height: 65px;
                        align-items: center;
                        justify-content: flex-end;
                    }

                    .product_menu__item {
                        margin: 0 0 0 20px;
                        cursor: pointer;
                    }

                    .product_menu__close_icon {
                        cursor: pointer;
                    }

                    .product_menu__item--extra-margin {
                        margin-right: 12px;
                    }

                    .desktop_header__link {
                        padding: 0;
                        cursor: pointer;
                    }

                    @media (max-width: ${breakpointLarge}) {
                        .product_menu__item--extra-margin {
                            margin-right: 4px;
                        }
                        .product_menu__utility_navigation {
                            width: 100%;
                        }
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .brand_logo {
                            height: 35px;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default HeaderNavigationDesktop;
