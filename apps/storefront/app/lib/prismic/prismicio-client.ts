import * as prismic from '@prismicio/client';
import * as prismicNext from '@prismicio/next';
import sm from '../../../slicemachine.config.json';
import { captureException } from '@sentry/nextjs';

export const repositoryName = prismic.getRepositoryName(sm.apiEndpoint);

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismicNext.CreateClientConfig} - Configuration for the Prismic client.
 */
export function createClient(config: any = {}) {
    const client = prismic.createClient(sm.apiEndpoint, {
        ...config,
        accessToken: process.env.NEXT_PUBLIC_PRISMIC_TOKEN,
    });

    prismicNext.enableAutoPreviews({
        client,
        previewData: config?.previewData,
        req: config?.req,
    });

    return client;
}

export const getDocByUid = async (
    doctype: string,
    uid: string,
    client: prismic.Client,
    locale: string | undefined,
    fallback: boolean = true
) => {
    if (!uid) return null;

    let doc: any = null;
    try {
        doc = await client.getByUID(doctype, uid, { lang: locale });
    } catch (e) {
        console.log('Error getting doc by uid', uid, e);
        captureException(e);
    }

    if (!doc && fallback) {
        try {
            doc = await client.getByUID(doctype, uid);
        } catch (e) {
            console.log('Error getting doc by uid', uid, e);
            captureException(e);
        }
    }

    return doc;
};

export const getDocByType = async (
    doctype: string,
    client: prismic.Client,
    locale: string | undefined,
    fallback: boolean = true
) => {
    let doc: any = null;
    try {
        doc = await client.getByType(doctype, { lang: locale });
    } catch (e) {
        console.log('Error getting doc by type', doctype, e);
        captureException(e);
    }

    if (!doc && fallback) {
        try {
            doc = await client.getByType(doctype);
        } catch (e) {
            console.log('Error getting doc by type', doctype, e);
            captureException(e);
        }
    }

    return doc;
};
