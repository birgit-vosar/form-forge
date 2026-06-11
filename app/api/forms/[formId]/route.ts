import { NextRequest, NextResponse } from "next/server"
import { pool } from '@/lib/db'
import { SessionData, sessionOptions } from "@/lib/sessions"
import { getIronSession } from "iron-session"

export async function DELETE(req: NextRequest) {
    const session = await getIronSession<SessionData>(req, new NextResponse(), sessionOptions)
    const userId = session.userId
    if (!userId) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const formId = await req.json()
    try {
        await pool.query(
            'DELETE FROM forms WHERE id = $1', [formId]
        )

        return NextResponse.json({ response: 'Form successfully deleted' }, { status: 200 })
    } catch (err) {
        console.error('Failed to delete form in api:', err)
        return NextResponse.json({ error: 'Failed to delete form in api' }, { status: 500 })
    }
}