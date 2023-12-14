import React from 'react';
import PropTypes from 'prop-types';
import { RenderBlock } from '../../Prismic/PrismicSliceRenderer';
import { blockTransformer } from 'helpers/prismic';

const PrismicImages = ({ prismic, isMobile, isTablet }) => {
    const { productImages } = prismic;

    return (
        <>
            <div className="product_images__container">
                {productImages && (
                    <RenderBlock
                        block={blockTransformer(productImages)}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        key={`${Math.random()}__productImage`}
                    />
                )}
            </div>
            <style jsx>
                {`
                    .product_images__container {
                        margin: 0 auto;
                    }
                `}
            </style>
        </>
    );
};

PrismicImages.propTypes = {
    prismic: PropTypes.object,
    isMobile: PropTypes.bool,
    isTablet: PropTypes.bool,
};

export default PrismicImages;
