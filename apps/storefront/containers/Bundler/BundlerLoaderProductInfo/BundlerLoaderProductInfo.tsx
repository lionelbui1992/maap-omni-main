import React from 'react';
import { useMediaQuery } from 'react-responsive';
import ContentLoader from 'react-content-loader';
import styles from './BundlerLoaderProductInfo.module.css';

const BundlerLoaderProductInfo = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' });
    return (
        <>
            <ContentLoader
                viewBox="0 0 100 6.8"
                height={6.8}
                width="100%"
                className={styles.bundlerLoaderHeader}
                uniquekey="content_loader_bundler_breadcrumb_key"
            >
                <rect x="19" y="2" rx="0" ry="0" width="62%" height="2.5" />
            </ContentLoader>
            {isTabletOrMobile ? (
                <ContentLoader
                    viewBox="0 0 100 40"
                    height={40}
                    width="100%"
                    className={styles.bundlerLoaderProductInfo}
                    uniquekey="content_loader_product_Info_mobileView_key"
                >
                    <rect x="8" y="5" rx="0" ry="0" width="25%" height="3" />
                    <rect x="68" y="5" rx="0" ry="0" width="25%" height="3" />
                    <rect x="8" y="11" rx="0" ry="0" width="85%" height="8" />
                    <rect x="8" y="22" rx="0" ry="0" width="20%" height="3" />
                    <rect x="8" y="29" rx="5" ry="5" width="85%" height="9" />
                </ContentLoader>
            ) : (
                <ContentLoader
                    viewBox="0 0 100 55"
                    height={55}
                    width="100%"
                    className={styles.bundlerLoaderProductInfo}
                    uniquekey="content_loader_product_Info_tabletView_key"
                >
                    <rect x="19" y="4" rx="0" ry="0" width="62%" height="2" />
                    <rect x="19" y="8" rx="0" ry="0" width="62%" height="2" />
                    <rect x="19" y="12" rx="0" ry="0" width="25%" height="2" />
                    <rect x="19" y="18" rx="0" ry="0" width="15%" height="2" />
                    <rect
                        x="19"
                        y="23"
                        rx="0"
                        ry="0"
                        width="62%"
                        height="0.2"
                    />
                    <rect x="19" y="26" rx="0" ry="0" width="25%" height="3" />
                    <rect x="19" y="32" rx="0" ry="0" width="62%" height="6" />
                    <rect x="19" y="40" rx="0" ry="0" width="10%" height="3" />
                    <rect x="19" y="47" rx="4" ry="4" width="62%" height="7" />
                </ContentLoader>
            )}
        </>
    );
};

export default BundlerLoaderProductInfo;
