'use client';

import { ProductInformationDocumentData } from 'prismicio-types';
import { TableData } from '@app/lib/google/size-guide';
import { PrismicRichText } from '@prismicio/react';
import { Button } from 'mmds';
import { DrawerFooter, DrawerBody } from '@app/components/ui/drawer/Drawer';
import SizeGuide from './size-guide';
import cn from 'clsx';
import s from './product-assistance.module.css';

interface ProductAssistanceDrawerContentProps {
    content: string;
    warranty: ProductInformationDocumentData | null;
    shipping: ProductInformationDocumentData | null;
    product: any; // TODO
    sizeGuide: ProductInformationDocumentData | null;
    googleSizeGuideData: TableData | null;
}

const ProductAssistanceDrawerContent = ({
    content,
    warranty,
    shipping,
    product,
    sizeGuide,
    googleSizeGuideData,
}: ProductAssistanceDrawerContentProps) => {
    const warrantyDescription = warranty?.warrantyDescription;
    const warrantyTitle = warranty?.warrantyTitle;
    const deliveryInfo = shipping?.deliveryInfo;

    // This is one way we can add custom styles to the html elements within PrismicRichText
    const richTextComponents = {
        paragraph: ({ children }) => (
            <p className={cn(s.textSecondary, 'mmds-copy-one')}>{children}</p>
        ),
        heading3: ({ children }) => (
            <h3 className={cn(s.sectionTitle, 'mmds-copy-one')}>{children}</h3>
        ),
    };

    const view = () => {
        switch (content) {
            case 'Size Guide':
                return (
                    <SizeGuide
                        product={product}
                        prismicSizeGuide={sizeGuide}
                        googleSizeGuideData={googleSizeGuideData}
                    />
                );
            case 'Shipping & Returns':
                return (
                    <div className={s.stack}>
                        {deliveryInfo?.map((item, index) => (
                            <div key={index} className={s.stack}>
                                <div
                                    className={s.stack}
                                    data-flow-space="small"
                                >
                                    <PrismicRichText
                                        field={item.title}
                                        components={richTextComponents}
                                    />
                                    <hr
                                        className="divider"
                                        data-color="steel"
                                    />
                                </div>
                                <div
                                    className={s.stack}
                                    data-flow-space="large"
                                >
                                    <div>
                                        <PrismicRichText
                                            field={item.description}
                                            components={richTextComponents}
                                        />
                                    </div>
                                    <Button
                                        label={`More ${item.title[0].text} info`}
                                        variant="ghost"
                                        icon="northeast"
                                    />
                                    <hr
                                        className="divider"
                                        data-color="black"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'Crash Replacement':
                return (
                    <div className={s.stack}>
                        <div className={s.stack} data-flow-space="small">
                            <PrismicRichText
                                field={warrantyTitle}
                                components={richTextComponents}
                            />
                            <hr className="divider" data-color="steel" />
                        </div>
                        <div className={s.stack} data-flow-space="large">
                            <div className={s.stack}>
                                <PrismicRichText
                                    field={warrantyDescription}
                                    components={richTextComponents}
                                />
                            </div>
                            <Button
                                label={`More ${content} info`}
                                variant="ghost"
                                icon="northeast"
                            />
                            <hr className="divider" data-color="black" />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <DrawerBody>{view()}</DrawerBody>
            <DrawerFooter>
                <Button label="Help Center" icon={'northeast'} />
            </DrawerFooter>
        </>
    );
};

export default ProductAssistanceDrawerContent;
