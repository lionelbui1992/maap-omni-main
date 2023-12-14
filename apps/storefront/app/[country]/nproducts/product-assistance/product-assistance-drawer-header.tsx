'use client';

import { useRef, useState, useEffect } from 'react';
import { DrawerHeader } from '@app/components/ui/drawer/Drawer';
import s from './product-assistance.module.css';
import useDrawerDirection from '@app/lib/hooks/use-drawer-direction';

interface ProductAssistanceDrawerHeaderProps {
    navItems: string[];
    onClick: (item: string) => void;
    activeItem: string;
}

const ProductAssistanceDrawerHeader = ({
    navItems,
    onClick,
    activeItem,
}: ProductAssistanceDrawerHeaderProps) => {
    const drawerDirection = useDrawerDirection();
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
    const [underlineStyle, setUnderlineStyle] = useState({});
    itemRefs.current = navItems.map((_, i) => itemRefs.current[i] || null);

    useEffect(() => {
        const activeIndex = navItems.findIndex((item) => item === activeItem);

        const ref = itemRefs.current[activeIndex];
        if (ref) {
            const { offsetLeft, offsetWidth } = ref;
            setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
        }
    }, [activeItem, navItems]);

    const handleClick = (item: string, index: number): void => {
        onClick(item);
        updateUnderlinePosition(index);
    };

    const updateUnderlinePosition = (index: number) => {
        const ref = itemRefs.current[index];
        if (ref) {
            const { offsetLeft, offsetWidth } = ref;
            setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
        }
    };

    return (
        <DrawerHeader
            closeButtonVariant={
                drawerDirection === 'bottom' ? 'text' : 'secondary'
            }
        >
            <nav>
                <ul role="list" className={s.cluster}>
                    {navItems.map((item, index) => (
                        <li
                            key={item}
                            className="mmds-component-one"
                            ref={(el) => (itemRefs.current[index] = el)}
                        >
                            <button
                                className={s.tab}
                                onClick={() => handleClick(item, index)}
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className={s.activeUnderline} style={underlineStyle} />
            </nav>
        </DrawerHeader>
    );
};

export default ProductAssistanceDrawerHeader;
