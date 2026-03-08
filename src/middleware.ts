import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'default_secret_key_change_me_in_production';
const encodedSecret = new TextEncoder().encode(SECRET_KEY);

export async function middleware(request: NextRequest) {
    // Only protect the /admin routes, excluding the login page itself and API save routes (which will have their own auth)
    if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
        const token = request.cookies.get('admin_session')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {
            await jwtVerify(token, encodedSecret);
            return NextResponse.next();
        } catch (err) {
            console.error('Invalid token:', err);
            // Token is invalid/expired
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
