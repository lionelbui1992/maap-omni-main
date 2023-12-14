import React, { useContext } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { breakpointSmall } from 'config/styles/breakpoints';
import { brandBlack, brandSelectedGrey } from 'config/styles/colours';
import { formatPrismicText } from 'containers/Prismic/utils/prismic';
import { useShop } from '@lib/providers/ShopProvider';

const BlogBreadcrumb = ({ blockTitle }) => {
    const { storefrontUrl } = useShop();
    const { asPath } = useRouter();
    const level1 = 'MAAP Stories';
    const level2 = formatPrismicText(blockTitle)
        ? formatPrismicText(blockTitle).replace(/"/g, '')
        : '';
    const slash = <span>&nbsp;/&nbsp;</span>;
    const leve2BreadcrumbLink = asPath;

    return (
        <>
            <div className="blog_breadcrumb">
                <Link as="/stories" href="/stories" legacyBehavior>
                    <a>{level1}</a>
                </Link>
                {!level2 ? '' : slash}
                <Link
                    as={leve2BreadcrumbLink}
                    href={leve2BreadcrumbLink}
                    legacyBehavior
                >
                    <a>{level2}</a>
                </Link>
            </div>
            {level2 === '' ? (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: `{
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": "1",
                                "name": "${level1}",
                                "item": "${storefrontUrl}stories"
                            }

                        ]
                    }`,
                    }}
                />
            ) : (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: `{
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": "1",
                            "name": "${level1}",
                            "item": "${storefrontUrl}stories"
                        },
                        {
                            "@type": "ListItem",
                            "position": "2",
                            "name": "${level2}",
                            "item": "${storefrontUrl}stories${leve2BreadcrumbLink}"
                        }
                      ]
                    }`,
                    }}
                />
            )}

            <style jsx>
                {`
                    .blog_breadcrumb {
                        background-color: ${brandSelectedGrey};
                        padding: 10px 54px;
                        font-weight: 300;
                        font-size: 1em;
                    }
                    a {
                        color: ${brandBlack};
                        text-decoration: none;
                    }
                    @media (max-width: ${breakpointSmall}) {
                        .blog_breadcrumb {
                            padding: 10px 40px;
                        }
                    }
                `}
            </style>
        </>
    );
};

BlogBreadcrumb.propTypes = {
    blockTitle: PropTypes.array,
};

export default BlogBreadcrumb;
