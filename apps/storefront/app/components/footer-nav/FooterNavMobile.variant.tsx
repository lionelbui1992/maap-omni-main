'use client';

import { contentStructureFooterNavItem, FooterNavProps } from './types';
import { useState } from 'react';
import s from './FooterNav.module.css';
import { LinkManager, NavItem } from 'mmds';
import {
    ContentStructure,
    useContentStructure,
} from '../../lib/content-structure';
import cn from 'clsx';
import NewsletterSubscriptionForm from './NewsletterSubscriptionForm';
import CopyRight from './CopyRight';

const FooterNavMobileVariant = ({ items, activeItem }: FooterNavProps) => {
    const { structure, assertLoseNodeMatch } = useContentStructure(items);
    const [openCluster, setOpenCluster] = useState<null | string>(null);
    const [footerItems, setFooterItems] = useState<ContentStructure>(structure);

    return (
        <>
            <section className={cn(s.root, s.mobile)}>
                <div>
                    <NewsletterSubscriptionForm />
                </div>
                <div className={s.navContainer}>
                    <div className={s.navItems}>
                        {footerItems.map(
                            (item: contentStructureFooterNavItem, key) => {
                                if (item.children) {
                                    return (
                                        <NavItem
                                            key={key}
                                            variant="l1"
                                            label={item.label}
                                            onSelect={() =>
                                                setOpenCluster(item.label)
                                            }
                                            open={openCluster === item.label}
                                            icon="down"
                                            openCluster={openCluster}
                                            className={s.navItem}
                                            type="footer"
                                            cluster={item.children.map(
                                                (
                                                    child: contentStructureFooterNavItem
                                                ) => {
                                                    let active = false;
                                                    if (activeItem) {
                                                        active =
                                                            assertLoseNodeMatch(
                                                                child,
                                                                activeItem
                                                            );
                                                    }
                                                    return {
                                                        active,
                                                        label: child.label,
                                                        hrefLink:
                                                            child.hrefLink,
                                                        componentType: 'button',
                                                        buttonVariant: 'quite',
                                                        padding: 'zeroInline',
                                                    };
                                                }
                                            )}
                                        />
                                    );
                                }

                                return (
                                    <LinkManager
                                        href={item.hrefLink}
                                        title={`Go to ${item.label}`}
                                        applyLink={!!item.hrefLink}
                                    >
                                        <NavItem
                                            variant="l1"
                                            label={item.label}
                                            icon="northeast"
                                            hrefLink={item.hrefLink}
                                            type="footer"
                                        />
                                    </LinkManager>
                                );
                            }
                        )}
                    </div>
                </div>
                <div>
                    <CopyRight />
                </div>
            </section>
        </>
    );
};

export default FooterNavMobileVariant;
