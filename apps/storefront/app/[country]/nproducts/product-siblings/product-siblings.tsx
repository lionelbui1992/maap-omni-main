import Link from 'next/link';
import cn from 'clsx';
import s from './product-siblings.module.css';
import { StaticImage } from 'mmds';
import fetchAllSiblingImages from '@app/lib/shopify/methods/fetch-sibling-images';
import { captureException } from '@sentry/nextjs';
import { BasicSibling, ExtendedSibling } from './types';

// First, we need to parse the sibling metadata. Then we can use the handles to fetch the sibling thumbnails. After that, we need to add or merge the image data into the sibling object so we can consume it in our StaticImage component
async function parseAndMergeSiblings(product): Promise<ExtendedSibling[]> {
    let siblings: BasicSibling[] = [];
    try {
        const siblingsMetafield = product?.metafields.find(
            (metafield) =>
                metafield?.namespace === 'related_products' &&
                metafield?.key === 'siblings'
        );

        if (siblingsMetafield) {
            siblings = JSON.parse(siblingsMetafield.value);
            const siblingImages = await fetchAllSiblingImages(siblings);
            return siblings.map((sibling) => {
                const siblingImage = siblingImages.find(
                    (image) => image.handle === sibling.handle
                );
                return {
                    ...sibling,
                    image: siblingImage?.image?.transformedSrc || null,
                    altText:
                        siblingImage?.image?.altText || 'Product thumbnail',
                };
            });
        }
    } catch (err) {
        console.error('Unable to parse siblings JSON:', err.message);
        captureException(err);
    }
    return siblings;
}

const ProductSiblings = async ({ product }) => {
    if (!product) {
        return null;
    }

    const siblings = await parseAndMergeSiblings(product);

    return (
        <div className={cn(s.stack, s.region)}>
            <dl className={cn(s.cluster, 'mmds-component-one-detail')}>
                <dt className="hidden-on-mobile">
                    {product.options[0].name} :{' '}
                </dt>
                <dd>{siblings[0]?.title}</dd>
            </dl>
            <nav>
                <ul role="list" className={s.imageCluster}>
                    {siblings.map(({ handle, image, altText }, index) => {
                        const siblingClass = cn({
                            [s.selected]: handle === product.handle,
                        });
                        return (
                            <li key={index} className={siblingClass}>
                                <Link href={`/nproducts/${handle}`}>
                                    <StaticImage
                                        desktopImage={image}
                                        desktopWidth={'83'}
                                        desktopHeight={'105'}
                                        mobileImage={image}
                                        mobileWidth={'48'}
                                        mobileHeight={'64'}
                                        altDescription={altText}
                                    />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};

export default ProductSiblings;
