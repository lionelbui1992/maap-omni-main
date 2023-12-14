export function logError(error: any) {
    // TODO: Implement logging to Sentry.
    if (process.env.NODE_ENV === 'development') {
        console.error(error.stack);
    }
}
