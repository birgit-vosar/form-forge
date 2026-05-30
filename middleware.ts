import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/lib/sessions";


export async function middleware(request: NextRequest) {
    const response = NextResponse.next()
    const session = await getIronSession<SessionData>(
        request,
        response,
        sessionOptions
    )

    if (!session.userId) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return response
}

export const config = {
  matcher: ['/dashboard/:path*'],
}