import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import AccordionPanel from 'containers/AccordionPanel';

const InformationPageAccordion = ({ items }) => {
    const [activeTab, setActiveTab] = useState(null);

    return (
        <section id="information-page-items" className="accordion">
            {items.map((item, index) => (
                <AccordionPanel
                    key={index}
                    label={item.item[0].text}
                    content={RichText.render(item.item_description)}
                    activeTab={activeTab}
                    index={index}
                    activateTab={() => {
                        setActiveTab(activeTab === index ? null : index);
                    }}
                />
            ))}
            <style jsx>
                {`
                    .accordion {
                        display: flex;
                        flex-direction: column;
                        margin-top: 3px;
                        border-top: 1px solid black;
                        margin-bottom: 50px;
                    }
                `}
            </style>
        </section>
    );
};

InformationPageAccordion.propTypes = {
    items: PropTypes.array.isRequired,
};

export default InformationPageAccordion;
