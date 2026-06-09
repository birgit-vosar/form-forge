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
        if (res.rows.length === 0) {
            return NextResponse.json({ response: 'Failed to fetch forms' }, { status: 401 })
        }
        return NextResponse.json(res.rows)
    } catch (err) {
        console.error('Failed to fetch forms data in api:', err)
        return NextResponse.json({ error: 'Failed to fetch forms data' }, { status: 500 })
    }
}

export async function POST() {

}
