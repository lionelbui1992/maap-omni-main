import React from 'react';
import ChevronDown from '@images/small_icon/ChevronDown.svg';
import { brandBlack, brandWhite } from 'config/styles/colours';

const LoadMore = ({ onClick, disabled }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="loadMoreButton"
            disabled={disabled}
        >
            <img src={ChevronDown.src} alt="Down Arrow" />
            <span className="buttonText">{`Load More`}</span>
            <img src={ChevronDown.src} alt="Down Arrow" />
            <style jsx>
                {`
                    .loadMoreButton {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 16px 25px;
                        border-radius: 40px;
                        background: none;
                        border: 1px solid ${brandBlack};
                        cursor: pointer;
                    }
                    img {
                        height: 13px;
                        width: 13px;
                    }
                    .buttonText {
                        margin: 0 90px;
                    }
                    .loadMoreButton:hover {
                        filter: invert(100%);
                        background: ${brandWhite};
                    }
                `}
            </style>
        </button>
    );
};

export default LoadMore;
