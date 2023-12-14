import React from 'react';

const Insulated = ({ ...props }) => {
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
                d="M16 2L2 9.13513V11.1359L16 18.271L30 11.1359V9.13513L16 2ZM16 16.0748L4.34644 10.136L16 4.19723L27.6536 10.136L16 16.0748ZM26.1193 15.3163L27.6536 16.0005L16 21.9393L4.34644 16.0005L5.88069 15.3163L3.72603 14.2177L2 14.9996V17.0004L16 24.1355L30 17.0004V14.9996L28.274 14.2177L26.1193 15.3163ZM27.6536 21.865L26.1193 21.1808L28.274 20.0822L30 20.8641V22.8649L16 30L2 22.8649V20.8641L3.72603 20.0822L5.88069 21.1808L4.34644 21.865L16 27.8037L27.6536 21.865Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default Insulated;
