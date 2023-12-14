import React from 'react';
import Toolbar from '../../../components/ui/toolbar';
import { ActiveFiltersView, ProductCountView, WayfinderView } from './views';
import { FilteringToolbarProps, ProductPhotoVariant, View } from './types';
import { useContentStructureWithMock } from '../../../lib/content-structure';
import { ShopifyFilter } from '../../../lib/shopify/types/Filter';
import { Button } from 'mmds';
import cn from 'clsx';
import s from './FilteringToolbar.module.css';

const FilteringToolbar = ({
    productCount,
    selectedFilters,
    selectedProductPhotoVariant,
    currentView,
    callbacks: { selectProductPhotoVariant, toggleFilteringUI, applyFilters },
}: FilteringToolbarProps) => {
    const { structure } = useContentStructureWithMock();
    const handleSelectVariant = (variant: ProductPhotoVariant) => {
        selectProductPhotoVariant(variant);
    };
    const handleRemoveFilter = (filterToRemove: ShopifyFilter) => {
        applyFilters(
            selectedFilters.filter((filter) => filter !== filterToRemove)
        );
    };
    const isVariantInactive = (variant: ProductPhotoVariant) =>
        selectedProductPhotoVariant !== variant;

    const renderView = (view: View) => {
        switch (view) {
            case 'count':
                return <ProductCountView count={productCount} />;
            case 'wayfinder':
                return (
                    <WayfinderView
                        contentStructure={structure}
                        totalProductCount={productCount}
                    />
                );
            case 'activeFilters':
                return (
                    <ActiveFiltersView
                        count={productCount}
                        filters={selectedFilters}
                        onRemoveFilter={handleRemoveFilter}
                    />
                );
            default:
                return null;
        }
    };
    const view = renderView(currentView);

    return (
        <Toolbar shouldStick position="top">
            <div className={s.wrapper}>
                <div className={s.cluster}>
                    <Button
                        label="Filters"
                        variant="quite"
                        padding="zeroInline"
                        onClick={toggleFilteringUI}
                    />
                    <span
                        className={cn(s.dot, {
                            [s.dotActive]: currentView === 'activeFilters',
                        })}
                    />
                </div>
                <div className={s.viewWrapper}>{view}</div>
                <div className={cn(s.cluster, 'hidden-on-mobile')}>
                    <Button
                        label="Product"
                        variant="quite"
                        padding="zeroInline"
                        onClick={() => handleSelectVariant('flatlay')}
                        inactive={isVariantInactive('flatlay')}
                    />
                    <Button
                        label="Model"
                        variant="quite"
                        padding="zeroInline"
                        onClick={() => handleSelectVariant('model')}
                        inactive={isVariantInactive('model')}
                    />
                </div>
            </div>
        </Toolbar>
    );
};

export default FilteringToolbar;
