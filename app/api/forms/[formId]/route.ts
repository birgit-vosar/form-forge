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
            'DELETE FROM forms WHERE id = $1 AND user_id = $2', [formId, userId]
        )

        return NextResponse.json({ response: 'Form successfully deleted' }, { status: 200 })
    } catch (err) {
        console.error('Failed to delete form in api:', err)
        return NextResponse.json({ error: 'Failed to delete form in api' }, { status: 500 })
    }
}

export async function GET(req: NextRequest, context: { params: { formId: string }}) {
    const session = await getIronSession<SessionData>(req, new NextResponse(), sessionOptions)
    const userId = session.userId
    if (!userId) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { formId } = await context.params
        const res = await pool.query(
            'SELECT * FROM forms WHERE id = $1 AND user_id = $2', [formId, userId]
        )
        if(res.rows.length === 0) {
            return NextResponse.json({ response: 'Form not found' }, { status: 404})
        }
        return NextResponse.json(res.rows[0])
    } catch(err) {
        console.log('failed to fetch info for the specific form')
        return NextResponse.json({ error: 'Failed to fetch info for the specific form' }, { status: 500 })
    }
    
}