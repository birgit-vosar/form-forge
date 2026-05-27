import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getIronSession } from "iron-session"
import pool from "@/lib/db"
import { SessionData, sessionOptions } from "@/lib/sessions"


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { email, password } = body


        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 401 }
            )
        }
        if (!password) {
            return NextResponse.json(
                { error: 'Password is required' },
                { status: 401 }
            )
        }


        const response = await pool.query(
            'SELECT EXISTS( SELECT 1 FROM users WHERE email = $1)', [email]
        )

        if (response.rows[0].exists === true) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 })
        }


        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);


        const insertResponse = await pool.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id', [email, passwordHash]
        )

        const userId = insertResponse.rows[0].id

        const res = new NextResponse(
            JSON.stringify({ response: 'User created successfully' }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        )

        const session = await getIronSession<SessionData>(req, res, sessionOptions)
        session.userId = userId
        session.email = email

        await session.save()

        return res

    } catch (err) {
        console.error('Something went wrong, please try again:', err)
        return NextResponse.json({ err: 'Signup api error, couldnt sign in' }, { status: 500 })
    }
}
