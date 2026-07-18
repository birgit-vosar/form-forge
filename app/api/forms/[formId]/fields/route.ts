import { NextRequest, NextResponse } from "next/server"
import { pool } from '@/lib/db'
import { SessionData, sessionOptions } from "@/lib/sessions"
import { getIronSession } from "iron-session"
import { z } from 'zod'

export async function GET(req: NextRequest, context: { params: { formId: string } }) {
    const session = await getIronSession<SessionData>(req, new NextResponse(), sessionOptions)
    const userId = session.userId
    if(!userId) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { formId } = await context.params
        const res = await pool.query(
            'SELECT id FROM forms WHERE user_id = $1 AND id = $2', [userId, formId]
        )

        if (res.rows.length === 0) {
            return NextResponse.json({ response: 'Request failed, please try again.' }, { status: 404})
        }

        const existingFields = await pool.query(
            'SELECT * FROM fields WHERE form_id = $1 ORDER BY order_index ASC', [formId]
        )

        return NextResponse.json(existingFields.rows)
    } catch(err) {
        console.error(err)
        return NextResponse.json({ error: 'Failed to fetch form fields' }, { status: 500 })
    }
}

export async function POST(req: NextRequest, context: { params: { formId: string } }) {

}