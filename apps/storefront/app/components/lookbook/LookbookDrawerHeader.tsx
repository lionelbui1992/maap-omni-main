import { DrawerHeader } from '../ui/drawer/Drawer';
import s from './Lookbook.module.css';
import cn from 'clsx';

interface DrawerHeaderProps {
    title: string;
    productCount: number;
}

const LookbookDrawerHeader = ({ title, productCount }: DrawerHeaderProps) => {
    return (
        <DrawerHeader closeButtonVariant="text">
            <h2 className={cn(s.title, 'mmds-component-one')}>
                {title ? title : 'LOOK'}
            </h2>{' '}
            <span className={cn(s.productCount, 'mmds-component-one-detail')}>
                [ {productCount} Products ]
            </span>
        </DrawerHeader>
    );
};

export default LookbookDrawerHeader;
