import React from 'react';
import Link from 'next/link';
import { formatGTMName } from '../containers/Prismic/utils/gtm';
import {
    getCollectionLocalPath,
    getProductLocalPath,
    getPageLocalPath,
    getBlogLocalPath,
    getCountrySpecificUrl,
} from './linkHelper';
import PropTypes from 'prop-types';

const SSRLink = ({
    children,
    linkType,
    linkUrl,
    title,
    gtm_identifier,
    gtm_value,
    styles,
    className,
    regionless = false,
    asSpan,
}) => {
    let alias = getCountrySpecificUrl(linkUrl);
    let localLinkPath;
    let localLinkType = linkType;
    let localLinkUrl = linkUrl;

    const blogLink =
        linkUrl &&
        (linkUrl.indexOf('/blog/') !== -1 ||
            linkUrl.indexOf('/stories/') !== -1);

    if (blogLink) {
        localLinkType = 'Blog';
    }

    switch (localLinkType) {
        case 'Collection':
            localLinkPath = getCollectionLocalPath(alias);
            break;
        case 'Product':
            localLinkPath = getProductLocalPath(alias);
            break;
        case 'Page':
            localLinkPath = getPageLocalPath(alias);
            break;
        case 'Blog':
            localLinkPath = getBlogLocalPath(alias);
            break;
        default:
            localLinkPath = alias;
    }

    if (blogLink) {
        // TODO: temporary changes to help with link transition.
        // Remove once all links have been updated.
        // Add blog link type in Prismic.
        localLinkUrl = localLinkUrl.replace('/blog/', '/stories/');
        localLinkUrl = localLinkUrl.replace('https://', '');
        localLinkUrl = localLinkUrl.replace('http://', '');
        alias = localLinkUrl;
    }

    if (regionless) {
        alias = localLinkUrl;
        localLinkPath = alias;
    }

    if (!alias) {
        localLinkPath = '';
        alias = '';
    }

    const useATag =
        localLinkPath.includes('mailto:') ||
        localLinkPath.includes('collections');

    if (asSpan) {
        return (
            <span
                title={title || ''}
                data-event-title={title}
                data-event-description={formatGTMName(gtm_identifier)}
                data-event-value={formatGTMName(gtm_value)}
                style={styles}
                className={className}
            >
                {children || title || ''}
            </span>
        );
    }

    return (
        <>
            {useATag ? (
                <a
                    href={localLinkPath !== alias ? alias : localLinkPath}
                    title={title || ''}
                    data-event-title={title}
                    data-event-description={formatGTMName(gtm_identifier)}
                    data-event-value={formatGTMName(gtm_value)}
                    style={styles}
                    className={className}
                >
                    {children || title || ''}
                </a>
            ) : (
                <Link
                    href={localLinkPath}
                    as={localLinkPath !== alias ? alias : undefined}
                    title={title || ''}
                    data-event-title={title}
                    data-event-description={formatGTMName(gtm_identifier)}
                    data-event-value={formatGTMName(gtm_value)}
                    style={styles}
                    className={className}
                >
                    {children || title || ''}
                </Link>
            )}
        </>
    );
};

SSRLink.propTypes = {
    children: PropTypes.node,
    linkType: PropTypes.string,
    linkUrl: PropTypes.string,
    title: PropTypes.string,
    gtm_identifier: PropTypes.string,
    gtm_value: PropTypes.string,
    styles: PropTypes.object,
    className: PropTypes.string,
    regionless: PropTypes.bool,
    asSpan: PropTypes.bool,
};

export default SSRLink;
