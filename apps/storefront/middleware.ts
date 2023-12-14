import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
    matcher: [
        '/discover/(.*)',
        '/ncollections/(.*)',
        '/(.*)/ncollections/(.*)',
        '/nproducts/(.*)',
        '/(.*)/nproducts/(.*)',
        '/content-library',
        // Skip all internal paths (_next) for prod
        // '/((?!_next).*)',
    ],
};

let locales = ['en-AU', 'en-UK', 'en-EU', 'en-US'];

// Get the preferred locale, similar to the above or using a library
function getLocale(request) {
    // TODO: Detect or use cookie
    return 'en-AU';
}

export function middleware(request: NextRequest) {
    let authCookie = request.cookies.get('staff');

    if (
        authCookie ||
        process.env.NODE_ENV === 'development' ||
        process.env.VERCEL_ENV === 'development' ||
        process.env.VERCEL_ENV === 'preview'
    ) {
        const { pathname } = request.nextUrl;
        const pathnameHasLocale = locales.some(
            (locale) =>
                pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
        );

        if (pathnameHasLocale) return NextResponse.next();

        const targetLocal = getLocale(request);

        // Redirect if there is no locale
        if (targetLocal === 'en-AU') return NextResponse.next();

        request.nextUrl.pathname = `/${targetLocal}${pathname}`;

        // e.g. incoming request is /products
        // The new URL is now /en-US/products
        return Response.redirect(request.nextUrl);
    }

    const url = request.nextUrl;
    url.pathname = '/';
    return NextResponse.redirect(url);
}
