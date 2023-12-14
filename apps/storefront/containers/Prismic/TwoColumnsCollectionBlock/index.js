import React from 'react';
import PropTypes from 'prop-types';
import { breakpointMedium } from 'config/styles/breakpoints';
import TopLeftContentBlock from './TopLeftContentBlock';
import BottomLeftContentBlock from './BottomLeftContentBlock';
import TopRightContentBlock from './TopRightContentBlock';
import BottomRightContentBlock from './BottomRightContentBlock';
import { styles } from './styles';

const TwoColumnsCollectionBlock = ({ block, items, isMobile, isTablet }) => {
    return (
        <>
            <div className="two_columns_collection_block__container">
                <div className="left_content_block__container">
                    <div className="top_left_content_block">
                        <TopLeftContentBlock block={block} />
                    </div>
                    <div className="bottom_left_content_block">
                        <BottomLeftContentBlock items={items} />
                    </div>
                </div>
                <div className="right_content_block__container">
                    <TopRightContentBlock
                        block={block}
                        isMobile={isMobile}
                        isTablet={isTablet}
                    />
                    <BottomRightContentBlock
                        block={block}
                        isMobile={isMobile}
                        isTablet={isTablet}
                    />
                </div>
            </div>
            <style jsx>{styles}</style>
            <style jsx>
                {`
                    .two_columns_collection_block__container {
                        display: flex;
                        width: 100%;
                    }
                    .left_content_block__container {
                        flex: 1 50%;
                        text-align: center;
                    }
                    .right_content_block__container {
                        flex: 1 50%;
                    }
                    .top_left_content_block {
                        width: 50%;
                        margin: 70px auto;
                        padding: 30px;
                    }
                    .bottom_left_content_block {
                        display: flex;
                        flex-wrap: wrap;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .two_columns_collection_block__container {
                            flex-direction: column;
                        }
                        .left_content_block__container {
                            flex: none;
                        }
                        .right_content_block__container {
                            flex-direction: column;
                        }
                        .top_left_content_block {
                            width: 75%;
                            padding: 20px;
                        }
                        .bottom_left_content_block {
                            flex-direction: column;
                            width: 100%;
                            margin: 0 auto;
                        }
                    }
                `}
            </style>
        </>
    );
};

TwoColumnsCollectionBlock.propTypes = {
    block: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
};

export default TwoColumnsCollectionBlock;
