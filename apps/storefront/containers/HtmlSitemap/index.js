import React from 'react';
import PropTypes from 'prop-types';
import { getCountrySpecificUrl } from 'helpers/linkHelper';
import { breakpointSmall } from 'config/styles/breakpoints';

const HtmlSitemap = ({ pages, articles, collections, products }) => {
    return (
        <div className="html-sitemap">
            <h1>MAAP Cycling Apparel Map</h1>
            <a href="/">MAAP Australia</a> &nbsp;&nbsp;&nbsp;
            <a href="/eu">MAAP Europe</a> &nbsp;&nbsp;&nbsp;
            <a href="/us">MAAP United States</a> &nbsp;&nbsp;&nbsp;
            <a href="/us">MAAP United Kingdom</a> &nbsp;&nbsp;&nbsp;
            <a href="/">MAAP Rest of World</a>
            <div className="columns">
                <div className="column">
                    <h2>Pages</h2>
                    {pages?.map((page, key) => (
                        <div key={key}>
                            <a
                                href={getCountrySpecificUrl(
                                    `/pages/${page.uid}`
                                )}
                            >
                                {page.data.title[0].text}
                            </a>
                            <br />
                        </div>
                    ))}
                </div>
                <div className="column">
                    <h2>Articles</h2>
                    {articles?.map((article, key) => (
                        <div key={key}>
                            <a href={`/stories/${article.handle}`}>
                                {article.title}
                            </a>
                            <br />
                        </div>
                    ))}
                </div>
                <div className="column">
                    <h2>Products</h2>
                    {products?.map((product, key) => (
                        <div key={key}>
                            <a
                                href={getCountrySpecificUrl(
                                    `/products/${product.handle}`
                                )}
                            >
                                {product.title}
                            </a>
                            <br />
                        </div>
                    ))}
                </div>
                <div className="column">
                    <h2>Collections</h2>
                    {collections?.map((collection, key) => (
                        <div key={key}>
                            <a
                                href={getCountrySpecificUrl(
                                    `/collections/${collection.handle}`
                                )}
                            >
                                {collection.title}
                            </a>
                            <br />
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>
                {`
                    .html-sitemap {
                        flex: 1 100%;
                        padding: 55px;
                        font-weight: 300;
                        font-size: 1.1em;
                    }
                    .columns {
                        display: flex;
                    }
                    .column {
                        flex: 0 1 50%;
                    }
                    @media (max-width: ${breakpointSmall}) {
                        .columns {
                            flex-direction: column;
                        }
                        .column {
                            flex: 1 0 100%;
                            width: 100%;
                        }
                    }
                    a {
                        color: black;
                    }
                `}
            </style>
        </div>
    );
};

HtmlSitemap.propTypes = {
    pages: PropTypes.array,
    products: PropTypes.array,
    collections: PropTypes.array,
    articles: PropTypes.array,
};

export default HtmlSitemap;
