import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

const PageCard = dynamic(() => import('components/PageCard'));

const AlgoliaArticleHit = ({ hit }) => {
    return (
        <PageCard
            handle={hit.handle}
            title={hit.title}
            body={hit.body_html_safe || hit.body_html}
            imageUrl={hit.image}
            metafields={hit.metafields}
            created_at={hit.created_at}
            tags={hit.tags}
        />
    );
};

AlgoliaArticleHit.propTypes = {
    hit: PropTypes.object,
};

export default AlgoliaArticleHit;
