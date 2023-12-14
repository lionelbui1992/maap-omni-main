import { Context } from './Context';
import { getContext } from './get-context';

export function getOptionForRegion(
    option: string,
    regionCode: string
): string | null {
    const context: Context = getContext(regionCode);

    if (!context)
        throw new Error(`No context found for region code ${regionCode}`);

    return context[option];
}
