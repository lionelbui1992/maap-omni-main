import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connectInfiniteHits } from 'react-instantsearch-dom';
import { breakpointSmall, breakpointMedium } from 'config/styles/breakpoints';
import LoadMoreButton from './loadMore';

const AlgoliaBlogArticleHits = ({
    hits,
    HitComponent,
    refinements,
    hasMore,
    refineNext,
    hasDefaultRefinement,
}) => {
    if (!hits.length) return null;
    const [filteredHits, setFilteredHits] = useState(null);

    const featuredPostRef = useRef(
        hits.find(hit => hit.tags.includes('featured'))
    );
    const featuredPost = featuredPostRef.current;

    let isRefined = hasDefaultRefinement;

    if (refinements && !isRefined) {
        isRefined = Object.values(refinements).filter(item => {
            return item.length;
        }).length;
    }

    useEffect(() => {
        const localHits = [...hits];

        if (featuredPost && !isRefined) {
            const localFeature = localHits.find(hit =>
                hit.tags.includes('featured')
            );
            localHits.splice(localHits.indexOf(localFeature), 1);
        }

        setFilteredHits(localHits);
    }, [hits]);

    return (
        <div className="articleList">
            {featuredPost && !isRefined && (
                <div className="column">
                    <HitComponent hit={featuredPost} featured />
                </div>
            )}
            <div className="column">
                <ul
                    className={`${
                        featuredPost && !isRefined ? 'absoluteHits' : ''
                    } blogArticleHits`}
                >
                    {filteredHits &&
                        filteredHits.map(hit => {
                            const promoted = hit.tags.includes('promoted');
                            return (
                                <li
                                    className={`hit ${
                                        promoted ? 'promoted' : ''
                                    }`}
                                    key={hit.handle}
                                >
                                    <HitComponent
                                        hit={hit}
                                        promoted={promoted}
                                        showbody
                                    />
                                </li>
                            );
                        })}
                    {hasMore && (
                        <div className="loadMore_container">
                            <LoadMoreButton
                                onClick={refineNext}
                                disabled={!hasMore}
                            />
                        </div>
                    )}
                </ul>
            </div>
            <style jsx>
                {`
                    .articleList {
                        display: flex;
                    }
                    @media (max-width: ${breakpointSmall}) {
                        .articleList {
                            flex-direction: column;
                        }
                    }
                    .column {
                        flex: 1;
                        position: relative;
                    }
                    .blogArticleHits {
                        list-style-type: none;
                        width: calc(100% + 0px);
                        display: flex;
                        flex-wrap: wrap;
                        margin: 0;
                        padding: 0;
                    }
                    .absoluteHits {
                        position: absolute;
                        height: 100%;
                        overflow: scroll;
                        overflow-x: hidden;
                        -ms-overflow-style: none;
                        box-sizing: border-box;
                    }
                    .hit {
                        ${featuredPost && !isRefined
                            ? 'width: 50%;'
                            : 'width: 25%;'};
                        box-sizing: border-box;
                        padding: 20px;
                    }
                    .hit.promoted {
                        width: 100%;
                        padding: 0 !important;
                    }
                    .loadMore_container {
                        display: flex;
                        width: 100%;
                        max-height: 50px;
                        margin: 20px auto;
                        padding: 30px 0 50px 0;
                        justify-content: center;
                    }
                    @media (max-width: ${breakpointSmall}) {
                        .hit {
                            width: 100% !important;
                        }
                        .blogArticleHits {
                            position: unset;
                            padding: 0;
                        }
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .hit {
                            width: 50%;
                        }
                    }
                `}
            </style>
        </div>
    );
};

AlgoliaBlogArticleHits.propTypes = {
    hits: PropTypes.array,
    HitComponent: PropTypes.func,
    refinements: PropTypes.object,
    hasMore: PropTypes.bool,
    refineNext: PropTypes.func,
    hasDefaultRefinement: PropTypes.bool,
};

export default connectInfiniteHits(AlgoliaBlogArticleHits);
