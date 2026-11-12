import { NextRequest, NextResponse } from "next/server"
import { pool } from '@/lib/db'
import { SessionData, sessionOptions } from "@/lib/sessions"
import { getIronSession } from "iron-session"
import { fieldNameDraftSchema } from "@/lib/fieldHelpers"

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

        if (update.label !== undefined) {
            await pool.query(
                'UPDATE fields f JOIN forms ON forms.id = f.form_id SET label = $1 WHERE f.form_id = $2 AND forms.user_id = $3 AND f.id = $4 ', [update.label, formId, userId, fieldId]
            )
        }

        if (update.name !== undefined) {
            const parsedName = fieldNameDraftSchema.safeParse({ name: update.name })
            if (!parsedName.success) {
                return NextResponse.json({ error: parsedName.error.issues[0].message }, { status: 400 })
            }

            await pool.query(
                'UPDATE fields f JOIN forms ON forms.id = f.form_id SET name = $1 WHERE f.form_id = $2 AND forms.user_id = $3 AND f.id = $4', [parsedName.data.name, formId, userId, fieldId]
            )
        }

        if (update.placeholder !== undefined) {
            await pool.query(
                'UPDATE fields f JOIN forms ON forms.id = f.form_id SET placeholder = $1 WHERE f.form_id = $2 AND forms.user_id = $3 AND f.id = $4', [update.placeholder, formId, userId, fieldId]
            )
        }

        if (update.required !== undefined) {
            await pool.query(
                'UPDATE fields f JOIN forms ON forms.id = f.form_id SET required = $1 WHERE f.form_id = $2 AND forms.user_id = $3 AND f.id = $4', [update.required, formId, userId, fieldId]
            )
        }

        const result = await pool.query(
            'SELECT * FROM fields f JOIN forms ON forms.id = f.form_id WHERE f.id = $1 AND f.form_id = $2 AND forms.user_id = $3', [fieldId, formId, userId]
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