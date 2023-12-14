import { fetchPrismicDataForProduct } from '@app/lib/prismic/methods/fetch-prismic-data-for-product';
import { notFound } from 'next/navigation';
import ProductHero from '../product-hero/product-hero';
import ProductSlices from '../product-slices/product-slices';
import ProductSiblings from '../product-siblings';
import ProductAssistance from '../product-assistance';
import ProductDescription from '../product-description';
import ProductDetails from '../product-details';
import ProductFeatures from '../product-features';
import ProductSpecs from '../product-specs';
import { Product as ShopifyProduct } from 'shopify-storefront-api-typings';
import {
    returnLongDescription,
    normaliseProductDetails,
    returnFeatures,
    returnFeatureImages,
} from '../utilities';
import { fetchAndTransformGoogleSizeGuideData } from '@app/lib/google/methods/fetch-google-size-guide-data';
import { getContext } from '@app/lib/store-context/get-context';
import { ShopifyClientContext } from '@app/lib/shopify/client';
import { getClient, productByHandle } from '@app/lib/shopify';

export default async function Page({ params }) {
    if (!params || !params?.handle) return notFound();

    let product: ShopifyProduct | null = null;
    const context = getContext(params.country);
    const clientSettings: ShopifyClientContext = {
        shopifyDomain: context.shopifyDomain,
        storefrontAccessToken: context.shopifyStorefrontToken,
        languageCode: context.shopifyStorefrontToken,
        countryCode: context.shopifyStorefrontToken,
    };
    try {
        const productRes = await getClient(clientSettings).request.send({
            query: productByHandle,
            variables: { handle: params?.handle },
        });

        product = productRes?.productByHandle;
    } catch (error) {
        console.log(
            `Couldn\t fetch products with handle: ["${params.handle}"]`,
            error
        );
    }

    if (!product) return notFound();

    // PRISMIC DATA
    const { fabricDetails, warranty, shipping, sizeGuide } =
        await fetchPrismicDataForProduct(product);

    // GOOGLE SHEETS DATA
    const googleSizeGuideData = await fetchAndTransformGoogleSizeGuideData();

    // Transformations, where required
    const images = product.images.edges.map((edge) => {
        const { transformedSrc, altText } = edge.node;
        return {
            src: transformedSrc,
            alt: altText || 'Product Image',
        };
    });
    const description = returnLongDescription(product);
    const details = normaliseProductDetails(product, fabricDetails?.details);
    const { fabric, temperature } = fabricDetails || {};
    const featureImages = returnFeatureImages(images);
    const features = returnFeatures(product, featureImages);

    return (
        <>
            <ProductHero product={product} images={images} />
            <hr className="divider hidden-on-desktop" />
            <ProductSiblings product={product} />
            <hr className="divider" />
            <ProductAssistance
                product={product}
                warranty={warranty}
                shipping={shipping}
                sizeGuide={sizeGuide}
                googleSizeGuideData={googleSizeGuideData}
            />
            <ProductDescription description={description} />
            <ProductDetails details={details} />
            {featureImages.length > 0 && (
                <ProductFeatures features={features} />
            )}
            <ProductSpecs fabric={fabric} temperature={temperature} />
            <ProductSlices handle={params?.handle} />
        </>
    );
}
