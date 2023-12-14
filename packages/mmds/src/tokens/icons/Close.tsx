import React from 'react';

const Globe = ({ ...props }) => {
    return (
        <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.99998 12.9899L12.505 17.495L13.495 16.505L8.98993 12L13.495 7.49495L12.505 6.505L7.99998 11.01L3.49495 6.505L2.505 7.49495L7.01003 12L2.50501 16.505L3.49495 17.495L7.99998 12.9899Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default Globe;
