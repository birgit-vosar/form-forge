import pool from "@/lib/db";
import { SessionData, sessionOptions } from "@/lib/sessions";
import { getIronSession } from "iron-session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getIronSession<SessionData>(req, new NextResponse(), sessionOptions)
    const userId = session.userId
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const res = await pool.query(
            'SELECT forms.id AS form_id, forms.title, forms.is_published, forms.topic, responses.id AS response_id, responses.submitted_at FROM forms LEFT JOIN responses on responses.form_id = forms.id WHERE forms.user_id = $1 ORDER BY responses.submitted_at DESC NULLS LAST', [userId]
        )
        const filteredData = res.rows.filter(row => row.response_id !== null)
        return NextResponse.json(filteredData, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch the forms from the server.' }, { status: 500 })
    }
}