import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        const client = await pool.connect()

        const responsesRes = await client.query(
                    'SELECT * FROM responses'
        )
        if (responsesRes.rows.length === 0) {
            return NextResponse.json({ error: 'Form submissions inquiry resulted with no responses submitted.' }, { status: 404 })
        }
        const resAnswersRes = await client.query(
                    'SELECT * FROM response_answers'
        )
        const formsRes = await client.query(
                    'SELECT * FROM forms'
        )

        return NextResponse.json({ res: 'Form fetch successful' }, { status: 200 })
    } catch(err) {
        return NextResponse.json({ error: 'Failed to fetch the forms from the server.' }, { status: 500 })
    }
}