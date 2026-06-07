import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/lib/sessions";


export async function proxy(req: NextRequest) {
    const pathname = req.nextUrl.pathname
    const publicPaths = ['/login', '/signup', '/favicon.ico'];
    if (
        publicPaths.includes(pathname) ||
        pathname.startsWith('/api/auth') ||
        pathname.startsWith('/api/forms') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/f/')
    ) {
        return NextResponse.next();
    }

    const res = NextResponse.next()
    const session = await getIronSession<SessionData>(
        req,
        res,
        sessionOptions
    )

    if (!session.userId) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return res
}

export const config = {
    matcher: ['/:path*'],
}