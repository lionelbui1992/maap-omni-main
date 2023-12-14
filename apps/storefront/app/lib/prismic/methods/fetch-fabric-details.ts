import { Client } from 'helpers/prismic';
import { captureException } from '@sentry/nextjs';

export default async function fetchFabricDetails(
    doctype: string,
    uid: string,
    locale: string | number | string[] | null = null
) {
    // NB. We want an instance of the 'maap' repo client here, not the 'maap-mmds' client
    const prismicClient = Client();

    // TODO: Devise a global strategy for handling locales?
    let queryOptions = {};
    if (locale) {
        queryOptions = { lang: locale };
    }

    try {
        const doc = await prismicClient.getByUID(doctype, uid, queryOptions);
        if (!doc) {
            console.log(`No document found for "${doctype}" with UID "${uid}"`);
            return null;
        }

        const fabric = {
            productWeight: doc.data.body[0]?.primary.product_weight[0]?.text,
            mainFabricContent:
                doc.data.body[0]?.primary.main_fabric_content[0]?.text,
            mainFabricWeight:
                doc.data.body[0]?.primary.main_fabric_weight_description[0]
                    ?.text,
        };

        const temperature = {
            temperatureRange: doc.data.body[1],
        };

        const items = doc?.data?.body[0]?.items;
        const details = {
            bulletText: items.map((item) => item.bullet[0]?.text),
        };

        // Return the data divided into categories
        return {
            fabric,
            temperature,
            details,
        };
    } catch (e) {
        console.error(
            `Couldn't fetch Prismic data for "${doctype}" with UID "${uid}"`,
            e
        );
        captureException(e);
    }

    return null;
}
