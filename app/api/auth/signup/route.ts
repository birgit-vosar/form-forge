import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import pool from "@/lib/db"


export async function POST(req: NextRequest) {
    try {
        const cookieData = await cookies()
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

        try {
            await pool.query(
                'SELECT EXISTS( SELECT 1 FROM users WHERE email = $1)', [email]
            )
        } catch (err) {
            return NextResponse.json({ error: 'User already created' }, { status: 401 })
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        try {
            await pool.query(
                'INSERT INTO users (email, password_hash) VALUES ($1, $2)', [email, passwordHash]
            )
            return NextResponse.json({response: 'User created successfully'}, { status: 201 });
        } catch (err) {
            return NextResponse.json(
                { error: 'Couldnt create the user, sql error' },
                { status: 401 }
            )
        }
    } catch (err) {
        console.error('This is signup api error:', err)
        return NextResponse.json({ err: 'Signup api error, couldnt sign in' }, { status: 500 })
    }
}
