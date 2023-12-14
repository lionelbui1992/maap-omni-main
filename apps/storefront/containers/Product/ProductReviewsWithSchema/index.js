import React from 'react';
import Script from 'next/script';
import { useShop } from '@lib/providers/ShopProvider';
import { getProductControlMode } from '@lib/get-product-control-mode';
import dayjs from 'dayjs';
import { getCountrySpecificUrl } from 'helpers/linkHelper';

const ProductReviewsWithSchema = ({ selectedVariant, product }) => {
    const { storefrontUrl, defaultCurrencyCode } = useShop();

    const controlMode = getProductControlMode(product, selectedVariant);

    const variantSkus = product?.variants.edges
        .map((edge) => edge.node.sku)
        .filter(Boolean);

    // THESE are used in 2 places. Dry up.
    const productImages = product?.images?.edges.map(
        (image) => image.node.transformedSrc
    );

    const shortDescription = (() => {
        const metafield = product?.metafields?.edges?.find(
            (edge) =>
                edge.node.namespace === 'product' &&
                edge.node.key === 'short_description'
        );

        return metafield ? metafield?.node.value : '';
    })();

    const firstVariantSku = product?.variants.edges[0].node.sku;
    const productLevelAvailability = product.availableForSale;
    // const schemaProductAvailability = productLevelAvailability
    //     ? 'https://schema.org/InStock'
    //     : 'https://schema.org/OutOfStock';

    let schemaProductAvailability;
    if (controlMode === 'standard') {
        schemaProductAvailability = 'https://schema.org/InStock';
    }
    if (controlMode === 'soldout' || controlMode === 'brochure') {
        schemaProductAvailability = 'https://schema.org/OutOfStock';
    }
    if (controlMode === 'discontinued') {
        schemaProductAvailability = 'https://schema.org/Discontinued';
    }
    if (controlMode === 'preorder') {
        schemaProductAvailability = 'https://schema.org/PreOrder';
    }

    const fullUrl = `${storefrontUrl}${getCountrySpecificUrl(
        `/products/${product.handle}`
    ).slice(1)}`;

    const structuredData = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: product.title ? product.title : null,
        image: [productImages[3]],
        description: shortDescription,
        sku: firstVariantSku,
        brand: {
            '@type': 'Brand',
            name: 'MAAP',
        },
        offers: {
            '@type': 'Offer',
            url: fullUrl,
            priceCurrency: defaultCurrencyCode,
            price:
                selectedVariant?.priceV2?.amount ||
                product?.priceRange?.minVariantPrice?.amount,
            priceValidUntil: dayjs().add(3, 'days').format('YYYY-MM-DD'),
            itemCondition: 'https://schema.org/NewCondition',
            availability: schemaProductAvailability,
        },
    };

    return (
        <section>
            <div id="reviewsWidget"></div>
            <Script
                id="reviewsWidget"
                src="https://widget.reviews.io/maap/dist.js"
                strategy="afterInteractive"
                onLoad={() => {
                    if (ReviewsWidget) {
                        new ReviewsWidget('#reviewsWidget', {
                            store: 'maap',
                            widget: 'combined-updated',
                            options: {
                                types: 'product_review', // store_review,product_review,questions (choose what content you prefer to show in this widget)
                                per_page: 10, // Any number (set how many reviews/questions you want to show per page)
                                product_review: {
                                    sku: variantSkus.join(';'),
                                    structured_data: structuredData,
                                    enable_write_review: true,
                                    enable_rich_snippets: true,

                                    enable_smart_filters: true,
                                    enable_rating_filters: true,
                                    enable_toggle_filters: true,
                                    enable_social_sharing: true,
                                    enable_helpful: true,
                                    enable_featured_review_photos: false,
                                    enable_featured_social_photos: false,
                                    show_mention_text: true,
                                    show_dates: true,
                                    show_replies: true,
                                    show_avatars: true,
                                    show_photos: false,
                                    show_verify_status: true,
                                    show_additional_details: true,
                                    show_blank_reviews: true,
                                    question_filters: [
                                        {
                                            id: '1747',
                                            label: 'Fit',
                                            values: [
                                                {
                                                    label: 'Runs small',
                                                    values: [1, 2],
                                                },
                                                {
                                                    label: 'True to size',
                                                    values: [3],
                                                },
                                                {
                                                    label: 'Runs large',
                                                    values: [4, 5],
                                                },
                                            ],
                                        },
                                    ],
                                    attribute_filters: [
                                        {
                                            id: '96',
                                            label: 'Body Type',
                                            values: [
                                                'Slim',
                                                'Regular',
                                                'Broad',
                                            ],
                                        },
                                    ],
                                    question_name_map: {
                                        'how would you describe your body type?':
                                            'Body Type',
                                        'would you recommend this product?':
                                            'Recommended',
                                    },
                                },
                            },

                            /* Customise Colours & Fonts */
                            styles: {
                                starColor: '#000000',
                                statisticsColor: '#000000',
                                primaryColor: '#000',
                                textColor: '#000000',
                                neutralColor: '#ececec',
                                backgroundColor: '#e6e6e6',
                                backgroundColor2: '#dcdcdc',
                                formColor: '#e9e9e9',
                                baseTextSize: '14px',
                                header_style: '',
                            },
                        });
                    }
                }}
            />
        </section>
    );
};

export default ProductReviewsWithSchema;
