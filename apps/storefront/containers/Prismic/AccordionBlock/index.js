import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import AccordionPanel from 'containers/AccordionPanel';
import { breakpointMedium } from 'config/styles/breakpoints';
import { brandBackgroundGrey, brandDarkBlack } from '@config/styles/colours';

const AccordionBlock = ({ block, items }) => {
    if (!items) return null;
    const [activeTab, setActiveTab] = useState(null);

    return (
        <>
            <div className="accordionBlock">
                <div className="accordionBlock_heading">{block?.heading}</div>
                <section className="accordionBlock_panel">
                    {items.map((item, index) => (
                        <AccordionPanel
                            key={index}
                            label={item?.accordion_question}
                            content={RichText.render(
                                item?.accordion_description
                            )}
                            activeTab={activeTab}
                            index={index}
                            activateTab={() => {
                                setActiveTab(
                                    activeTab === index ? null : index
                                );
                            }}
                        />
                    ))}
                </section>
            </div>
            <style jsx>
                {`
                    .accordionBlock_heading {
                        font-family: MonumentExtended-Regular, sans-serif;
                        font-weight: 600;
                        font-size: 16px;
                        letter-spacing: 0;
                        line-height: 16px;
                        padding-bottom: 4px;
                    }
                    .accordionBlock_panel {
                        margin-top: 3px;
                        margin-bottom: 50px;
                    }
                    // Mobile style
                    .accordionBlock {
                        display: flex;
                        flex: 1;
                        flex-direction: column;
                        background-color: ${brandBackgroundGrey};
                        padding: 30px 16px;
                        height: auto;
                    }
                    @media (min-width: 1260px) {
                        // Desktop style
                        .accordionBlock {
                            display: flex;
                            flex: 1;
                            flex-direction: column;
                            padding: 48px;
                            background-color: ${brandBackgroundGrey};
                            height: 617px;
                        }
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .accordionBlock_panel
                        .accordion_panel
                        .accordion_panel__label {
                        padding: 16px 0;
                    }
                    .accordionBlock_panel
                        .accordion_panel
                        .accordion_panel__label {
                        font-family: acumin-pro, sans-serif;
                        color: ${brandDarkBlack};
                        font-size: 16px;
                        font-weight: 300;
                        letter-spacing: 0;
                        line-height: 22px;
                    }
                    .accordionBlock_panel
                        .accordion_panel__inner
                        .accordion_panel__content
                        p {
                        font-family: acumin-pro, sans-serif;
                        font-size: 16px;
                        font-weight: 300;
                        letter-spacing: 0;
                        line-height: 1.5;
                        margin: 0 0 10px 0;
                    }
                    .accordionBlock_panel
                        .accordion_panel__inner
                        .accordion_panel__content
                        p:last-child {
                        margin: 0;
                    }
                    .accordionBlock_panel
                        .accordion_panel__inner
                        .accordion_panel__content {
                        padding-bottom: 23px;
                    }
                    .accordionBlock_panel .accordion_panel:not(:last-child) {
                        margin-bottom: 0;
                    }
                `}
            </style>
        </>
    );
};

AccordionBlock.propTypes = {
    block: PropTypes.object,
    items: PropTypes.array.isRequired,
};

export default AccordionBlock;
