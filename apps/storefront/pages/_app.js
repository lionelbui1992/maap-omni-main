import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { ApolloProvider } from '@apollo/react-hooks';
import withApollo from '@lib/withApollo';
import { EventsProvider } from '@lib/providers/EventsProvider';
import { ManagedUIProvider } from '@lib/providers/UIProvider';
import ErrorBoundary from '@containers/ExceptionsHandling/ErrorBoundary/ErrorBoundary';
import styles from '../config/styles/global';
import 'public/styles/brand.scss';
import 'public/styles/osano.scss';

NProgress.configure({ showSpinner: false });

Router.onRouteChangeStart = () => {
    NProgress.start();
};

Router.onRouteChangeComplete = () => {
    NProgress.done();
};

Router.onRouteChangeError = () => {
    NProgress.done();
};

function MyApp(props) {
    const { apollo, Component, pageProps } = props;
    const router = useRouter();

    useEffect(() => {
        window.dispatchEvent(new Event('storefrontUp'));
    });

    return (
        <ApolloProvider client={apollo}>
            <ManagedUIProvider>
                <EventsProvider>
                    <ErrorBoundary location={router.asPath}>
                        <Component {...pageProps} />
                    </ErrorBoundary>
                    <style jsx global>
                        {styles}
                    </style>
                </EventsProvider>
            </ManagedUIProvider>
        </ApolloProvider>
    );
}

export default withApollo(MyApp);
