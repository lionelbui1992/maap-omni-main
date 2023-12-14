import React from 'react';
import propTypes from 'prop-types';

const ProductBadges = ({ tags }) => {
    const getBadges = tags => {
        const filtered = tags.filter(tag => tag.includes('badge:') && tag.split(':').length >= 3);
        if (filtered) {
            return filtered
                .map(tag => {
                    const array = tag.split(':');
                    return {
                        index: array[1],
                        title: array[2],
                        colour: array[3],
                    };
                })
                .sort((a, b) => a - b);
        }
    };

    const badges = getBadges(tags);

    if (!badges.length) {
        return null;
    }

    return (
        <div className="product_badges">
            {badges.map(badge => (
                <div className="product_badge" style={{ colour: badge.colour }}>
                    {badge.title}
                </div>
            ))}
        </div>
    );
};

ProductBadges.propTypes = {
    tags: propTypes.array,
};

export default ProductBadges;
