export type footerIcon = 'northeast' | 'right' | 'left' | 'down' | 'circle';

export type contentStructureFooterNavItem = {
    label: string;
    hrefLink?: string;
    icon?: footerIcon;
    children?: contentStructureFooterNavItem[];
};

export type contentStructureFooterNav = contentStructureFooterNavItem[];

export type FooterNavVariant = 'mobile' | 'desktop' | 'responsive';

export type FooterCallbacks = {
    toggleItem: (item: FooterNavProps) => void;
};

export type FooterNavProps = {
    variant: FooterNavVariant;
    items: contentStructureFooterNavItem[];
    activeItem?: contentStructureFooterNavItem;
};
