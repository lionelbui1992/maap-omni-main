import React, { useState, useEffect } from 'react';
import { getDocumentsByTag, prismicLandingPageParser } from 'helpers/prismic';
import PrismicSliceRenderer from 'containers/Prismic/PrismicSliceRenderer';

const ComingSoon = () => {
    const [document, setDocument] = useState(0);

    useEffect(() => {
        (async () => {
            const getDocument = async () => {
                const documents = await getDocumentsByTag(['uk-launch']);
                setDocument(documents[0]);
            };

            await getDocument();
        })();
    }, []);

    return (
        <div className="page">
            {document && (
                <PrismicSliceRenderer
                    blocks={
                        document && document.data
                            ? prismicLandingPageParser(document, 'uid')
                            : []
                    }
                />
            )}
            <style jsx>
                {`
                    .pp-from-container {
                        max-width: 460px;
                        margin: 0 auto;
                        text-align: center;
                        padding-top: 62px;
                        padding-bottom: 100px;
                    }
                `}
            </style>
        </div>
    );
};

export default ComingSoon;
