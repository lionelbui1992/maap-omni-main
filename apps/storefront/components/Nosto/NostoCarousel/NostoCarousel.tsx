import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import PropTypes from 'prop-types';
import { breakpointMedium } from 'config/styles/breakpoints';
import { getImageUrls, getSiblings } from '@lib/nostoUtils';
import ProductCard from '@components/ProductCard';
import debounce from 'lodash.debounce';

const NostoCarousel = ({ nostoProducts, type, shouldApplyPaddingBottom }) => {
    const [swiper, setSwiper] = useState<any>(null);
    const getSlidesPerView = () => {
        if (type === 'product') {
            if (window.innerWidth < 768) {
                return 2;
            } else if (window.innerWidth < 1024) {
                return 3;
            } else {
                return 4;
            }
        } else {
            return window.innerWidth >= 768 ? 4 : 2;
        }
    };
    const initialSlidesPerView = getSlidesPerView();

    const updateCarouselControls = () => {
        if (swiper && swiper.slides && swiper.navigation) {
            const currentSlidesPerView = getSlidesPerView();
            const isNavVisible = swiper.slides.length > currentSlidesPerView;
            swiper.navigation.nextEl.style.visibility = isNavVisible
                ? 'visible'
                : 'hidden';
            swiper.navigation.prevEl.style.visibility = isNavVisible
                ? 'visible'
                : 'hidden';

            // Update loop functionality based on the number of slides and the current breakpoint
            if (
                (swiper.slides.length === 3 && currentSlidesPerView === 4) ||
                (type === 'product' &&
                    swiper.slides.length === 2 &&
                    currentSlidesPerView === 3)
            ) {
                swiper.loop = false;
            } else {
                swiper.loop = swiper.slides.length > currentSlidesPerView;
            }

            swiper.update();
        }
    };

    const debouncedUpdateCarouselControls = debounce(
        updateCarouselControls,
        200
    );

    useEffect(() => {
        if (swiper) {
            swiper.on('resize', debouncedUpdateCarouselControls);
            // Run once to ensure controls are set up correctly initially
            updateCarouselControls();

            return () => {
                swiper.off('resize', debouncedUpdateCarouselControls);
            };
        }
    }, [swiper]);

    return (
        <>
            {nostoProducts?.products?.length !== 0 && (
                <div className="nosto-carousel">
                    <h2>{nostoProducts?.title}</h2>
                    <nav className="nosto-carousel__navigation">
                        <Swiper
                            slidesPerView={initialSlidesPerView}
                            spaceBetween={0}
                            slidesPerGroup={2}
                            loop={
                                nostoProducts?.products?.length >=
                                initialSlidesPerView
                            }
                            pagination={{
                                clickable: true,
                            }}
                            breakpoints={
                                type === 'product'
                                    ? {
                                          300: {
                                              slidesPerView: 2,
                                          },
                                          768: {
                                              slidesPerView: 3,
                                          },
                                          1024: {
                                              slidesPerView: 4,
                                          },
                                      }
                                    : {
                                          300: {
                                              slidesPerView: 2,
                                          },
                                          768: {
                                              slidesPerView: 4,
                                          },
                                      }
                            }
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                            onSwiper={setSwiper}
                        >
                            {nostoProducts?.products?.map((item, index) => {
                                const {
                                    product_id,
                                    alternate_image_urls,
                                    url,
                                    name,
                                    price,
                                    list_price,
                                    image_url,
                                    custom_fields,
                                } = item;

                                const pathSegments = new URL(
                                    url
                                ).pathname.split('/');
                                const productHandle =
                                    pathSegments[pathSegments.length - 1];
                                const { imageUrl, hoverImageUrl } =
                                    getImageUrls(alternate_image_urls);
                                const siblings = getSiblings(custom_fields);
                                return (
                                    <article
                                        key={`relatedProduct_${item.product_id}`}
                                    >
                                        <SwiperSlide
                                            key={`relatedProduct_${item.product_id}_${index}`}
                                        >
                                            <ProductCard
                                                id={`gid://shopify/Product/${product_id}`}
                                                handle={productHandle}
                                                title={name}
                                                variantTitle={name}
                                                price={price}
                                                compareAtPrice={list_price}
                                                sku={
                                                    item.skus[0].custom_fields
                                                        .skuCode
                                                }
                                                siblings={siblings}
                                                productImageUrl={
                                                    imageUrl || image_url
                                                }
                                                hoverImageUrl={
                                                    hoverImageUrl || image_url
                                                }
                                                position={null}
                                                category={name}
                                                nostoProductCardAttributes={{
                                                    isNostoProductCard: true,
                                                    result_id:
                                                        nostoProducts.result_id,
                                                }}
                                            />
                                        </SwiperSlide>
                                    </article>
                                );
                            })}
                        </Swiper>
                    </nav>
                </div>
            )}

            <style jsx global>
                {`
                    .nosto-carousel__navigation .swiper {
                        background-color: rgb(237, 237, 237);
                        z-index: 0;
                    }
                    .nosto-carousel__navigation .swiper-pagination {
                        display: none;
                    }
                    .nosto-carousel__navigation .swiper-button-next:after,
                    .nosto-carousel__navigation .swiper-button-prev:after {
                        color: rgb(0, 0, 0);
                    }
                `}
            </style>
            <style jsx>
                {`
                    .nosto-carousel {
                        padding-bottom: ${shouldApplyPaddingBottom
                            ? '81.5px'
                            : '0px'};
                    }
                    .nosto-carousel__navigation {
                        position: relative;
                    }

                    h2 {
                        font-weight: 300;
                        font-size: 1.5em;
                        margin: 0 auto;
                        padding: 27px 54px;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        h2 {
                            text-align: center;
                        }
                    }
                `}
            </style>
        </>
    );
};

NostoCarousel.propTypes = {
    nostoProducts: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
};

export default NostoCarousel;
