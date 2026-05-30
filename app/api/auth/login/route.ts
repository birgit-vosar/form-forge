import { SessionData, sessionOptions } from "@/lib/sessions";
import { getIronSession } from "iron-session";
import { NextRequest, NextResponse } from "next/server";
import { pool } from '@/lib/db'
import { loginSchema } from "@/lib/validations";
import bcrypt from "bcryptjs";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const result = loginSchema.safeParse(body)
        if (!result.success) {
            return NextResponse.json(
                { error: "Invalid input" },
                { status: 400 }
            );
        }

        const { email, password} = result.data

        const response = await pool.query(
            'SELECT id, password_hash FROM users WHERE email = $1', [email]
        )

        if (response.rows.length === 0) {
            return NextResponse.json({ error: 'Invalid email or password'}, { status: 400 })
        }

        const hash = response.rows[0].password_hash
        const match = await bcrypt.compare(password, hash)
        if (!match) {
            return NextResponse.json({ error: 'Invalid email or password'}, { status: 409})
        }

        const userId = response.rows[0].id


        const res = new NextResponse(
            JSON.stringify({ response: 'Logged in successfully' }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
        const session = await getIronSession<SessionData>(req, res, sessionOptions)
        session.userId = userId
        session.email = email
        await session.save()
        return res

    } catch (err) {
        console.log('Login endpoint error:', err)
        return NextResponse.json({ error: 'Something went wrong with logging in, please try again' }, { status: 500 })
    }
}