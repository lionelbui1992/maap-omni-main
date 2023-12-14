import React from 'react';
import Image from 'next/image';
import ContentLoader from 'react-content-loader';
import { useMediaQuery } from 'react-responsive';
import { useBundler } from '@containers/Bundler/Provider/BundlerProvider';
import styles from './BundlerSelectedProducts.module.css';
import { useShop } from '@lib/providers/ShopProvider';
import { productImagesByPath, reformatImageSet } from '@lib/productImageUtils';

const BundlerSelectedProducts = () => {
    const {
        chosenBundleVariants,
        bundle,
        assertBundleIsComplete,
        isFetching,
        addBundleToCart,
    } = useBundler();

    if (!bundle) return null;

    const { defaultCurrencySymbol } = useShop();
    const { discountPercentage, collections } = bundle;

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' });
    if (isFetching)
        return isTabletOrMobile ? (
            <ContentLoader viewBox="0 0 100 45" height={45} width="100%">
                <rect x="6.5" y="4" rx="0" ry="0" width="25%" height="3" />
                <rect x="12.2" y="10" rx="0" ry="0" width="12%" height="36%" />
                <rect x="24.5" y="10" rx="0" ry="0" width="12%" height="36%" />
                <rect x="0" y="10" rx="0" ry="0" width="12%" height="36%" />
                <rect x="6.5" y="29" rx="5" ry="5" width="87%" height="9" />
            </ContentLoader>
        ) : (
            <ContentLoader viewBox="0 0 100 40" height={40} width="100%">
                <rect x="13" y="2" rx="0" ry="0" width="25%" height="3" />
                <rect x="13" y="8" rx="0" ry="0" width="10%" height="35%" />
                <rect x="13" y="25" rx="5" ry="5" width="75%" height="9" />
            </ContentLoader>
        );

    const totalPrice = () => {
        const variantPrice = Object.keys(chosenBundleVariants).map((key) => {
            const price = chosenBundleVariants[key];
            const { amount } = price.priceV2;
            if (!amount) return null;

            return parseFloat(amount);
        });

        const initialValue = 0;
        if (variantPrice?.length > 0) {
            return variantPrice.reduce((a, b) => a + b, initialValue);
        }
        return variantPrice;
    };

    const discountedAmount =
        totalPrice() - (totalPrice() * discountPercentage) / 100;
    const afterDiscountTotalAmount = `${defaultCurrencySymbol}${discountedAmount.toFixed(
        2
    )}`;
    const numberOfCollection = bundle.collections.length;

    return (
        <>
            <div className={styles.root}>
                <div className={styles.bundlerSelectedProduct}>
                    {Object.keys(chosenBundleVariants).length === 0 ? (
                        <div className={styles.bspInitialState}>
                            Bundle: Select Products
                        </div>
                    ) : (
                        <div>
                            {`Bundle: ${
                                Object.keys(chosenBundleVariants).length
                            } of ${collections.length} products`}
                            {assertBundleIsComplete() ? (
                                <span>
                                    {`,`}{' '}
                                    <span
                                        className={
                                            styles.bpiBeforeDiscountTotalAmount
                                        }
                                    >
                                        {defaultCurrencySymbol}
                                        {totalPrice()?.toFixed(2)}
                                    </span>{' '}
                                    {afterDiscountTotalAmount}
                                </span>
                            ) : (
                                ''
                            )}
                        </div>
                    )}
                </div>
                <div className={styles.bspImagesContainer}>
                    {Object.keys(chosenBundleVariants).map((key) => {
                        const variant = chosenBundleVariants[key];
                        const { product } = variant;
                        let productImages = product.images.edges;
                        productImages = reformatImageSet(productImages);
                        const productImagesExtract = [
                            productImagesByPath(productImages, 'product_card.*.*.*.flatlay'),
                        ];
                        if (!productImagesExtract[0][0])
                            return null;
                        const { src, width, height } = productImagesExtract[0][0];
                        return (
                            <div className={numberOfCollection === 3 ? styles.bspImage : styles.bspImage2} key={key}>
                                <Image
                                    key={key}
                                    src={src}
                                    width={width}
                                    height={height}
                                    alt="bundler-selected-product-image"
                                    style={{
                                        maxWidth: '100%',
                                        height: '100%',
                                    }}

                                />
                            </div>
                        );
                    })}
                </div>
                {!!Object.keys(chosenBundleVariants).length && (
                    <div
                        className={
                            assertBundleIsComplete()
                                ? styles.bspSelected
                                : styles.bspButton
                        }
                        onClick={addBundleToCart}
                    >
                        <button type="button">ADD BUNDLE TO CART</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default BundlerSelectedProducts;
