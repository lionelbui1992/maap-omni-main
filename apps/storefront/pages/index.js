import { getContext } from '@lib/get-context';
import Index, { getCmsProps } from './[country]';
import { getShopifyPageByHandle } from '../helpers/pages';
import { seoValuesWithDefaults } from '../helpers/metafields';

export async function getStaticProps({ params, preview = false }) {
    const shopContext = getContext(null);
    const cmsProps = await getCmsProps(shopContext, shopContext.language);
    const shopifyPage = await getShopifyPageByHandle(shopContext, 'homepage');

    const seoValues = seoValuesWithDefaults(shopifyPage?.seo, {
        title: `${shopifyPage.title} ${shopContext.metaTitlePostfix}`,
        description: `${shopifyPage?.bodySummary}`,
    });

    return {
        props: {
            seoValues,
            shopContext,
            preview,
            ...cmsProps,
        },
        revalidate: 900,
    };
}

export default Index;
