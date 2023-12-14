import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { useUI } from '@lib/providers/UIProvider';

const GlobalSearch = dynamic(() => import(`@containers/GlobalSearch`));
const SearchBar = dynamic(() => import('components/SearchBar'));

const ChildrenOrSearch = ({ children }) => {
    const { displaySearchResults, displaySearchbar } = useUI();

    if (displaySearchbar && displaySearchResults) {
        return (
            <>
                <SearchBar />
                <GlobalSearch />
            </>
        );
    }

    if (displaySearchbar) {
        return (
            <>
                <SearchBar />
                {children}
            </>
        );
    }

    return children;
};

ChildrenOrSearch.propTypes = {
    children: PropTypes.any,
};

export default React.memo(ChildrenOrSearch);
