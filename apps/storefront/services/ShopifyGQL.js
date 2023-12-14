import { GraphQLClient } from 'graphql-request';

const getClient = (shopifyUrl, apiToken) => {
    const apiUrl = `${shopifyUrl}api/2023-01/graphql.json`;

    const client = new GraphQLClient(apiUrl, {
        headers: {
            'X-Shopify-Storefront-Access-Token': apiToken,
            'Content-Type': 'application/json',
        },
    });

    const shopify = (query, variables = null) =>
        client
            .request(query, variables)
            .then((response) => {
                return response;
            })
            .catch((e) => {
                throw e;
            });

    return shopify;
};

export default getClient;
