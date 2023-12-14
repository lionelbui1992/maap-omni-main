import React from 'react';

const BookmarkFilled = ({ ...props }) => {
    return (
        <svg
            width="12"
            height="14"
            viewBox="0 0 12 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M12 0H0V14L6 10L12 14V0Z" fill="currentColor" />
        </svg>
    );
};

export default BookmarkFilled;
