export type DrawerLocation = 'left' | 'right';

export type DrawerProps = {
    UIKey: string;
    location: DrawerLocation;
    children: React.ReactNode;
};
