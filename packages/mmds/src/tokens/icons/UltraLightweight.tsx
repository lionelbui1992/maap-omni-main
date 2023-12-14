import React from 'react';

const UltraLightweight = ({ ...props }) => {
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
                d="M30 2H2V3H30V2ZM30 29H2V30H30V29ZM2 26H30V27H2V26ZM30 23H2V24H30V23ZM2 20H30V21H2V20ZM30 17H2V18H30V17ZM2 14H30V15H2V14ZM30 11H2V12H30V11ZM2 8H30V9H2V8ZM30 5H2V6H30V5Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default UltraLightweight;
