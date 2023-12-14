import React from 'react';
import PropTypes from 'prop-types';
import VideoBlock from '../VideoBlock';
import YouTubeVideoBlock from '../YouTubeVideoBlock';

const ProductVideoBlock = ({ block }) => {
    if (!block) return null;

    return (
        <>
            {block && block?.desktop_video?.url.match(/shopify/g) ? (
                <VideoBlock block={block} />
            ) : (
                <YouTubeVideoBlock block={block} />
            )}
        </>
    );
};

ProductVideoBlock.propTypes = {
    block: PropTypes.object.isRequired,
};

export default ProductVideoBlock;
