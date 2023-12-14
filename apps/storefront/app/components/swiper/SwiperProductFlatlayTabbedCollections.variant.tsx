'use client';

import React, { useState } from 'react';
import {
    StaticImageItem,
    SwiperItem,
    SwiperProductFlatlayTabbedCollectionsVariantProps,
} from './type';
import { SwiperSlide } from 'swiper/react';
import ScrollBarSwiper from '../../components/scrollbar-swiper';
import { Button, CTAItem, Left, Right, slugify, StaticImage } from 'mmds';
import s from './Swiper.module.css';
import convertSlugToTitle from '../../lib/helpers/convert-slug-to-title';

const SwiperProductFlatlayTabbedCollectionsVariant = ({
    block,
    collections,
}: SwiperProductFlatlayTabbedCollectionsVariantProps) => {
    const { items, context } = block;
    const [activeItem, setActiveItem] = useState(items[0]);
    const selectedCollectionHandle = activeItem?.collectionHandle;
    const selectedCollection: { handle: string; products: StaticImageItem[] } =
        collections.find((collection) => {
            return collection.handle === selectedCollectionHandle;
        });

    return (
        <div className={`${s.swiperRoot} ${s.greyBg}`}>
            <div className={s.contextContainer}>
                <div className={s.context}>
                    {context}
                    <span className={s.divider}>:</span>
                    <span className={s.gradient} />
                    <div className={s.productFlatLayCollectionHandle}>
                        {items?.map((item: SwiperItem, key) => {
                            return (
                                <a
                                    key={`${item.collectionHandle}_${key}`}
                                    onClick={() => setActiveItem(item)}
                                    className={s.productFlatLayCollectionLink}
                                >
                                    {convertSlugToTitle(item?.collectionHandle)}
                                </a>
                            );
                        })}
                    </div>
                </div>
                {selectedCollection.products.length > 3 && (
                    <div className={s.iconContainer}>
                        <div className="swiper-button swiper-icon-prev-7">
                            <Left />
                        </div>
                        <div className="swiper-button swiper-icon-next-7">
                            <Right />
                        </div>
                    </div>
                )}
            </div>
            <ScrollBarSwiper
                className="swiper7"
                slidePerViewInMobile={2.9}
                slidePerViewInDesktop={9.4}
                spaceBetweenDesktop={0}
                spaceBetweenMobile={0}
                swiperIconNextClassName="swiper-icon-next-7"
                swiperIconPrevClassName="swiper-icon-prev-7"
            >
                {selectedCollection.products?.map(
                    (item: StaticImageItem, index: number) => {
                        const identifier = `swiper_product_flat_lay_tabbed_variant_${slugify(
                            context
                        )}`;
                        return (
                            <SwiperSlide key={index} data-testid={identifier}>
                                <a href={item.link}>
                                    <StaticImage
                                        desktopImage={item.desktopImage}
                                        mobileImage={item.mobileImage}
                                        altDescription="Photo of collection product"
                                        fullWidth={true}
                                    />
                                </a>
                            </SwiperSlide>
                        );
                    }
                )}
            </ScrollBarSwiper>
            {activeItem.description && (
                <div className={s.productFlatLayContent}>
                    <div className={s.productFlatLayDescription}>
                        {activeItem.description}
                    </div>
                    <div className={s.productFlatLayButtons}>
                        {activeItem.CTASet?.map((item: CTAItem, index) => {
                            return (
                                item.link && (
                                    <Button
                                        variant={item.variant}
                                        label={item.label}
                                        hrefLink={item.link}
                                        icon={item.icon}
                                        key={index}
                                    />
                                )
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SwiperProductFlatlayTabbedCollectionsVariant;
