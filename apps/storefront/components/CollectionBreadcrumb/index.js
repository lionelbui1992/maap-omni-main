import React, { useContext } from 'react';
import SSRLink from 'helpers/SSRLink';
import { useShop } from '@lib/providers/ShopProvider';
import { breakpointSmall } from 'config/styles/breakpoints';
import { brandBlack, brandSelectedGrey } from 'config/styles/colours';
import { getCountrySpecificUrl } from 'helpers/linkHelper';
import css from 'styled-jsx/css';

const CollectionBreadcrumb = ({
    collectionTitle,
    collectionHandle,
    pageIAPath,
}) => {
    const { storefrontUrl, routePrefix } = useShop();
    const formatName = (title) => {
        return title?.replace(/-/g, ' ');
    };
    const routeURL = `${storefrontUrl}${routePrefix ? `${routePrefix}/` : ''}`;

    const linkStyles = css.resolve`
        a {
            color: ${brandBlack};
            text-decoration: none;
            cursor: pointer;
        }
        li {
            list-style: none;
            display: inline-block;
            text-transform: capitalize;
            font-size: 0.9em;
        }
        li:before {
            content: '/';
            padding-right: 6px;
            padding-left: 6px;
            color: ${brandBlack};
        }
        li:first-child:before {
            content: '';
            padding: 0;
        }
    `;

    const genderToHandle = (gender) => {
        if (gender === 'Man') return 'on-bike-man';
        if (gender === 'Woman') return 'on-bike-woman';
    };

    const showLevel1 = () => {
        if (!pageIAPath || pageIAPath[0] === undefined || !pageIAPath[0])
            return false;

        if (pageIAPath[1] !== undefined && pageIAPath[1]) {
            if (pageIAPath[1] === 'Accessories') return false;
        }

        return true;
    };

    const showLevel2 = () => {
        if (
            !pageIAPath ||
            pageIAPath[1] === undefined ||
            pageIAPath[0] === undefined ||
            !pageIAPath[1]
        )
            return false;

        return true;
    };

    const showLevel3 = () => {
        return showLevel2() && pageIAPath[1][1] === null ? (
            <li className={linkStyles.className}>{pageIAPath?.[1]?.[0]}</li>
        ) : (
            <li className={linkStyles.className}>
                <SSRLink
                    linkUrl={`${pageIAPath?.[1]?.[1]}`}
                    title={pageIAPath?.[1]?.[0]}
                    linkType="Collection"
                    className={linkStyles.className}
                />
            </li>
        );
    };

    const collectionLink = (handle) => {
        return `${routeURL}collections/${handle}`;
    };

    const breadcrumbLevel1 = (pageIAPath) => {
        return `${routeURL}collections/${genderToHandle(pageIAPath)}`;
    };

    const breadcrumbSchema = [
        {
            name: 'Home',
            url: routeURL,
        },
        {
            name: formatName(pageIAPath?.[0]),
            url: `${breadcrumbLevel1(pageIAPath?.[0])}`,
        },
    ];

    const breadcrumbs = breadcrumbSchema.concat({
        name: pageIAPath?.[1]?.[0],
        url: `${storefrontUrl}${getCountrySpecificUrl(
            pageIAPath?.[1]?.[1]
        )?.slice(1)}`,
    });

    const filteredBreadcrumb = breadcrumbs.filter(
        (item) => item.name !== 'Both' && item.name !== undefined
    );

    return (
        <div className="collection_breadcrumbs">
            <ul className="collection_breadcrumb_list">
                <li>
                    <SSRLink
                        linkUrl="/"
                        title={formatName('Home')}
                        linkType="Page"
                        className={linkStyles.className}
                        regionless
                    />
                </li>
                {showLevel1() && pageIAPath[0] !== 'Both' && (
                    <li>
                        <SSRLink
                            linkUrl={`/collections/${genderToHandle(
                                pageIAPath[0]
                            )}`}
                            title={formatName(pageIAPath[0])}
                            linkType="Collection"
                            className={linkStyles.className}
                        />
                    </li>
                )}
                {pageIAPath?.[1]?.[0] ? showLevel3() : ''}
                <li>
                    <SSRLink
                        linkUrl={`/collections/${collectionHandle}`}
                        title={formatName(collectionTitle)}
                        linkType="Collection"
                        className={linkStyles.className}
                    />
                </li>
            </ul>
            {linkStyles.styles}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `{
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            ${
                                filteredBreadcrumb &&
                                filteredBreadcrumb.map((segment, index) => {
                                    return `{
                                     "@type": "ListItem",
                                     "position": "${index + 1}",
                                     "name": "${segment.name}",
                                     "item": "${segment.url}"
                                }`;
                                })
                            },
                            {
                                "@type": "ListItem",
                                "position": "${filteredBreadcrumb.length + 1}",
                                "name": "${formatName(collectionTitle)}",
                                "item": "${collectionLink(collectionHandle)}"
                            }
                        ]
                    }`,
                }}
            />
            <style jsx>
                {`
                    .collection_breadcrumbs {
                        flex: 1 100%;
                        flex-direction: row;
                        background-color: ${brandSelectedGrey};
                        padding: 1px 55px;
                        font-weight: 300;
                        font-size: 1.1em;
                    }

                    @media (max-width: ${breakpointSmall}) {
                        .collection_breadcrumbs {
                            padding: 1px 30px;
                        }
                    }

                    .collection_breadcrumb_list {
                        padding: 0;
                    }

                    li {
                        list-style: none;
                        display: inline-block;
                        text-transform: capitalize;
                        font-size: 0.9em;
                    }

                    li:before {
                        content: '/';
                        padding-right: 6px;
                        padding-left: 6px;
                        color: ${brandBlack};
                    }

                    li:first-child:before {
                        content: '';
                        padding: 0;
                    }
                `}
            </style>
        </div>
    );
};

export default CollectionBreadcrumb;
