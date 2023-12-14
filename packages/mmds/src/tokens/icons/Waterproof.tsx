import React from 'react';

const Waterproof = ({ ...props }) => {
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
                d="M2 28L6.83333 4H30.3333L25.5 28H2ZM9.67834 16C9.67834 20.5225 13.3713 24.1825 17.9177 24.1825C22.4716 24.1825 26.157 20.5225 26.157 16C26.157 11.4775 22.4716 7.8175 17.9177 7.8175C13.3638 7.8175 9.67834 11.4775 9.67834 16ZM11.1057 16C11.1057 14.755 12.1252 13.7425 13.3789 13.7425C14.6325 13.7425 15.652 14.755 15.652 16C15.652 17.245 14.6325 18.2575 13.3789 18.2575C12.1252 18.2575 11.1057 17.245 11.1057 16Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default Waterproof;
