import React from 'react';
import { useBundler } from '@containers/Bundler/Provider/BundlerProvider';
import styles from './BundlerHeader.module.css';

const BundlerHeader = () => {
    const { bundle, setBundle, bundleDefinition } = useBundler();

    if (!bundle) return null;

    const { title, handle } = bundle;

    const isSelected = (bundleHandle) => bundleHandle === handle;

    return (
        <div className={styles.bundlerHeader}>
            <div className={styles.bundlerHeading}>{`${title}:`}</div>
            {bundleDefinition.map((iteratorBundle) => {
                const { variant, handle: bundleIteratorHandle } =
                    iteratorBundle;
                return (
                    <div
                        className={styles.bundlerVariant}
                        data-selected={isSelected(bundleIteratorHandle)}
                        onClick={() => setBundle(iteratorBundle)}
                        key={`bundle_${variant}_${handle}`}
                        type="button"
                    >
                        {variant}
                    </div>
                );
            })}
        </div>
    );
};

export default BundlerHeader;
