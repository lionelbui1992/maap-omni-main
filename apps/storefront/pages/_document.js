import { Head, Html, Main, NextScript } from 'next/document';
import { StyleRegistry, useStyleRegistry } from 'styled-jsx';


function Styles() {
    const registry = useStyleRegistry();
    const styles = registry.styles();
    return <>{styles}</>;
}

function MyDocument() {
    return (
        <StyleRegistry>
            <Html>
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://use.typekit.net/mni2qqn.css"
                    />
                    <style>
                        {`
                            body {
                                font-size: 13px;
                                font-family: acumin-pro, MonumentExtended-Black,
                                    MonumentExtended-Regular, Roboto, sans-serif;
                                font-weight: 300;
                                font-style: normal;
                                -webkit-font-smoothing: antialiased;
                                -moz-osx-font-smoothing: grayscale;
                                margin: 0;
                            }
                        `}
                    </style>
                    <Styles />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        </StyleRegistry>
    );
}

export default MyDocument;
