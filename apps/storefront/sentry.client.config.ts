// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
// @ts-nocheck
import * as Sentry from '@sentry/nextjs';

Sentry.init({
    dsn:
        process.env.NEXT_PUBLIC_SENTRY_DSN ||
        'https://8471ad3623144588904377d04ee086e9@o4505547989778432.ingest.sentry.io/4505548543098880',

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,

    replaysOnErrorSampleRate: 1.0,

    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.1,

    beforeSend: (event, hint) => {
        if (process.env.NODE_ENV === 'development') {
            console.error(
                'Caught error locally instead of sending to Sentry.',
                hint.originalException || hint.syntheticException
            );
            return null;
        }
    },

    // You can remove this option if you're not planning to use the Sentry Session Replay feature:
    integrations: [
        new Sentry.Replay({
            // Additional Replay configuration goes in here, for example:
            maskAllText: true,
            blockAllMedia: true,
        }),
    ],
});
