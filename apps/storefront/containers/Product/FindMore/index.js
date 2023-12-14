import React from 'react';
import Link from 'next/link';
import { breakpointMedium } from 'config/styles/breakpoints';
import { getCountrySpecificUrl } from 'helpers/linkHelper';
import { brandBlack, brandWhite } from 'config/styles/colours';

const FindMore = ({ tags }) => {
    const getFindMoreTags = (tags) => {
        const filtered = tags.filter(
            (tag) => tag.includes('find-more:') && tag.split(':').length >= 3
        );
        if (filtered) {
            return filtered
                .map((tag) => {
                    const array = tag.split(':');
                    return {
                        index: array[1],
                        title: array[2].replace(/-/g, ' '),
                        link: array[2],
                    };
                })
                .sort((a, b) => a - b);
        }
    };
    const collectionLink = (segment) => {
        return getCountrySpecificUrl(`/collections/${segment.toLowerCase()}`);
    };
    const findMore = getFindMoreTags(tags);
    return (
        <>
            <div className="find_more__container">
                <h3>Find more:</h3>
                <div className="find_more__tags">
                    {findMore.map((tag, key) => {
                        return (
                            <Link
                                key={key}
                                href={collectionLink(tag.link)}
                                as={collectionLink(tag.link)}
                                legacyBehavior
                            >
                                <a className="find_more__tag">{tag.title}</a>
                            </Link>
                        );
                    })}
                </div>
            </div>
            <style jsx>
                {`
                    @media only screen and (min-width: ${breakpointMedium}) {
                        .find_more__container {
                            flex: 1;
                            display: flex;
                            flex-direction: row;
                            padding: 24px 54px;
                            flex: 0 0 100%;
                            align-items: center;
                            margin: 0 auto;
                        }
                    }
                    @media only screen and (max-width: ${breakpointMedium}) {
                        .find_more__container {
                            display: flex;
                            flex-direction: column;
                            padding: 20px 25px;
                            flex: 0 0 100%;
                            align-items: center;
                            margin: 0 auto;
                        }
                    }
                    .find_more__tags {
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        flex: 1;
                        flex-wrap: wrap;
                    }
                    .find_more__tag {
                        margin: 8px;
                        padding: 15px 30px;
                        border-radius: 25px;
                        border: 1px solid ${brandBlack};
                    }
                    .find_more__tag:hover {
                        color: ${brandWhite};
                        background-color: ${brandBlack};
                    }
                    h3 {
                        font-weight: 300;
                        font-size: 1em;
                    }
                    a {
                        color: ${brandBlack};
                        text-decoration: none;
                        text-transform: capitalize;
                    }
                `}
            </style>
        </>
    );
};

export default FindMore;
