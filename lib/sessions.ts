import { SessionOptions } from 'iron-session';  

export interface SessionData {
        userId?:number;
        email?:string;
}

export const sessionOptions: SessionOptions = {
    cookieName: 'formforge-session',
    password: process.env.SESSION_SECRET as string,
    cookieOptions: {
        secure:process.env.NODE_ENV === 'production',
        httpOnly: true
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7
    }

}