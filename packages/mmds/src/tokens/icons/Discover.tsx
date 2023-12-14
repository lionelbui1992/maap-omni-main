import React from 'react';

const Discover = ({ ...props }) => {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M16 7.3H10.61L15.28 4.61L14.58 3.39L9.91 6.09L12.61 1.42L11.39 0.72L8.7 5.39V0H7.3V5.39L4.61 0.72L3.39 1.42L6.09 6.09L1.42 3.39L0.72 4.61L5.39 7.3H0V8.7H5.39L0.72 11.39L1.42 12.61L6.09 9.91L3.39 14.58L4.61 15.28L7.3 10.61V16H8.7V10.61L11.39 15.28L12.61 14.58L9.91 9.91L14.58 12.61L15.28 11.39L10.61 8.7H16V7.3Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default Discover;
