import { getClient, productImagesByHandle } from '@app/lib/shopify';
import BasicSibling from '@app/lib/maap/types/BasicSibling';
import { Image } from 'shopify-storefront-api-typings';
import { captureException } from '@sentry/nextjs';

async function fetchImageForHandle(
    handle: string
): Promise<{ handle: string; image: Image | null }> {
    try {
        const response = await getClient().request.send({
            query: productImagesByHandle,
            variables: { handle },
        });

        let imageEdge = response.productByHandle.images.edges.find(({ node }) =>
            node.transformedSrc.includes('_LP_FLATLAY')
        );

        if (!imageEdge) {
            imageEdge = response.productByHandle.images.edges.find(({ node }) =>
                node.transformedSrc.includes('_PRODUCT_CARD_HERO')
            );
        }

        return { handle, image: { ...imageEdge.node } };
    } catch (e) {
        console.error(
            `Couldn't fetch images for sibling product with handle "${handle}"`,
            e
        );
        captureException(e);
        return { handle, image: null };
    }
}

// TODO: return type
export default async function fetchAllSiblingImages(siblings: BasicSibling[]) {
    if (!Array.isArray(siblings)) {
        console.error('Invalid siblings data:', siblings);
        return [];
    }

    const imagePromises = siblings.map((sibling) =>
        fetchImageForHandle(sibling?.handle)
    );

    return Promise.all(imagePromises);
}
