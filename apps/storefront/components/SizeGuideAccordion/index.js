import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import AccordionPanel from 'containers/AccordionPanel';
import { styles, globalStyles } from './styles';

const SizeGuideAccordion = ({
    productType,
    productTitle,
    breadcrumbs,
    sizeGuideTable,
    sizeGuideProduct,
}) => {
    const [activeTab, setActiveTab] = useState(true);
    const [header, ...rest] = sizeGuideProduct;
    const currentColumnItems = sizeGuideTable.find((item)=>{
        return item?.primary?.accordion_title?.[0].text?.includes(productTitle)
    })

    if (sizeGuideProduct.length >= 0) {
        return (
            <>
                <div className="size_guide_accordion__wrapper">
                    <div className="size_guide_accordion">
                        <AccordionPanel
                            label={ productType || breadcrumbs[breadcrumbs.length - 1] || productTitle }
                            content={
                                <div className="size_guide_accordion__content_wrapper">
                                    {currentColumnItems?.primary?.accordion_description && (
                                        <p className="size_guide_accordion__description">
                                            {RichText.asText(
                                                currentColumnItems.primary.accordion_description
                                            )}
                                        </p>
                                    )}
                                    {sizeGuideProduct.length ? (
                                        <table>
                                            <thead>
                                                <tr>
                                                    {header?.map((h) => {
                                                        return (
                                                            <th key={h}>{h}</th>
                                                        );
                                                    })}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rest?.map((h) => {
                                                    return (
                                                        <tr key={h.join(',')}>
                                                            {h.map((hx) => {
                                                                return (
                                                                    <td
                                                                        key={hx}
                                                                    >
                                                                        {hx}
                                                                    </td>
                                                                );
                                                            })}
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="size-guide-none">
                                            One size fits most.
                                        </div>
                                    )}
                                </div>
                            }
                            activeTab={activeTab}
                            index={true}
                            activateTab={() => {
                                setActiveTab(!activeTab);
                            }}
                        />
                    </div>
                </div>
                <style jsx global>
                    {globalStyles}
                </style>
                <style jsx>{styles}</style>
            </>
        );
    }

    return (
        <>
            <div className="size_guide_accordion__wrapper">
                {sizeGuideTable.map((item, index) => {
                    const accordionColumnItems =
                        item && item.primary ? item.primary : [];
                    const accordionRowItems =
                        item && item.items ? item.items : [];

                    return (
                        <div key={index} className="size_guide_accordion">
                            <AccordionPanel
                                label={
                                    accordionColumnItems &&
                                    RichText.asText(
                                        accordionColumnItems.accordion_title
                                    )
                                        ? RichText.asText(
                                              accordionColumnItems.accordion_title
                                          )
                                        : ''
                                }
                                content={
                                    <div className="size_guide_accordion__content_wrapper">
                                        {accordionColumnItems?.accordion_description && (
                                            <p className="size_guide_accordion__description">
                                                {RichText.asText(
                                                    accordionColumnItems.accordion_description
                                                )}
                                            </p>
                                        )}
                                        <div>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        {accordionColumnItems?.column_title1 && (
                                                            <th>
                                                                {RichText.asText(
                                                                    accordionColumnItems.column_title1
                                                                )}
                                                            </th>
                                                        )}
                                                        {accordionColumnItems?.column_title2 && (
                                                            <th>
                                                                {RichText.asText(
                                                                    accordionColumnItems.column_title2
                                                                )}
                                                            </th>
                                                        )}
                                                        {accordionColumnItems?.column_title3 && (
                                                            <th>
                                                                {RichText.asText(
                                                                    accordionColumnItems.column_title3
                                                                )}
                                                            </th>
                                                        )}
                                                        {accordionColumnItems?.column_title4 && (
                                                            <th>
                                                                {RichText.asText(
                                                                    accordionColumnItems.column_title4
                                                                )}
                                                            </th>
                                                        )}
                                                        {accordionColumnItems?.column_title5 && (
                                                            <th>
                                                                {RichText.asText(
                                                                    accordionColumnItems.column_title5
                                                                )}
                                                            </th>
                                                        )}
                                                        {accordionColumnItems?.column_title6 && (
                                                            <th>
                                                                {RichText.asText(
                                                                    accordionColumnItems.column_title6
                                                                )}
                                                            </th>
                                                        )}
                                                        {accordionColumnItems?.column_title7 && (
                                                            <th>
                                                                {RichText.asText(
                                                                    accordionColumnItems.column_title7
                                                                )}
                                                            </th>
                                                        )}
                                                    </tr>
                                                </thead>
                                                {accordionRowItems.map(
                                                    (rowItem, key) => {
                                                        return (
                                                            <tbody key={key}>
                                                                <tr>
                                                                    {rowItem?.row_title1 && (
                                                                        <td className="row_title">
                                                                            {RichText.asText(
                                                                                rowItem.row_title1
                                                                            )}
                                                                        </td>
                                                                    )}
                                                                    {rowItem?.row_value2 && (
                                                                        <td className="row_two">
                                                                            {RichText.asText(
                                                                                rowItem.row_value2
                                                                            )}
                                                                        </td>
                                                                    )}
                                                                    {rowItem?.row_value3 && (
                                                                        <td>
                                                                            {RichText.asText(
                                                                                rowItem.row_value3
                                                                            )}
                                                                        </td>
                                                                    )}
                                                                    {rowItem?.row_value4 && (
                                                                        <td>
                                                                            {RichText.asText(
                                                                                rowItem.row_value4
                                                                            )}
                                                                        </td>
                                                                    )}
                                                                    {rowItem?.row_value5 && (
                                                                        <td>
                                                                            {RichText.asText(
                                                                                rowItem.row_value5
                                                                            )}
                                                                        </td>
                                                                    )}
                                                                    {rowItem?.row_value6 && (
                                                                        <td>
                                                                            {RichText.asText(
                                                                                rowItem.row_value6
                                                                            )}
                                                                        </td>
                                                                    )}
                                                                    {rowItem?.row_value7 && (
                                                                        <td>
                                                                            {RichText.asText(
                                                                                rowItem.row_value7
                                                                            )}
                                                                        </td>
                                                                    )}
                                                                </tr>
                                                            </tbody>
                                                        );
                                                    }
                                                )}
                                            </table>
                                        </div>
                                    </div>
                                }
                                activeTab={activeTab}
                                index={index}
                                activateTab={() => {
                                    setActiveTab(
                                        activeTab === index ? null : index
                                    );
                                }}
                            />
                        </div>
                    );
                })}
            </div>
            <style jsx global>
                {globalStyles}
            </style>
            <style jsx>{styles}</style>
        </>
    );
};

SizeGuideAccordion.propTypes = {
    sizeGuideTable: PropTypes.array,
};

export default SizeGuideAccordion;
