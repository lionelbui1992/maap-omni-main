import React from 'react';

const Circle = ({ ...props }) => {
    return (
        <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle cx="8" cy="12" r="5.5" stroke="white" />
        </svg>
    );
};

export default Circle;
