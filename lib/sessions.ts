import { SessionOptions } from 'iron-session';  

export interface SessionData {
        userId?:string;
}

export const sessionOptions: SessionOptions = {
    cookieName: 'formforge-session',
    password: process.env.SESSION_SECRET as string,
    cookieOptions: {
        secure:process.env.NODE_ENV === 'production',
        httpOnly: true
    }

}