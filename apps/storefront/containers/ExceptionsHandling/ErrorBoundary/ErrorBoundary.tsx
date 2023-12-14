import * as Sentry from '@sentry/browser';
import { Component, ReactNode } from 'react';
import Link from 'next/link';
import styles from './ErrorBoundary.module.css';

interface ErrorBoundaryProps {
    children: ReactNode;
    location: string;
    withinLayout?: boolean;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        Sentry.captureException(error, info);
    }

    componentDidUpdate(prevProps) {
        // Reset the error state when the location changes
        if (this.state.hasError && prevProps.location !== this.props.location) {
            this.setState({ hasError: false });
        }
    }

    renderErrorMessage() {
        return (
            <div className={styles.root}>
                <div className={styles.message}>
                    <h1>SORRY</h1>
                    <p>
                        Something went wrong.
                        {!this.props.withinLayout && (
                            <>
                                {' '}
                                Return to our <Link href={'/'}>home page.</Link>
                            </>
                        )}
                    </p>
                </div>
                <Link
                    href="https://support.maap.cc/hc/en-us"
                    className={styles.link}
                >
                    Customer Support
                </Link>
                <div className={styles.features}>
                    <div className={styles.feature}>
                        <Link href="/collections/maap-new-arrivals">
                            SHOP MAN
                        </Link>
                    </div>
                    <div className={styles.feature}>
                        <Link href="/collections/new-arrivals-woman">
                            SHOP WOMAN
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        if (this.state.hasError) {
            return this.renderErrorMessage();
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
