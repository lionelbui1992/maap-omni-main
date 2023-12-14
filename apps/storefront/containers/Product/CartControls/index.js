import React, { useState } from 'react';
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

    const [recipientEmail, setRecipientEmail] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [message, setMessage] = useState('');
    const [sendOn, setSendOn] = useState('');

    const [showInputs, setShowInputs] = useState(false);


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

    const customAttributes = [
        {
            'key' : '__shopify_send_gift_card_to_recipient',
            'value' : 'on',
        },
        {
            key: 'Recipient email',
            value: recipientEmail,
        },
        {
            key: 'Recipient name',
            value: recipientName,
        },
        {
            key: 'Message',
            value: message,
        },
        {
            key: 'Send on',
            value: sendOn,
        },
        {
            'key' : '__shopify_offset',
            'value' : '-240',
        },
    ];

    return (
        <>  
            <div className='gift-card-checkbox' style={
                {
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                    marginTop: '20px',
                }
            }>
                <input type="checkbox" id="gift-card" name="gift-card" onChange={(e) => setShowInputs(e.target.checked)} />
                <label htmlFor="gift-card">I want to send this as a gift</label>
            </div>

            {showInputs && (
                <div className='grouped-inputs' style={
                    {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }
                }>
                    <input type="email" placeholder='Recipient email' name="recipient_email" onChange={(e) => setRecipientEmail(e.target.value)} />
                    <input type="text" placeholder='Recipient name' name="recipient_name" onChange={(e) => setRecipientName(e.target.value)} />
                    <textarea placeholder='Message' name="message" onChange={(e) => setMessage(e.target.value)} />
                    <span>200 characters max</span>
                    <input type="date" placeholder='Send On' name="send_on" onChange={(e) => setSendOn(e.target.value)} />
                </div>
            )}
            {showButton && (
                <AddToBag 
                    qty="1"
                    disabled={buttonDisabled}
                    selectedVariant={selectedVariant}
                    text={buttonText}
                    productTitle={productTitle}
                    customAttributes={customAttributes}
                />
            )}
            {showNotify && (
                <NotifyMeForm variant={selectedVariant} date={notifyMeDate} />
            )}
            
        </>
    );
};

export default CartControls;
