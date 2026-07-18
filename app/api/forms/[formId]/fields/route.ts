import { NextRequest, NextResponse } from "next/server"
import { pool } from '@/lib/db'
import { SessionData, sessionOptions } from "@/lib/sessions"
import { getIronSession } from "iron-session"
import { z } from 'zod'

export async function GET(req: NextRequest, context: { params: { formId: string } }) {
    const session = await getIronSession<SessionData>(req, new NextResponse(), sessionOptions)
    const userId = session.userId
    if (!userId) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { formId } = await context.params
        const res = await pool.query(
            'SELECT id FROM forms WHERE user_id = $1 AND id = $2', [userId, formId]
        )

        if (res.rows.length === 0) {
            return NextResponse.json({ response: 'Request failed, please try again.' }, { status: 404 })
        }

        const existingFields = await pool.query(
            'SELECT * FROM fields WHERE form_id = $1 ORDER BY order_index ASC', [formId]
        )

        return NextResponse.json(existingFields.rows)
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Failed to fetch form fields' }, { status: 500 })
    }
}

export async function POST(req: NextRequest, context: { params: { formId: string } }) {
    const session = await getIronSession<SessionData>(req, new NextResponse(), sessionOptions)
    const userId = session.userId
    if (!userId) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { formId } = await context.params
        const res = await pool.query(
            'SELECT id FROM forms WHERE user_id = $1 AND id = $2', [userId, formId]
        )
        if (res.rows.length === 0) {
            return NextResponse.json({ response: 'Request failed, please try again.' }, { status: 404 })
        }

        const body = await req.json()
        const schema = z.object({
            type: z.enum(['text', 'textarea', 'email', 'phone', 'select', 'radio', 'checkbox', 'date']),
            label: z.string().min(1),
            placeholder: z.string().nullable(),
            required: z.boolean(),
            order_index: z.number().int().nonnegative(),
            validation_rules: z.record(z.string(), z.unknown()).nullable()
        })
        const parsed = schema.safeParse(body)
        if (!parsed.success) return NextResponse.json({ error: 'Invalid' }, { status: 400 })

        const newField = parsed.data
        const fieldRes = await pool.query(
            'INSERT INTO fields (form_id, type, label, placeholder, required, order_index, validation_rules) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', 
            [formId, newField.type, newField.label, newField.placeholder, newField.required, newField.order_index, newField.validation_rules]
        )
        if (fieldRes.rows.length === 0) {
            return NextResponse.json({ response: 'Request failed, please try again.' }, { status: 404 })
        }

        return NextResponse.json(fieldRes.rows[0], { status: 201 })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Failed to add a form field.' }, { status: 500 })
    }

}

export async function DELETE(req: NextRequest, context: { params: { formId: string } }) {
    const session = await getIronSession<SessionData>(req, new NextResponse(), sessionOptions)
    const userId = session.userId
    if (!userId) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { formId } = await context.params
        const res = await pool.query(
            'SELECT id FROM forms WHERE user_id = $1 AND id = $2', [userId, formId]
        )
        if (res.rows.length === 0) {
            return NextResponse.json({ response: 'Request failed, please try again.' }, { status: 404 })
        }

        const fieldId = await req.json()
        
        await pool.query(
            'DELETE FROM fields WHERE id = $1', [fieldId]
        )

        return NextResponse.json({ response: 'Field deletion successful.'}, { status: 201 })

    } catch(err) {
        console.log(err)
        return NextResponse.json({ error: 'Failed to delete field.' }, { status: 500 })
    }
}