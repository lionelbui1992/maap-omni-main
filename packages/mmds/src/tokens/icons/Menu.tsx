import React from 'react';

const Menu = ({ ...props }) => {
    return (
        <svg
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M16 0.530029H0V1.53003H16V0.530029Z" fill="currentColor" />
            <path d="M16 12.53H0V13.53H16V12.53Z" fill="currentColor" />
            <path d="M16 6.5H0V7.5H16V6.5Z" fill="currentColor" />
        </svg>
    );
};

export default Menu;
