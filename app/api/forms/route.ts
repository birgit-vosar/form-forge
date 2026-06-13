import pool from "@/lib/db"
import { SessionData, sessionOptions } from "@/lib/sessions"
import { getIronSession } from "iron-session"
import { NextRequest, NextResponse } from "next/server"


export async function GET(req: NextRequest) {
    try {
        const session = await getIronSession<SessionData>(req, new NextResponse(), sessionOptions)
        const userId = session.userId
        if (!userId) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const res = await pool.query(
            'SELECT forms.id, forms.title, forms.is_published, COUNT(responses.id) AS responses_amount, MAX(responses.submitted_at) AS last_response FROM forms LEFT JOIN responses ON forms.id=responses.form_id WHERE forms.user_id = $1 GROUP BY forms.id', [userId]
        )
        return NextResponse.json(res.rows)
    } catch (err) {
        console.error('Failed to fetch forms data in api:', err)
        return NextResponse.json({ error: 'Failed to fetch forms data' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getIronSession<SessionData>(req, new NextResponse(), sessionOptions)
        const userId = session.userId
        if (!userId) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const title = 'Untitled form'
        try {
            const res = await pool.query(
                'INSERT INTO forms (user_id, title) VALUES ($1, $2) RETURNING id', [userId, title]
            )
            const formId = res.rows[0].id
            console.log(formId)

            return NextResponse.json(formId)
        } catch (err) {
            console.log('failed to insert data')
        }



    } catch (err) {
        console.log('Failed to create new form base in server')
        return NextResponse.json({ error: 'Failed to create new form' }, { status: 500 })
    }
}
