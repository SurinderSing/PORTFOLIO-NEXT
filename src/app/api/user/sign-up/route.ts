import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(): Promise<NextResponse> {
  return NextResponse.json(
    {
      message: 'Sign-up is now handled directly via Supabase Auth client SDK.',
    },
    { status: 200 }
  );
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { message: 'User listing is managed via Supabase database.' },
    { status: 200 }
  );
}
