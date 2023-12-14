import React from 'react';
import Image from 'next/image';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
    resetNextUuid,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import { useBundler } from '@containers/Bundler/Provider/BundlerProvider';
import BundlerBreadcrumbs from '@containers/Bundler/BundlerBreadcrumbs';
import BundlerCollectionProducts from '@containers/Bundler/BundlerCollectionProducts';
import BundlerProductInfo from '@containers/Bundler/BundlerProductInfo';
import BundlerSelectedProducts from '@containers/Bundler/BundlerSelectedProducts';
import BundlerProductCarousel from '@containers/Bundler/BundlerProductCarousel';
import SelectedIcon from '@images/bundles_images/selected-icon.svg';
import { bundlerStyles } from './styles';
import styles from './BundlerMobileView.module.css';

const BundlerMobileView = () => {
    const {
        bundle,
        selectedCollectionHandle,
        selectedCollectionKey,
        setSelectedCollectionKey,
        chosenBundleVariants,
        isFetching,
    } = useBundler();

    if (!bundle) return null;

    const collectionOptions = bundle.collections;

    const selectedItemIcon = (
        <span className={styles.bundlerMobileSelectedItem}>
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

    const collectionHasBeenChosen = (key) => !!chosenBundleVariants[key];

    const expandedItem = isFetching
        ? null
        : `accordion_item_${selectedCollectionKey}`;

    resetNextUuid();

    return (
        <>
            <div className={styles.bundlerNavMobile}>
                <Accordion
                    className="bundlerMobileAccordion"
                    preExpanded={[expandedItem]}
                >
                    {collectionOptions?.map((collection, index) => {
                        const { key, title } = collection;
                        const itemSelected = key === selectedCollectionKey;

                        return (
                            <AccordionItem
                                data-selected={itemSelected}
                                key={`accordion_item_${key}`}
                                uuid={`accordion_item_${key}`}
                                dangerouslySetExpanded={itemSelected}
                            >
                                <AccordionItemHeading
                                    className="bundlerMobileAccordionHeading"
                                    onClick={() =>
                                        setSelectedCollectionKey(key)
                                    }
                                >
                                    <AccordionItemButton
                                        data-selected={itemSelected}
                                    >
                                        <div
                                            data-selected={itemSelected}
                                            className={
                                                collectionHasBeenChosen(key)
                                                    ? styles.bundlerMobileAccordionCollectionChosen
                                                    : ''
                                            }
                                        >
                                            {title}
                                            &nbsp;
                                            {collectionHasBeenChosen(key) &&
                                                selectedItemIcon}
                                        </div>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    {!!itemSelected && (
                                        <>
                                            <BundlerCollectionProducts />
                                            <BundlerBreadcrumbs />
                                            <BundlerProductCarousel />
                                            <BundlerProductInfo />
                                        </>
                                    )}
                                </AccordionItemPanel>
                            </AccordionItem>
                        );
                    })}
                    <div className="BundlerMobileAccordionBorderBottom" />
                </Accordion>
            </div>
            <BundlerSelectedProducts />
            <style jsx global>
                {bundlerStyles}
            </style>
        </>
    );
};

export default BundlerMobileView;
