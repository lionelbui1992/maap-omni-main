import React from 'react';
import Link from 'next/link';
import { formatGTMName } from '../../utils/gtm';
import {
    getProductLocalPath,
    getPageLocalPath,
    getCountrySpecificUrl,
} from 'helpers/linkHelper';

const SSRLink = ({
    children,
    linkType,
    linkUrl,
    title,
    gtm_identifier,
    gtm_value,
    styles,
    className,
    externalTab,
    asSpan,
}) => {
    if (!linkUrl) return null;
    let localLinkPath = linkUrl;

    switch (linkType) {
        case 'Collection':
            localLinkPath = getCountrySpecificUrl(linkUrl);
            break;
        case 'Product':
            localLinkPath = getProductLocalPath(linkUrl);
            break;
        case 'Page':
            localLinkPath = getPageLocalPath(linkUrl);
            break;
        default:
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
                        {children}
                    </span>
                );
            }
            return (
                <a
                    href={linkUrl}
                    title={title || ''}
                    data-event-title={title}
                    data-event-description={formatGTMName(gtm_identifier)}
                    data-event-value={formatGTMName(gtm_value)}
                    style={styles}
                    className={className}
                    target={externalTab ? '_blank' : '_self'}
                    rel="noreferrer"
                >
                    {children}
                </a>
            );
    }

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
                {children}
            </span>
        );
    }
    return (
        <Link
            href={localLinkPath}
            as={linkUrl}
            title={title || ''}
            data-event-title={title}
            data-event-description={formatGTMName(gtm_identifier)}
            data-event-value={formatGTMName(gtm_value)}
            style={styles}
            target={externalTab ? '_blank' : '_self'}
            rel="noreferrer"
        >
            {children}
        </Link>
    );
};

export default SSRLink;
