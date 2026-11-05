import { NextRequest, NextResponse } from "next/server"
import { pool } from '@/lib/db'
import { SessionData, sessionOptions } from "@/lib/sessions"
import { getIronSession } from "iron-session"
import { z } from 'zod'

export async function DELETE(req: NextRequest) {
    const session = await getIronSession<SessionData>(req, new NextResponse(), sessionOptions)
    const userId = session.userId
    if (!userId) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const formId = await req.json()
    try {
        await pool.query(
            'DELETE FROM forms WHERE id = $1 AND user_id = $2', [formId, userId]
        )

        return NextResponse.json({ response: 'Form successfully deleted' }, { status: 200 })
    } catch (err) {
        console.error('Failed to delete form in api:', err)
        return NextResponse.json({ error: 'Failed to delete form in api' }, { status: 500 })
    }
}

export async function GET(req: NextRequest, context: { params: { formId: string } }) {
    const session = await getIronSession<SessionData>(req, new NextResponse(), sessionOptions)
    const userId = session.userId
    if (!userId) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { formId } = await context.params
        const res = await pool.query(
            'SELECT * FROM forms WHERE id = $1 AND user_id = $2', [formId, userId]
        )
        if (res.rows.length === 0) {
            return NextResponse.json({ response: 'Form not found' }, { status: 404 })
        }
        return NextResponse.json(res.rows[0])
    } catch (err) {
        console.log('failed to fetch info for the specific form')
        return NextResponse.json({ error: 'Failed to fetch info for the specific form' }, { status: 500 })
    }

}

const publishSchema = z.object({ published: z.boolean() })
const titleSchema = z.object({ title: z.string().min(1).max(50) })

export async function PATCH(req: NextRequest, context: { params: { formId: string } }) {
    const session = await getIronSession<SessionData>(req, new NextResponse(), sessionOptions)
    const userId = session.userId
    if (!userId) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { formId } = await context.params
        const body = await req.json()
        console.log('this is the body dot published that arrived to server: ',body.published)
        console.log('this is the body that arrived to server: ', body)

        if (body.published !== undefined) {
            const parsedPublish = publishSchema.safeParse(body)
            if (!parsedPublish.success) {
                return NextResponse.json({ error: 'Invalid' }, { status: 400 })
            }

            const result = await pool.query(
                'UPDATE forms SET is_published = $1 WHERE id = $2 AND user_id = $3 RETURNING is_published',
                [parsedPublish.data.published, formId, userId]
            )
            console.log('this is the result from db: ', result.rows[0].is_published)

            if (result.rows.length  === 0) {
                return NextResponse.json({ error: 'Form not found' }, { status: 404 })
            }

            return NextResponse.json({ isPublished: result.rows[0].is_published }, { status: 200 })
        }

        const parsed = titleSchema.safeParse(body)
        if (!parsed.success) return NextResponse.json({ error: 'Invalid' }, { status: 400 })

        await pool.query(
            'UPDATE forms SET title = $1 WHERE id = $2 AND user_id = $3', [body.title, formId, userId]
        )

        return NextResponse.json({ response: 'Field changed successfully' }, { status: 200 })
    } catch (err) {
        console.log('failed to change the info')
        return NextResponse.json({ error: 'Failed to change set new information' }, { status: 500 })
    }

}