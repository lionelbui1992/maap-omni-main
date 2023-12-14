import React from 'react';
import InformationPageAccordion from 'containers/InformationPageAccordion';

const CustomerServicesAccordionBlock = block => {
    const { title, body } = block.document;
    const items = body[0].items;

    return (
        <>
            <div className="returnsInfoBlock">
                <div className="row">
                    <h1>{title[0].text.toUpperCase()}</h1>
                    <div className="AccordionPanel">
                        <InformationPageAccordion items={items} />
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    .returnsInfoBlock {
                        width: 100%;
                        background-color: rgb(219, 219, 219);
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                    }

                    .row {
                        padding: 20px 200px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        width: 80%;
                    }

                    .row h1 {
                        text-align: center;
                    }
                `}
            </style>
        </>
    );
};

export default CustomerServicesAccordionBlock;
