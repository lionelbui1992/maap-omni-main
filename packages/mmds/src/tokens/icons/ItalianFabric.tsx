import React from 'react';

const ItalianFabric = ({ ...props }) => {
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
                d="M4 5.85233V4H14.7662L4 5.85233ZM4 24.068L28 19.9354V19.153L4 23.2923V24.068ZM28 22.015L4 26.1544V25.372L28 21.2393V22.015ZM5.35079 28H4V27.4583L28 23.319V24.0947L5.35079 28ZM19.2934 4L4 6.63472V8.74784L28 4.61521V4H19.2934ZM28 7.51073L4 11.6434V9.53023L28 5.39092V7.51073ZM4 14.5389L28 10.4062V8.28643L4 12.4257V14.5389ZM28 26.1811L17.4277 28H12.9206L28 25.3987V26.1811ZM28 28V27.4851L24.9975 28H28ZM12.5662 17.6551H4V15.3213L28 11.1819V17.8958L4 22.0284V21.2527L24.8838 17.6551H17.0733L4 19.9086V19.1262L12.5662 17.6551Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default ItalianFabric;
