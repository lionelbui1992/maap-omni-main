import * as React from 'react';

export const Left = ({ ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="24"
        viewBox="0 0 16 24"
        fill="none"
        {...props}
        style={{ display: 'block' }}
    >
        <path
            d="M8.43817 6L3.5 11.3478L15 11.3478L15 12.6739L3.5 12.6739L8.43817 18L6.64274 18L0.999999 12L6.64275 6L8.43817 6Z"
            fill="currentColor"
        />
    </svg>
);

export default Left;
