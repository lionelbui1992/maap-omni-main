import {
    LookbookSlice,
    LookbookSliceDefaultItem,
} from '../../../prismicio-types';
import Lookbook from './Lookbook';
import {
    LookbookBlock,
    LookbookContext,
    LookbookItem,
    OverlayContentItem,
} from '@app/components/lookbook/type';

interface LookbookProps {
    slice: LookbookSlice;
}

const withPrismic = ({ slice }: LookbookProps) => {
    if (!slice.variation) {
        return null;
    }

    let blockMapping: LookbookBlock = {
        context: slice.primary.context as string,
        items: [],
    };

    // @ts-ignore
    blockMapping.items = slice.items.map((item) => {
        const newItem = item as LookbookSliceDefaultItem;
        return {
            lookbook: [
                {
                    lookbookContext: newItem.context as LookbookContext,
                    desktopImage: (newItem.desktop_image as any).url,
                    mobileImage: (newItem.mobile_image as any).url,
                    heading: newItem.heading as string,
                    productHandle1: newItem.product_handle_1 as string,
                    variantTitle1: newItem.variant_title_1 as string,
                    productTitle1: newItem.product_title_1 as string,
                    productHandle2: newItem.product_handle_2 as string,
                    variantTitle2: newItem.variant_title_2 as string,
                    productTitle2: newItem.product_title_2 as string,
                    productHandle3: newItem.product_handle_3 as string,
                    variantTitle3: newItem.variant_title_3 as string,
                    productTitle3: newItem.product_title_3 as string,
                    productHandle4: newItem.product_handle_4 as string,
                    variantTitle4: newItem.variant_title_4 as string,
                    productTitle4: newItem.product_title_4 as string,
                },
            ],
        } as unknown as LookbookItem;
    });

    // To Do: fetch each sku/product shopify to display overlay content
    let overlayMapping: OverlayContentItem = {
        title: 'Look 1',
        thumbnail: [
            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',

            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',

            'https://cdn.shopify.com/s/files/1/0510/7809/files/3_4_PRO.png?v=1694408334',
        ],
        productTitle: 'Evade Pro Base Jersey 2.0',
        productDescription:
            'The Evade Pro Base Jersey 2.0 has been re-imagined with a range of sustainable materials and new design details for premium comfort and durability. The primary body is 70% recycled knitted Italian fabric with...',
        price: '$270.00AUD',
        productColor: 'Bronze Green',
        sizeVariant: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        saved: false,
        link: '/products/alt-road',
        productImage: [
            {
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
            },
            {
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
            },
            {
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
            },
            {
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
            },
            {
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
            },
            {
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
            },
            {
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
            },
            {
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
            },
            {
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
            },
            {
                desktopImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
                mobileImage:
                    'https://cdn.shopify.com/s/files/1/0510/7809/files/3-4_MOD_b2978610-aa3a-4acb-af71-390158d66052.jpg?v=1699921390',
            },
        ],
    };

    return <Lookbook block={blockMapping} overlayLookbook={overlayMapping} />;
};

export default withPrismic;
