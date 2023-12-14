import { FooterNavProps } from './types';
import FooterNav from './FooterNav';

export const withMock = ({ items, variant }: FooterNavProps) => {
    return <FooterNav items={items} variant={variant} />;
};
