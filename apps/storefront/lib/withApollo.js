import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import withApollo from 'next-with-apollo';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import fetch from 'isomorphic-unfetch';
import { getContext } from '@lib/get-context';

const auContext = getContext('intl');
const usContext = getContext('us');
const euContext = getContext('eu');
const ukContext = getContext('uk');

const getToken = (context) => context.shopifyStorefrontToken;

const httpLinkAU = createHttpLink({
    fetch,
    uri: `${auContext.shopifyStorefrontUrl}api/2023-01/graphql.json`,
});

const httpLinkEU = createHttpLink({
    fetch,
    uri: `${euContext.shopifyStorefrontUrl}api/2023-01/graphql.json`,
});

const httpLinkUS = createHttpLink({
    fetch,
    uri: `${usContext.shopifyStorefrontUrl}api/2023-01/graphql.json`,
});

const httpLinkUK = createHttpLink({
    fetch,
    uri: `${ukContext.shopifyStorefrontUrl}api/2023-01/graphql.json`,
});

const middlewareLinkAU = setContext(() => {
    return {
        headers: {
            'X-Shopify-Storefront-Access-Token': getToken(auContext),
        },
    };
});

const middlewareLinkEU = setContext(() => {
    return {
        headers: {
            'X-Shopify-Storefront-Access-Token': getToken(euContext),
        },
    };
});

const middlewareLinkUS = setContext(() => {
    return {
        headers: {
            'X-Shopify-Storefront-Access-Token': getToken(usContext),
        },
    };
});

const middlewareLinkUK = setContext(() => {
    return {
        headers: {
            'X-Shopify-Storefront-Access-Token': getToken(ukContext),
        },
    };
});

const ukOrEULink = ApolloLink.split(
    (operation) => {
        return (
            operation.getContext().clientName &&
            operation.getContext().clientName.toLowerCase() === 'uk'
        );
    },
    middlewareLinkUK.concat(httpLinkUK),
    middlewareLinkEU.concat(httpLinkEU)
);

const otherLinks = ApolloLink.split(
    (operation) => {
        return (
            operation.getContext().clientName &&
            operation.getContext().clientName.toLowerCase() === 'intl'
        );
    },
    middlewareLinkAU.concat(httpLinkAU),
    ukOrEULink
);

const link = ApolloLink.split(
    (operation) => {
        return (
            operation.getContext().clientName &&
            operation.getContext().clientName.toLowerCase() === 'us'
        );
    },
    middlewareLinkUS.concat(httpLinkUS),
    otherLinks
);

export default withApollo(() => {
    return new ApolloClient({
        link,
        cache: new InMemoryCache(),
    });
});
