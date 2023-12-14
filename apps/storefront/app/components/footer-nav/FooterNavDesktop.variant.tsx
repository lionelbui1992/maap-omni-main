import { contentStructureFooterNavItem, FooterNavProps } from './types';
import s from './FooterNav.module.css';
import cn from 'clsx';
import NewsletterSubscriptionForm from './NewsletterSubscriptionForm';
import CopyRight from './CopyRight';

export const FooterNavDesktopVariant = ({ items }: FooterNavProps) => {
    return (
        <>
            <div className={cn(s.root, s.desktop)}>
                <div className={cn(s.primary)}>
                    {items.map((item: contentStructureFooterNavItem) => {
                        return (
                            <div className={s.primaryItem}>
                                <div
                                    className={cn(
                                        s.primaryLabel,
                                        'mmds-copy-three'
                                    )}
                                >
                                    {item.label}
                                </div>
                                <div className={s.primaryChildren}>
                                    {item?.children?.map((item) => {
                                        return (
                                            <div
                                                className={cn(
                                                    'mmds-component-one'
                                                )}
                                            >
                                                <a href={item.hrefLink}>
                                                    {item.label}
                                                </a>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}

                    <NewsletterSubscriptionForm />
                </div>
            </div>
            <div>
                <CopyRight />
            </div>
        </>
    );
};

export default FooterNavDesktopVariant;
