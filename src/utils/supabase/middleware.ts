import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
    }
  );

  // This will refresh the session if it's expired
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();

  // Admin route protection: Must be logged in AND have ADMIN role
  if (url.pathname.startsWith('/admin')) {
    if (!user) {
      url.pathname = '/sign-in';
      url.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'ADMIN') {
      url.pathname = '/';
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
    (url.pathname.startsWith('/sign-in') || url.pathname.startsWith('/sign-up'))
  ) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
