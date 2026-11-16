import { NextRequest, NextResponse } from "next/server"
import { pool } from '@/lib/db'
import { SessionData, sessionOptions } from "@/lib/sessions"
import { getIronSession } from "iron-session"
import { z } from 'zod'

export async function GET(req: NextRequest, context: { params: Promise<{ formId: string }> }) {
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
            return NextResponse.json({ error: 'Request failed, please try again.' }, { status: 404 })
        }

        const existingFields = await pool.query(
            'SELECT f.* FROM fields f JOIN forms ON forms.id = f.form_id WHERE f.form_id = $1 AND forms.user_id = $2 ORDER BY f.order_index ASC', [formId, userId]
        )

        const optionsFields = await pool.query(
            'SELECT f_o.* FROM field_options f_o JOIN forms ON forms.id = f_o.form_id WHERE f_o.form_id = $1 AND forms.user_id = $2 ORDER BY f_o.order_index ASC', [formId, userId]
        )

        const fields = existingFields.rows.map( field => ({
            ...field,
            options: optionsFields.rows.filter(option => option.field_id === field.id)
        })
    )

        return NextResponse.json(fields)
    } catch (err) {
        console.error('GET form fields error:', err)
        return NextResponse.json({ error: 'Failed to fetch form fields' }, { status: 500 })
    }
}

export async function POST(req: NextRequest, context: { params: Promise<{ formId: string }> }) {
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
            return NextResponse.json({ error: 'Request failed, please try again.' }, { status: 404 })
        }

        const body = await req.json()
        const schema = z.object({
            type: z.enum(['text', 'textarea', 'email', 'phone', 'dropdown', 'radio', 'checkbox', 'date']),
            label: z.string().trim().min(1),
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
            return NextResponse.json({ error: 'Request failed, please try again.' }, { status: 404 })
        }

        return NextResponse.json(fieldRes.rows[0], { status: 201 })
    } catch (err) {
        console.error('POST form fields error:', err)
        return NextResponse.json({ error: 'Failed to add a form field.' }, { status: 500 })
    }

}

export async function DELETE(req: NextRequest, context: { params: Promise<{ formId: string }> }) {
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
            return NextResponse.json({ error: 'Request failed, please try again.' }, { status: 404 })
        }

        const fieldId = await req.json()
        
        await pool.query(
            'DELETE FROM fields f USING forms WHERE forms.id = f.form_id AND forms.user_id = $1 AND f.id = $2 f.form_id = $3', [userId, fieldId, formId]
        )

        return NextResponse.json({ status: 200 })

    } catch(err) {
        console.error('DELETE form fields error:', err)
        return NextResponse.json({ error: 'Failed to delete field.' }, { status: 500 })
    }
}

