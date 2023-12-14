import { Context, Environment } from './Context';
import staging from '@app/lib/store-context/staging';
import production from '@app/lib/store-context/production';

const environment: Environment =
    process.env.NEXT_PUBLIC_STAGING_ENV === 'true' ? staging : production;

/**
 * Gets the correct store context from brand config for a given routePrefix from
 * const { country } = params;
 *
 * export default async function Page({ params }) {
 *   const context = getContext(params.country);
 *   const clientSettings: ShopifyClientContext = {
 *       shopifyDomain: context.shopifyStorefrontUrl,
 *   }
 * }
 */
export function getContext(country: string | null): Context {
    const { contexts } = environment;
    const defaultContext: Context = contexts[0];
    const countryContext = contexts.find(
        (context) => context.routePrefix === country
    );
    return countryContext || defaultContext;
}
