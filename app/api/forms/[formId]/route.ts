import { NextRequest, NextResponse } from "next/server"


export async function DELETE(req: NextRequest) {
    const formId = await req.json()
    try {
        return NextResponse.json({ response: 'Info successfully arrived to api' }, { status: 200 })
    } catch(err) {
        console.error('Failed to delete form in api:', err)
        return NextResponse.json({error: 'Failed to delete form in api'}, { status: 500 })
    }
}