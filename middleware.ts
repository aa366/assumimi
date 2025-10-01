import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ["/", "/sign-in", "/sign-up"]

export function middleware(request: NextRequest) {
    // Read the session cookie directly from the request
    const session = request.cookies.get("session")?.value
    const pathname = request.nextUrl.pathname

    const authenticated = !!session

    if (authenticated && publicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    if (!authenticated && !publicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/sign-in", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}