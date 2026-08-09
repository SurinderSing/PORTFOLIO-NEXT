import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL || ''}/verification-success`
  );
}
