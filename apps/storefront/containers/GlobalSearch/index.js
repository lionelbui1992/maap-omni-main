import React, { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
    InstantSearch,
    Hits,
    SearchBox,
    Configure,
} from 'react-instantsearch-dom';
import brandConfig, { getOptionForRegion } from 'config/brandConfig';
import algoliasearch from 'algoliasearch/lite';
import { breakpointMedium } from 'config/styles/breakpoints';
import { useUI } from '@lib/providers/UIProvider';
import { useShop } from '@lib/providers/ShopProvider';
import classnames from 'classnames';
import { debounce } from 'lodash';

const { services } = brandConfig;
const searchClient = algoliasearch(
    services.algolia.applicationID,
    services.algolia.apiKey
);

const nostoDebouncedSearchTracking = debounce((value) => {
    typeof nostojs === 'function' &&
        nostojs((api) => {
            api.defaultSession()
                .viewSearch(value)
                .setPlacements(['search-related']);
            update().then((data) => {
                // console.log(data.recommendations);
            });
        });
}, 500);

const GlobalSearch = () => {
    const { searchTerm, setSearchTerm } = useUI();
    const { code, previewMode } = useShop();
    const [visibleSection, setVisibleSection] = useState('Product');

    const debouncedSearchTerm = useCallback(
        (searchTerm) => nostoDebouncedSearchTracking(searchTerm),
        []
    );

    debouncedSearchTerm(searchTerm);

    const algoliaIndices = [
        {
            title: 'Product',
            type: 'Product',
            index: getOptionForRegion(
                'algoliaProductIndex',
                code.toLowerCase()
            ),
            filters: `NOT tags:DISCONTINUED${
                !previewMode ? ' AND NOT vendor:PREVIEW' : ''
            }`,
        },
        {
            title: 'Stories',
            type: 'Article',
            index: getOptionForRegion('algoliaArticlesIndex', 'intl'),
            filters: !previewMode ? 'blog.title:Stories' : '',
        },
        {
            title: 'Services and Information',
            type: 'Page',
            index: getOptionForRegion('algoliaPagesIndex', 'intl'),
        },
    ];

    return (
        <>
            <div className="indices">
                <nav className="uiControls">
                    {algoliaIndices.map((algoliaIndex, position) => {
                        const { title, index, type } = algoliaIndex;
                        const sectionClasses = classnames('controlRow', {
                            active: visibleSection === type,
                        });

                        return (
                            <div key={index} className={sectionClasses}>
                                <a onClick={() => setVisibleSection(type)}>
                                    {title}
                                </a>
                                {position === 0 && (
                                    <a
                                        onClick={() => setSearchTerm('')}
                                        className="back"
                                    >
                                        Back to menu
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </nav>
                {algoliaIndices.map((algoliaIndex) => {
                    const { title, index, filters, type } = algoliaIndex;
                    const hitComponent = dynamic(() =>
                        import(`components/Algolia${type}Hit`)
                    );

                    const sectionClasses = classnames('index', {
                        active: visibleSection === type,
                    });

                    return (
                        <section className={sectionClasses} key={index}>
                            <p className="sectionTitle">{title}</p>
                            <div className={`sectionHits`}>
                                <InstantSearch
                                    indexName={index}
                                    searchClient={searchClient}
                                >
                                    <Configure filters={filters} />
                                    <Hits hitComponent={hitComponent} />
                                    <div className="searchBox">
                                        <SearchBox
                                            defaultRefinement={searchTerm}
                                        />
                                    </div>
                                </InstantSearch>
                            </div>
                        </section>
                    );
                })}
                <style jsx>
                    {`
                        .indices {
                            display: flex;
                        }
                        section {
                            flex: 1;
                        }
                        section:first-of-type {
                            flex: 2;
                        }
                        section:first-of-type .ais-Hits-item {
                            flex: 1 0 50%;
                        }
                        section:first-of-type {
                            background-color: rgb(242, 240, 240);
                        }
                        section:nth-of-type(2) {
                            background-color: rgb(225, 225, 225);
                        }
                        section:last-child {
                            background-color: rgb(195, 195, 195);
                            padding-bottom: 40px;
                        }
                        section:last-child .sectionHits {
                            margin-top: 30px;
                        }
                        .sectionTitle {
                            text-transform: capitalize;
                            padding: 11px 35px 7px;
                        }
                        .uiControls {
                            flex-direction: column;
                            background-color: rgb(242, 240, 240);
                            padding-bottom: 15px;
                            display: none;
                        }
                        .uiControls a {
                            flex: 1 0 50%;
                            font-size: 1.7em;
                            padding: 10px 30px;
                            font-weight: 300;
                            text-transform: capitalize;
                            box-sizing: border-box;
                        }
                        .uiControls a.back {
                            background-color: rgb(255, 255, 255);
                            text-decoration: underline;
                        }
                        .controlRow {
                            display: flex;
                        }
                        .controlRow.active a {
                            text-decoration: none;
                        }
                        @media (max-width: ${breakpointMedium}) {
                            .uiControls {
                                display: flex;
                            }
                            .indices {
                                flex-direction: column;
                            }
                            section {
                                display: none;
                            }
                            section.active {
                                display: flex;
                            }
                            .sectionTitle {
                                display: none;
                            }
                            .uiControls a {
                                font-size: 19px;
                            }
                        }
                    `}
                </style>
                <style jsx global>
                    {`
                        .ais-Hits-list {
                            list-style-type: none;
                            display: flex;
                            flex-wrap: wrap;
                            padding: 0;
                            margin: 0;
                            background-color: rgb(195, 195, 195);
                        }
                        .ais-Hits-item {
                            flex: 1 0 100%;
                        }
                        .ais-Hits-item:last-child hr {
                            display: none;
                        }
                        section:first-of-type .ais-Hits-item {
                            flex: 1 0 50%;
                        }
                        .searchBox {
                            display: none;
                        }
                    `}
                </style>
            </div>
        </>
    );
};

export default GlobalSearch;
