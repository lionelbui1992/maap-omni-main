import production from './production.ts';
import staging from './staging.ts';

const config =
    process.env.NEXT_PUBLIC_STAGING_ENV === 'true' ? staging : production;

export default config;

export function getOptionForRegion(option, regionCode) {
    return config.contexts.find(
        (context) => context.code.toLowerCase() === regionCode.toLowerCase()
    )[option];
}
