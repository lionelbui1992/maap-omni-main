import React from 'react';
import PropTypes from 'prop-types';
import HoverableImage from 'components/HoverableImage';
import css from 'styled-jsx/css';
import { addRandomKey } from 'helpers/utils';

const ProductImagesBlock = ({ items }) => {
    const { className, styles } = css.resolve`
        img {
            width: 100%;
            display: block;
        }
    `;

    return (
        <>
            {addRandomKey(items).map(item => {
                return (
                    <div key={item.randomKey}>
                        <HoverableImage
                            src={item.image_desktop.url}
                            className={`${className} hidden_on_mobile`}
                        />
                        <HoverableImage
                            src={item.image_mobile.url}
                            className={`${className} hidden_on_desktop`}
                        />
                    </div>
                );
            })}
            {styles}
        </>
    );
};

ProductImagesBlock.propTypes = {
    items: PropTypes.array.isRequired,
};

export default ProductImagesBlock;
