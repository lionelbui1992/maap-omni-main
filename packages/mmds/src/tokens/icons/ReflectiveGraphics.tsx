import React from 'react';

const ReflectiveGraphics = ({ ...props }) => {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.52969 12H1L8.52969 4V12ZM8.52969 20V12L1 20H8.52969ZM8.52969 28V20L1 28L8.52969 28ZM8.52969 28H31V4.12616L23.6449 11.9332V4L16.3038 11.8071V4L8.77416 12H16.1152L8.77416 19.807H16.241L8.52969 28Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default ReflectiveGraphics;
