import React from 'react';
import PlaceHolder from '@containers/Product/PLACEHODER-IMAGE_1280x1800.jpg';
import Image from 'next/image';
import shopifyCdnImageLoader from '@lib/shopify-cdn-image-loader';

const FALLBACK_IMAGE_WIDTH = 1280;
const FALLBACK_IMAGE_HEIGHT = 1600;

const ProductDesktopImages = ({ images }) => {
    const productImages = images?.map((image, index) => {
        if (!image?.[0]?.src) return null;
        const width = image?.[0]?.width || FALLBACK_IMAGE_WIDTH;
        const height = image?.[0]?.height || FALLBACK_IMAGE_HEIGHT;
        const priority = index === 0;

        return (
            <div key={image?.[0]?.src}>
                <Image
                    loader={shopifyCdnImageLoader}
                    src={image?.[0]?.src}
                    alt={image?.[0]?.alt}
                    layout={'responsive'}
                    width={width}
                    height={height}
                    placeholder={'blur'}
                    blurDataURL={PlaceHolder.blurDataURL}
                    sizes="(max-width: 991px) 100vw, (min-width: 992px) 50vw"
                    priority={priority}
                />
            </div>
        );
    });

    return (
        <>
            {productImages}
            <style jsx>
                {`
                    img {
                        width: 100%;
                        height: 100%;
                    }
                `}
            </style>
        </>
    );
};

export default ProductDesktopImages;
