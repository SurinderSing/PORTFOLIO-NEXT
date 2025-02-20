import { NextResponse } from 'next/server';

export async function HEAD() {
  return NextResponse.json({ message: 'PING' }, { status: 200 });
}
