import { SliceZone } from '@prismicio/react';
import { createClient } from '../../../prismicio';
import { components } from 'app/slices/index';
import { Client, PrismicDocument } from '@prismicio/client';
import { notFound } from 'next/navigation';
import { AllDocumentTypes } from '../../../prismicio-types';

export default async function Page({ params }) {
    if (!params || !params?.uid) return notFound();

    let page: PrismicDocument | null = null;
    try {
        const client: Client<AllDocumentTypes> = createClient();
        page = await client.getByUID('landing_page', params.uid);
    } catch (e) {
        console.log(
            `Couldn\t fetch Prismic document with UID ${params.uid}`,
            e
        );
    }

    if (!page) {
        return notFound();
    }

    return (
        <div>
            <SliceZone slices={page.data.slices} components={components} />
        </div>
    );
}

export async function generateStaticParams() {
    const client = createClient();

    const pages = await client.getAllByType('landing_page').catch((e) => {
        console.log('Error fetching pages', e);
    });

    if (!pages) {
        return [];
    }

    return pages.map((page) => {
        return { uid: page.uid };
    });
}
