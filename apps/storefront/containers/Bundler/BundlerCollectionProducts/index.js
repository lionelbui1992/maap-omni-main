import React from 'react';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import { useBundler } from '@containers/Bundler/Provider/BundlerProvider';
import styles from './BundlerCollectionProducts.module.css';
import BundlerLoader from '@containers/Bundler/BundlerLoader';

const BundlerCollectionProducts = () => {
    const {
        isFetching,
        selectedCollection,
        selectedProduct,
        setSelectedProduct,
    } = useBundler();

    const selectedCollectionProducts = selectedCollection?.products?.edges;
    const isLargeSize = useMediaQuery({ query: '(min-width: 1440px)' });
    const isMediumSize = useMediaQuery({ query: '(min-width: 1024px)' });
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' });

    let width = 100;
    if (isLargeSize) {
        width = 100;
    } else if (isMediumSize) {
        width = 66;
    } else {
        width = 64;
    }

    let height = 125;
    if (isLargeSize) {
        height = 125;
    } else if (isMediumSize) {
        height = 82;
    } else {
        height = 80;
    }

    if (isFetching)
        return (
            <BundlerLoader numberOfImages={18} width={width} height={height} />
        );

    const isSelected = (product) => {
        return product.node.handle === selectedProduct?.handle;
    };

    return (
        <>
            <div className={styles.bundlerCollectionImage}>
                <div
                    className={
                        isTabletOrMobile
                            ? styles.mobileRoot
                            : styles.desktopRoot
                    }
                >
                    {selectedCollectionProducts?.map((product, index) => {
                        const imageSets = product?.node?.images?.edges;
                        if (!imageSets) {
                            console.log('Collection imageSets are missing');
                        }
                        const filterProductCardHeroImage = imageSets?.filter(
                            (image) => {
                                return image?.node?.transformedSrc
                                    .toLowerCase()
                                    .match(/product_card_hero(.*).jpg/);
                            }
                        );

                        return (
                            <div
                                key={index}
                                onClick={() => setSelectedProduct(product.node)}
                                className={styles.productImage}
                                data-selected={isSelected(product)}
                            >
                                <Image
                                    src={
                                        filterProductCardHeroImage[0]?.node
                                            ?.transformedSrc
                                    }
                                    alt="bundle-collection-image"
                                    width={
                                        filterProductCardHeroImage[0]?.node
                                            ?.width
                                    }
                                    height={
                                        filterProductCardHeroImage[0]?.node
                                            ?.height
                                    }
                                    style={{
                                        maxWidth: '100%',
                                        height: 'auto',
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <style jsx global>
                {`
                    .bundler-product-images-desktop img,
                    .bundler-product-images-mobile img {
                        display: block !important;
                        cursor: pointer;
                    }
                    .bundler-product-images-desktop img:hover,
                    .bundler-product-images-mobile img:hover {
                        outline: 1px solid black;
                        outline-offset: -1px;
                    }
                `}
            </style>
        </>
    );
};

export default BundlerCollectionProducts;
