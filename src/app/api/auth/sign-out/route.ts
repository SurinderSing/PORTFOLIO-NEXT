import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const supabase = createClient();
  await supabase.auth.signOut();
  const url = new URL('/sign-in', request.url);
  return NextResponse.redirect(url);
}

export async function POST(request: Request) {
  const supabase = createClient();
  await supabase.auth.signOut();
  const url = new URL('/sign-in', request.url);
  return NextResponse.redirect(url);
}
