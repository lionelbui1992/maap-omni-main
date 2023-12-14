import React from 'react';
import { Accordion, ButtonVariant, PatternCTASet } from 'mmds';
import {
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
} from '../../../../app/components/ui/drawer/Drawer';
import { FilterGroup } from './FilterGroup';
import { FiltersDrawerProps } from './types';

const FiltersDrawer = ({
    availableFilters,
    selectedFilters,
    productCount,
    callbacks,
}: FiltersDrawerProps) => {
    const accordionItems = availableFilters.map(({ label, type, values }) => ({
        header: label,
        content: (
            <FilterGroup
                type={type}
                options={values}
                selectedFilters={selectedFilters}
                onSelectFilter={(value) => callbacks.applyFilters([value])}
            />
        ),
    }));

    const CTAItems = [
        {
            label: 'Clear All',
            variant: 'ghost' as ButtonVariant,
            onClick: () => {
                callbacks.applyFilters([]);
            },
            disabled: selectedFilters.length === 0,
        },
        {
            label: 'Apply',
            variant: 'base' as ButtonVariant,
            onClick: () => {
                callbacks.toggleFilteringUI();
            },
        },
    ];

    return (
        <>
            <DrawerHeader>
                <dt className="mmds-component-one">Filter</dt>
                <dd className="mmds-component-one-detail">
                    {productCount !== 1
                        ? `${productCount} products`
                        : `${productCount} product`}
                </dd>
            </DrawerHeader>
            <DrawerBody>
                <Accordion type="multiple" items={accordionItems} />
            </DrawerBody>
            <DrawerFooter>
                <PatternCTASet set={CTAItems} />
            </DrawerFooter>
        </>
    );
};

export default FiltersDrawer;
