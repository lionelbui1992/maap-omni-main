import { Client } from 'helpers/prismic';
import { captureException } from '@sentry/nextjs';

export default async function fetchCollectionSeo(
    locale: string | number | string[] | null = null,
    handle: string
) {
    const prismicClient = Client();
    let queryOptions = {};
    if (locale) {
        queryOptions = { lang: locale };
    }

    try {
        const doc = await prismicClient.getByUID(
            'collection',
            handle,
            queryOptions
        );
        if (!doc) {
            console.log(
                `No document found for collection with handle: "${handle}"`
            );
            return null;
        }
        return doc.data;
    } catch (e) {
        console.error(`Couldn't fetch Prismic data for "${handle}"`, e);
        captureException(e);
    }

    return null;
}
