import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

// List of supported locales
const locales = ["en", "fa"]
const defaultLocale = "en"

// Get the preferred locale from the request
function getLocale(request: NextRequest): string {
    // Negotiator expects a plain object, so we need to convert headers
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

    // Use negotiator and intl-localematcher to get the best locale
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

    // If no Accept-Language header is present, return the default locale
    if (!languages || languages.length === 0 || languages[0]=="*") {
        return defaultLocale
    }

    return match(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // Check if the pathname already has a locale
    const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

    // If pathname doesn't have locale, redirect to the preferred locale
    if (!pathnameHasLocale) {
        const locale = getLocale(request)

        // e.g. incoming request is /products
        // The new URL is now /en/products or /fa/products depending on the locale
        const proto = request.headers.get('X-Forwarded-Proto') || 'https';
        const host = request.headers.get('X-Forwarded-Host') || request.headers.get('host');

        // construct full URL with original proto and host
        const baseUrl = `${proto}://${host}`;
        return NextResponse.redirect(
            new URL(`/${locale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`, baseUrl),
        )
    }
}

export const config = {
    // Match all pathnames except for
    // - api routes (/api/*)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - and files with extensions (.jpg, .png, etc.)
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}

