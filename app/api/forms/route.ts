import pool from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"


export async function GET(req: NextRequest) {
    try {
        const res = await pool.query(
            'SELECT id, title FROM forms WHERE user_id = $1'
        )

    } catch (err) {
        console.error('Failed to fetch forms data in api:', err)
        return NextResponse.json({ error: 'Failed to fetch forms data' }, { status: 500 })
    }
}

export async function POST() {

}
