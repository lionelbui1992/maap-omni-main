import React, { useEffect, useState } from 'react';
import { useBundler } from '@containers/Bundler/Provider/BundlerProvider';
import {
    getDefaultVariant,
    getStructuredVariants,
} from '@containers/Product/ssgHelpers';
import BundlerLoaderProductInfo from '@containers/Bundler/BundlerLoaderProductInfo';
import VariantAvailability from '@containers/Product/VariantAvailability';
import BundlerBreadcrumbs from '@containers/Bundler/BundlerBreadcrumbs';
import VariantOptionList from '@containers/Product/VariantOptionList';
import Pricing from '@components/Pricing';
import styles from './BundlerProductInfo.module.css';

const BundlerProductInfo = () => {
    const {
        chosenBundleVariants,
        selectedProduct,
        addVariantToBundle,
        isFetching,
    } = useBundler();

    let chosenVariantForProduct = null;

    Object.keys(chosenBundleVariants).forEach((key) => {
        if (
            selectedProduct &&
            chosenBundleVariants[key].product.handle === selectedProduct.handle
        ) {
            chosenVariantForProduct = chosenBundleVariants[key];
        }
    });

    const defaultVariant = getDefaultVariant(
        selectedProduct?.variants?.edges,
        chosenVariantForProduct
    );
    const structuredVariants = getStructuredVariants(
        selectedProduct?.variants?.edges
    );
    const [selectedVariant, setSelectedVariant] = useState(defaultVariant);
    const [readMore, setReadMore] = useState(false);

    useEffect(() => {
        if (selectedProduct) {
            const defaultVariant = getDefaultVariant(
                selectedProduct.variants.edges,
                chosenVariantForProduct
            );
            setSelectedVariant(defaultVariant);
        }
    }, [selectedProduct]);

    if (
        !selectedProduct ||
        typeof selectedProduct === 'undefined' ||
        isFetching
    )
        return <BundlerLoaderProductInfo />;

    const comparedPrice = selectedVariant?.compareAtPriceV2?.amount || 0.0;
    const price = parseFloat(selectedVariant?.priceV2?.amount);
    const compareAtPrice =
        parseFloat(comparedPrice) > 0 && parseFloat(comparedPrice) !== price
            ? parseFloat(comparedPrice)
            : null;

    const onSelectVariant = (size) => {
        const selectedVariantData = structuredVariants.find(
            (variant) => variant.size === size
        );

        setSelectedVariant(selectedVariantData.variant);
    };

    const hasOptions = !!(
        structuredVariants?.length && Object.keys(structuredVariants[0]).length
    );

    let selections: null | { size: string } = null;

    if (hasOptions && selectedVariant) {
        const sizeOption = selectedVariant.selectedOptions.find(
            (option) => option.name.toLowerCase() === 'size'
        );
        selections = { size: sizeOption.value };
    }

    const variantStockQuantity = (variant: any = null) =>
        variant
            ? variant?.quantityAvailable
            : selectedVariant?.quantityAvailable;

    const unavailableOptions = (key) =>
        structuredVariants
            ?.map((option) => (!option.available ? option[key] : null))
            ?.filter((e) => e);
    const availableStock = variantStockQuantity();

    let variantAvailable =
        selectedVariant && selectedVariant.availableForSale && availableStock;

    const shortDescription = selectedProduct?.metafield?.value;

    const readLess = shortDescription?.split('</br>')[1];
    const linkText = readMore ? '< Read Less' : 'Read More >';
    const dots = !readMore ? '...' : '';
    const { handle } = selectedProduct;
    const productTags = defaultVariant.product.tags;

    return (
        <>
            <div className={styles.bpiHeader}>
                <BundlerBreadcrumbs />
            </div>
            <div className={styles.bundlerProductInfo}>
                {shortDescription && (
                    <div className={styles.bpiDescription}>
                        {shortDescription?.split('</br>')[0]}
                        {dots}
                        {readMore && readLess}
                        <a
                            className={styles.bpiDescriptionLink}
                            onClick={() => {
                                setReadMore(!readMore);
                            }}
                        >
                            {linkText}
                        </a>
                    </div>
                )}
                <div className={styles.bpiDesktopLink}>
                    <a
                        href={`/products/${handle}`}
                        target="_blank"
                        className={styles.bpiLink}
                    >
                        View product
                    </a>
                </div>
                <div className={styles.bpiDivider}></div>
                <div className={styles.bpiPrice}>
                    <div>
                        <Pricing
                            currentPrice={price}
                            previousPrice={compareAtPrice}
                        />
                    </div>
                    <div className={styles.bpiMobileLink}>
                        <a
                            href={`/products/${handle}`}
                            target="_blank"
                            className={styles.bpiLink}
                        >
                            View product
                        </a>
                    </div>
                </div>
                <div className="bpi-variant">
                    <VariantOptionList
                        optionName="size"
                        variantOptions={structuredVariants} // todo: need to add structuredVariants
                        selectedOption={selections ? selections.size : null}
                        unavailableOptions={unavailableOptions('size')}
                        callback={onSelectVariant}
                    />
                    <VariantAvailability
                        variant={selectedVariant}
                        availableQuantity={variantStockQuantity()}
                        quantityFloor={2}
                        tags={productTags}
                    />
                    <br />
                </div>
                <div className={styles.bpiButton}>
                    <button
                        disabled={!variantAvailable}
                        type="button"
                        onClick={() => addVariantToBundle(selectedVariant)}
                    >
                        SELECT
                    </button>
                </div>
            </div>
        </>
    );
};

export default BundlerProductInfo;
