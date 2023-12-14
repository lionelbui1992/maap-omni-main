import React, { useEffect } from 'react';
import { breakpointMedium } from 'config/styles/breakpoints';
import { brandBlack, brandBackgroundGrey } from 'config/styles/colours';

const StockistEmbed = () => {
    const executeScriptsAfterLoad = (container) => {
        const scripts = Array.prototype.slice.call(
            container.getElementsByTagName('script')
        );
        for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].src !== '') {
                const tag = document.createElement('script');
                tag.src = scripts[i].src;
                document.getElementsByTagName('head')[0].appendChild(tag);
            }
        }
    };
    useEffect(() => {
        const container = document.getElementById('stockist_embed');
        executeScriptsAfterLoad(container);
    }, []);

    return (
        <>
            <div id="stockist_embed" key="stockist_embed">
                <div className="stockist_title">Find a Stockist</div>
                <div data-stockist-widget-tag="u6462">
                    Loading store locator...
                </div>
                <script
                    type="text/javascript"
                    src="//stockist.co/embed/v1/widget.min.js"
                    async
                />
            </div>
            <style jsx global>
                {`
                    #stockist_embed {
                        padding: 30px;
                        background-color: ${brandBackgroundGrey};
                        height: 900px !important;
                    }

                    .stockist_title {
                        font-size: 2em;
                        font-weight: 300;
                        padding-bottom: 20px;
                    }

                    #stockist-widget {
                        background-color: ${brandBackgroundGrey} !important;
                    }

                    #stockist-widget
                        .stockist-query-entry
                        .stockist-search-button
                        button {
                        padding: 15px 90px !important;
                        border-radius: 30px;
                        height: auto !important;
                    }

                    #stockist-widget
                        .stockist-query-entry
                        .stockist-search-field {
                        border-radius: 30px;
                        height: auto !important;
                        padding-top: 15px !important;
                        padding-bottom: 15px !important;
                        background-color: ${brandBackgroundGrey};
                        border: 1px solid ${brandBlack} !important;
                    }

                    #stockist-widget .stockist-icon {
                        font-family: 'acumin-pro', sans-serif !important;
                    }

                    #stockist-widget .stockist-icon-search:before {
                        content: 'SEARCH' !important;
                    }

                    #stockist-widget .stockist-result .stockist-result-name {
                        font-weight: 300 !important;
                        text-decoration: underline;
                        padding-bottom: 10px;
                    }

                    #stockist-widget .stockist-powered-by-link,
                    .stockist-powered-by-link a {
                        display: none !important;
                    }

                    #stockist-widget .stockist-result .stockist-result-filter {
                        display: none !important;
                    }

                    #stockist-widget .stockist-result > div {
                        margin-top: 0 !important;
                    }

                    #stockist-widget .stockist-search-filter-checkbox {
                        display: none !important;
                    }

                    #stockist-widget .stockist-result-list ul > li {
                        border-top: none !important;
                        border-left: 1px solid ${brandBlack} !important;
                    }

                    #stockist-widget .stockist-result-list ul > li:hover {
                        border-left: 3px solid ${brandBlack} !important;
                    }

                    #stockist-widget * {
                        text-decoration: none;
                    }

                    #stockist-widget .stockist-horizontal .stockist-side-panel {
                        height: 780px !important;
                    }

                    #stockist-widget
                        .stockist-horizontal
                        .stockist-result-list {
                        height: 780px !important;
                    }

                    @media (max-width: ${breakpointMedium}) {
                        #stockist_embed {
                            height: 1300px !important;
                        }

                        #stockist-widget
                            .stockist-query-entry
                            .stockist-search-button
                            button {
                            margin-left: 0 !important;
                            width: 100% !important;
                        }

                        #stockist-widget
                            .stockist-query-entry
                            .stockist-search-button {
                            margin: auto;
                            width: 100% !important;
                        }

                        #stockist-widget .stockist-query-entry {
                            display: flex !important;
                            flex-direction: column;
                        }

                        #stockist-widget
                            .stockist-query-entry
                            .stockist-search-field {
                            margin-bottom: 10px !important;
                        }

                        #stockist-widget
                            .stockist-horizontal
                            .stockist-side-panel {
                            height: auto !important;
                            padding-bottom: 20px;
                        }

                        #stockist-widget
                            .stockist-horizontal
                            .stockist-result-list {
                            height: 500px !important;
                        }

                        #stockist-widget.stockist-responsive .stockist-map {
                            height: 600px !important;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default StockistEmbed;
