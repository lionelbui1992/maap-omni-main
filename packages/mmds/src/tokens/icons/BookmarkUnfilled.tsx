import React from 'react';

const BookmarkUnfilled = ({ ...props }) => {
    return (
        <svg
            width="12"
            height="14"
            viewBox="0 0 12 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M10.6 1.4V11.38L6.78 8.83L6 8.31L5.22 8.83L1.4 11.38V1.4H10.6ZM12 0H0V14L6 10L12 14V0Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default BookmarkUnfilled;
