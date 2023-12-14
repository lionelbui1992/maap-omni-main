import React from 'react';
import PropTypes from 'prop-types';

const PageOrSearch = props => {
    const { Page } = props;

    return <Page {...props} />;
};

PageOrSearch.propTypes = {
    Page: PropTypes.func,
};

export default React.memo(PageOrSearch);
