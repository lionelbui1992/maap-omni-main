import { Client } from '@prismicio/client';
import { getDocByUid } from '@app/lib/prismic/prismicio-client';
import { AllDocumentTypes } from 'prismicio-types';
import { createClient } from 'prismicio';
import { ProductInformationDocumentData } from 'prismicio-types';
import fetchFabricDetails from '@app/lib/prismic/methods/fetch-fabric-details';
import { getUIDFromTags } from '../helpers/get-uid-from-tags';

export const fetchPrismicDataForProduct = async (product) => {
    const mmdsClient: Client<AllDocumentTypes> = createClient();
    const locale = undefined; // TODO: Dynamically pass in the locale

    const fabricUID = getUIDFromTags(product.tags, 'prismic-fabric-info:');
    const warrantyUID = getUIDFromTags(product.tags, 'prismic-warranty:');
    const sizeGuideUID = getUIDFromTags(product.tags, 'prismic-size-guide:');
    const shippingAndReturnsUID = getUIDFromTags(
        product.tags,
        'prismic-delivery:'
    );

    // Fetch from legacy prismic repo
    const fabricDetails = await fetchFabricDetails(
        'fabric_temperature_information',
        fabricUID as string
    );

    // Fetch from new prismic repo
    const [warrantyDoc, shippingDoc, sizeGuideDoc] = await Promise.all([
        getDocByUid(
            'product_information',
            warrantyUID as string,
            mmdsClient,
            locale
        ),
        getDocByUid(
            'product_information',
            shippingAndReturnsUID as string,
            mmdsClient,
            locale
        ),
        getDocByUid(
            'product_information',
            sizeGuideUID as string,
            mmdsClient,
            locale
        ),
    ]);

    const warranty: ProductInformationDocumentData | null = warrantyDoc?.data;
    const shipping: ProductInformationDocumentData | null = shippingDoc?.data;
    const sizeGuide: ProductInformationDocumentData | null = sizeGuideDoc?.data;

    return { fabricDetails, warranty, shipping, sizeGuide };
};
