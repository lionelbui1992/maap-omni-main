import React from 'react';
import dynamic from 'next/dynamic';
const NotifyMeForm = dynamic(() => import('containers/Product/NotifyMeForm'));
const AddToBag = dynamic(() => import('containers/Product/AddToBag'));

const CartControls = ({
    variantAvailable,
    selectedVariant,
    tags,
    productTitle,
}) => {
    let controlMode = 'standard';

    if (!variantAvailable) controlMode = 'notify';

    const upperCasedTags = tags.map((tag) => tag.toUpperCase());
    if (upperCasedTags.indexOf('COMINGSOON') !== -1) controlMode = 'brochure';
    if (upperCasedTags.indexOf('DISABLENOTIFYME') !== -1) {
        // Show Sold out, but still allow in results
        controlMode = 'soldout';
    }

    if (upperCasedTags.indexOf('DISCONTINUED') !== -1)
        controlMode = 'discontinued';

    let buttonText = 'Add To Bag';

    const preOrderDate = selectedVariant?.metafields
        .filter((metafield) => !!metafield)
        .find((metafield) => {
            return (
                metafield.namespace === 'preorder' && metafield.key === 'date'
            );
        })?.value;

    const notifyMeDate = selectedVariant?.metafields
        .filter((metafield) => !!metafield)
        .find((metafield) => {
            return (
                metafield.namespace === 'notifyme' && metafield.key === 'date'
            );
        })?.value;

    if (preOrderDate && preOrderDate?.node) {
        controlMode = 'preorder';
        if (controlMode === 'preorder')
            buttonText = `Pre-Order / Shipped from ${preOrderDate.node.value}`;
    }

    const showButton = controlMode !== 'notify' || variantAvailable;
    const showNotify = controlMode === 'notify' && !variantAvailable;

    if (!variantAvailable && controlMode !== 'preorder')
        buttonText = 'Sold Out';

    if (controlMode === 'brochure') buttonText = 'Coming Soon';

    if (controlMode === 'discontinued') buttonText = 'Sold Out';

    let buttonDisabled =
        !variantAvailable ||
        controlMode === 'brochure' ||
        controlMode === 'discontinued';

    if (controlMode === 'preorder' || controlMode === 'soldout') {
        buttonDisabled = !selectedVariant?.availableForSale;
        if (buttonDisabled) {
            buttonText = 'Sold Out';
        }
    }

    return (
        <>
            {showButton && (
                <AddToBag
                    qty="1"
                    disabled={buttonDisabled}
                    selectedVariant={selectedVariant}
                    text={buttonText}
                    productTitle={productTitle}
                />
            )}
            {showNotify && (
                <NotifyMeForm variant={selectedVariant} date={notifyMeDate} />
            )}
        </>
    );
};

export default CartControls;
