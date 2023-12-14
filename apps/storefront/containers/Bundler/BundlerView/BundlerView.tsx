import React, { FC } from 'react';
import BundlerHeader from '@containers/Bundler/BundlerHeader';
import BundlerNavigation from '@containers/Bundler/BundlerNavigation';
import BundlerCollectionProducts from '@containers/Bundler/BundlerCollectionProducts';
import BundlerProductCarousel from '@containers/Bundler/BundlerProductCarousel';
import BundlerProductInfo from '@containers/Bundler/BundlerProductInfo';
import BundlerMobileView from '@containers/Bundler/BundlerMobileView';
import BundlerSelectedProducts from '@containers/Bundler/BundlerSelectedProducts';
import { ManagedBundlerProvider } from '@containers/Bundler/Provider/BundlerProvider';
import { PrismicBundleDefinition } from '@containers/Bundler/Types';
import styles from './BundlerView.module.css';

type BundlerViewProps = {
    bundleDefinition: PrismicBundleDefinition;
};

const BundlerView: FC<BundlerViewProps> = ({ bundleDefinition }) => {
    return (
        <ManagedBundlerProvider bundleDefinition={bundleDefinition}>
            <div className={styles.bundlerRoot}>
                <BundlerHeader />
                <div className={styles.desktopProductZone}>
                    <div className={styles.productZoneLeft}>
                        <div>
                            <BundlerNavigation />
                        </div>
                        <div className={styles.productImages}>
                            <BundlerCollectionProducts />
                            <BundlerProductCarousel />
                        </div>
                    </div>
                    <div className={styles.productZoneRight}>
                        <BundlerProductInfo />
                        <div className={styles.selectedProducts}>
                            <BundlerSelectedProducts />
                        </div>
                    </div>
                </div>
                <div className={styles.mobileProductZone}>
                    <BundlerMobileView />
                </div>
            </div>
        </ManagedBundlerProvider>
    );
};

export default BundlerView;
