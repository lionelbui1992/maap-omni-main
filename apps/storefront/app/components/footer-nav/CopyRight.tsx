import cn from 'clsx';
import s from './FooterNav.module.css';

const CopyRight = () => {
    return <p className={cn('mmds-copy-three', s.copyright)}>© MAAP 2024.</p>;
};

export default CopyRight;
