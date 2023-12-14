import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const Context = createContext(null);

function ProductPrismicDocumentsProvider({ documents, children }) {
    const getDocument = handle => (documents ? documents[handle] : null);
    const hasDocument = handle => !!(documents && documents[handle]);

    const provides = {
        documents,
        getDocument,
        hasDocument,
    };

    return (
        <Context.Provider value={{ ...provides }}>{children}</Context.Provider>
    );
}

ProductPrismicDocumentsProvider.propTypes = {
    documents: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.array.isRequired,
        PropTypes.object.isRequired,
    ]),
};

const useProductPrismicDocuments = () => useContext(Context);

export { ProductPrismicDocumentsProvider, useProductPrismicDocuments };
