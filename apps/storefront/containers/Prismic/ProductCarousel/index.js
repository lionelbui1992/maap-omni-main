import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { formatGTMName } from '../utils/gtm';
import config from 'config/brandConfig';
import { useShop } from '@lib/providers/ShopProvider';
import ProductCard from '@components/ProductCard';
import { getShopifyCollectionByHandle } from '@lib/shopify-collection/get-collection-by-handle';
import { normaliseCollectionProductEdges } from '@lib/collection-products-normaliser';

const ProductCarousel = ({ block }) => {
    const { shopifyStorefrontUrl, shopifyStorefrontToken } = useShop();
    const [products, setProducts] = useState(null);

    const {
        shopify_collection_handle,
        gtm_identifier,
        padding_bottom,
        padding_top,
        mobile_padding_bottom,
        mobile_padding_top,
    } = block;

    useEffect(() => {
        const fetchProducts = async () => {
            const { products: shopifyProducts } =
                await getShopifyCollectionByHandle(
                    {
                        shopifyStorefrontUrl,
                        shopifyStorefrontToken,
                    },
                    shopify_collection_handle
                );

            const formattedProducts = normaliseCollectionProductEdges(
                shopifyProducts.edges
            ).map(
                (
                    {
                        id,
                        handle,
                        title,
                        price,
                        compareAtPrice,
                        siblings,
                        imageUrl,
                        hoverImageUrl,
                        variants,
                    },
                    index
                ) => ({
                    id,
                    handle,
                    title,
                    variantTitle: title,
                    price,
                    compareAtPrice,
                    siblings,
                    productImageUrl: imageUrl,
                    hoverImageUrl,
                    position: index,
                    sku: variants.edges[0].node.sku,
                    category: shopify_collection_handle,
                    nostoProductCardAttributes: null,
                })
            );

            setProducts(formattedProducts);
        };
        fetchProducts();
    }, [shopify_collection_handle]);

    if (!products) return null;

    return (
        <>
            <div
                className="carousel_block"
                data-event-description={formatGTMName(gtm_identifier)}
            >
                <Swiper
                    slidesPerView={2}
                    spaceBetween={0}
                    slidesPerGroup={2}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                    modules={[Navigation]}
                    className="product_carousel__swiper"
                    navigation
                    loop
                >
                    {products.map((product) => (
                        <SwiperSlide
                            key={`product_${product.handle}`}
                            className="product_carousel__slide"
                        >
                            <ProductCard {...product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <style jsx>
                {`
                    .carousel_block {
                        padding-top: ${padding_top || 0}px;
                        padding-bottom: ${padding_bottom || 0}px;
                    }

                    @media (max-width: ${config.breakPoints.mobile
                            .maxDeviceWidth}px) {
                        .carousel_block {
                            padding-top: ${mobile_padding_top || 0}px;
                            padding-bottom: ${mobile_padding_bottom || 0}px;
                        }
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .carousel_block .swiper {
                        background-color: rgb(237, 237, 237);
                        z-index: 0;
                    }

                    .carousel_block .swiper-pagination {
                        display: none;
                    }

                    .carousel_block .swiper-button-next:after,
                    .carousel_block .swiper-button-prev:after {
                        color: rgb(0, 0, 0);
                        font-size: 25px;
                    }
                `}
            </style>
        </>
    );
};

export default ProductCarousel;
