import { SliceZone } from '@prismicio/react';
import { createClient } from '../../prismicio';
import { components } from 'app/slices/index';
import { Client, PrismicDocument } from '@prismicio/client';
import { notFound } from 'next/navigation';
import { AllDocumentTypes } from '../../prismicio-types';

export default async function Page() {
    let page: PrismicDocument | null = null;
    try {
        const client: Client<AllDocumentTypes> = createClient();
        page = await client.getByUID('content-library', 'content-library');
    } catch (e) {
        console.log(
            `Couldn\t fetch Prismic document with UID content-library`,
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
