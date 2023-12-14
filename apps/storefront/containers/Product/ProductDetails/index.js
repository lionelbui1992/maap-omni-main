import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import CartControls from '../CartControls';
import ProductSummary from '../ProductSummary';
import ProductSiblings from '../ProductSiblings';
import ProductFeatures from '../ProductFeatures';
import VariantOptionList from '../VariantOptionList';
import ProductShippingInfo from '../ProductShippingInfo';
import VariantAvailability from '../VariantAvailability';
import { useProductPrismicDocuments } from '@lib/providers/ProductPrismicDocumentsProvider';
import PrismicFabricTemperature from '@containers/Product/PrismicFabricTemperature';
import { breakpointMedium, breakpointLarge } from 'config/styles/breakpoints';
import { fetchSheetsSizeData, transformSizeGuide } from '@lib/google/size-guide';

const SizeGuide = dynamic(() => import('../SizeGuide'));
const ProductAdditionalInfo = dynamic(() => import('../ProductAdditionalInfo'));

const ProductDetails = ({
    product,
    selectedVariant,
    structuredVariants,
    onSelectVariant,
    isMobile,
    isTablet,
}) => {
    const [sizeGuideActive, setSizeGuideActive] = useState(false);
    const [sizeGuideData, setSizeGuideData] = useState(null);
    const { hasDocument } = useProductPrismicDocuments(null);

    const fetchSizeData =  async ()=>{
        const sizeResponseData = await fetchSheetsSizeData();
        if(sizeResponseData?.data?.values) {
            setSizeGuideData(await transformSizeGuide(sizeResponseData?.data?.values))
        }
    }

    useEffect(()=>{
        fetchSizeData()
    }, [])

    const variantStockQuantity = (variant = null) =>
        variant
            ? variant?.quantityAvailable
            : selectedVariant?.quantityAvailable;

    const unavailableOptions = (key) =>
        structuredVariants
            .map((option) => (!option.available ? option[key] : null))
            .filter((e) => e);

    const isGiftCard = product.productType === 'Gift Card';
    const availableStock = variantStockQuantity();
    let variantAvailable =
        selectedVariant && selectedVariant.availableForSale && availableStock;

    if (isGiftCard) {
        variantAvailable = selectedVariant && selectedVariant.availableForSale;
    }

    const hasOptions = !!(
        structuredVariants.length && Object.keys(structuredVariants[0]).length
    );

    let selections = null;

    if (hasOptions) {
        const sizeOption = selectedVariant.selectedOptions.find(
            (option) => option.name.toLowerCase() === 'size'
        );
        selections = { size: sizeOption.value };
    }

    return (
        <section>
            <ProductSummary
                product={product}
                variant={selectedVariant}
                isGiftCard={isGiftCard}
            />
            <ProductSiblings product={product} />
            {hasOptions && (
                <VariantOptionList
                    title="Size"
                    optionName="size"
                    variantOptions={structuredVariants}
                    selectedOption={selections ? selections.size : null}
                    unavailableOptions={unavailableOptions('size')}
                    callback={onSelectVariant}
                />
            )}
            <div className="variant_details">
                {hasDocument('size-guide') && (
                    <a
                        onClick={() => setSizeGuideActive(!sizeGuideActive)}
                        className="variant_details__link"
                    >
                        Size Guide
                    </a>
                )}
                {hasDocument('size-guide') && sizeGuideActive && sizeGuideData && (
                    <SizeGuide
                        product={product}
                        sizeGuideData={sizeGuideData}
                        active={sizeGuideActive}
                        onClose={() => setSizeGuideActive(false)}
                    />
                )}
                {!isGiftCard && (
                    <VariantAvailability
                        variant={selectedVariant}
                        availableQuantity={variantStockQuantity()}
                        quantityFloor={2}
                        tags={product.tags}
                    />
                )}
            </div>
            <CartControls
                variantAvailable={variantAvailable}
                selectedVariant={selectedVariant}
                tags={product.tags}
                productTitle={product.title}
            />
            {hasDocument('shipping') && <ProductShippingInfo />}
            <ProductFeatures product={product} />
            {isGiftCard && <br />}
            <ProductAdditionalInfo product={product} />
            <PrismicFabricTemperature isMobile={isMobile} isTablet={isTablet} />
            <style jsx>
                {`
                    section {
                        padding: 30px;
                        background-color: rgba(247, 247, 247, 1);
                        width: 100%;
                        height: 99%;
                    }

                    @media (min-width: ${breakpointMedium}) {
                        section {
                            padding: 45px 0;
                            width: 360px;
                            margin: auto;
                            background-color: transparent;
                        }
                        section::-webkit-scrollbar {
                            display: none;
                        }
                        @keyframes fadeIn {
                            0% {
                                opacity: 0;
                            }
                            100% {
                                opacity: 1;
                            }
                        }
                        .button {
                            cursor: pointer !important;
                        }
                    }
                    @media (max-width: ${breakpointMedium}) {
                        section {
                            padding: 15px;
                        }
                    }
                    @media (min-width: ${breakpointLarge}) {
                        section {
                            margin-left: 0px;
                            padding-left: 160px;
                        }
                    }
                `}
            </style>
        </section>
    );
};

export default ProductDetails;
