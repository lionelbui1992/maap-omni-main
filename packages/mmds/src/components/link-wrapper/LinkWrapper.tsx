import React, { FC, ReactNode } from 'react';

const CONTEXT_DEFAULT = 'default';
// const CONTEXT_NEXT_JS = "nextjs";

type LinkWrapperProps = {
    applyLink?: boolean;
    children: ReactNode;
    href: string | undefined;
    title: string;
    externalTab?: boolean;
    className?: string;
};

// TODO: detect and return correct link type.
export const LinkWrapper: FC<LinkWrapperProps> = ({
    children,
    href,
    title = 'Untitled Link',
    className,
    externalTab,
    applyLink,
}) => {
    const context = CONTEXT_DEFAULT;

    // if(context === CONTEXT_NEXT_JS)
    //     return (<a href={href} title={title}>{children}</a>)
    // }

    return applyLink ? (
        <a
            href={href}
            title={title || ''}
            data-event-title={title}
            className={className}
            target={externalTab ? '_blank' : '_self'}
            rel="noreferrer"
        >
            {children}
        </a>
    ) : (
        children
    );
};

export default LinkWrapper;
