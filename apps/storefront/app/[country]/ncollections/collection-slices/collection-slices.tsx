import { Suspense } from 'react';
import { SliceZone } from '@prismicio/react';
import {
    Client,
    PrismicDocument,
    Slice,
    FilledImageFieldImage,
} from '@prismicio/client';
import { AllDocumentTypes } from 'prismicio-types';
import { createClient } from 'prismicio';
import { components } from 'app/slices/index';
import { CollectionSliceSet } from './collection-slices.d';
import s from './collection-slices.module.css';

export default async ({ handle, set }) => {
    let page: PrismicDocument | null = null;
    try {
        const client: Client<AllDocumentTypes> = createClient();
        page = await client.getByUID('collection', handle);
    } catch (e) {
        console.log(`Couldn\t fetch Prismic document with UID ${handle}`, e);
    }

    if (!page) return null;

    let slices: Slice[] = [];
    let topBreakoutImage: FilledImageFieldImage | null = null;
    if (set === CollectionSliceSet.ABOVE_GRID) {
        slices = page.data.slices2;
        if (page.data.top_breakout_image) {
            topBreakoutImage = page.data.top_breakout_image;
        }
    } else if (set === CollectionSliceSet.BELOW_GRID) {
        slices = page.data.slices3;
    }

    return (
        <Suspense fallback="Loading collection...">
            <div className={s.root}>
                <SliceZone slices={slices} components={components} />
                {topBreakoutImage && (
                    <div className={s.topBreakoutImage}>
                        <img
                            src={topBreakoutImage.url}
                            height={topBreakoutImage.dimensions.height}
                            width={topBreakoutImage.dimensions.width}
                        />
                    </div>
                )}
            </div>
        </Suspense>
    );
};
