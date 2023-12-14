import brandConfig from '@config/brandConfig';

/**
 * Gets the correct store context from brand config for a given routePrefix from
 * const { country } = params;
 *
 * export async function getStaticProps({ params }) {
 *   const { country } = params;
 *   const shopContext = getContext(country);
 *
 * }
 * @param country - THIS IS ACTUALLY CODE OR PREFIX>?
 */
export function getContext(country: string | null) {
    if (!country || ['au', 'intl'].indexOf(country.toLowerCase()) !== -1) {
        return brandConfig.contexts.find((context) => context.default);
    }

    return brandConfig.contexts.find(
        (context) => context.routePrefix === country
    );
}

export function getContextByRegion(region: string) {
    return brandConfig.contexts.find((context) => context.region === region);
}
