import { NextRequest, NextResponse } from "next/server"
import { pool } from '@/lib/db'
import { SessionData, sessionOptions } from "@/lib/sessions"
import { getIronSession } from "iron-session"

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
            return NextResponse.json({ error: 'Request failed, please try again.' }, { status: 404 })
        }

        const countRes = await pool.query(
            'SELECT COALESCE(MAX(f_o.order_index), -1) AS max_order FROM field_options f_o JOIN forms ON forms.id = f_o.form_id WHERE f_o.field_id = $1 AND f_o.form_id = $2 AND forms.user_id = $3',
            [fieldId, formId, userId]
        )

        const orderIndex = countRes.rows[0].max_order + 1;

        const resOptionField = await pool.query(
            'INSERT INTO field_options (field_id, order_index, form_id) VALUES ($1, $2, $3) RETURNING *', [fieldId, orderIndex, formId]
        )

        return NextResponse.json(resOptionField.rows[0])

    } catch (err) {
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
            return NextResponse.json({ error: 'Request failed, please try again.' }, { status: 404 })
        }

        const body = await req.json()

        const deleteRes = await pool.query(
            'DELETE FROM field_options f_o USING forms WHERE forms.id = f_o.form_id AND f_o.id = $1 AND f_o.field_id = $2 AND forms.user_id = $3', [body.optionId, fieldId, userId]
        )

        if (deleteRes.rowCount === 0) {
            return NextResponse.json({ error: 'Option not found' }, { status: 404 })
        }

        return NextResponse.json({ status: 201 })

    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Failed to add a new options field.' }, { status: 500 })
    }
}

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
            return NextResponse.json({ error: 'Request failed, please try again.' }, { status: 404 })
        }

        const { optionId, update } = await req.json()


        await pool.query(
            'UPDATE field_options f_o SET label = $1 FROM forms WHERE forms.id = f_o.form_id AND f_o.field_id = $2 AND f_o.id = $3 AND forms.user_id = $4', [update.label, fieldId, optionId, userId]
        )


        const result = await pool.query(
            'SELECT f_o.* FROM field_options f_o JOIN forms ON forms.id = f_o.form_id WHERE f_o.id = $1 AND f_o.field_id = $2 AND forms.user_id = $3', [optionId, fieldId, userId]
        )

        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Option not found' }, { status: 404 })
        }

        return NextResponse.json(result.rows[0])

    } catch (err) {
        return NextResponse.json({ error: 'Failed to delete field.' }, { status: 500 })
    }
}