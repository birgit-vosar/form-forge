import { NextRequest, NextResponse } from "next/server"
import { pool } from '@/lib/db'
import { SessionData, sessionOptions } from "@/lib/sessions"
import { getIronSession } from "iron-session"
import { z } from 'zod'

export async function POST(req: NextRequest, context: { params: Promise<{ formId: string, fieldId: number }> }) {
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

        const countRes = await pool.query(
            'SELECT COALESCE(MAX(order_index), -1) AS max_order FROM field_options WHERE field_id = $1',
            [fieldId]
        )

        const orderIndex = countRes.rows[0].max_order + 1;

        const resOptionField = await pool.query(
            'INSERT INTO field_options (field_id, order_index, form_id) VALUES ($1, $2, $3) RETURNING *', [fieldId, orderIndex, formId]
        )

        return NextResponse.json(resOptionField.rows[0])

    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Failed to add a new options field.' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ formId: string, fieldId: number }> }) {
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

        const body = await req.json()

        await pool.query(
            'DELETE FROM field_options WHERE id = $1 AND field_id = $2', [body.optionId, fieldId]
        )

        return NextResponse.json({ response: 'Options field deletion successful.'}, { status: 201 })

    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Failed to add a new options field.' }, { status: 500 })
    }
}