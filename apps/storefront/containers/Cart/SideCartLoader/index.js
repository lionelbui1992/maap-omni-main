import React from 'react';
import ContentLoader from 'react-content-loader';

const SideCartLoader = ({ numberOfImages }) => {
    const jsx = [];
    for (let i = 0; i < numberOfImages; i++) {
        jsx.push(
            <ContentLoader
                height={150}
                width={320}
                speed={2}
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb"
            >
                <rect x="0" y="12" rx="0" ry="0" width="93" height="130" />

                <rect x="108" y="20" rx="0" ry="0" width="100" height="12" />
                <rect x="108" y="38" rx="0" ry="0" width="75" height="11" />

                <rect x="108" y="55" rx="0" ry="0" width="65" height="11" />
                <rect x="270" y="55" rx="0" ry="0" width="60" height="11" />

                <rect x="108" y="72" rx="0" ry="0" width="40" height="11" />
                <rect x="240" y="72" rx="0" ry="0" width="80" height="12" />

                <rect x="108" y="90" rx="0" ry="0" width="60" height="12" />
                <rect x="108" y="110" rx="0" ry="0" width="40" height="8" />
            </ContentLoader>
        );
    }
    return jsx;
};

export default SideCartLoader;
