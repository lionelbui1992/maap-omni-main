import React from 'react';
import cn from 'clsx';
import { ProductCardVariant } from './types';
import s from './ProductCard.module.css';

const ProductVariants = ({ variants }: { variants: ProductCardVariant[] }) => {
    return (
        <div className={s.variants}>
            {variants?.map((variant: ProductCardVariant, index) => {
                const { size, availability } = variant;
                const variantClassNames = cn(s.variant, {
                    [s.faded]: availability < 1,
                });
                return (
                    <div className={variantClassNames} key={index}>
                        {size}
                    </div>
                );
            })}
        </div>
    );
};

export default ProductVariants;
