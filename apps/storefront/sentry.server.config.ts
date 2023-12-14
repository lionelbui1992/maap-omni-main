// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
    dsn:
        process.env.NEXT_PUBLIC_SENTRY_DSN ||
        'https://8471ad3623144588904377d04ee086e9@o4505547989778432.ingest.sentry.io/4505548543098880',

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
});
