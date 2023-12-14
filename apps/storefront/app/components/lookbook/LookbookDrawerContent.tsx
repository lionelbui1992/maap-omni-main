'use client';

import {
    BookmarkFilled,
    BookmarkUnfilled,
    Button,
    CartButton,
    Left,
    Right,
    SizeSelector,
    slugify,
    StaticImage,
} from 'mmds';
import ScrollBarSwiper from '../../../app/components/scrollbar-swiper';
import React, { useState } from 'react';
import s from './Lookbook.module.css';
import { ShopifyProduct } from '../../lib/shopify/types/Product';
import { SwiperSlide } from 'swiper/react';
import cn from 'clsx';
import { getShortDescription } from '../../../app/[country]/nproducts/utilities';
import truncateDescription from '../../lib/helpers/truncate-description';
import { GALLERY_ORDER } from '../../../app/[country]/nproducts/constants';
import { DrawerFooter } from '../../../app/components/ui/drawer/Drawer';

interface LookBookDrawerContent {
    products: ShopifyProduct[];
}

const LookBookDrawerContent = ({ products }: LookBookDrawerContent) => {
    if (!products) return null;
    const [defaultProduct, setDefaultProduct] = useState(products[0]);
    const saved = false; /* should need to be hooked via omneo later */

    const getThumbnail = (product: ShopifyProduct) => {
        const filterThumbnailImages = product?.images?.edges?.filter((node) => {
            return (
                node?.node?.transformedSrc.includes('PRODUCT_CARD_ALT') ||
                node?.node?.transformedSrc?.includes('PRODUCT_CARD_HERO')
            );
        });

        return filterThumbnailImages?.[0];
    };

    const title = defaultProduct?.title;
    const variantColor = defaultProduct?.options[0].values[0];
    const productLink = defaultProduct?.handle;
    const productPrice = defaultProduct?.variants.edges[0].node.priceV2;

    const images = defaultProduct.images.edges.map((edge) => {
        const { transformedSrc, altText } = edge.node;
        return {
            src: transformedSrc,
            alt: altText || 'Product Image',
        };
    });

    const galleryImages = GALLERY_ORDER.map((pattern) => {
        const matchingImage = images.find((image) =>
            image.src.includes(pattern)
        );
        if (matchingImage) {
            return {
                desktopImage: matchingImage.src,
                mobileImage: matchingImage.src,
                altText: matchingImage.alt || 'product image',
            };
        }
        return null;
    }).filter((image) => image);

    const variantItems = defaultProduct?.variants.edges?.map((item: any) => {
        return {
            size: item.node.selectedOptions[1].value,
            availability: item.node.quantityAvailable,
            sku: item.node.sku,
        };
    });

    const WishlistVector = saved ? BookmarkFilled : BookmarkUnfilled;

    const shortDescription = getShortDescription(defaultProduct)?.replace(
        '</br>',
        ''
    );
    const longDescription = defaultProduct?.description;

    return (
        <>
            <div className="lookbookDrawer">
                <div className={s.thumbnailContainer}>
                    {products?.map((product) => {
                        let thumbnail = getThumbnail(product);
                        return (
                            thumbnail?.node?.transformedSrc && (
                                <div
                                    onClick={() => setDefaultProduct(product)}
                                    className={s.thumbnail}
                                    key={product?.title}
                                >
                                    <StaticImage
                                        desktopImage={
                                            thumbnail?.node?.transformedSrc
                                        }
                                        mobileImage={
                                            thumbnail?.node?.transformedSrc
                                        }
                                        altDescription={defaultProduct?.title}
                                        desktopWidth="64px"
                                        desktopHeight="84px"
                                        mobileHeight="64px"
                                        mobileWidth="48px"
                                    />

                                    {defaultProduct?.title ===
                                        product?.title && (
                                        <div className={s.thumbnailSelected} />
                                    )}
                                </div>
                            )
                        );
                    })}
                </div>
                <div className={s.contextContainer}>
                    <div className={s.productTitle}>
                        <h3 className="mmds-component-one-detail">{title}</h3>
                        <span className="mmds-component-one-detail">
                            {variantColor}
                        </span>
                    </div>
                    <div className={s.iconContainer}>
                        <div className="swiper-button swiper-icon-prev-9">
                            <Left />
                        </div>
                        <div className="swiper-button swiper-icon-next-9">
                            <Right />
                        </div>
                    </div>
                </div>
                <ScrollBarSwiper
                    className="swiper9"
                    slidePerViewInDesktop={3.11}
                    slidePerViewInMobile={2.45}
                    spaceBetweenDesktop={1}
                    spaceBetweenMobile={1}
                    swiperIconNextClassName="swiper-icon-next-9"
                    swiperIconPrevClassName="swiper-icon-prev-9"
                    hasScrollbar={false}
                >
                    {galleryImages?.map((item, index) => {
                        const identifier = `swiper_lookbook_${slugify(
                            defaultProduct?.title
                        )}`;
                        return (
                            <SwiperSlide key={index} data-testid={identifier}>
                                <StaticImage
                                    desktopImage={item?.desktopImage}
                                    mobileImage={item?.mobileImage}
                                    fullWidth={true}
                                    altDescription={defaultProduct?.title}
                                />
                            </SwiperSlide>
                        );
                    })}
                </ScrollBarSwiper>
                <div className={cn(s.description, 'mmds-copy-one')}>
                    <p>
                        {shortDescription
                            ? truncateDescription(shortDescription)
                            : truncateDescription(longDescription)}
                    </p>
                    <div>
                        <Button
                            label="View Product"
                            variant="text"
                            textVariantPadding={false}
                            hrefLink={`/nproducts/${productLink}`}
                        />
                    </div>
                </div>
            </div>
            <DrawerFooter>
                <div className="mmds-component-one-detail">
                    ${parseInt(String(productPrice?.amount)).toFixed(2)}
                    {productPrice?.currencyCode}
                </div>
                <div className={s.sizeVariantContainer}>
                    <div className={s.sizeVariant}>
                        {variantItems?.map((item) => {
                            const { size, availability } = item;
                            const availabilityCheck = availability < 1;
                            return (
                                <SizeSelector
                                    label={size}
                                    state={
                                        availabilityCheck
                                            ? 'outOfStock'
                                            : 'default'
                                    }
                                    key={size}
                                />
                            );
                        })}
                    </div>
                    <div className={s.wishlist}>
                        <WishlistVector />
                    </div>
                    <div>
                        <CartButton label="Select" state="default" />
                    </div>
                </div>
            </DrawerFooter>
        </>
    );
};
export default LookBookDrawerContent;
