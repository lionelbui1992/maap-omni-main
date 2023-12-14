import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useShop } from '@lib/providers/ShopProvider';
import ProductCard from 'containers/ProductCard-';
import './index.scss';

const AlgoliaHitContainer = ({ hit, unwrapped = true }) => {
    const { currencyCode } = useShop();

    return <ProductCard productHandle={hit.handle} />;
};

AlgoliaHitContainer.propTypes = {
    hit: PropTypes.object,
    unwrapped: PropTypes.bool,
};

export default AlgoliaHitContainer;
