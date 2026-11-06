import pool from "@/lib/db";
import { SessionData, sessionOptions } from "@/lib/sessions";
import { getIronSession } from "iron-session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: { formId: string } }) {
    const session = await getIronSession<SessionData>(req, new NextResponse(), sessionOptions)
    const userId = session.userId
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { formId } = await context.params

        const formRes = await pool.query(
            'SELECT id FROM forms WHERE id = $1 AND user_id = $2',
            [formId, userId]
        )
        if (formRes.rows.length === 0) {
            return NextResponse.json({ error: 'Form not found.' }, { status: 404 })
        }

        const responsesRes = await pool.query(
            `SELECT id, submitted_at
             FROM responses
             WHERE form_id = $1
             ORDER BY submitted_at DESC`,
            [formId]
        )

        if (responsesRes.rows.length === 0) {
            return NextResponse.json([], { status: 200 })
        }

        const responseIds = responsesRes.rows.map((r) => r.id)

        const answersRes = await pool.query(
            `SELECT id AS answer_id, response_id, field_id, value
     FROM response_answers
     WHERE response_id = ANY($1::int[])`,
            [responseIds]
        )

        const responsesWithAnswers = responsesRes.rows.map((response) => ({
            ...response,
            answers: answersRes.rows.filter((answer) => answer.response_id === response.id),
        }))
        console.log(responsesWithAnswers)

        return NextResponse.json(responsesWithAnswers, { status: 200 })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Failed to fetch the responses from the server.' }, { status: 500 })
    }
}