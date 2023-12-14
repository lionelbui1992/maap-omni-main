import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useProductPrismicDocuments } from '@lib/providers/ProductPrismicDocumentsProvider';
import { RichText } from 'prismic-reactjs';
import { brandBlack } from 'config/styles/colours';
import AccordionPanel from 'containers/AccordionPanel';

const ProductAdditionalInfo = ({ product }) => {
    const { getDocument } = useProductPrismicDocuments();
    const [activeTab, setActiveTab] = useState(null);
    const panels = [];

    const delivery = getDocument('delivery');
    const warranty = getDocument('warranty');

    if (product && product.metafields) {
        product?.metafields?.forEach((metafield) => {
            if (metafield) {
                const { namespace, key, value } = metafield;

                if (namespace !== 'product') return;
                if (key === 'sizing') {
                    panels.push({
                        label: 'Sizing & Fit',
                        content: (
                            <div dangerouslySetInnerHTML={{ __html: value }} />
                        ),
                    });
                }
                if (key === 'long_description') {
                    panels.push({
                        label: 'Details',
                        content: (
                            <div dangerouslySetInnerHTML={{ __html: value }} />
                        ),
                    });
                }
            }
        });

        panels.sort(function (a, b) {
            return a.label.toUpperCase() < b.label.toUpperCase()
                ? -1
                : a.label.toUpperCase() > b.label.toUpperCase()
                ? 1
                : 0;
        });
    }

    if (delivery) {
        if (delivery.data.description) {
            const deliveryInfo = RichText.asText(delivery.data.description);
            panels.push({
                label: 'Free shipping & Returns',
                content: (
                    <div dangerouslySetInnerHTML={{ __html: deliveryInfo }} />
                ),
            });
        }
    }

    if (warranty) {
        if (warranty.data.description) {
            const warrantyInfo = RichText.asText(warranty.data.description);
            panels.push({
                label: 'Crash Replacement & Warranty',
                content: (
                    <div dangerouslySetInnerHTML={{ __html: warrantyInfo }} />
                ),
            });
        }
    }

    return (
        <>
            <section
                id="product_additional_details"
                className="product_additional_details__accordion"
            >
                {panels.map((panel, index) => (
                    <AccordionPanel
                        {...panel}
                        key={`panel_${index}`}
                        activeTab={activeTab}
                        index={index}
                        activateTab={() => {
                            setActiveTab(activeTab === index ? null : index);
                        }}
                    />
                ))}
            </section>
            <style jsx>
                {`
                    .product_additional_details__accordion {
                        display: flex;
                        flex-direction: column;
                        margin-top: 20px;
                        border-top: 1px solid ${brandBlack} !important;
                        margin-bottom: 35px;
                    }
                `}
            </style>
        </>
    );
};

ProductAdditionalInfo.propTypes = {
    product: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProductAdditionalInfo;
