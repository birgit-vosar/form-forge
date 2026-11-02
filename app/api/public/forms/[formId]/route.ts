import { NextRequest, NextResponse } from "next/server"
import { pool } from '@/lib/db'
import { submitResponseSchema } from "@/lib/validations"
import { isValidEmail, isValidPhone } from "@/lib/fieldHelpers"

export async function GET(req: NextRequest, context: { params: { formId: string } }) {
    const { formId } = await context.params
    const id = Number(formId)

    if (!Number.isInteger(id) || id <= 0) {
        return NextResponse.json({ error: 'Form not found' }, { status: 404 })
    }

    try {
        const formsRes = await pool.query(
            'SELECT id, title, description FROM forms WHERE id = $1', [formId]
        )

        if (formsRes.rows.length === 0) {
            return NextResponse.json({ error: 'Form not found' }, { status: 404 })
        }

        const fieldsRes = await pool.query(
            'SELECT id, type, label, placeholder, required, order_index, validation_rules, form_id FROM fields WHERE form_id = $1', [formId]
        )

        const optionsRes = await pool.query(
            'SELECT id, field_id, label, order_index, value FROM field_options WHERE form_id = $1', [formId]
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
        console.error('Failed to fetch forms:', err)
        return NextResponse.json({ error: 'Failed to fetch the forms from the server.' }, { status: 500 })
    }
}

export async function POST(req: NextRequest, context: { params: { formId: string } }) {
    const { formId } = await context.params
    const body = await req.json()


    const parsed = submitResponseSchema.safeParse(body)
    if (!parsed.success) {
        return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })
    }
    const answerMap = new Map<number, string>(
        Object.entries(parsed.data.values).map(([fieldId, value]) => [
            Number(fieldId),
            value.trim()
        ])
    )
    

    const client = await pool.connect()
    try {
        const fieldsRes = await client.query(
            'SELECT id, type, required FROM fields WHERE form_id = $1 ORDER BY order_index', [formId]
        )

        const fieldsFromTable = fieldsRes.rows

        if (fieldsFromTable.length === 0) {
            return NextResponse.json({ error: 'Form not found' }, { status: 404 })
        }

        for (const field of fieldsFromTable) {
            const value = answerMap.get(field.id) ?? ''

            if (field.required && value === '') {
                return NextResponse.json({ error: 'Please fill in all required fields' }, { status: 400 })
            }
            if (value !== '' && field.type === 'email' && !isValidEmail(value)) {
                return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
            }
            if (value !== '' && field.type === 'phone' && !isValidPhone(value)) {
                return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 })
            }
        }

        await client.query('BEGIN')

        const responseRes = await pool.query(
            'INSERT INTO responses (form_id) VALUES ($1) RETURNING id', [formId]
        )

        const resId = responseRes.rows[0].id

        for (const field of fieldsFromTable) {
            await client.query(
                'INSERT INTO response_answers(response_id, field_id, value) VALUES ($1, $2, $3)',
                [resId, field.id, answerMap.get(field.id) ?? '']
            )
        }

        await client.query('COMMIT')

        return NextResponse.json({ status: 200 })
    } catch (err) {
        await client.query('ROLLBACK').catch(() => {})
        console.error('Failed to save submit info.', err)
        return NextResponse.json({ error: 'Failed to submit the form.' }, { status: 500 })
    } finally {
        client.release()
    }
}