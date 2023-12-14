// @ts-nocheck
import React, {
    useState,
    useRef,
    useEffect,
    useLayoutEffect,
    FC,
    Ref,
} from 'react';
import Image from 'next/image';

import BrandLogo from '@images/branding/brandLogo.svg';
import CloseIcon from '@images/small_icon/Close-gray-icon.svg';

import { styles } from './styles';
import { useLoop } from '@lib/providers/LoopProvider';

interface OutsideClickProps {
    ref: Ref<HTMLDivElement>;
    callback: () => void;
    excludeRefs: Ref<HTMLDivElement>[];
}

const OutsideClick = (ref, callback) => {
    const [isClicked, setIsClicked] = useState();
    useEffect(() => {
        if (ref && ref?.current) {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    callback();
                }
            }

            // document.addEventListener('mousedown', handleClickOutside);
            return () => {
                // document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [ref, callback]);

    return isClicked;
};

interface SidebarProps {
    children: any;
    onClose: () => void;
    cancelDelayedSideBarClose: () => void;
    active: boolean;
}

const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : () => {};

const getScrollbarWidth = () => {
    return typeof window !== 'undefined'
        ? window.innerWidth - document.documentElement.clientWidth
        : 0;
};

const Sidebar: FC<SidebarProps> = ({
    children,
    onClose,
    cancelDelayedSideBarClose,
    active,
}) => {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const profileToggleRef = useRef<HTMLDivElement>(null);
    const cartToggleRef = useRef<HTMLDivElement>(null);

    const [debounceState, setDebounceState] = useState(null);
    const [justUnoOffset, setJustUnoOffset] = useState(null);
    const [scrollbarWidth, setScrollbarWidth] = useState(getScrollbarWidth()); // Only set when sidebar closed.
    const { creditShoppingActive } = useLoop();
    const [hasActive, setHasActive] = useState(false);

    const onKeyDownSidebar = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.code === 'Escape') {
            if (active) {
                onClose();
            }
        }
    };

    const handleOutsideClick = () => {
        if (active) {
            onClose();
        }
    };

    OutsideClick(sidebarRef, handleOutsideClick);

    useEffect(() => {
        if (active) {
            setHasActive(true);
        }
    }, [active]);

    return (
        <>
            <div
                className={`${hasActive ? 'sidebar' : 'sidebar--noAnimation'}${
                    active ? ' sidebar--active' : ''
                }`}
                onKeyDown={onKeyDownSidebar}
                ref={sidebarRef}
                tabIndex={1}
                onMouseEnter={() => {
                    cancelDelayedSideBarClose();
                }}
                onMouseLeave={handleOutsideClick}
            >
                <div className="sidebar-mobile-header">
                    <div className="sidebar-mobile-header__close-icon">
                        <Image
                            src={CloseIcon.src}
                            onClick={onClose}
                            alt="Close the website navigation sidebar."
                            width={18}
                            height={18}
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                            }}
                        />
                    </div>
                    <a href="/" className={'sidebar-mobile-header__brand_link'}>
                        <Image
                            src={BrandLogo}
                            className={'sidebar-mobile-header__brand_logo'}
                            alt="Brand Logo"
                            width={90}
                            height={65}
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                            }}
                        />
                    </a>
                </div>
                <div className={`sidebar_content`} ref={contentRef}>
                    {children}
                </div>
            </div>
            <style jsx global>
                {`
                    body {
                        ${active ? 'overflow: hidden;' : ''}
                        overflow-x:hidden;
                    }
                    body > div {
                        ${active ? `padding-right: ${scrollbarWidth}px` : ''}
                    }
                    body::-webkit-scrollbar {
                        ${active ? `display: none` : ''}
                    }
                    .sidebar {
                        top: ${creditShoppingActive ? `144px` : `65px`};
                    }
                `}
            </style>
            <style jsx>{styles}</style>
        </>
    );
};

export default Sidebar;
