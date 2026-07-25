import { NextRequest, NextResponse } from "next/server"
import { pool } from '@/lib/db'
import { SessionData, sessionOptions } from "@/lib/sessions"
import { getIronSession } from "iron-session"
import { z } from 'zod'

export async function PATCH(req: NextRequest, context: { params: { formId: string, fieldId: number } }) {
    const session = await getIronSession<SessionData>(req, new NextResponse(), sessionOptions)
    const userId = session.userId
    if (!userId) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { formId, fieldId } = await context.params
        const res = await pool.query(
            'SELECT id FROM forms WHERE user_id = $1 AND id = $2', [userId, formId]
        )
        if (res.rows.length === 0) {
            return NextResponse.json({ response: 'Request failed, please try again.' }, { status: 404 })
        }

        const { update } = await req.json()

        console.log(update.label)

        if (update.label !== undefined) {
            await pool.query(
                'UPDATE fields SET label = $1 WHERE form_id = $2 AND id = $3', [update.label, formId, fieldId]
            )
        }

        if (update.placeholder !== undefined) {
            await pool.query(
                'UPDATE fields SET placeholder = $1 WHERE form_id = $2 AND id = $3', [update.placeholder, formId, fieldId]
            )
        }

        if (update.required !== undefined) {
            await pool.query(
                'UPDATE fields SET required = $1 WHERE form_id = $2 AND id = $3', [update.required, formId, fieldId]
            )
        }

        const result = await pool.query(
            'SELECT * FROM fields WHERE id = $1 AND form_id = $2', [fieldId, formId]
        )

        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Field not found' }, { status: 404 })
        }

        return NextResponse.json(result.rows[0])

    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Failed to delete field.' }, { status: 500 })
    }
}