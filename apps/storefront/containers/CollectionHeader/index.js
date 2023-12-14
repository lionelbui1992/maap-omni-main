import React, { useContext, useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Head from '../Head';
import { useRouter } from 'next/router';
import CollectionBreadcrumb from 'components/CollectionBreadcrumb';
import { useEvent } from '@lib/providers/EventsProvider';
import { breakpointMedium } from 'config/styles/breakpoints';

const CollectionHeader = ({
    collectionHandle,
    shopifyCollection,
    pageIAPath,
    seoValues,
}) => {
    const { event } = useEvent();
    const router = useRouter();
    const { handle } = router.query;

    useEffect(() => {
        event('ViewPage', {
            title: seoValues.title,
            handle,
            category: 'collection',
        });
    }, []);

    const [readMore, setReadMore] = useState(false);

    const collectionDescription = shopifyCollection?.descriptionHtml;
    const readLess = ReactHtmlParser(
        collectionDescription?.split('/break/')[1]
    );
    const linkText = readMore ? '< Read Less' : 'Read More >';
    const dots = !readMore ? '...' : '';
    const title = !readMore ? 'ReadMore' : 'ReadLess';

    return (
        <>
            <Head
                url="/"
                title={seoValues.title}
                description={seoValues.description}
                key={`${seoValues.title}--Key`}
                ogImage={shopifyCollection?.image?.transformedSrc}
                canonicalUrl={`/collections/${collectionHandle}`}
            />
            <CollectionBreadcrumb
                collectionTitle={shopifyCollection.title}
                collectionHandle={handle}
                pageIAPath={pageIAPath}
            />
            <div className="collection_header contained_on_mobile">
                <div className="column collectionTitle">
                    <h1>{shopifyCollection.title}</h1>
                </div>
                {collectionDescription && (
                    <div className="column collectionDescription">
                        <div>
                            {ReactHtmlParser(
                                collectionDescription?.split('/break/')[0]
                            )}
                            {dots}
                            {readMore && readLess}
                            <a
                                className="collectionDescription__expand_link"
                                onClick={() => {
                                    setReadMore(!readMore);
                                }}
                                title={title}
                            >
                                {linkText}
                            </a>
                        </div>
                    </div>
                )}
            </div>
            <style jsx global>
                {`
                    .collectionDescription span a {
                        color: inherit;
                    }
                    .collectionDescription a {
                        color: inherit;
                    }
                    .collectionDescription p {
                        margin: 0;
                    }
                    .collectionDescription p {
                        display: inline;
                        word-wrap: break-word;
                    }
                `}
            </style>
            <style jsx>
                {`
                    .collection_header {
                        display: flex;
                        padding: 35px 55px 0;
                        font-size: 1.7em;
                        line-height: 1.3em;
                    }
                    h1 {
                        font-size: 0.9em;
                        font-weight: 300;
                        margin: 0 0 30px;
                    }
                    p {
                        margin: 0;
                    }
                    .column {
                        display: flex;
                        flex: 1 0 50%;
                    }
                    .collectionDescription {
                        font-size: 0.9em;
                        font-weight: 300;
                    }
                    .collectionDescription__expand_link {
                        text-decoration: underline;
                        text-align: left;
                        padding: 5px 0 5px 10px;
                        cursor: pointer;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        h1 {
                            margin: 0 0 10px;
                        }
                        .collection_header {
                            flex-direction: column;
                            padding: 20px 30px 0;
                            margin: 0 0 30px 0;
                            font-size: 1.5em;
                        }
                        .collectionDescription {
                            font-size: 0.85rem;
                            font-weight: 300;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default CollectionHeader;
