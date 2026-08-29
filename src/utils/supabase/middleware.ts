import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(
  request: NextRequest
): Promise<NextResponse> {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

  // If Supabase is not configured, skip session handling entirely
  if (
    supabaseUrl === 'https://placeholder.supabase.co' ||
    supabaseAnonKey === 'placeholder-key'
  ) {
    return supabaseResponse;
  }

  const pathname = request.nextUrl.pathname;
  const isAuthRoute =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/sign-in') ||
    pathname.startsWith('/sign-up') ||
    pathname.startsWith('/verification-success') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/api/user');

  if (!isAuthRoute) {
    return supabaseResponse;
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    // This will refresh the session if it's expired
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const url = request.nextUrl.clone();

    // Admin route protection: Must be logged in
    if (url.pathname.startsWith('/admin')) {
      if (!user) {
        url.pathname = '/sign-in';
        url.searchParams.set('redirect', request.nextUrl.pathname);
        return NextResponse.redirect(url);
      }
    }

    // General dashboard protection: Must be authenticated
    if (url.pathname.startsWith('/dashboard')) {
      if (!user) {
        url.pathname = '/sign-in';
        url.searchParams.set('redirect', request.nextUrl.pathname);
        return NextResponse.redirect(url);
      }
    }

    // Redirect signed-in users away from auth pages
    if (
      user &&
      (url.pathname.startsWith('/sign-in') ||
        url.pathname.startsWith('/sign-up'))
    ) {
      url.pathname = '/blog';
      return NextResponse.redirect(url);
    }
  } catch {
    // If Supabase client fails (e.g. network error, invalid config),
    // allow the request to pass through gracefully.
  }

  return supabaseResponse;
}
