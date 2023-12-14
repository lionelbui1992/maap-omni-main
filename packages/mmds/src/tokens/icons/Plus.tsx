import React from 'react';

const Plus = ({ ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="24"
        fill="none"
        {...props}
    >
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M8.7 12.7h6.371v-1.4H8.7V4.929H7.3V11.3H.929v1.4H7.3v6.371h1.4V12.7Z"
            clipRule="evenodd"
        />
    </svg>
);

export default Plus;
