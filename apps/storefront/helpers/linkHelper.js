import { useShop } from '@lib/providers/ShopProvider';

export const getCollectionLocalPath = (link) => {
    if (!link) return null;

    const { routePrefix } = useShop();

    return routePrefix
        ? '/[country]/collections/[handle]'
        : '/collections/[handle]';
};

export const getProductLocalPath = (link) => {
    if (!link) return null;

    const { routePrefix } = useShop();

    return routePrefix ? '/[country]/products/[handle]' : '/products/[handle]';
};

export const getPageLocalPath = (link) => {
    if (!link) return null;

    const { routePrefix } = useShop();

    return routePrefix ? '/[country]/pages/[handle]' : '/pages/[handle]';
};

export const getBlogLocalPath = (link) => {
    if (!link) return null;

    if (
        link.includes('/stories/collection/[handle]') ||
        link.includes('/stories/[handle]')
    )
        return link;

    return link;
};

export const getCountrySpecificUrl = (link) => {
    if (!link) return null;

    if (
        link.includes('http://') ||
        link.includes('https://') ||
        link.includes('mailto:')
    )
        return link;

    const { routePrefix } = useShop();

    return routePrefix ? `/${routePrefix}${link}` : link;
};

export const isRegionlessRoute = (url) => {
    const regionlessSections = ['/stories', '/me'];

    let regionLess = false;
    regionlessSections.forEach((section) => {
        if (url.indexOf(section) === 0) {
            regionLess = true;
        }
    });

    return regionLess;
};

export const getTargetPathForAlternateRegion = (alternateRegion, asPath) => {
    const targetShouldBeRegionless = isRegionlessRoute(asPath);

    // Split the asPath into its pathname and search components
    const [pathname, search] = asPath.split('?');

    // Remove current country if present.
    let regionlessPath = pathname;
    regionlessPath = regionlessPath.replace('/us', '');
    regionlessPath = regionlessPath.replace('/eu', '');
    regionlessPath = regionlessPath.replace('/uk', '');

    let fullPath = regionlessPath;
    if (!targetShouldBeRegionless) {
        fullPath = `/${alternateRegion.toLowerCase()}${regionlessPath}`;
    }

    if (fullPath === '/eu/' || fullPath === '/us/' || fullPath === '/uk/')
        fullPath = fullPath.slice(0, -1);

    if (regionlessPath === '') {
        regionlessPath = '/'; // Navigate to / for AU for homepage.
    }

    // Check if the "country" parameter is in the search string
    const hasCountryParam = search ? search.includes('country=') : false;

    if (alternateRegion === 'INTL') {
        // If region is INTL, use the regionless path and exclude the country parameter
        return regionlessPath;
    }
    // If "country" is not present, append it. Otherwise, use the original search string.
    const newSearch = hasCountryParam
        ? search
        : `country=${alternateRegion.toLowerCase()}${
              search ? `&${search}` : ''
          }`;

    return `${fullPath}?${newSearch}`;
};
