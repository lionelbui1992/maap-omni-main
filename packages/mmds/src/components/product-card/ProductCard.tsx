'use client';

import React, { Suspense, useState } from 'react';
import { ProductCardProduct, ProductCardSliceVariant } from './types';
import { BookmarkFilled, BookmarkUnfilled } from '../../tokens/icons';
import ProductVariants from './ProductVariants';
import LinkManager from '../link-manager/LinkManager';
import s from './ProductCard.module.css';
import cn from 'clsx';

const VARIANT_STANDARD = 'standard';
const VARIANT_ALTERNATIVE = 'alternative';

export type PhotoVariant = 'flatlay' | 'model';

export type ProductCardProps = {
    metafields?: any;
    node?: any;
    variant?: ProductCardSliceVariant;
    product: ProductCardProduct;
    label?: string | null;
    coloursCount?: number;
    saved?: boolean;
    backgroundColour?: string;
    photoVariant?: PhotoVariant;
    quarterWidth?: boolean;
};

export const ProductCard = ({
    variant = VARIANT_STANDARD,
    product,
    label,
    coloursCount,
    backgroundColour,
    saved = false,
    photoVariant = 'flatlay',
    quarterWidth, // for single product in storybook
}: ProductCardProps) => {
    const { handle, title, price, image, hoverImage, variants } = product;
    const [hovered, setHovered] = useState<Boolean>(photoVariant === 'model');
    const WishlistVector = saved ? BookmarkFilled : BookmarkUnfilled;
    const rootClassnames = cn(s.root, {
        [s.quarter]: quarterWidth,
        [s.alternative]: variant === VARIANT_ALTERNATIVE,
    });

    const imageContainerProps = {
        style: {
            background: backgroundColour || 'auto',
        },
    };

    return (
        <Suspense fallback={<div>Loading product card...</div>}>
            <LinkManager
                applyLink={!!handle}
                href={`/nproducts/${handle}`}
                title={`Go to product ${title}`}
            >
                <div
                    className={rootClassnames}
                    data-testid={`PC-SV-${handle}`}
                    data-handle={handle}
                    onMouseOver={() => {
                        if (photoVariant === 'flatlay') {
                            setHovered(true);
                        }
                    }}
                    onMouseOut={() => {
                        if (photoVariant === 'flatlay') {
                            setHovered(false);
                        }
                    }}
                >
                    <div
                        className={cn(s.image, {
                            [s.altImage]: hovered,
                        })}
                        {...imageContainerProps}
                    >
                        <img
                            src={`${
                                hovered ? hoverImage : image
                            }&width=1000&height=1333&crop=top`}
                            alt={`Product Image for ${title}`}
                            width="640"
                            height="900"
                        />
                        <div className={s.wishlist}>
                            <WishlistVector />
                        </div>
                        {hovered && (
                            <div className={s.coloursCount}>
                                {coloursCount} Colours
                            </div>
                        )}
                        {label && <div className={s.label}>{label}</div>}
                    </div>
                    <div className={s.summary}>
                        {hovered && <ProductVariants variants={variants} />}
                        {!hovered && <div className={s.title}>{title}</div>}
                        {price && (
                            <div className={s.price}>
                                ${parseInt(String(price)).toFixed(2)} AUD
                            </div>
                        )}
                    </div>
                </div>
            </LinkManager>
        </Suspense>
    );
};

export default ProductCard;
