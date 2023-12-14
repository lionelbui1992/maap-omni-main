import React from 'react';
import styles from './BundlerBreadcrumbs.module.css';
import { useBundler } from '@containers/Bundler/Provider/BundlerProvider';

const BundlerBreadcrumbs = () => {
    const { selectedProduct } = useBundler();
    if (!selectedProduct) return null;
    const colour = selectedProduct.variants.edges[0].node.selectedOptions.find(
        (option) => option.name === 'Color'
    );
    return (
        <>
            <div className={styles.bundlerBreadcrumbs}>
                <div className={styles.bundlerBreadcrumbsLink}>
                    {selectedProduct?.title}
                </div>
                <div className={styles.bundlerDivider}>/</div>
                <div className={styles.bundlerBreadcrumbsLink}>
                    {colour.value}
                </div>
            </div>
        </>
    );
};

export default BundlerBreadcrumbs;
