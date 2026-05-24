import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import pool from "@/lib/db"


export async function POST(req: NextRequest) {
    try {
        const cookieData = await cookies()
        const body = await req.json()
        const { email, password } = body

        const response = await pool.query

        return NextResponse.json('This is a server')
    } catch (err) {
        console.error('This is signup api error:', err)
        return NextResponse.json({ err: 'Signup api error, couldnt sign in' }, { status: 500 })
    }
}
