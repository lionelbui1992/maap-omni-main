import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { getCountrySpecificUrl } from 'helpers/linkHelper';
import { useShop } from '@lib/providers/ShopProvider';

const extractSingleMetaFieldValueByNamespace = (metafields, namespace) => {
    if (!metafields) return '';

    const matches = metafields.filter((field) => {
        if (!field) return false;
        return namespace.toLowerCase() === field.namespace.toLowerCase();
    });

    return matches.length ? matches : null;
};

const extractBreadcrumbHandleTitlePair = (metafields, namespace) => {
    if (!metafields) return '';

    const pair = extractSingleMetaFieldValueByNamespace(metafields, namespace);

    if (!pair) return null;

    const handle = pair.find((item) => item.key === 'handle')?.value;
    const title = pair.find((item) => item.key === 'title')?.value;

    if (!handle || !title) return null;

    return [handle, title];
};

const Breadcrumb = ({ product }) => {
    const { storefrontUrl, routePrefix } = useShop();
    const productTitle = product?.title;
    const metaFields = product.metafields;

    const routeURL = `${storefrontUrl}${routePrefix ? `${routePrefix}/` : ''}`;

    const collectionLink = (segment) => {
        return getCountrySpecificUrl(`/collections/${segment.toLowerCase()}`);
    };

    const productLink = (product) => {
        return `${routeURL}products/${product.handle}`;
    };

    const breadCrumbSegments = [
        extractBreadcrumbHandleTitlePair(metaFields, 'breadcrumb_level_1'),
        extractBreadcrumbHandleTitlePair(metaFields, 'breadcrumb_level_2'),
        extractBreadcrumbHandleTitlePair(metaFields, 'breadcrumb_level_3'),
    ].filter(Boolean);

    if (!breadCrumbSegments) return null;

    const productBreadcrumbSchema = [
        {
            name: 'Home',
            url: routeURL,
        },
        {
            name: breadCrumbSegments?.[0]?.[1],
            url: `${routeURL}collections/${breadCrumbSegments?.[0]?.[0]}`,
        },
        {
            name: breadCrumbSegments?.[1]?.[1],
            url: `${routeURL}collections/${breadCrumbSegments?.[1]?.[0]}`,
        },
        {
            name: breadCrumbSegments?.[2]?.[1],
            url: `${routeURL}collections/${breadCrumbSegments?.[2]?.[0]}`,
        },
        {
            name: productTitle,
            url: productLink(product),
        },
    ];

    const filteredBreadcrumb = productBreadcrumbSchema.filter(
        (item) => item.name !== undefined
    );

    return (
        <nav>
            <Link href="/" as="/" legacyBehavior>
                <a className="link">Home / &nbsp;</a>
            </Link>
            {breadCrumbSegments &&
                breadCrumbSegments.map((segment, index) => {
                    if (!segment) return null;
                    return (
                        <Link
                            href={collectionLink(segment[0])}
                            as={collectionLink(segment[0])}
                            key={index}
                            legacyBehavior
                        >
                            <a className="link">{segment[1]} &nbsp; / &nbsp;</a>
                        </Link>
                    );
                })}
            <span className="link">{productTitle}</span>
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
                            }
                        ]
                    }`,
                }}
            />
            <style jsx>
                {`
                    nav {
                        background-color: rgb(241, 241, 241);
                        padding: 12px 54px;
                        margin: 0 auto;
                    }
                    .link {
                        color: rgb(0, 0, 0);
                        text-decoration: none;
                        font-size: 1em;
                        font-weight: 300;
                    }
                `}
            </style>
        </nav>
    );
};

Breadcrumb.propTypes = {
    product: PropTypes.object.isRequired,
};

export default Breadcrumb;
