import React from 'react';

const VariantAvailability = ({
    variant,
    availableQuantity,
    quantityFloor,
    tags,
}) => {
    const isDiscontinued = tags?.includes('DISCONTINUED');

    if (!variant || availableQuantity === null) {
        return <div className="variant_stock_availability">&nbsp;</div>;
    }

    if (availableQuantity > quantityFloor) {
        return <div className="variant_stock_availability">{`In Stock`}</div>;
    }

    const variantAvailable = variant.availableForSale && availableQuantity;

    if (!variantAvailable) {
        if (typeof window !== 'undefined') {
            window.dataLayer.push({
                event: 'gtm.viewOutOfStockProduct',
                ecommerce: {
                    items: [
                        {
                            item_id: variant.product.handle,
                            item_name: variant.product.title,
                            item_variant: variant.sku,
                            price: Number(variant.priceV2.amount),
                            currency: variant.priceV2.currencyCode,
                        },
                    ],
                },
            });
        }
    }

    return (
        <div className="variant_stock_availability">
            {variantAvailable && !isDiscontinued
                ? ` +${availableQuantity} In Stock`
                : `Out of Stock`}
        </div>
    );
};

export default VariantAvailability;
