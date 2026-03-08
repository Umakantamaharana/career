import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'default_secret_key_change_me_in_production';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
const encodedSecret = new TextEncoder().encode(SECRET_KEY);

export async function POST(request: Request) {
    try {
        const { password } = await request.json();

        if (password === ADMIN_PASSWORD) {
            // Create a JWT token
            const token = await new SignJWT({ admin: true })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('24h')
                .sign(encodedSecret);

            const response = NextResponse.json({ success: true });

            // Set the HTTP-only cookie
            response.cookies.set({
                name: 'admin_session',
                value: token,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24, // 24 hours
                path: '/',
            });

            return response;
        }

        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
