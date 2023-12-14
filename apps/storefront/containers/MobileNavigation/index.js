import Info from '@images/small_icon/Info.svg';
import { useLoop } from '@lib/providers/LoopProvider';
import { useShop } from '@lib/providers/ShopProvider';
import ContextSwitcherToggle from 'components/ContextSwitcherToggle';
import brandConfig from 'config/brandConfig';
import ContextSwitcher from 'containers/ContextSwitcher';
import SSRLink from 'helpers/SSRLink';
import PropTypes from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import { useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
    resetNextUuid,
} from 'react-accessible-accordion';
import { Tab, TabList, TabPanel, Tabs, resetIdCounter } from 'react-tabs';
import { globalStyles } from './styles';

const MobileNavigation = ({
    megaNav,
    assistanceNav,
    closeNavigationCallback,
}) => {
    const [tabIndex, setTabIndex] = useState(0);

    resetIdCounter();
    resetNextUuid();

    const renderSecondLevelMenuItem = (items) => {
        return (
            <>
                {items.map((item) => {
                    return (
                        <p
                            className="mobile_navigation__tier_two_item"
                            key={`child_link_${item.child_nav_title}`}
                        >
                            <SSRLink
                                linkUrl={item.child_nav_link}
                                title={item.child_nav_title}
                                linkType={item.child_nav_link_type}
                                regionless={item.regionless}
                            />
                        </p>
                    );
                })}
            </>
        );
    };

    const renderOthers = (others) => {
        return others.map((item) => {
            return (
                <div
                    className="mobile_navigation__single_item"
                    key={`link_${item.title}`}
                >
                    <SSRLink
                        linkUrl={item.link}
                        title={item.title}
                        regionless={item.regionless}
                    />
                </div>
            );
        });
    };

    const renderStories = () => {
        const storiesNavigation = megaNav?.data?.stories_navigation;
        const storiesNavigationItems = storiesNavigation[1]?.items;
        const storiesNavTitle = storiesNavigation[1]?.primary;

        return storiesNavigation.length ? (
            <AccordionItem
                className={'mobile_navigation__accordion_assistance'}
            >
                <AccordionItemHeading className="mobile_navigation__heading">
                    <AccordionItemButton>
                        {storiesNavTitle && storiesNavTitle.nav_title_link ? (
                            <span>
                                <SSRLink
                                    linkUrl={storiesNavTitle?.nav_title_link}
                                    title={storiesNavTitle.nav_title1}
                                    linkType="Stories"
                                />
                            </span>
                        ) : (
                            <span>{storiesNavTitle.nav_title1}</span>
                        )}
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    {storiesNavigationItems.map((item, index) => {
                        return (
                            <p
                                className="mobile_navigation__tier_two_item"
                                key={`mobile_stories_nav_item_${index}`}
                            >
                                <SSRLink
                                    linkUrl={item.child_nav_link}
                                    title={item.child_nav_title}
                                    regionless={item.regionless}
                                />
                            </p>
                        );
                    })}
                </AccordionItemPanel>
            </AccordionItem>
        ) : (
            ''
        );
    };

    const renderAssistance = () => {
        const email = pathOr(
            '',
            ['data', 'body', 0, 'primary', 'email'],
            assistanceNav
        );
        const emailLink = pathOr(
            'https://maap.cc',
            ['data', 'body', 0, 'primary', 'email_link'],
            assistanceNav
        );
        const phone = pathOr(
            '',
            ['data', 'body', 0, 'primary', 'phone'],
            assistanceNav
        );
        const items = pathOr([], ['data', 'body', 0, 'items'], assistanceNav);
        return (
            <AccordionItem
                className={'mobile_navigation__accordion_assistance'}
            >
                <AccordionItemHeading className="mobile_navigation__heading">
                    <AccordionItemButton>
                        <span>Support</span>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p className="mobile_navigation__tier_two_item">
                        <img
                            className="mobile_navigation_info_icon"
                            src={Info.src}
                            alt="email"
                        />
                        <a
                            href={emailLink}
                            target="_blank"
                            title={email}
                            rel="noopener noreferrer"
                        >
                            {email}
                        </a>
                    </p>
                    <p className="mobile_navigation__tier_two_item">
                        <img
                            className="mobile_navigation_info_icon"
                            src={Info.src}
                            alt="phone-number"
                        />
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`tel:${phone}`}
                        >{`Phone ${phone}`}</a>
                    </p>
                    {items.map((item) => {
                        return (
                            <p
                                className="mobile_navigation__tier_two_item"
                                key={`mobile_${item.child_nav_title}`}
                            >
                                <SSRLink
                                    linkUrl={item.child_nav_link}
                                    title={item.child_nav_title}
                                    regionless={item.regionless}
                                />
                            </p>
                        );
                    })}
                </AccordionItemPanel>
            </AccordionItem>
        );
    };

    const renderContextSwitcher = () => {
        const context = useShop();
        return (
            <AccordionItem className={'mobile_navigation__accordion_grid'}>
                <AccordionItemHeading className="mobile_navigation__heading">
                    <AccordionItemButton>
                        <span>
                            {context.country} / {context.currencyCode}
                        </span>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <ContextSwitcher onComplete={closeNavigationCallback} />
                </AccordionItemPanel>
            </AccordionItem>
        );
    };

    const renderTabs = (menuItems) => {
        if (!menuItems) {
            return null;
        }

        return (
            <>
                {menuItems.map((menuItem, index) => {
                    const title = pathOr(
                        '',
                        ['primary', 'nav_title1'],
                        menuItem
                    );

                    const grid = pathOr('', ['primary', 'grid_view'], menuItem);

                    const navTitle = menuItem.primary;

                    return (
                        <AccordionItem
                            key={`mobile_menu_item_${index}`}
                            uuid={`mobile_menu_item_${index}`}
                            className={
                                grid
                                    ? 'mobile_navigation__accordion_grid'
                                    : 'mobile_navigation__accordion_list'
                            }
                        >
                            {navTitle.nav_title1 && (
                                <AccordionItemHeading className="mobile_navigation__heading">
                                    <AccordionItemButton>
                                        {navTitle && navTitle.nav_title_link ? (
                                            <span>
                                                <SSRLink
                                                    linkUrl={
                                                        navTitle?.nav_title_link
                                                    }
                                                    title={title}
                                                    linkType="Collection"
                                                    regionless={
                                                        menuItem.regionless
                                                    }
                                                />
                                            </span>
                                        ) : (
                                            <span>{title}</span>
                                        )}
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                            )}

                            <AccordionItemPanel>
                                {renderSecondLevelMenuItem(menuItem.items)}
                            </AccordionItemPanel>
                        </AccordionItem>
                    );
                })}
            </>
        );
    };

    const { tabs, others } = brandConfig.navigation.mobile;
    const { creditShoppingActive } = useLoop();

    return (
        <>
            <Tabs
                selectedIndex={tabIndex}
                onSelect={(index) => setTabIndex(index)}
            >
                <TabList>
                    {megaNav?.data &&
                        tabs.map((nav) => {
                            return (
                                <Tab key={`tab_list_${nav.title}`}>
                                    {nav.title}
                                </Tab>
                            );
                        })}
                </TabList>
                {megaNav?.data &&
                    tabs.map((nav) => {
                        const subNav = megaNav.data[nav.subNavKey];

                        const menuItems = subNav.filter(
                            (item) => item.slice_type === '2nd_level'
                        );

                        return (
                            <TabPanel key={`tab_panel_${nav.title}`}>
                                <Accordion
                                    allowZeroExpanded
                                    className="mobile_navigation__accordion"
                                >
                                    {renderTabs(menuItems)}
                                    {renderStories()}
                                    {renderOthers(others)}
                                    {renderAssistance()}
                                </Accordion>
                            </TabPanel>
                        );
                    })}
            </Tabs>
            {!creditShoppingActive && (
                <div className="mobile-navigation__context-switcher">
                    <ContextSwitcherToggle />
                </div>
            )}
            <style jsx global>
                {globalStyles}
            </style>
        </>
    );
};

export default MobileNavigation;

MobileNavigation.propTypes = {
    assistanceNav: PropTypes.object,
    megaNav: PropTypes.object,
};
