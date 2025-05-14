import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const supportedLocales = ['en', 'tr', 'es', 'de', 'fr']
const defaultLocale = 'en'

export function middleware(request: NextRequest) {
  try {
    // Get language code from URL
    const pathname = request.nextUrl.pathname
    const pathnameIsMissingLocale = supportedLocales.every(
      (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    // If there is no language code, redirect to default language
    if (pathnameIsMissingLocale) {
      const locale = request.headers.get('accept-language')?.split(',')?.[0].split('-')[0] || defaultLocale
      const finalLocale = supportedLocales.includes(locale) ? locale : defaultLocale

      return NextResponse.redirect(
        new URL(`/${finalLocale}${pathname}`, request.url)
      )
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    // Redirect to default language on error
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${request.nextUrl.pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: [
    // Work for all paths, but excluding api, _next, static files and public files
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
} 