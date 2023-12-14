import React from 'react';
import PropTypes from 'prop-types';
import FeatureImage from 'components/FeatureImage';

const ProductFeatures = ({ product }) => {
    if (!product) return null;

    const features = product.tags
        .filter(word => word.match(/feature:/g))
        .map(feature => {
            const featureName = feature.replace('feature:', '').split(':')[1];
            if (!featureName) return null;

            return {
                imagePath: featureName,
                title: featureName.replace('-', ' '),
            };
        });

    return !features.length ? null : (
        <div className="product_features">
            <div className="product_features__list">
                {features.map((tag, key) => {
                    const titleTag = tag.title.split('+-').join('+ ');
                    return (
                        <div
                            className="product_features__item"
                            key={`tag_${key}`}
                        >
                            <FeatureImage
                                src={tag.imagePath || null}
                                featureName={tag.imagePath || null}
                                alt={tag.imagePath || null}
                            />
                            <div className="product_features__text">
                                {titleTag || null}
                            </div>
                        </div>
                    );
                })}
            </div>
            <style jsx>
                {`
                    .product_features {
                        margin: 20px 0 0 0;
                        display: flex;
                        justify-content: space-between;
                        flex-direction: column;
                        flex-basis: 100%;
                    }
                    .product_features__list {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        flex-wrap: wrap;
                    }
                    .product_features__text {
                        max-width: 50px;
                        padding-left: 5px;
                        padding-right: 5px;
                        line-height: 1.1em;
                        margin: auto;
                    }
                    .product_features__item {
                        display: flex;
                        text-transform: capitalize;
                        align-items: flex-end;
                        margin: 5px 0;
                    }
                `}
            </style>
        </div>
    );
};

ProductFeatures.propTypes = {
    product: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProductFeatures;
