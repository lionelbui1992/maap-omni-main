import React from 'react';
import dayjs from 'dayjs';
import { RichText } from 'prismic-reactjs';
import InformationPageAccordion from 'containers/InformationPageAccordion';
import { breakpointMedium, breakpointLarge } from 'config/styles/breakpoints';
import { brandActiveGrey, brandSelectedGrey } from 'config/styles/colours';

const InformationPageBlock = ({ document }) => {
    const { title, description, last_updated, image, body } = document.data;
    const items = body[0]?.items;

    return (
        <>
            <div className="information_page_block">
                <div className="column">
                    <div className="contentContainer">
                        <div className="ap-description">
                            <h1>{title[0].text}</h1>
                            <p>
                                Last updated:{' '}
                                {dayjs(last_updated).format('MMMM DD, YYYY')}
                            </p>
                            <div>{RichText.render(description)}</div>
                        </div>

                        <div className="ap-accordion-panel">
                            <InformationPageAccordion items={items} />
                        </div>
                    </div>
                </div>

                <div className="column">
                    <img src={image.url} alt="image" />
                </div>
            </div>
            <style jsx>
                {`
                    .information_page_block {
                        background-color: ${brandActiveGrey};
                        display: flex;
                        width: 100%;
                        box-sizing: border-box;
                    }

                    .ap-description {
                        padding: 20px 50px;
                        line-height: 1.5;
                        flex: 1;
                    }

                    .ap-accordion-panel {
                        padding-top: 90px;
                        padding-right: 30px;
                        flex: 1;
                    }

                    .column {
                        flex: 1;
                        position: relative;
                    }
                    @media (max-width: ${breakpointLarge}) {
                        .column .contentContainer {
                            flex-direction: column;
                        }
                        .ap-accordion-panel {
                            background-color: ${brandSelectedGrey};
                            padding: 40px 50px;
                        }
                    }

                    @media (max-width: ${breakpointMedium}) {
                        .information_page_block {
                            flex-wrap: wrap;
                        }
                        .column,
                        .ap-description,
                        .ap-accordion-panel {
                            flex: 1 0 100%;
                        }

                        img {
                            display: none;
                        }
                    }

                    @media (min-width: ${breakpointMedium}) {
                        .contentContainer {
                            display: flex;
                            position: absolute;
                            left: 0;
                            top: 0;
                            height: 100%;
                            flex: 1;
                            overflow-y: scroll;
                            -ms-overflow-style: none;
                            scrollbar-width: none;
                        }

                        .contentContainer::-webkit-scrollbar {
                            display: none;
                        }

                        img {
                            width: 100%;
                            display: block;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default InformationPageBlock;
