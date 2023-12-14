import React, { FC, useLayoutEffect, useState, useCallback } from 'react';
import NostoCarousel from '@components/Nosto/NostoCarousel';

type Props = {
    placementIdentifier: string;
    type: 'product' | 'collection' | 'landing_page';
    title?: string;
    pageKey?: string;
    id?: string;
    shouldApplyPaddingBottom?: boolean;
};

type NostoProductProductResults = {
    products: any[];
    result_id: string;
    title?: string;
};

const NostoRecommendationsBlock: FC<Props> = ({
    placementIdentifier,
    pageKey,
    id,
    type,
    shouldApplyPaddingBottom,
}) => {
    const [results, setResults] = useState<NostoProductProductResults>();

    const performRecommendationAction = useCallback(
        (session) => {
            switch (type) {
                case 'product':
                    return session.viewProduct(id);
                case 'collection':
                    return session.viewCategory(id);
                case 'landing_page':
                    return session.viewOther();
                default:
                    throw new Error(`Invalid recommendation type: ${type}`);
            }
        },
        [type, id]
    );

    useLayoutEffect(() => {
        try {
            if (!(window as any).nostojs) return;
            (window as any)?.nostojs((api) => {
                const session = api.defaultSession();
                performRecommendationAction(session)
                    .setPlacements([placementIdentifier])
                    .update()
                    .then((data) => {
                        const recommendations =
                            data.recommendations[placementIdentifier];
                        if (!recommendations) return;

                        const { title, products, result_id } = recommendations;
                        setResults({ title, products, result_id });
                    });
            });
        } catch (e) {
            console.log('Error fetching Nosto recommendations', e);
        }
    }, [pageKey]);

    if (!results) return null;

    return (
        <NostoCarousel
            nostoProducts={results}
            type={type}
            shouldApplyPaddingBottom={shouldApplyPaddingBottom}
        />
    );
};

export default NostoRecommendationsBlock;
