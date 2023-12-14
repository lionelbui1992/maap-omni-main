import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useCart } from '@lib/providers/CartProvider';
import { useUI } from '@lib/providers/UIProvider';
import { useLoop } from '@lib/providers/LoopProvider';
import { useProfile } from '@lib/providers/ProfileProvider';
import CloseIcon from '@images/small_icon/Close-gray-icon.svg';
import Search from '@images/branding/Search.png';
import HamburgerMenu from '@images/branding/Hamburger.svg';
import BrandLogo from '@images/branding/brandLogo.svg';
import ProfileIcon from '@images/branding/Profile.png';
import ProfileIconFilled from '@images/branding/profileFilled.png';
import Bag from '@images/branding/Bag.png';
import BagFilled from '@images/branding/BagFilled.png';
import LoopCreditBannerPrompt from '@components/ShoppingWithCredit/ShoppingWithCredit';

const HeaderNavigationMobile = () => {
    const { cartCount } = useCart();
    const { authenticated } = useProfile();
    const {
        toggleMenuUI,
        toggleCartUI,
        toggleProfileUI,
        toggleSearchUI,
        displaySearchbar,
        displaySearchResults,
    } = useUI();

    const statefulProfileIcon = authenticated ? ProfileIconFilled : ProfileIcon;
    const statefulCartIcon = cartCount ? BagFilled : Bag;

    const onSideCartOpen = () => {
        toggleCartUI(true);
    };
    const { creditShoppingActive } = useLoop();

    return (
        <>
            <div className="sticky_mobile_header">
                <div className="mobile_only">
                    {creditShoppingActive && <LoopCreditBannerPrompt />}
                </div>
                <div className="mobile_menu">
                    <div className="mobile_menu__group_icons">
                        <div className="mobile_menu__item">
                            <button
                                type="button"
                                className="mobile_menu__link"
                                onClick={toggleMenuUI}
                            >
                                <div className="mobile_menu__image">
                                    <img
                                        src={HamburgerMenu.src}
                                        alt="save"
                                        className="mobile_menu__image_inner"
                                        width="20"
                                        height="20"
                                    />
                                </div>
                            </button>
                        </div>
                        <div className="mobile_menu__item">
                            <button
                                type="button"
                                className="mobile_menu__link"
                                onClick={toggleSearchUI}
                            >
                                <div className="mobile_menu__image">
                                    {displaySearchbar ? (
                                        <Image
                                            src={CloseIcon}
                                            alt="close"
                                            width={20}
                                            height={20}
                                            style={{
                                                maxWidth: '100%',
                                                height: 'auto',
                                            }}
                                        />
                                    ) : (
                                        <Image
                                            src={Search}
                                            alt="search"
                                            width={20}
                                            height={20}
                                            style={{
                                                maxWidth: '100%',
                                                height: 'auto',
                                            }}
                                        />
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="mobile_menu__item">
                        <Link href="/" as="/" legacyBehavior>
                            <img
                                src={BrandLogo.src}
                                alt="Brand Logo"
                                className="menu_nav__logo"
                            />
                        </Link>
                    </div>
                    <div className="mobile_menu__group_icons">
                        <div className="mobile_menu__item">
                            <button
                                className="mobile_menu__link"
                                type="button"
                                onClick={toggleProfileUI}
                            >
                                <div className="mobile_menu__image">
                                    <img
                                        src={statefulProfileIcon.src}
                                        alt="menu"
                                        className="mobile_menu__image_inner"
                                        width="20"
                                        height="20"
                                    />
                                </div>
                            </button>
                        </div>
                        <div className="mobile_menu__item">
                            <button
                                type="button"
                                className="mobile_menu__link"
                                onClick={onSideCartOpen}
                            >
                                <div className="mobile_menu__image">
                                    <img
                                        src={statefulCartIcon.src}
                                        alt="bag"
                                        className="mobile_menu__image_inner"
                                        width="20"
                                        height="20"
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .product_menu {
                    display: flex;
                    flex-wrap: wrap;
                }
                .menu_nav__image {
                    height: 19px;
                    width: 19px;
                    padding: 0 8px;
                }
                .mobile_menu__link {
                    text-decoration: none;
                    color: rgb(0, 0, 0);
                    font-size: 0.9em;
                    white-space: nowrap;
                    border: none;
                    background: none;
                    padding: 10px;
                }
                .mobile_menu__group_icons {
                    display: flex;
                    padding: 0 10px;
                }
            `}</style>
        </>
    );
};

export default HeaderNavigationMobile;
