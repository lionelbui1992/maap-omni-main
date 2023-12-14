import React from 'react';

const Profile = ({ ...props }) => {
    return (
        <svg
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g clipPath="url(#clip0_1578_1407)">
                <path
                    d="M9.32 9.4C10.91 8.56 12 6.92 12 5C12 2.24 9.76 0 7 0C4.24 0 2 2.24 2 5C2 6.92 3.09 8.56 4.68 9.4C1.96 10.36 0 12.95 0 16H1C1 12.69 3.69 10 7 10C10.31 10 13 12.69 13 16H14C14 12.95 12.05 10.36 9.32 9.4ZM3 5C3 2.79 4.79 1 7 1C9.21 1 11 2.79 11 5C11 7.21 9.21 9 7 9C4.79 9 3 7.21 3 5Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath id="clip0_1578_1407">
                    <rect width="14" height="16" fill="currentColor" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default Profile;
