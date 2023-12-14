'use client';

import { normaliseGoogleSizeGuideData } from '@app/lib/google/size-guide';
import cn from 'clsx';
import s from './product-assistance.module.css';

interface SizeGuideTableProps {
    gender: string;
    productType: string;
    unit: string;
    googleSizeGuideData: any; //TODO
}

const SizeGuideTable = ({
    gender,
    productType,
    unit,
    googleSizeGuideData,
}: SizeGuideTableProps) => {
    const productSizeGuide = normaliseGoogleSizeGuideData(
        googleSizeGuideData,
        gender,
        [productType],
        unit
    );

    if (!productSizeGuide || productSizeGuide.length === 0) {
        return <p>Size Guide Table temporarily unavailable.</p>;
    }

    const headers = productSizeGuide[0];
    const rows = productSizeGuide.slice(1);

    return (
        <div
            className={cn(s.table, 'mmds-copy-three', 'divider')}
            data-color="steel"
        >
            <div className={s.head}>
                <div className={s.row}>
                    {headers?.map((header, index) => (
                        <div className={s.cell} key={index}>
                            {header}
                        </div>
                    ))}
                </div>
            </div>
            <div className={s.body}>
                {rows?.map((row, rowIndex) => (
                    <div className={s.row} key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <div className={s.cell} key={cellIndex}>
                                {cell}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SizeGuideTable;
