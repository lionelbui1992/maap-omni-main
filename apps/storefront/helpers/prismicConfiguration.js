import brandConfig from '../config/brandConfig';

export const apiEndpoint = brandConfig.services.prismic.repositoryUrl;
export const { accessToken } = brandConfig.services.prismic;

const getRegionPrefix = (language) => {
    switch (language) {
        case 'en-us':
            return '/us';
        case 'en-uk':
            return '/uk';
        case 'en-eu':
        case 'en-gb':
            return '/eu';
        default:
            return '/au';
    }
};

export const linkResolver = (doc) => {
    const prefix = getRegionPrefix(doc.lang);

    if (doc.tags.indexOf('HOMEPAGE') !== -1) return `/${prefix}`;

    switch (doc.type) {
        case 'product':
        case 'product_additional_information':
            return `/${prefix}/products/${doc.uid}`;
        case 'collection':
            return `/${prefix}/collections/${doc.uid}`;
        case 'blog_article':
            return `/stories/${doc.uid}`;
        default:
            return `/${prefix}/pages/${doc.uid}`;
    }
};
