import { NextRequest, NextResponse } from "next/server"
import { pool } from '@/lib/db'
import { SessionData, sessionOptions } from "@/lib/sessions"
import { getIronSession } from "iron-session"
import { z } from 'zod'

export async function GET(req: NextRequest) {
    const session = await getIronSession<SessionData>(req, new NextResponse(), sessionOptions)
    const userId = session.userId
    if(!userId) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
}