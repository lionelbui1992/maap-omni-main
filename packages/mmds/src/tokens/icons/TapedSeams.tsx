import React from 'react';

const TapedSeams = ({ ...props }) => {
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
                d="M8.72537 11.6667H9.81935L10.9788 3H8.65986L7.50693 11.6667H6.4064L5.25346 20.3333H4.15949L3 29H5.31242L6.47191 20.3333H7.56589L8.72537 11.6667ZM13.2258 11.6667H14.3263L15.4792 3H13.1668L12.0139 11.6667H10.9134L9.76042 20.3333H8.65989L7.50696 29H9.81938L10.9789 20.3333H12.0728L13.2258 11.6667ZM18.8267 11.6667H17.7327L16.5798 20.3333H15.4793L14.3263 29H12.0139L13.1669 20.3333H14.2608L15.4203 11.6667H16.5143L17.6738 3H19.9862L18.8267 11.6667ZM22.2397 11.6667H23.3336L24.4931 3H22.1807L21.0212 11.6667H19.9272L18.7677 20.3333H17.6738L16.5143 29H18.8267L19.9862 20.3333H21.0802L22.2397 11.6667ZM25.528 11.6667L26.681 3H29V29H21.0211L22.1806 20.3333H23.2746L24.4275 11.6667H25.528Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default TapedSeams;
