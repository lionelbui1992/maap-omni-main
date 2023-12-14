import React from 'react';

const Bag = ({ ...props }) => {
    return (
        <svg
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M11 5V4C11 1.79 9.21 0 7 0C4.79 0 3 1.79 3 4V5H0V16H14V5H11ZM4 4C4 2.34 5.34 1 7 1C8.66 1 10 2.34 10 4V5H4V4ZM13 15H1V6H13V15Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default Bag;
