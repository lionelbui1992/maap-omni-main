import React from 'react';
import { RichText } from 'prismic-reactjs';

const CrashReplacementInfoBlock = block => {
    const { title, description } = block.document;

    return (
        <>
            <div className="crashReplacementInfoBlock">
                <div className="row">
                    <h1>{title[0].text.replace('Info', '').toUpperCase()}</h1>
                    <div>{RichText.render(description)}</div>
                </div>
            </div>
            <style jsx>
                {`
                    .crashReplacementInfoBlock {
                        width: 100%;
                        background-color: rgb(219, 219, 219);
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                    }

                    .row {
                        padding: 20px 200px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        width: 80%;
                    }

                    .row h1 {
                        text-align: center;
                    }
                `}
            </style>
        </>
    );
};

export default CrashReplacementInfoBlock;
