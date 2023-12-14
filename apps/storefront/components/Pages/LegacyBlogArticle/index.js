import React from 'react';
import PropTypes from 'prop-types';

const LegacyBlogArticle = ({ shopifyPost }) => {
    return (
        <div className="pricing">
            <h1>Legacy Blog Article</h1>
        </div>
    );
};

LegacyBlogArticle.propTypes = {
    shopifyPost: PropTypes.object.isRequired,
};

export default LegacyBlogArticle;
