import { type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/sign-in',
    '/sign-up',
    '/verification-success',
    '/api/auth/:path*',
    '/api/user/:path*',
  ],
};
