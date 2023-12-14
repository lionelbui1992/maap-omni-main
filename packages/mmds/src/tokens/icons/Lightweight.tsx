import React from 'react';

const Lightweight = ({ ...props }) => {
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
                d="M2 2V30H30V2H2ZM27.9118 27.4597H4.08818V25.6956H27.9118V27.4597ZM27.9118 23.9315H4.08818V22.1673H27.9118V23.9315ZM27.9118 20.4032H4.08818V18.6391H27.9118V20.4032ZM27.9118 16.875H4.08818V15.1109H27.9118V16.875ZM27.9118 13.3468H4.08818V11.5827H27.9118V13.3468ZM27.9118 9.81855H4.08818V8.05444H27.9118V9.81855ZM27.9118 6.29032H4.08818V4.52621H27.9118V6.29032Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default Lightweight;
