import React from 'react';
import brandConfig from 'config/brandConfig';
import { getTargetPathForAlternateRegion } from 'helpers/linkHelper';

const Canonicals = (router) => {
    const constructUrl = (path) => {
        return `https://maap.cc${path}`;
    };

    const constructLink = (key, hrefLang, url) => (
        <link
            key={`alternates_${key}`}
            rel="alternate"
            hrefLang={hrefLang}
            href={url}
        />
    );

    const selfReferencingCanonical = (
        <link
            key="self_referencing_canonical"
            rel="canonical"
            href={constructUrl(router.asPath)}
        />
    );

    const alternates = brandConfig.contexts.map((context, key) => {
        const linkTarget = getTargetPathForAlternateRegion(
            context.code,
            router.asPath
        );
        const linkMarkup = constructLink(
            key,
            context.hrefLang,
            constructUrl(linkTarget, context.routePrefix)
        );
        if (context.default) {
            return [
                linkMarkup,
                constructLink(
                    `_default_${key}`,
                    'x-default',
                    constructUrl(linkTarget, context.routePrefix)
                ),
            ];
        }
        return linkMarkup;
    });

    return [selfReferencingCanonical, alternates];
};

export default Canonicals;
