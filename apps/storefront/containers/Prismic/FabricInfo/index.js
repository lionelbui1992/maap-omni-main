import React from 'react';
import pathOr from 'ramda/src/pathOr';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import { breakpointMedium } from 'config/styles/breakpoints';

const FabricInfo = ({ block, items }) => {
    const percentage = block.main_fabric_weight || 0;
    return (
        <>
            <div className="fabric_info__container">
                <div className="fabric_info__content">
                    <div className="fabric_info__column">
                        <h3>Product Weight</h3>
                        <p>
                            {pathOr('', ['product_weight', 0, 'text'], block)}
                        </p>
                        <h3>Main Fabric Content</h3>
                        <p>
                            {pathOr(
                                '',
                                ['main_fabric_content', 0, 'text'],
                                block
                            )}
                        </p>
                        <h3>Main Fabric Weight</h3>
                        <p>
                            {pathOr(
                                '',
                                ['main_fabric_weight_description', 0, 'text'],
                                block
                            )}
                        </p>
                        <div className="fabric_info__progress_container">
                            <div className="fabric_info__progress" />
                        </div>
                        {block?.bluesign_title && (
                            <h4>{RichText.render(block?.bluesign_title)}</h4>
                        )}
                        {block?.bluesign &&
                            block.bluesign.map((p, i) => (
                                <div className="fabric_description" key={i}>
                                    {p.text}
                                </div>
                            ))}
                    </div>
                    <div className="fabric_info__column fabric_care">
                        <h4>CARE</h4>
                        {block.care &&
                            block.care.map((p, i) => (
                                <div className="fabric_description" key={i}>
                                    {p.text}
                                </div>
                            ))}
                        <div className="fabric_info__bullet_container">
                            {items &&
                                items.map((item, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className="fabric_info__bullet"
                                        >
                                            <img
                                                src={item.icon.url}
                                                alt="bullets"
                                            />
                                            <div className="fabric_description">
                                                {pathOr(
                                                    '',
                                                    ['bullet', 0, 'text'],
                                                    item
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx global>
                {`
                    @media (min-width: ${breakpointMedium}) {
                        .fabric_info__column > h3 {
                            padding-top: 10px;
                        }
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .fabric_info__column > h3 {
                            padding-top: 10px;
                        }
                    }
                    .fabric_info__column > p {
                        text-transform: uppercase;
                        font-weight: 500;
                    }
                    .fabric_info__column .fabric_info__bullet_container > p {
                        text-transform: inherit;
                    }
                `}
            </style>
            <style jsx>
                {`
                    @media (min-width: ${breakpointMedium}) {
                        .fabric_info__container {
                            padding: 0;
                        }
                        .fabric_info__content {
                            display: flex;
                            flex-direction: column;
                        }
                        .fabric_info__column {
                            width: 100%;
                        }
                        .fabric_info__bullet_container {
                            margin-top: 40px;
                            margin-bottom: 20px;
                        }
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .fabric_info__container {
                            padding: 0;
                        }
                        .fabric_info__content {
                            display: flex;
                            flex-direction: column;
                        }
                        .fabric_info__column {
                            width: 100%;
                        }
                        .fabric_info__bullet_container {
                            margin-top: 40px;
                            margin-bottom: 20px;
                        }
                    }
                    .fabric_info__bullet {
                        display: flex;
                        flex-direction: row;
                        padding: 7px 0;
                        align-items: center;
                    }
                    img {
                        margin-top: 2px;
                        margin-right: 15px;
                        width: 35px;
                        height: 35px;
                    }
                    .fabric_info__progress {
                        height: 8px;
                        width: ${percentage}%;
                        background: linear-gradient(90deg, #bdbdbd, #000000);
                    }
                    .fabric_info__progress_container {
                        width: 100%;
                        background-color: #ffffff;
                        margin-top: 15px;
                    }
                    h2 {
                        font-weight: 300;
                        font-size: 1.7em;
                        margin: 0;
                    }
                    h3 {
                        font-weight: 300;
                        font-size: 1em;
                        margin: 0 0 6px;
                    }
                    h4 {
                        font-weight: 500;
                        font-size: 1em;
                        margin: 36px 0 10px;
                    }
                    p {
                        font-size: 1em;
                        margin: 6px 0;
                    }
                    .fabric_description {
                        font-size: 1em;
                    }
                `}
            </style>
        </>
    );
};

FabricInfo.propTypes = {
    block: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
};

export default FabricInfo;
