import React from 'react';

const DriReleaseFabric = ({ ...props }) => {
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
                d="M3.16381 2H28.8362C29.478 2 30 2.522 30 3.16381V28.8362C30 29.478 29.478 30 28.8362 30H24V28H28V4H4V8H2V3.16381C2 2.522 2.522 2 3.16381 2ZM20.8328 10.0589L2 10V15H4.00576L4 12H20V28H17V30H22V11.2526C22 10.5943 21.4765 10.0589 20.8328 10.0589ZM13.7989 17H2V28.7989C2 29.4613 2.53872 30 3.20109 30H15V18.2011C15 17.5387 14.4613 17 13.7989 17Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default DriReleaseFabric;
