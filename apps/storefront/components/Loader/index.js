import React, { Fragment } from 'react';
import ContentLoader from 'react-content-loader';

const Loader = ({ type, isMobile, isTablet }) => {
    let desktopContentPlaceholder;
    let tabletContentPlaceholder;
    let mobileContentPlaceholder;

    switch (type) {
        case 'product':
            desktopContentPlaceholder = (
                <Fragment>
                    <rect x="245" y="156" rx="0" ry="0" width="0" height="0" />
                    <rect x="12" y="19" rx="0" ry="0" width="350" height="542" />
                    <rect x="370" y="20" rx="0" ry="0" width="220" height="60" />
                    <rect x="370" y="100" rx="0" ry="0" width="220" height="15" />
                    <rect x="370" y="120" rx="0" ry="0" width="110" height="15" />
                    <rect x="370" y="140" rx="0" ry="0" width="220" height="15" />
                    <rect x="370" y="180" rx="0" ry="0" width="220" height="60" />
                    <rect x="370" y="260" rx="0" ry="0" width="220" height="15" />
                    <rect x="370" y="280" rx="0" ry="0" width="220" height="15" />
                    <rect x="370" y="300" rx="0" ry="0" width="220" height="15" />
                    <rect x="370" y="320" rx="0" ry="0" width="220" height="15" />
                </Fragment>
            );

            tabletContentPlaceholder = (
                <Fragment>
                    <rect x="25" y="5" rx="5" ry="5" width="450" height="450" />
                    <rect x="25" y="470" rx="0" ry="0" width="450" height="10" />
                    <rect x="25" y="490" rx="0" ry="0" width="225" height="10" />
                    <rect x="25" y="510" rx="0" ry="0" width="450" height="10" />
                    <rect x="25" y="530" rx="0" ry="0" width="450" height="30" />
                    <rect x="25" y="570" rx="0" ry="0" width="450" height="10" />
                </Fragment>
            );

            mobileContentPlaceholder = (
                <Fragment>
                    <rect x="25" y="5" rx="5" ry="5" width="450" height="450" />
                    <rect x="25" y="470" rx="0" ry="0" width="450" height="10" />
                    <rect x="25" y="490" rx="0" ry="0" width="225" height="10" />
                    <rect x="25" y="510" rx="0" ry="0" width="450" height="10" />
                    <rect x="25" y="530" rx="0" ry="0" width="450" height="30" />
                    <rect x="25" y="570" rx="0" ry="0" width="450" height="10" />
                </Fragment>
            );
            break;
        default:
            desktopContentPlaceholder = (
                <Fragment>
                    <rect x="5" y="20" rx="0" ry="0" width="590" height="140" />
                    <rect x="5" y="178" rx="0" ry="0" width="120" height="200" />
                    <rect x="157" y="180" rx="0" ry="0" width="120" height="140" />
                    <rect x="157" y="330" rx="0" ry="0" width="120" height="10" />
                    <rect x="157" y="345" rx="0" ry="0" width="120" height="10" />
                    <rect x="157" y="360" rx="0" ry="0" width="120" height="10" />
                    <rect x="314" y="180" rx="0" ry="0" width="120" height="140" />
                    <rect x="314" y="330" rx="0" ry="0" width="120" height="10" />
                    <rect x="314" y="345" rx="0" ry="0" width="120" height="10" />
                    <rect x="314" y="360" rx="0" ry="0" width="120" height="10" />
                    <rect x="473" y="180" rx="0" ry="0" width="120" height="140" />
                    <rect x="473" y="330" rx="0" ry="0" width="120" height="10" />
                    <rect x="473" y="345" rx="0" ry="0" width="120" height="10" />
                    <rect x="473" y="360" rx="0" ry="0" width="120" height="10" />
                </Fragment>
            );

            tabletContentPlaceholder = (
                <Fragment>
                    <rect x="20" y="5" rx="5" ry="5" width="220" height="230" />
                    <rect x="20" y="240" rx="0" ry="0" width="220" height="10" />
                    <rect x="20" y="255" rx="0" ry="0" width="220" height="10" />
                    <rect x="20" y="270" rx="0" ry="0" width="220" height="10" />
                    <rect x="250" y="5" rx="5" ry="5" width="220" height="230" />
                    <rect x="250" y="240" rx="0" ry="0" width="220" height="10" />
                    <rect x="250" y="255" rx="0" ry="0" width="220" height="10" />
                    <rect x="250" y="270" rx="0" ry="0" width="220" height="10" />
                    <rect x="20" y="290" rx="5" ry="5" width="220" height="230" />
                    <rect x="250" y="290" rx="5" ry="5" width="220" height="230" />
                    <rect x="20" y="525" rx="0" ry="0" width="220" height="10" />
                    <rect x="20" y="540" rx="0" ry="0" width="220" height="10" />
                    <rect x="20" y="555" rx="0" ry="0" width="220" height="10" />
                    <rect x="250" y="525" rx="0" ry="0" width="220" height="10" />
                    <rect x="250" y="540" rx="0" ry="0" width="220" height="10" />
                    <rect x="250" y="555" rx="0" ry="0" width="220" height="10" />
                </Fragment>
            );

            mobileContentPlaceholder = (
                <Fragment>
                    <rect x="20" y="5" rx="5" ry="5" width="220" height="230" />
                    <rect x="20" y="240" rx="0" ry="0" width="220" height="10" />
                    <rect x="20" y="255" rx="0" ry="0" width="220" height="10" />
                    <rect x="20" y="270" rx="0" ry="0" width="220" height="10" />
                    <rect x="250" y="5" rx="5" ry="5" width="220" height="230" />
                    <rect x="250" y="240" rx="0" ry="0" width="220" height="10" />
                    <rect x="250" y="255" rx="0" ry="0" width="220" height="10" />
                    <rect x="250" y="270" rx="0" ry="0" width="220" height="10" />
                    <rect x="20" y="290" rx="5" ry="5" width="220" height="230" />
                    <rect x="250" y="290" rx="5" ry="5" width="220" height="230" />
                    <rect x="20" y="525" rx="0" ry="0" width="220" height="10" />
                    <rect x="20" y="540" rx="0" ry="0" width="220" height="10" />
                    <rect x="20" y="555" rx="0" ry="0" width="220" height="10" />
                    <rect x="250" y="525" rx="0" ry="0" width="220" height="10" />
                    <rect x="250" y="540" rx="0" ry="0" width="220" height="10" />
                    <rect x="250" y="555" rx="0" ry="0" width="220" height="10" />
                </Fragment>
            );
            break;
    }

    return (
        <div className="loading_wrapper">
            <ContentLoader
                height={isMobile ? 600 : 400}
                width={isMobile ? 500 : 600}
                speed={2}
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb"
            >
                {!isMobile && !isTablet ? desktopContentPlaceholder : null}
                {isTablet && tabletContentPlaceholder}
                {isMobile && mobileContentPlaceholder}
            </ContentLoader>
        </div>
    );
};

export default Loader;
