import React, { useCallback } from 'react';
import CloseIcon from '@images/small_icon/Cancel-icon.svg';
import { breakpointMedium } from 'config/styles/breakpoints';
import { useUI } from '@lib/providers/UIProvider';
import debounce from 'lodash.debounce';

const ENTER_KEY = 13;

const SearchBar = () => {
    const { setSearchTerm, searchTerm } = useUI();

    const onSearchChange = (value) => {
        setSearchTerm(value);
    };

    const onChange = (event) => {
        onSearchChange(event.target.value);
    };

    const onKeyDown = (event) => {
        if (event.keyCode === ENTER_KEY) {
            onSearchChange(event.target.value);
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    const debouncedUserSearchTracking = debounce((searchTerm) => {
        if (typeof window !== 'undefined' && searchTerm != '') {
            window.dataLayer.push({
                event: 'gtm.userSearch',
                searchDetails: {
                    searchTerm,
                },
            });

            ttq.track('Search', {
                content_id: searchTerm,
                query: searchTerm,
            });

            if(typeof window !== 'undefined' && window.pintrk){
                window.pintrk("track", "search", {
                    search_query: searchTerm
                })
            }
        }
    }, 800);

    const debouncedSearchTerm = useCallback(
        (searchTerm) => debouncedUserSearchTracking(searchTerm),
        []
    );

    debouncedSearchTerm(searchTerm);

    return (
        <nav>
            <input
                placeholder="What are you looking for?"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={searchTerm}
                type="text"
                onFocus={(e) => e.currentTarget.select()}
                autoFocus="autofocus"
                data-testing="search-navbar"
                id="search-nav-bar"
            />
            <button type="button" onClick={() => clearSearch()}>
                <img src={CloseIcon.src} alt="Search clear icon" />
            </button>
            <style jsx>
                {`
                    nav,
                    input {
                        display: flex;
                        flex: 1;
                    }
                    nav {
                        padding: 10px 54px 10px 54px;
                        background-color: rgb(230, 230, 230);
                    }
                    input {
                        padding: 10px 0;
                        border: none;
                        background: none;
                        font-size: 19px;
                        font-weight: 300;
                        font-family: acumin-pro, sans-serif;
                        -webkit-font-smoothing: antialiased;
                    }
                    input:focus {
                        outline: none;
                    }
                    button {
                        background: none;
                        border: none;
                        margin: auto;
                    }
                    ::-webkit-input-placeholder {
                        color: black;
                        -webkit-font-smoothing: antialiased;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        nav {
                            padding: 10px 18px 10px 22px;
                        }
                    }
                `}
            </style>
        </nav>
    );
};

export default SearchBar;
