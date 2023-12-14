'use client';

import { ProductInformationDocumentData } from 'prismicio-types';
import { TableData } from '@app/lib/google/size-guide';
import { useState } from 'react';
import { Button } from 'mmds';
import ProductAssistanceDrawer from './product-assistance-drawer';
import cn from 'clsx';
import s from './product-assistance.module.css';
import useUI from '@app/components/ui/state';

interface ProductAssistanceProps {
    product: any; // TODO
    warranty: ProductInformationDocumentData | null;
    shipping: ProductInformationDocumentData | null;
    sizeGuide: ProductInformationDocumentData | null;
    googleSizeGuideData: TableData | null;
}

const labels: string[] = [
    'Size Guide',
    'Shipping & Returns',
    'Crash Replacement',
    'Reviews',
];

const ProductAssistance = ({
    product,
    warranty,
    shipping,
    sizeGuide,
    googleSizeGuideData,
}: ProductAssistanceProps) => {
    const [activeLabel, setActiveLabel] = useState<string>('');
    const { toggleUI } = useUI();

    const handleLabelClick = (label: string): void => {
        setActiveLabel(label);
        toggleUI('product-assistance');
    };

    return (
        <div className={cn(s.root, s.region)}>
            <nav>
                <ul role="list" className={s.cluster}>
                    {labels.map((label) => (
                        <li key={label}>
                            <Button
                                variant="text"
                                label={label}
                                icon="dot"
                                onClick={() => handleLabelClick(label)}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
            <ProductAssistanceDrawer
                navItems={labels}
                activeLabel={activeLabel}
                warranty={warranty}
                shipping={shipping}
                sizeGuide={sizeGuide}
                googleSizeGuideData={googleSizeGuideData}
                product={product}
            />
        </div>
    );
};

export default ProductAssistance;
