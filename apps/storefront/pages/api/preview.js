import { Client } from 'helpers/prismic';
import brandConfig from 'config/brandConfig';

const getRegionPrefix = (language) => {
    switch (language) {
        case 'en-us':
            return '/us';
        case 'en-uk':
            return '/uk';
        case 'en-eu':
            return '/eu';
        default:
            return '/au';
    }
};

export const linkResolver = (doc) => {
    const prefix = getRegionPrefix(doc.lang);
    const relevantContext = brandConfig.contexts.find((context) => {
        return context.language === doc.lang;
    });

    const regionString = `?region=${relevantContext.code}`;

    if (doc.tags.indexOf('HOMEPAGE') !== -1) return `${prefix}${regionString}`;

    switch (doc.type) {
        case 'product':
        case 'product_additional_information':
            return `${prefix}/products/${doc.uid}${regionString}`;
        case 'collection':
            return `${prefix}/collections/${doc.uid}${regionString}`;
        case 'blog_article':
            return `/stories/${doc.uid}${regionString}`;
        default:
            return `/pages/${doc.uid}${regionString}`;
    }
};

export default async function preview(req, res) {
    const { token: ref, documentId } = req.query;

    const url = await Client(req)
        .getPreviewResolver(ref, documentId)
        .resolve(linkResolver, '/');

    if (!url) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    res.setPreviewData({
        ref,
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    res.write(
        `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
        <script>window.location.href = '${siteUrl}${url}'</script>
    </head>`
    );

    res.end();
    return null;
}
