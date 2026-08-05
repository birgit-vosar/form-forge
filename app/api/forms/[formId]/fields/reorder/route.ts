import { NextRequest, NextResponse } from "next/server"
import { getIronSession } from "iron-session"
import { sessionOptions, SessionData } from "@/lib/sessions"
import { pool } from "@/lib/db"
import { reorderFieldsSchema } from "@/lib/validations"

export async function PATCH(req: NextRequest, context: { params: { formId: string } }) {
    const session = await getIronSession<SessionData>(req, new NextResponse(), sessionOptions)
    const userId = session.userId
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { formId } = await context.params

    const res = await pool.query(
        'SELECT id FROM forms WHERE user_id = $1 AND id = $2', [userId, formId]
    )
    if (res.rows.length === 0) {
        return NextResponse.json({ response: 'Request failed, please try again.' }, { status: 404 })
    }

    const body = await req.json()
    const parsed = reorderFieldsSchema.safeParse(body)
    if (!parsed.success) {
        return NextResponse.json({ error: 'Invalid reorder of the array' }, { status: 400 })
    }

    const { fieldOrder } = parsed.data

    const client = await pool.connect()

    try {

        await client.query('BEGIN')
        for (const field of fieldOrder) {
            await client.query(
                'UPDATE fields SET order_index = $1 WHERE id = $2 AND form_id = $3',
                [field.order_index, field.id, formId]
            )
        }
        await client.query('COMMIT')
        return NextResponse.json({ success: true })

    } catch (err) {
        await client.query('ROLLBACK')
        console.error(err)
        return NextResponse.json({ error: 'Failed to save field order' }, { status: 500 })
    } finally {
        client.release()
    }


}