import React from 'react';
import Image from 'next/image';
import SelectedIcon from 'public/images/bundles_images/selected-icon.svg';
import { useBundler } from '@containers/Bundler/Provider/BundlerProvider';
import styles from './BundlerNavigation.module.css';

const BundlerNavigation = () => {
    const {
        bundle,
        selectedCollectionKey,
        setSelectedCollectionKey,
        chosenBundleVariants,
    } = useBundler();

    if (!bundle) return null;

    const collectionOptions = bundle.collections;

    const selectedItemIcon = (
        <span className={styles.bundlerSelectedCategory}>
            <Image
                src={SelectedIcon}
                alt="selected-icon"
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                }}
            />
        </span>
    );

    const itemIsSelected = (key) => key === selectedCollectionKey;
    const collectionHasBeenChosen = (key) => !!chosenBundleVariants[key];

    return (
        <div className={styles.bundlerNavigation}>
            <ul className={styles.bundlerNavDesktop}>
                {collectionOptions?.map((collection, index) => {
                    const { key, title } = collection;
                    return (
                        <li
                            data-selected={itemIsSelected(key)}
                            onClick={() => setSelectedCollectionKey(key)}
                            key={index}
                            className={
                                collectionHasBeenChosen(key)
                                    ? styles.bundlerNavCollectionChosen
                                    : ''
                            }
                        >
                            {title}
                            &nbsp;
                            {collectionHasBeenChosen(key) && selectedItemIcon}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default BundlerNavigation;
