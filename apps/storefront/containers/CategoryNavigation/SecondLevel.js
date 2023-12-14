import React from 'react';
import pathOr from 'ramda/src/pathOr';
import Image from 'next/image';
import brandConfig from 'config/brandConfig';
import SSRLink from 'helpers/SSRLink';
import { breakpointLarge } from 'config/styles/breakpoints';
import PlaceHolder from './PLACEHODER-IMAGE_1280x1800.jpg';

const FourthLevel = ({ column }) => {
    const columnTitle = pathOr('', ['primary', 'nav_title1'], column);
    const menuItems = column.items;
    const navItems = column.primary;

    const c = menuItems && menuItems.length > 10 ? 'double-column' : 'column';

    return (
        <div className={c}>
            {navItems && navItems.nav_title_link ? (
                <h3>
                    <SSRLink
                        linkUrl={navItems?.nav_title_link}
                        title={columnTitle}
                        linkType="Collection | Stories"
                    />
                </h3>
            ) : (
                <h3>{columnTitle}</h3>
            )}
            {menuItems && menuItems.length > 0 ? (
                <ul>
                    {menuItems.map((item, key) => {
                        return (
                            item.child_nav_link && (
                                <li key={key}>
                                    <SSRLink
                                        linkUrl={item.child_nav_link}
                                        title={item.child_nav_title}
                                        linkType={item.child_nav_link_type}
                                    />
                                </li>
                            )
                        );
                    })}
                </ul>
            ) : (
                ''
            )}
        </div>
    );
};

const ImageColumn = ({ column }) => {
    const {
        menu_swatch = { url: '' },
        menu_swatch_link,
        menu_swatch_title,
        image_link_type,
    } = column;

    const { url, alt, dimensions } = menu_swatch;

    const { height, width } = dimensions;

    return (
        <>
            <div className="column">
                <SSRLink
                    linkUrl={menu_swatch_link}
                    title={menu_swatch_title}
                    linkType={image_link_type}
                >
                    <div className="image_column_container">
                        <Image
                            src={url}
                            alt={alt || ''}
                            width={width}
                            height={height}
                            placeholder={'blur'}
                            blurDataURL={PlaceHolder.blurDataURL}
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                            }}
                        />
                        <div className="image_title">{menu_swatch_title}</div>
                    </div>
                </SSRLink>
            </div>
            <style jsx>
                {`
                    .image_column_container {
                        position: relative;
                    }
                    .image_title {
                        position: absolute;
                        bottom: 27px;
                        left: 17px;
                        color: white;
                        font-size: 2.1em;
                        font-weight: 400;
                        font-family: acumin-pro, Roboto, sans-serif;
                    }
                    @media (max-width: ${breakpointLarge}) {
                        .image_title {
                            font-size: 1em;
                            bottom: 16px;
                            left: 8px;
                        }
                    }
                `}
            </style>
        </>
    );
};

const ThirdLevel = ({ nav, data }) => {
    if (!nav || !data) return null;

    let navLink = nav.link;
    let images = null;
    let list = null;
    let grid = null;
    let subNavPresent = false;

    if (nav.hasSubNav) {
        navLink = data[nav.linkKey];

        const subNav = data[nav.subNavKey];

        if (subNav) {
            subNavPresent = true;

            images = subNav.find((item) => item.slice_type === '1st_level');
            list = subNav.filter(
                (item) =>
                    item.slice_type === '2nd_level' && !item.primary.grid_view
            );
            grid = subNav.filter(
                (item) =>
                    item.slice_type === '2nd_level' && item.primary.grid_view
            );
        }
    }

    if (!navLink || !nav.title) return null;

    // TODO: The Nav SSRLink below needs to have a nav link type and below
    // switchable in the Prismic article.

    return (
        <li>
            <SSRLink
                linkUrl={navLink}
                title={nav.title}
                linkType={nav.hasSubNav ? 'Collection' : undefined}
                regionless={nav.regionless}
            />
            {subNavPresent ? (
                <div className="category_navigation_container">
                    <div className="category_navigation_list">
                        {list &&
                            list.map((column, key) => (
                                <FourthLevel
                                    column={column}
                                    key={key}
                                    index={key}
                                />
                            ))}
                    </div>
                    {!!grid.length && (
                        <div className="category_navigation_grid">
                            {grid &&
                                grid.map((column, key) => (
                                    <FourthLevel
                                        column={column}
                                        key={key}
                                        index={key}
                                    />
                                ))}
                        </div>
                    )}
                    <div
                        className={`category_navigation_images${
                            !grid.length
                                ? ' category_navigation_images--isolated'
                                : ''
                        }`}
                    >
                        {images &&
                            images.items.map((column, key) => (
                                <ImageColumn column={column} key={key} />
                            ))}
                    </div>
                </div>
            ) : (
                ''
            )}
        </li>
    );
};

const SecondLevel = ({ megaNav }) => {
    return (
        <>
            <ul className="category_navigation__top">
                {brandConfig.navigation.desktop.map((nav) => (
                    <ThirdLevel nav={nav} data={megaNav.data} key={nav.title} />
                ))}
            </ul>
        </>
    );
};

export default SecondLevel;
