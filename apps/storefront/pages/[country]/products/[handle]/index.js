import ProductPage from 'pages/products/[handle]';
import { getContext } from '@lib/get-context';
import {
    generatePropsForContext,
    getPopularProducts,
} from 'containers/Product/ssgHelpers';

export async function getStaticProps({ params }) {
    const { handle, country } = params;

    const props = await generatePropsForContext(getContext(country), handle);

    if (!props.product) {
        return {
            notFound: true,
        };
    }

    return {
        props,
        revalidate: 360,
    };
}

export async function getStaticPaths() {
    let usPaths = [];
    let euPaths = [];
    let ukPaths = [];

    const popularProductsUSPromise = getPopularProducts(getContext('us'));
    const popularProductsEUPromise = getPopularProducts(getContext('eu'));
    const popularProductsUKPromise = getPopularProducts(getContext('uk'));

    const promiseResult = (result, country) => {
        const edges = result.status === 'fulfilled' ? result.value : [];
        return edges.map((edge) => ({
            params: { country, handle: edge.node.handle },
        }));
    };

    await Promise.allSettled([
        popularProductsUSPromise,
        popularProductsEUPromise,
        popularProductsUKPromise,
    ]).then((results) => {
        usPaths = promiseResult(results[0], 'us');
        euPaths = promiseResult(results[1], 'eu');
        ukPaths = promiseResult(results[2], 'uk');
    });

    const paths = [...usPaths, ...euPaths, ...ukPaths];

    return {
        paths,
        fallback: 'blocking',
    };
}

export default ProductPage;
