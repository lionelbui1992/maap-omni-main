import React from 'react';
import { brandBlack } from 'config/styles/colours';
import Swatch from 'components/Swatch';

const ProductCardSiblings = ({ siblings, selectedProductHandle, keyIndex }) => {
    if (!siblings || !siblings.length) {
        return null;
    }

    const maxSmallDeviceSwatches = 3;
    const swatchRemainders = siblings?.length - maxSmallDeviceSwatches;

    if (typeof siblings !== 'object') {
        console.log(
            'Typeof siblings is not compatible for product',
            selectedProductHandle,
            siblings
        );
        return null;
    }

    return (
        <nav key={keyIndex}>
            <div className="siblingWrapper">
                {siblings &&
                    siblings?.map((sibling, index) => {
                        return (
                            <div
                                className="swatchColumn"
                                key={`swatch_for_sibling_${sibling.handle}_${index}`}
                            >
                                <Swatch
                                    handle={sibling.handle}
                                    colour={sibling.swatchColour}
                                    title={sibling.title}
                                    image={sibling?.image}
                                    selected={
                                        selectedProductHandle === sibling.handle
                                    }
                                    showTitles={false}
                                />
                            </div>
                        );
                    })}
                {swatchRemainders > 0 && (
                    <div className="swatchCount">+{swatchRemainders}</div>
                )}
            </div>
            <style jsx global>
                {`
                    .swatchColumn > .siblingLink {
                        text-decoration: none;
                    }
                `}
            </style>
            <style jsx>
                {`
                    nav {
                        z-index: 0;
                        display: flex;
                        flex-flow: row wrap;
                        -webkit-box-pack: end;
                        justify-content: flex-end;
                        flex: 4 1 0%;
                        align-items: flex-start;
                        flex-wrap: nowrap;
                    }
                    .siblingWrapper {
                        align-items: center;
                        display: flex;
                        flex-flow: row wrap;
                        flex-flow: row wrap;
                        justify-content: flex-end;
                    }
                    .swatchColumn {
                        display: flex;
                        justify-content: center;
                        margin: 0 0 0 5px;
                        padding: 3px;
                        border-radius: 50%;
                        width: 20px;
                        height: 20px;
                    }
                    .swatchContainer.selected {
                        border: 1px solid ${brandBlack};
                        padding: 2px;
                    }
                    .swatchCount {
                        display: none;
                        align-items: center;
                        margin: 0 5px;
                    }
                    .swatchContainer {
                        margin: 0;
                    }
                    .swatchColumn:nth-child(n + 4) {
                        display: none;
                    }
                    .swatchCount {
                        display: flex;
                    }
                `}
            </style>
        </nav>
    );
};

export default ProductCardSiblings;
