import React from 'react';
import { useProductPrismicDocuments } from '@lib/providers/ProductPrismicDocumentsProvider';
import { RenderBlock } from '@containers/Prismic/PrismicSliceRenderer';
import { blockTransformer } from '../../../helpers/prismic';

const PrismicFabricTemperature = ({ isMobile, isTablet }) => {
    const { getDocument } = useProductPrismicDocuments(null);
    const fabricTemperatureInfo = getDocument('fabric-info');
    if (!fabricTemperatureInfo) return null;

    const fabricInfo =
        fabricTemperatureInfo && fabricTemperatureInfo?.data?.body
            ? fabricTemperatureInfo?.data?.body[0]
            : null;
    const temperatureInfo =
        fabricTemperatureInfo && fabricTemperatureInfo?.data?.body
            ? fabricTemperatureInfo?.data?.body[1]
            : null;

    return (
        <div>
            {fabricInfo && (
                <RenderBlock
                    block={blockTransformer(fabricInfo)}
                    isMobile={isMobile}
                    isTablet={isTablet}
                    key={`${Math.random()}__fabricInfo`}
                />
            )}
            {temperatureInfo && (
                <RenderBlock
                    block={blockTransformer(temperatureInfo)}
                    isMobile={isMobile}
                    isTablet={isTablet}
                    key={`${Math.random()}__temperatureInfo`}
                />
            )}
        </div>
    );
};

export default PrismicFabricTemperature;
