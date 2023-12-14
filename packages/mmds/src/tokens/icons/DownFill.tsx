import React from 'react';

const DownFill = ({ props }) => {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g filter="url(#filter0_f_1_127)">
                <circle cx="16" cy="16" r="8" fill="currentColor" />
            </g>
            <circle cx="16" cy="16" r="4" fill="currentColor" />
            <defs>
                <filter
                    id="filter0_f_1_127"
                    x="4"
                    y="4"
                    width="24"
                    height="24"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        stdDeviation="2"
                        result="effect1_foregroundBlur_1_127"
                    />
                </filter>
            </defs>
        </svg>
    );
};

export default DownFill;
