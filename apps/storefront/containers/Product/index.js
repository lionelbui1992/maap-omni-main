import React, { useState, useEffect } from 'react';
import { ProductPrismicDocumentsProvider } from '@lib/providers/ProductPrismicDocumentsProvider';
import { useRouter } from 'next/router';
import Header from 'containers/Product/Header';
import Breadcrumb from 'containers/Product/Breadcrumb';
import LifestyleImages from 'containers/Product/LifestyleImages';
import ProductReviewsWithSchema from 'containers/Product/ProductReviewsWithSchema';
import { useEvent } from '@lib/providers/EventsProvider';
import { useShop } from '@lib/providers/ShopProvider';

const GID = (id) =>
    Buffer.from(`gid://shopify/ProductVariant/${id}`).toString('base64');

const Product = ({
    isMobile,
    isTablet,
    url,
    product,
    structuredVariants,
    defaultVariant,
    imagery,
    seoValues,
    prismicDocuments,
}) => {
    if (!product) return null;
    const { event } = useEvent();
    const { storefrontUrl } = useShop();
    const { query } = useRouter();

    let initialVariant = defaultVariant;

    if (query.variant) {
        const queryVariantID = GID(query.variant);
        const urlVariant = product.variants.edges.find((edge) => {
            const { node: variant } = edge;
            return variant.id === queryVariantID;
        });
        if (urlVariant) {
            initialVariant = urlVariant.node;
        }
    }

    const [selectedVariant, setSelectedVariant] = useState(initialVariant);

    const onSelectVariant = (size) => {
        const selectedVariantData = structuredVariants.find(
            (variant) => variant.size === size
        );

        setSelectedVariant(selectedVariantData.variant);
    };

    useEffect(() => {
        setSelectedVariant(initialVariant);
    }, [initialVariant]);

    useEffect(() => {
        const sizeOption = selectedVariant.selectedOptions.find(
            (option) => option.name.toLowerCase() === 'size'
        );
        if (selectedVariant) {
            const variantEventInfo = {
                productURL: `${storefrontUrl}${url.substr(1)}`,
                productTitle: product.title,
                productId: product.id,
                sku: selectedVariant.sku,
                handle: product.handle,
                variant: selectedVariant.title,
                size: sizeOption ? sizeOption.value : null,
                productPrice: selectedVariant.priceV2?.amount,
                productCompareAtPrice: selectedVariant.compareAtPriceV2?.amount,
                currencyCode: selectedVariant.priceV2?.currencyCode,
                compareAtPrice:
                    selectedVariant?.compareAtPriceV2?.compareAtPrice,
                imageUrl:
                    selectedVariant.product?.images?.edges[0]?.node
                        ?.transformedSrc,
                quantity: 1,
            };
            event('ViewProduct', variantEventInfo);
        }
    }, [, selectedVariant]);

    return (
        <>
            <article id="product_details_page" className="product">
                <div className="hidden_on_mobile">
                    <Breadcrumb product={product} />
                </div>
                <ProductPrismicDocumentsProvider documents={prismicDocuments}>
                    <Header
                        imagery={imagery}
                        product={product}
                        url={url}
                        onSelectVariant={onSelectVariant}
                        selectedVariant={selectedVariant}
                        structuredVariants={structuredVariants}
                        seoValues={seoValues}
                        isMobile={isMobile}
                        isTablet={isTablet}
                    />
                    <LifestyleImages imagery={imagery} />
                </ProductPrismicDocumentsProvider>
            </article>
            {selectedVariant && (
                <div>
                    <div className="divider hidden_on_desktop"></div>
                    <section
                        id="product-reviews"
                        key={`reviews for ${selectedVariant.sku}`}
                    >
                        <ProductReviewsWithSchema
                            product={product}
                            selectedVariant={selectedVariant}
                        />
                    </section>
                </div>
            )}
            <style jsx global>
                {`
                    .loader_image {
                        height: 5em;
                        width: 5em;
                        padding: 10em 10em;
                        margin: auto;
                    }
                    .CombinedWidget.reviews-combined-widget--maap {
                        z-index: 0 !important;
                    }
                `}
            </style>
            <style jsx>
                {`
                    .divider {
                        border-bottom: 2px solid rgb(0, 0, 0);
                    }
                `}
            </style>
        </>
    );
};

export default Product;
