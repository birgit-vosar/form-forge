import { NextRequest, NextResponse } from "next/server"
import { pool } from '@/lib/db'

export async function DELETE(req: NextRequest) {
    const formId = await req.json()
    try {
        await pool.query(
            'DELETE FROM forms WHERE id = $1', [formId]
        )

        return NextResponse.json({ response: 'Form successfully deleted' }, { status: 200 })
    } catch(err) {
        console.error('Failed to delete form in api:', err)
        return NextResponse.json({error: 'Failed to delete form in api'}, { status: 500 })
    }
}