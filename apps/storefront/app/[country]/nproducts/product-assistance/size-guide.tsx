'use client';

import React, { useState } from 'react';
import { ProductInformationDocumentData } from '../../../../prismicio-types';
import { PrismicRichText } from '@prismicio/react';
import { getProductGender } from '../utilities';
import { Button, StaticImage } from 'mmds';
import SizeGuideTable from './size-guide-table';
import cn from 'clsx';
import s from './product-assistance.module.css';

interface SizeGuideProps {
    product: any; // TODO
    prismicSizeGuide: ProductInformationDocumentData | null;
    googleSizeGuideData: any; // TODO
}

const SizeGuide = ({
    product,
    prismicSizeGuide,
    googleSizeGuideData,
}: SizeGuideProps) => {
    const [isCentimetres, setIsCentimetres] = useState(true);
    const gender = getProductGender(product);
    const productType = product?.productType;
    const unit = isCentimetres ? 'CM' : 'IN';

    const { description, image, measurementInstructions } =
        prismicSizeGuide || {};

    const richTextComponents = {
        paragraph: ({ children }) => (
            <p className={cn('mmds-copy-one')}>{children}</p>
        ),
        heading3: ({ children }) => (
            <h3 className="mmds-copy-one-fluid">{children}</h3>
        ),
    };

    return (
        <div className={cn(s.stack, 'mmds-copy-one')}>
            <PrismicRichText
                field={description}
                components={richTextComponents}
            />
            <p className={s.productType}>{productType}</p>
            <div className={s.measurementInstructions}>
                <hr className="divider" data-color="steel" />
                {image && image?.url && (
                    <StaticImage
                        desktopImage={image.url}
                        mobileImage={image.url}
                        desktopWidth="240"
                        mobileWidth="240"
                    />
                )}
                <div className="mmds-copy-three">
                    <ol className={s.stack} data-flow-space="small">
                        {measurementInstructions?.map(
                            ({ bodyPart, instruction }, index) => (
                                <li key={`${bodyPart}-${index}`}>
                                    <PrismicRichText field={bodyPart} />
                                    <PrismicRichText field={instruction} />
                                </li>
                            )
                        )}
                    </ol>
                </div>
                <hr className="divider" data-color="steel" />
            </div>
            <p className="mmds-copy-three">
                Includes short sleeve jerseys, long sleeve jerseys, base layers,
                tee's and jackets.
            </p>
            <div className={cn(s.cluster)}>
                <Button
                    onClick={() => setIsCentimetres(true)}
                    variant="quite"
                    label="CM"
                    active={isCentimetres}
                    inactive={!isCentimetres}
                    padding="zeroInline"
                />
                <Button
                    onClick={() => setIsCentimetres(false)}
                    variant="quite"
                    label="IN"
                    active={!isCentimetres}
                    inactive={isCentimetres}
                    padding="zeroInline"
                />
            </div>
            <SizeGuideTable
                googleSizeGuideData={googleSizeGuideData}
                gender={gender}
                productType={productType}
                unit={unit}
            />
        </div>
    );
};

export default SizeGuide;
