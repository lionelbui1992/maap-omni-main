import products from '@lib/gql/products';
import getClient from 'services/ShopifyGQL';

const getAllProducts = async (shopContext) => {
    const { shopifyStorefrontUrl, shopifyStorefrontToken } = shopContext;
    const shopify = getClient(shopifyStorefrontUrl, shopifyStorefrontToken);

    const allProductEdges = [];
    const getAllProductsQuery = products();
    const queryResponse = await shopify(getAllProductsQuery);
    const shopifyProducts = queryResponse?.products;
    allProductEdges.push(...shopifyProducts.edges);

    let moreProductsAvailable = shopifyProducts?.pageInfo.hasNextPage;

    if (moreProductsAvailable) {
        let lastCursor = shopifyProducts.pageInfo.endCursor;

        while (moreProductsAvailable) {
            const nextProductsGqlQuery = products(lastCursor);
            const nextResponse = await shopify(nextProductsGqlQuery);
            const nextSet = nextResponse.products;

            allProductEdges.push(...nextSet.edges);

            moreProductsAvailable = nextSet.pageInfo.hasNextPage;
            lastCursor = nextSet.pageInfo.endCursor;
        }
    }

    return allProductEdges;
};

export default getAllProducts;
