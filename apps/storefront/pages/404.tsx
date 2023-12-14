import React from 'react';
import PageNotFound from '@components/PageNotFound/NotFound';
import { getGlobalPrismicDocuments } from '@containers/SimplifiedLayout/helpers';
import { getContext } from '@lib/get-context';
import SimplifiedLayout from '@containers/SimplifiedLayout';
import { Context } from '@lib/types/Context';
import { PrismicDocument } from '@prismicio/types';

export async function getStaticProps() {
    const shopContext = getContext(null);

    const globalPrismicDocuments = await getGlobalPrismicDocuments(
        null,
        shopContext?.language
    );

    return {
        props: {
            shopContext,
            ...globalPrismicDocuments,
        },
        revalidate: 900,
    };
}

type Props = {
    shopContext: Context;
    megaNav: PrismicDocument;
    footerNav: PrismicDocument;
    paymentOptions: PrismicDocument;
    assistanceNav: PrismicDocument;
    profileNav: PrismicDocument;
    cartConfig: PrismicDocument;
};

export default function NotFound(globals: Props) {
    return (
        <SimplifiedLayout {...globals}>
            <PageNotFound />
        </SimplifiedLayout>
    );
}
