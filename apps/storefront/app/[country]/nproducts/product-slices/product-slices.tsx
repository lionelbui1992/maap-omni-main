import { Suspense } from 'react';
import { SliceZone } from '@prismicio/react';
import { Client, PrismicDocument, Slice } from '@prismicio/client';
import { AllDocumentTypes } from 'prismicio-types';
import { createClient } from 'prismicio';
import { components } from 'app/slices/index';

export default async ({ handle }) => {
    let page: PrismicDocument | null = null;
    try {
        const client: Client<AllDocumentTypes> = createClient();
        page = await client.getByUID('product', handle);
    } catch (e) {
        console.log(`No Prismic slices for product [${handle}]`);
    }

    if (!page) return null;

    const slices: Slice[] = page.data.slices;

    return (
        <Suspense fallback="Loading product...">
            <SliceZone slices={slices} components={components} />
        </Suspense>
    );
};
