import React from 'react';
import PropTypes from 'prop-types';
import NostoRecommendationsBlock from '@components/Nosto/NostoRecommendationsBlock';

const PrismicRecommendationsBlock = ({ block }) => {
    const { placement_identifier } = block;
    return (
        <>
            <NostoRecommendationsBlock
                type="landing_page"
                placementIdentifier={placement_identifier}
            />
        </>
    );
};

PrismicRecommendationsBlock.propTypes = {
    block: PropTypes.object,
};

export default PrismicRecommendationsBlock;
