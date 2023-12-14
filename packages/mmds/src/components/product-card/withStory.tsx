import React from 'react';
import ProductCard, { ProductCardProps } from './ProductCard';

const withStory = (props: ProductCardProps) => {
    return <ProductCard {...props} />;
};

export default withStory;
