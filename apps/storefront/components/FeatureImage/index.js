import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useShop } from '@lib/providers/ShopProvider';

const FeatureImage = ({ featureName, alt }) => {
    const { shopifyImageUrl } = useShop();
    if (!featureName) return null;

    const featureTag = featureName.split('+').join('_');
    if (!featureTag) return null;

    const imageSrc = `${shopifyImageUrl}feature-${featureTag}.png`;

    return (
        <>
            <img src={imageSrc || null} alt={alt} />
            <style jsx>
                {`
                    img {
                        width: 35px;
                        height: 35px;
                        margin: auto;
                    }
                `}
            </style>
        </>
    );
};

FeatureImage.propTypes = {
    featureName: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};

export default FeatureImage;
