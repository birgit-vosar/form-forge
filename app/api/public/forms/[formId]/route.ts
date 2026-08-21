import { NextRequest, NextResponse } from "next/server"
import { pool } from '@/lib/db'

export async function GET(req: NextRequest, context: { params: { formId: string } }) {
    const { formId } = await context.params
    try {
        const formsRes = await pool.query(
            'SELECT id, title, description FROM forms WHERE id = $1', [formId]
        )

        if (formsRes.rows.length === 0) {
            return NextResponse.json({ error: 'Form not found' }, { status: 401 })
        }

        const fieldsRes = await pool.query(
            'SELECT id, type, label, placeholder, required, order_index, validation_rules FROM fields WHERE form_id = $1', [formId]
        )

        const optionsRes = await pool.query(
            'SELECT id, field_id, label, order_index, value FROM field_options WHERE form_id = $1', [formId]
        )


        return NextResponse.json({status: 200})
    } catch(err) {
        console.error('Failed to fetch forms:', err)
        return NextResponse.json({ error: 'Failed to fetch the forms from the server.' }, { status: 500 })
    }
}