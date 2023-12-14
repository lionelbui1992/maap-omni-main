'use client';

import React, { useState } from 'react';
import { PosterItem } from './types';
import s from './PosterFeatureStack.module.css';
import { PatternCTASet, StaticImage } from 'mmds';
import cn from 'clsx';

type PoserItemProps = {
    item: PosterItem;
};

const PosterFeatureStackVariantItem = ({ item }: PoserItemProps) => {
    const { CTASet, productTitle, featureStack } = item;
    const [defaultFeature, setDefaultFeature] = useState(featureStack?.[0]);
    const posterFeatureStackRoot = cn(s.featureStackRoot, {
        [s.textDarkThemeDesktop]: item.textThemeDesktop,
        [s.textLightThemeDesktop]: !item.textThemeDesktop,
        [s.textDarkThemeMobile]: item.textThemeMobile,
        [s.textLightThemeMobile]: !item.textThemeMobile,
    });

    return (
        <div
            className={posterFeatureStackRoot}
            key={`poster_feature_stack_${productTitle}`}
        >
            <div
                className={s.featureStackBG}
                style={{
                    backgroundColor:
                        defaultFeature?.backgroundColor || '#E7E7E7',
                }}
            >
                <div className={s.productTitle}>{productTitle}</div>
                <div>
                    <div className={s.thumbnail}>
                        {featureStack?.map((item, index) => {
                            return (
                                <div
                                    key={`${item.backgroundColor}_${index}`}
                                    onClick={() => setDefaultFeature(item)}
                                >
                                    <StaticImage
                                        desktopImage={item.productThumbnail}
                                        desktopWidth={'64'}
                                        desktopHeight={'84'}
                                        mobileImage={item.productThumbnail}
                                        mobileWidth={'48'}
                                        mobileHeight={'64'}
                                        altDescription={productTitle}
                                    />
                                    {defaultFeature?.productThumbnail ===
                                        item?.productThumbnail && (
                                        <div className={s.thumbnailSelected} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    {defaultFeature?.description && (
                        <div className={s.content}>
                            {defaultFeature?.description}
                        </div>
                    )}
                    {CTASet && (
                        <div className={s.button}>
                            <PatternCTASet set={CTASet} />
                        </div>
                    )}
                </div>
            </div>
            <div className={s.featureStackImage}>
                <StaticImage
                    desktopImage={defaultFeature?.productImage.desktopImage}
                    mobileImage={defaultFeature?.productImage.mobileImage}
                    altDescription={productTitle}
                    fullWidth={true}
                />
                <div className={s.productTitleForImage}>{productTitle}</div>
            </div>
        </div>
    );
};

export default PosterFeatureStackVariantItem;
