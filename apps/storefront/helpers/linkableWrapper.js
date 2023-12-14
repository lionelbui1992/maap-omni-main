import React from 'react';
import SSRLink from '@containers/Prismic/PrismicComponents/SSRLink';

export const LinkableWrapper = ({
    applyLink = false,
    linkUrl,
    className,
    children,
    externalTab,
}) => {
    return applyLink ? (
        <SSRLink
            linkType={'collections' || 'products'}
            linkUrl={linkUrl}
            className={className}
            styles={{ textDecoration: `none` }}
            externalTab={externalTab}
        >
            {children}
        </SSRLink>
    ) : (
        children
    );
};
