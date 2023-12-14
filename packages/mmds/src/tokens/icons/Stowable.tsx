import React from 'react';

const Stowable = ({ props }) => {
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
                d="M16.2697 4.50846V2H3V27.4915H15.7303V30H29V4.50846H16.2697ZM10.6135 21.1205H4.33314L7.47718 15.8964L10.6212 10.6723L13.7653 15.8964L16.9093 21.1205H10.6289H10.6135ZM21.3865 17.3615H15.1061L18.2501 12.1374L21.3942 6.91332L24.5382 12.1374L27.6823 17.3615H21.4019H21.3865Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default Stowable;
