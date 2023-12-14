import React from 'react';
import { brandMediumGrey } from 'config/styles/colours';
import getUpsellMessage from './legacyUpsellsCalculator';
import styles from './BundlesUpsell.module.css';

const BundlesUpsell = ({ lineItems }) => {
    if (!lineItems) return null;
    const upsellText = getUpsellMessage(lineItems);

    if (!upsellText) return null;

    // const itemGenderCounts = {
    //     man: 0,
    //     woman: 0,
    // };

    // const completeBundleLinkParts = lineItems?.map((lineItem) => {
    //     const { variant } = lineItem.node;
    //     const collectionHandle = variant?.product?.metafield?.value;
    //     const extractVariantId = variant?.id.split('gid://shopify/ProductVariant/')[1];
    //     if (collectionHandle.indexOf('womens') > -1) {
    //         itemGenderCounts.woman += 1;
    //     } else {
    //         itemGenderCounts.man += 1;
    //     }
    //
    //     return `${collectionHandle}:${variant.product.handle}:${extractVariantId}`;
    // });
    // console.log('itemGenderCounts', itemGenderCounts);

    return (
        <section className={styles.root}>
            <h3>Bundles</h3>
            <p>{upsellText}</p>
            {/* {!!itemGenderCounts.man && ( */}
            {/*    <a */}
            {/*        href={`/bundle-builder/?selection=${completeBundleLinkParts.join( */}
            {/*            '&selection=' */}
            {/*        )}&bundle=maap-kits-bundle-man`} */}
            {/*    > */}
            {/*        Complete your Men's MAAP Kit */}
            {/*    </a> */}
            {/* )} */}
            {/* <br /> */}
            {/* {!!itemGenderCounts.woman && ( */}
            {/*    <a */}
            {/*        href={`/bundle-builder/?selection=${completeBundleLinkParts.join( */}
            {/*            '&selection=' */}
            {/*        )}&bundle=maap-kits-bundle-woman`} */}
            {/*    > */}
            {/*        Complete your Women's MAAP Kit */}
            {/*    </a> */}
            {/* )} */}
        </section>
    );
};

export default BundlesUpsell;
