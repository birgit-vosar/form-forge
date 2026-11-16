import { NextRequest, NextResponse } from "next/server"
import { pool } from '@/lib/db'
import { SessionData, sessionOptions } from "@/lib/sessions"
import { getIronSession } from "iron-session"

export async function GET(req: NextRequest, context: { params: { formId: string } }) {
    const session = await getIronSession<SessionData>(req, new NextResponse(), sessionOptions)
    const userId = session.userId
    if (!userId) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { formId } = await context.params
    const id = Number(formId)

    if (!Number.isInteger(id) || id <= 0) {
        return NextResponse.json({ error: 'Form not found' }, { status: 404 })
    }

    try {
        const formsRes = await pool.query(
            'SELECT id, title, description, is_published FROM forms WHERE id = $1', [formId]
        )

        if (formsRes.rows.length === 0) {
            return NextResponse.json({ error: 'Form not found' }, { status: 404 })
        }

        const fieldsRes = await pool.query(
            'SELECT f.id, f.type, f.label, f.placeholder, f.required, f.order_index, f.validation_rules, f.form_id FROM fields f JOIN forms ON forms.id = f.form_id WHERE f.form_id = $1 AND forms.user_id = $2 ORDER BY f.order_index ASC', [formId, userId]
        )

        const optionsRes = await pool.query(
            'SELECT f_o.id, f_o.field_id, f_o.label, f_o.order_index, f_o.value FROM field_options f_o JOIN forms ON forms.id = f_o.form_id WHERE f_o.form_id = $1 AND forms.user_id = $2 ORDER BY f_o.order_index ASC', [formId, userId]
        )

        const form = formsRes.rows[0]

        const optionsByField = optionsRes.rows.reduce((acc, opt) => {
            if (!acc[opt.field_id]) acc[opt.field_id] = []
            acc[opt.field_id].push(opt)
            return acc
        }, {} as Record<string, any[]>)

        const fields = fieldsRes.rows.map((field) => ({
            ...field,
            options: optionsByField[field.id] || []
        }))


        return NextResponse.json({ ...form, fields })
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch the forms from the server.' }, { status: 500 })
    }
}