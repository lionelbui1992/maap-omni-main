import React from 'react';
import Image from 'next/image';
import styles from './BunderMobileImageSlider.module.css';
import PlaceHolder from '@containers/Bundler/ProductImageSwiper/PLACEHODER-IMAGE_1280x1800.jpg';
import { productImagesByPath, reformatImageSet } from '@lib/productImageUtils';

const BundlerMobileImageSlider = ({ productImages }) => {
    productImages = reformatImageSet(productImages);
    const productImagesExtract = [
        productImagesByPath(productImages, 'pdp.hero.01.desktop'),
        productImagesByPath(productImages, 'pdp.additional.images.01.desktop'),
        productImagesByPath(productImages, 'pdp.specs.03.desktop'),
        productImagesByPath(productImages, 'pdp.additional.images.02.desktop'),
        productImagesByPath(productImages, 'pdp.specs.01.desktop.variant.02'),
        productImagesByPath(productImages, 'pdp.specs.02.desktop'),
    ];

    return (
        <div className={styles.budlerMobileImageSlider}>
            {productImagesExtract?.map((image, index) => {
                if (!image?.[0]?.src) return null;
                return (
                    <Image
                        key={index}
                        src={image?.[0]?.src}
                        width={1280}
                        height={1600}
                        placeholder="blur"
                        blurDataURL={PlaceHolder.blurDataURL}
                        style={{
                            maxWidth: '100%',
                            height: '100%',
                        }}
                        alt="bundler-mobile-images-slider"
                    />
                );
            })}
        </div>
    );
};

export default BundlerMobileImageSlider;
